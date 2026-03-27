import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, TorusKnot, MeshDistortMaterial, Float } from '@react-three/drei';

function AnimatedShape() {
    const meshRef = React.useRef();
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.1;
            meshRef.current.rotation.y += delta * 0.15;
        }
    });
    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <TorusKnot ref={meshRef} args={[1.5, 0.4, 128, 32]}>
                <MeshDistortMaterial
                    color="#8b5cf6"
                    emissive="#5b21b6"
                    emissiveIntensity={0.6}
                    metalness={0.8}
                    roughness={0.2}
                    distort={0.4}
                    speed={1.5}
                />
            </TorusKnot>
        </Float>
    );
}

export default function ThreeDVisual() {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '600px', pointerEvents: 'none', zIndex: 0, opacity: 0.55, mixBlendMode: 'screen' }}>
            <React.Suspense fallback={null}>
                <Canvas camera={{ position: [0, 0, 7], fov: 45 }} gl={{ antialias: false }}>
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[10, 10, 5]} intensity={3} color="#6d28d9" />
                    <directionalLight position={[-10, -10, -5]} intensity={2} color="#2563eb" />
                    <AnimatedShape />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </React.Suspense>
        </div>
    );
}
