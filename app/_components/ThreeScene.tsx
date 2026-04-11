'use client';
import { useEffect, useRef } from 'react';

interface ThreeSceneProps {
  style?:       React.CSSProperties;
  className?:   string;
  count?:       number;
  color?:       number;
  connectDist?: number;
}

export default function ThreeScene({
  style, className,
  count       = 80,
  color       = 0xd4b46a,
  connectDist = 13,
}: ThreeSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animId: number;
    let cancelled = false;
    let cleanup: (() => void) | null = null;

    import('three').then(THREE => {
      if (cancelled || !mount) return;

      const W = mount.clientWidth  || window.innerWidth;
      const H = mount.clientHeight || window.innerHeight;

      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
      // Cap at 1.5 for performance
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.inset    = '0';

      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
      camera.position.z = 38;

      const pos = new Float32Array(count * 3);
      const vel = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        pos[i*3]   = (Math.random()-0.5) * 72;
        pos[i*3+1] = (Math.random()-0.5) * 52;
        pos[i*3+2] = (Math.random()-0.5) * 18;
        vel[i*3]   = (Math.random()-0.5) * 0.022;
        vel[i*3+1] = (Math.random()-0.5) * 0.022;
      }

      const ptGeo  = new THREE.BufferGeometry();
      const ptAttr = new THREE.BufferAttribute(pos, 3);
      ptGeo.setAttribute('position', ptAttr);

      const ptMat = new THREE.PointsMaterial({ color, size:0.22, transparent:true, opacity:0.85, sizeAttenuation:true });
      scene.add(new THREE.Points(ptGeo, ptMat));

      const MAX_SEGS = 500;
      const lineBuf  = new Float32Array(MAX_SEGS * 6);
      const lineAttr = new THREE.BufferAttribute(lineBuf, 3);
      const lineGeo  = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', lineAttr);
      lineGeo.setDrawRange(0, 0);

      const lineMat = new THREE.LineBasicMaterial({ color, transparent:true, opacity:0.11 });
      scene.add(new THREE.LineSegments(lineGeo, lineMat));

      const mouse = { x:0, y:0 };
      const onMouse = (e: MouseEvent) => {
        const r = mount.getBoundingClientRect();
        mouse.x =  ((e.clientX - r.left) / r.width  - 0.5) * 72;
        mouse.y = -((e.clientY - r.top)  / r.height - 0.5) * 52;
      };
      window.addEventListener('mousemove', onMouse, { passive: true });

      const onResize = () => {
        const w = mount.clientWidth, h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize, { passive: true });

      const DIST2 = connectDist * connectDist;
      const BX = 36, BY = 26, REPEL_R = 9, REPEL_F = 0.06;

      let frame = 0;
      const tick = () => {
        animId = requestAnimationFrame(tick);
        frame++;

        for (let i = 0; i < count; i++) {
          pos[i*3]   += vel[i*3];
          pos[i*3+1] += vel[i*3+1];
          if (pos[i*3]   >  BX || pos[i*3]   < -BX) vel[i*3]   *= -1;
          if (pos[i*3+1] >  BY || pos[i*3+1] < -BY) vel[i*3+1] *= -1;
          const dx = pos[i*3] - mouse.x, dy = pos[i*3+1] - mouse.y;
          const d2 = dx*dx + dy*dy;
          if (d2 < REPEL_R*REPEL_R && d2 > 0) {
            const d = Math.sqrt(d2), f = ((REPEL_R - d) / REPEL_R) * REPEL_F;
            pos[i*3]   += (dx/d)*f;
            pos[i*3+1] += (dy/d)*f;
          }
        }
        ptAttr.needsUpdate = true;

        // Build lines every other frame for perf
        if (frame % 2 === 0) {
          let seg = 0;
          for (let i = 0; i < count && seg < MAX_SEGS; i++) {
            for (let j = i+1; j < count && seg < MAX_SEGS; j++) {
              const dx = pos[i*3]-pos[j*3], dy = pos[i*3+1]-pos[j*3+1];
              if (dx*dx+dy*dy < DIST2) {
                lineBuf[seg*6]=pos[i*3]; lineBuf[seg*6+1]=pos[i*3+1]; lineBuf[seg*6+2]=pos[i*3+2];
                lineBuf[seg*6+3]=pos[j*3]; lineBuf[seg*6+4]=pos[j*3+1]; lineBuf[seg*6+5]=pos[j*3+2];
                seg++;
              }
            }
          }
          lineAttr.needsUpdate = true;
          lineGeo.setDrawRange(0, seg*2);
        }

        renderer.render(scene, camera);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        ptGeo.dispose(); lineGeo.dispose();
        ptMat.dispose(); lineMat.dispose();
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      };
    });

    return () => { cancelled = true; cleanup?.(); };
  }, [count, color, connectDist]);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ position:'absolute', inset:0, pointerEvents:'none', ...style }}
    />
  );
}
