import { useGLTF } from "@react-three/drei";

export function Airplane(props) {
  const { nodes, materials } = useGLTF("./models/airplane/airplane.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        name="Object_4"
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials["Material.001"]}
        position={[-0.03, -0.202, 0]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={0.242}
      />
    </group>
  );
}

useGLTF.preload("./models/airplane/airplane.glb");
