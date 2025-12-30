import { OrbitControls } from "@react-three/drei";
import "./App.css";
import { Canvas, useLoader } from "@react-three/fiber";

import * as THREE from "three";

const CardComponent = ({ imageUrl }) => {
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  texture.colorSpace = THREE.DisplayP3ColorSpace;

  const materials = [
    new THREE.MeshStandardMaterial(), // 오른쪽
    new THREE.MeshStandardMaterial(), // 왼쪽
    new THREE.MeshStandardMaterial(), // 윗면
    new THREE.MeshStandardMaterial(), // 바닥면
    new THREE.MeshStandardMaterial({
      map: texture,
    }), // 앞면 (이미지 적용)
    new THREE.MeshStandardMaterial(), // 뒷면
  ];
  return (
    <mesh material={materials}>
      <boxGeometry args={[1, 1.6, 0.01]} />
    </mesh>
  );
};

function App() {
  return (
    <>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.7} />
        <directionalLight intensity={2} position={[1, 1, 1]} />
        <CardComponent imageUrl={"/card_1.png"} />
      </Canvas>
    </>
  );
}

export default App;
