import { Environment, Sphere, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Gradient, LayerMaterial } from "lamina";
import { useRef } from "react";
import * as THREE from "three";

// Reusable Color objects to avoid GC pressure
const tmpColorA = new THREE.Color();
const tmpColorB = new THREE.Color();
const tmpLuminance = new THREE.Color();

export const Background = ({ backgroundColors }) => {
  const start = 0.2;
  const end = -0.5;

  const gradientRef = useRef();
  const gradientEnvRef = useRef();
  const starsRef = useRef();
  const moonRef = useRef();
  const moonGlowRef = useRef();

  useFrame(() => {
    tmpColorA.set(backgroundColors.current.colorA);
    tmpColorB.set(backgroundColors.current.colorB);

    gradientRef.current.colorA = tmpColorA;
    gradientRef.current.colorB = tmpColorB;
    gradientEnvRef.current.colorA = tmpColorA;
    gradientEnvRef.current.colorB = tmpColorB;

    // Fade stars and moon based on sky brightness
    // Dark sky = stars visible, bright sky = stars hidden
    tmpLuminance.set(backgroundColors.current.colorA);
    const luminance =
      0.299 * tmpLuminance.r + 0.587 * tmpLuminance.g + 0.114 * tmpLuminance.b;
    const starsOpacity = THREE.MathUtils.clamp(1 - luminance * 2.5, 0, 0.9);

    if (starsRef.current) {
      starsRef.current.material.opacity = starsOpacity;
    }
    if (moonRef.current) {
      moonRef.current.material.opacity = starsOpacity;
      moonRef.current.material.emissiveIntensity = starsOpacity * 2;
    }
    if (moonGlowRef.current) {
      moonGlowRef.current.material.opacity = starsOpacity * 0.3;
    }
  });

  return (
    <>
      {/* Stars */}
      <Stars
        ref={starsRef}
        radius={300}
        depth={100}
        count={3000}
        factor={5}
        saturation={0.1}
        fade
        speed={0.5}
      />

      {/* Moon */}
      <group position={[180, 120, -250]}>
        <Sphere ref={moonRef} args={[12, 32, 32]}>
          <meshStandardMaterial
            color="#f0e8d0"
            emissive="#f0e8d0"
            emissiveIntensity={1.5}
            transparent
            opacity={0.9}
          />
        </Sphere>
        {/* Moon glow */}
        <Sphere ref={moonGlowRef} args={[18, 32, 32]}>
          <meshBasicMaterial
            color="#b0c4de"
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </Sphere>
      </group>

      <Sphere scale={[500, 500, 500]} rotation-y={Math.PI / 2}>
        <LayerMaterial color={"#ffffff"} side={THREE.BackSide}>
          <Gradient ref={gradientRef} axes={"y"} start={start} end={end} />
        </LayerMaterial>
      </Sphere>
      <Environment resolution={256} frames={Infinity}>
        <Sphere
          scale={[100, 100, 100]}
          rotation-y={Math.PI / 2}
          rotation-x={Math.PI}
        >
          <LayerMaterial color={"#ffffff"} side={THREE.BackSide}>
            <Gradient
              ref={gradientEnvRef}
              axes={"y"}
              start={start}
              end={end}
            />
          </LayerMaterial>
        </Sphere>
      </Environment>
    </>
  );
};
