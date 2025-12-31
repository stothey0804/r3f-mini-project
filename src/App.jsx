import { OrbitControls } from "@react-three/drei";
import "./App.css";
import { Canvas, useLoader } from "@react-three/fiber";

import * as THREE from "three";

const cardData = [
  {
    imageUrl: "/tarrot_1.png",
    position: [0, -1, 0],
    rotationY: -10,
    rotationZ: 0,
  },
  {
    imageUrl: "/tarrot_2.png",
    position: [0.5, -1.05, -0.1],
    rotationY: -10,
    rotationZ: -10,
  },
  {
    imageUrl: "/tarrot_3.png",
    position: [-0.5, -1.05, 0.1],
    rotationY: -10,
    rotationZ: 10,
  },
  {
    imageUrl: "/tarrot_4.png",
    position: [-1, -1.15, 0.2],
    rotationY: -10,
    rotationZ: 20,
  },
  {
    imageUrl: "/tarrot_5.png",
    position: [1, -1.15, -0.1],
    rotationY: -10,
    rotationZ: -20,
  },
];

const CardComponent = ({ position, rotationY, rotationZ, imageUrl }) => {
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  texture.colorSpace = THREE.SRGBColorSpace;

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
    <mesh
      position={position}
      rotation-y={THREE.MathUtils.degToRad(rotationY)}
      rotation-z={THREE.MathUtils.degToRad(rotationZ)}
      material={materials}
    >
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
        <directionalLight intensity={4} position={[4, 1, 4]} />
        {cardData.map((props) => (
          <CardComponent key={props.imageUrl} {...props} />
        ))}
      </Canvas>
    </>
  );
}

export default App;
