"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, ContactShadows } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/** Central air-dried slab: an organic, slowly turning dark cut. */
function Slab() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.25;
    // gentle pointer parallax
    const { x, y } = state.pointer;
    group.current.rotation.x += (y * 0.25 - group.current.rotation.x) * 0.04;
    group.current.position.x += (x * 0.4 - group.current.position.x) * 0.04;
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
        {/* main slab */}
        <mesh castShadow rotation={[0.3, 0, 0.15]}>
          <boxGeometry args={[2.6, 1.1, 0.9, 64, 32, 32]} />
          <MeshDistortMaterial
            color="#5C1A16"
            roughness={0.62}
            metalness={0.1}
            distort={0.32}
            speed={1.1}
            emissive="#2E0F0C"
            emissiveIntensity={0.35}
          />
        </mesh>
        {/* lighter cut-face accent */}
        <mesh position={[0, 0, 0.46]} rotation={[0.3, 0, 0.15]}>
          <boxGeometry args={[2.2, 0.7, 0.02]} />
          <meshStandardMaterial
            color="#7A241D"
            roughness={0.5}
            emissive="#431311"
            emissiveIntensity={0.2}
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

      <Slab />
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
