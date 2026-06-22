"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, useTexture } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/** Central floating cut: the real Geelvet biltong photo, gently hovering
 *  over a warm radial backglow for a premium spotlight feel. */
function Slab() {
  const group = useRef<THREE.Group>(null);
  const glow = useRef<THREE.Mesh>(null);
  const texture = useTexture("/products/geelvet-biltong-floating.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  // crisp, smooth sampling at the plane's angle and soft feathered edges
  texture.anisotropy = 16;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;

  // warm radial gradient drawn to a canvas, used as the backglow
  const glowTexture = useMemo(() => {
    const size = 256;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    g.addColorStop(0, "rgba(232,183,96,0.60)");
    g.addColorStop(0.35, "rgba(181,64,42,0.34)");
    g.addColorStop(1, "rgba(181,64,42,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // gentle sway so the photo keeps facing the viewer, plus the same parallax
    group.current.rotation.y = Math.sin(t * 0.4) * 0.16;
    const { x, y } = state.pointer;
    group.current.rotation.x += (y * 0.2 - group.current.rotation.x) * 0.04;
    group.current.position.x += (x * 0.4 - group.current.position.x) * 0.04;
    // slow breathing pulse on the glow
    if (glow.current) {
      const p = 1 + Math.sin(t * 0.9) * 0.06;
      glow.current.scale.set(p, p, 1);
    }
  });

  return (
    <group ref={group}>
      {/* warm backglow */}
      <mesh ref={glow} position={[0, 0, -0.9]}>
        <planeGeometry args={[6.4, 6.4]} />
        <meshBasicMaterial
          map={glowTexture}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh>
          <planeGeometry args={[4.2, 4.2]} />
          <meshStandardMaterial
            map={texture}
            transparent
            alphaTest={0.04}
            depthWrite={false}
            roughness={0.7}
            metalness={0}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
    </group>
  );
}

/** Drifting spice motes (coriander gold + dark peppercorns). */
function Spices({ count = 320 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const gold = new THREE.Color("#D6A24A");
    const pepper = new THREE.Color("#2A1E16");
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      const c = Math.random() > 0.45 ? gold : pepper;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.elapsedTime;
    points.current.rotation.y = t * 0.06;
    points.current.position.y = Math.sin(t * 0.3) * 0.2;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.4, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <fog attach="fog" args={["#15110E", 7, 16]} />
      <ambientLight intensity={0.4} />
      <hemisphereLight args={["#FBE3B0", "#2A1410", 0.6]} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={2.2}
        color="#FBE3B0"
        castShadow
      />
      <pointLight position={[-5, -2, 2]} intensity={1.4} color="#B5402A" />
      <spotLight
        position={[0, 6, 2]}
        angle={0.5}
        penumbra={1}
        intensity={1.2}
        color="#D6A24A"
      />

      <Suspense fallback={null}>
        <Slab />
      </Suspense>
      <Spices />

      <ContactShadows
        position={[0, -1.9, 0]}
        opacity={0.5}
        scale={12}
        blur={3}
        far={4}
        color="#000000"
      />
    </Canvas>
  );
}
