'use client';
import { useEffect, useRef } from 'react';

const VERT = /* glsl */`
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vNormal  = normalize(normalMatrix * normal);
    vec4 mv  = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */`
  uniform vec3  uColor;
  uniform float uOpacity;
  varying vec3  vNormal;
  varying vec3  vViewDir;
  void main() {
    float rim  = 1.0 - abs(dot(vNormal, vViewDir));
    float glow = pow(rim, 2.2) * uOpacity;
    gl_FragColor = vec4(uColor, glow);
  }
`;

export default function WireframeGlobe({ size = 200 }: { size?: number }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animId: number;
    let cancelled = false;
    let cleanupFn: (() => void) | null = null;

    import('three').then(THREE => {
      if (cancelled || !mount) return;

      const S = mount.clientWidth || size;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(S, S);
      renderer.setClearColor(0, 0);
      mount.appendChild(renderer.domElement);
      Object.assign(renderer.domElement.style, { position: 'absolute', inset: '0' });

      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 3.8;

      const group = new THREE.Group();
      scene.add(group);

      // Main wireframe sphere
      const sGeo  = new THREE.SphereGeometry(1.4, 28, 18);
      const sMat  = new THREE.MeshBasicMaterial({
        color: 0xd4b46a, wireframe: true, transparent: true, opacity: 0.18,
      });
      group.add(new THREE.Mesh(sGeo, sMat));

      // Icosahedron nodes on sphere surface
      const nodeMat = new THREE.MeshBasicMaterial({
        color: 0xd4b46a, transparent: true, opacity: 0.7,
      });
      for (let i = 0; i < 24; i++) {
        const phi   = Math.acos(1 - 2 * (i + 0.5) / 24);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const r = 1.4;
        const node = new THREE.Mesh(new THREE.OctahedronGeometry(0.042, 0), nodeMat);
        node.position.set(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta),
        );
        group.add(node);
      }

      // Glow atmosphere
      const glowMat = new THREE.ShaderMaterial({
        uniforms: {
          uColor:   { value: new THREE.Color(0xd4b46a) },
          uOpacity: { value: 0.5 },
        },
        vertexShader:   VERT,
        fragmentShader: FRAG,
        transparent: true,
        side:        THREE.BackSide,
        blending:    THREE.AdditiveBlending,
        depthWrite:  false,
      });
      group.add(new THREE.Mesh(new THREE.SphereGeometry(1.75, 32, 32), glowMat));

      // Equator ring
      const eGeo = new THREE.TorusGeometry(1.4, 0.005, 2, 120);
      const eMat = new THREE.LineBasicMaterial({
        color: 0xd4b46a, transparent: true, opacity: 0.45,
      });
      const equator = new THREE.LineSegments(new THREE.EdgesGeometry(eGeo), eMat);
      equator.rotation.x = Math.PI / 2;
      group.add(equator);

      // Orbit ring
      const orbitGeo = new THREE.TorusGeometry(1.9, 0.004, 2, 120);
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0xd4b46a, transparent: true, opacity: 0.22,
      });
      const orbit = new THREE.LineSegments(new THREE.EdgesGeometry(orbitGeo), orbitMat);
      orbit.rotation.x = Math.PI / 3;
      group.add(orbit);

      // Mouse interaction
      const mouse = { x: 0, y: 0 };
      const onMove = (e: MouseEvent) => {
        const r = mount.getBoundingClientRect();
        mouse.x = ((e.clientX - r.left) / r.width  - 0.5) * 2;
        mouse.y = ((e.clientY - r.top)  / r.height - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMove, { passive: true });

      let tx = 0, ty = 0;
      const clock = new THREE.Clock();

      const tick = () => {
        animId = requestAnimationFrame(tick);
        const t = clock.getElapsedTime();

        tx += (-mouse.y * 0.4 - tx) * 0.06;
        ty += ( mouse.x * 0.6 - ty) * 0.06;

        group.rotation.x = tx + t * 0.06;
        group.rotation.y = ty + t * 0.09;
        orbit.rotation.z = t * 0.15;

        renderer.render(scene, camera);
      };
      tick();

      cleanupFn = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', onMove);
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      };
    });

    return () => { cancelled = true; cleanupFn?.(); };
  }, [size]);

  return (
    <div
      ref={mountRef}
      style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}
    />
  );
}
