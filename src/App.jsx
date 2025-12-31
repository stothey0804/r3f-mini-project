import { useRef } from "react";
import { OrbitControls, useHelper } from "@react-three/drei";
import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";
import { useControls } from "leva";

import * as THREE from "three";

import "./App.css";

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
      castShadow
      receiveShadow
      position={position}
      rotation-y={THREE.MathUtils.degToRad(rotationY)}
      rotation-z={THREE.MathUtils.degToRad(rotationZ)}
      material={materials}
    >
      <boxGeometry args={[1, 1.6, 0.01]} />
    </mesh>
  );
};

const Elements = () => {
  const { camera } = useThree();
  const dirLight = useRef(null);

  useHelper(dirLight, THREE.DirectionalLightHelper, 1, "blue");

  useFrame(() => {
    camera.lookAt(0, 0.5, 0);
  });

  return (
    <>
      {/* <OrbitControls /> */}
      <ambientLight intensity={0.7} />
      <directionalLight
        ref={dirLight}
        castShadow
        intensity={2}
        target-position={[0, -1, 0]}
        shadow-mapSize={[5000, 5000]}
        position={[-4, -2.1, 4]}
      />
      {cardData.map((props) => (
        <CardComponent key={props.imageUrl} {...props} />
      ))}
    </>
  );
};

function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 3] }}>
        <Elements />
      </Canvas>
    </>
  );
}

export default App;
