'use client';
import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────────────
   GLSL: morphing sphere particle system
───────────────────────────────────────────────────────────────────────── */
const PARTICLE_VERT = /* glsl */`
  uniform float uTime;
  uniform float uSize;
  attribute float aScale;
  attribute float aRandom;
  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Multi-frequency wave displacement outward along sphere normal
    float d = sin(pos.x * 3.2 + uTime * 0.65) * 0.14
            + cos(pos.y * 2.7 + uTime * 0.50) * 0.11
            + sin(pos.z * 2.4 + uTime * 0.80) * 0.09;

    // Breathe: scale radius slightly with time
    float breath = 1.0 + sin(uTime * 0.28 + aRandom * 6.2831) * 0.04;
    pos = normalize(pos) * (length(pos) * breath + d);

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);

    gl_PointSize = uSize * aScale * (320.0 / -mvPos.z);
    gl_Position  = projectionMatrix * mvPos;

    // Flicker alpha
    vAlpha = 0.5 + sin(uTime * 0.5 + aRandom * 12.566) * 0.35 + 0.15;
  }
`;

const PARTICLE_FRAG = /* glsl */`
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    vec2 xy = gl_PointCoord - 0.5;
    float r  = length(xy) * 2.0;
    if (r > 1.0) discard;

    float a = (1.0 - smoothstep(0.2, 1.0, r)) * clamp(vAlpha, 0.0, 1.0);
    gl_FragColor = vec4(uColor, a);
  }
`;

/* ─────────────────────────────────────────────────────────────────────────
   GLSL: atmospheric glow sphere
───────────────────────────────────────────────────────────────────────── */
const GLOW_VERT = /* glsl */`
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vNormal  = normalize(normalMatrix * normal);
    vec4 mv  = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const GLOW_FRAG = /* glsl */`
  uniform vec3  uColor;
  uniform float uOpacity;
  varying vec3  vNormal;
  varying vec3  vViewDir;
  void main() {
    float rim = 1.0 - abs(dot(vNormal, vViewDir));
    float glow = pow(rim, 2.8) * uOpacity;
    gl_FragColor = vec4(uColor, glow);
  }
`;

/* ─────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────── */
export default function HeroGLScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animId: number;
    let cancelled = false;
    let cleanupFn: (() => void) | null = null;

    import('three').then(THREE => {
      if (cancelled || !mount) return;

      /* ── Renderer ──────────────────────────────────────────────────── */
      const W = mount.clientWidth  || window.innerWidth;
      const H = mount.clientHeight || window.innerHeight;

      const renderer = new THREE.WebGLRenderer({
        antialias: true, alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);
      Object.assign(renderer.domElement.style, {
        position: 'absolute', inset: '0', width: '100%', height: '100%',
      });

      /* ── Scene / Camera ────────────────────────────────────────────── */
      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, W / H, 0.01, 200);
      camera.position.set(0, 0, 5.5);

      /* ── Group (mouse-tilted) ──────────────────────────────────────── */
      const group = new THREE.Group();
      scene.add(group);

      /* ── 1. Morphing Particle Sphere ──────────────────────────────── */
      const PARTICLE_COUNT = window.innerWidth < 768 ? 800 : 1600;
      const sphereR = 1.85;
      const pPositions = new Float32Array(PARTICLE_COUNT * 3);
      const pScales    = new Float32Array(PARTICLE_COUNT);
      const pRandoms   = new Float32Array(PARTICLE_COUNT);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Fibonacci sphere distribution for uniform coverage
        const phi   = Math.acos(1 - 2 * (i + 0.5) / PARTICLE_COUNT);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;

        pPositions[i * 3]     = sphereR * Math.sin(phi) * Math.cos(theta);
        pPositions[i * 3 + 1] = sphereR * Math.cos(phi);
        pPositions[i * 3 + 2] = sphereR * Math.sin(phi) * Math.sin(theta);

        pScales[i]  = 0.4 + Math.random() * 0.9;
        pRandoms[i] = Math.random();
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
      pGeo.setAttribute('aScale',   new THREE.BufferAttribute(pScales, 1));
      pGeo.setAttribute('aRandom',  new THREE.BufferAttribute(pRandoms, 1));

      const pMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime:  { value: 0 },
          uSize:  { value: 2.8 * renderer.getPixelRatio() },
          uColor: { value: new THREE.Color(0xd4b46a) },
        },
        vertexShader:   PARTICLE_VERT,
        fragmentShader: PARTICLE_FRAG,
        transparent: true,
        depthWrite:  false,
        blending:    THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(pGeo, pMat);
      group.add(particles);

      /* ── 2. Atmospheric Glow Sphere ──────────────────────────────── */
      const glowGeo = new THREE.SphereGeometry(sphereR * 1.28, 32, 32);
      const glowMat = new THREE.ShaderMaterial({
        uniforms: {
          uColor:   { value: new THREE.Color(0xd4b46a) },
          uOpacity: { value: 0.55 },
        },
        vertexShader:   GLOW_VERT,
        fragmentShader: GLOW_FRAG,
        transparent: true,
        depthWrite:  false,
        side:        THREE.BackSide,
        blending:    THREE.AdditiveBlending,
      });
      group.add(new THREE.Mesh(glowGeo, glowMat));

      /* ── 3. Wireframe Torus Knot Sculpture (centrepiece) ─────────── */
      const knotGeo  = new THREE.TorusKnotGeometry(0.82, 0.24, 200, 24, 2, 3);
      const knotEdge = new THREE.EdgesGeometry(knotGeo, 15);
      const knotMat  = new THREE.LineBasicMaterial({
        color: 0xd4b46a, transparent: true, opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      const knotMesh = new THREE.LineSegments(knotEdge, knotMat);
      group.add(knotMesh);

      // Inner core glow
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0xd4b46a, transparent: true, opacity: 0.06, wireframe: true,
      });
      group.add(new THREE.Mesh(new THREE.TorusKnotGeometry(0.82, 0.24, 60, 8, 2, 3), coreMat));

      /* ── 4. Orbit Rings ──────────────────────────────────────────── */
      const ringDefs = [
        { r: 2.65, tube: 0.006, opacity: 0.35, rx: Math.PI / 2, ry: 0,            rz: 0,            speed: 0.006  },
        { r: 3.20, tube: 0.005, opacity: 0.25, rx: Math.PI / 4, ry: Math.PI / 6,  rz: 0,            speed: -0.009 },
        { r: 3.80, tube: 0.004, opacity: 0.15, rx: Math.PI / 6, ry: Math.PI / 3,  rz: Math.PI / 8,  speed: 0.004  },
        { r: 4.50, tube: 0.003, opacity: 0.08, rx: Math.PI / 8, ry: -Math.PI / 4, rz: Math.PI / 4,  speed: -0.003 },
      ];

      const rings = ringDefs.map(({ r, tube, opacity, rx, ry, rz }) => {
        const geo  = new THREE.TorusGeometry(r, tube, 2, 180);
        const mat  = new THREE.LineBasicMaterial({
          color: 0xd4b46a, transparent: true, opacity,
          blending: THREE.AdditiveBlending,
        });
        const ring = new THREE.LineSegments(new THREE.EdgesGeometry(geo), mat);
        ring.rotation.set(rx, ry, rz);
        group.add(ring);
        return ring;
      });

      /* ── 5. Background dot grid (very subtle) ────────────────────── */
      const GRID = 22, STEP = 0.55;
      const gridPos = new Float32Array(GRID * GRID * 3);
      let gi = 0;
      for (let x = 0; x < GRID; x++) {
        for (let y = 0; y < GRID; y++) {
          gridPos[gi++] = (x - GRID / 2) * STEP;
          gridPos[gi++] = (y - GRID / 2) * STEP;
          gridPos[gi++] = -4.5;
        }
      }
      const gridGeo = new THREE.BufferGeometry();
      gridGeo.setAttribute('position', new THREE.BufferAttribute(gridPos, 3));
      const gridMat = new THREE.PointsMaterial({
        color: 0xd4b46a, size: 0.018, transparent: true, opacity: 0.18,
        sizeAttenuation: true,
      });
      scene.add(new THREE.Points(gridGeo, gridMat));

      /* ── Mouse tilt ─────────────────────────────────────────────── */
      const mouse  = { x: 0, y: 0 };
      const target = { rx: 0, ry: 0 };
      const current = { rx: 0, ry: 0 };
      const LERP = 0.032;

      const onMouseMove = (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
        mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
        target.rx = -mouse.y * 0.22;
        target.ry =  mouse.x * 0.30;
      };
      window.addEventListener('mousemove', onMouseMove, { passive: true });

      /* ── Scroll-driven camera pull ───────────────────────────────── */
      let scrollFraction = 0;
      const onScroll = () => {
        scrollFraction = Math.min(window.scrollY / (mount.clientHeight || window.innerHeight), 1);
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      /* ── Resize ─────────────────────────────────────────────────── */
      const onResize = () => {
        const w = mount.clientWidth, h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize, { passive: true });

      /* ── Animation loop ─────────────────────────────────────────── */
      const clock = new THREE.Clock();

      const tick = () => {
        animId = requestAnimationFrame(tick);
        const t = clock.getElapsedTime();

        // Update uniforms
        (pMat.uniforms.uTime as THREE.IUniform).value = t;

        // Torus knot rotation
        knotMesh.rotation.x = t * 0.18;
        knotMesh.rotation.y = t * 0.12;
        knotMesh.rotation.z = t * 0.07;

        // Ring rotations
        rings[0].rotation.z += ringDefs[0].speed;
        rings[1].rotation.y += ringDefs[1].speed;
        rings[2].rotation.x += ringDefs[2].speed;
        rings[3].rotation.z += ringDefs[3].speed;

        // Particle sphere slow spin
        particles.rotation.y = t * 0.04;

        // Mouse tilt lerp
        current.rx += (target.rx - current.rx) * LERP;
        current.ry += (target.ry - current.ry) * LERP;
        group.rotation.x = current.rx;
        group.rotation.y = current.ry;

        // Scroll camera
        camera.position.z = 5.5 + scrollFraction * 2.5;

        renderer.render(scene, camera);
      };
      tick();

      cleanupFn = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        [pGeo, knotGeo, knotEdge, glowGeo, gridGeo].forEach(g => g.dispose());
        [pMat, knotMat, glowMat, coreMat, gridMat].forEach(m => m.dispose());
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      };
    });

    return () => { cancelled = true; cleanupFn?.(); };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
