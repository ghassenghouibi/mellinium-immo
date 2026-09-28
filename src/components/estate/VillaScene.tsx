import { Environment, Lightformer } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const STONE = "#d7c6aa";
const PLASTER = "#f0e8d8";
const TERRACOTTA = "#a75835";
const WOOD = "#714d32";
const GLASS = "#7fb6bd";
const WATER = "#2a93a3";
const GREEN = "#475f3a";
const DARK_GREEN = "#273c2b";
const LINEN = "#ddd2be";

const cameraPath = [
  { position: new THREE.Vector3(18, 8, 20), look: new THREE.Vector3(0, 3, 0) },
  { position: new THREE.Vector3(12, 4.5, 10), look: new THREE.Vector3(0, 2.5, -1) },
  { position: new THREE.Vector3(4, 3.2, 5.5), look: new THREE.Vector3(-2, 2.2, -3) },
  { position: new THREE.Vector3(-5, 3, 2), look: new THREE.Vector3(-5, 2, -5) },
  { position: new THREE.Vector3(4, 2.8, -5), look: new THREE.Vector3(7, 1.4, -8) },
] as const;
const fallbackView = cameraPath[0];

function CameraTour({ progress, pointer }: { progress: React.RefObject<number>; pointer: React.RefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const currentLook = useRef(new THREE.Vector3(0, 3, 0));

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const scaled = Math.min(cameraPath.length - 1.001, Math.max(0, progress.current * (cameraPath.length - 1)));
    const index = Math.floor(scaled);
    const mix = scaled - index;
    const from = cameraPath[index] ?? fallbackView;
    const to = cameraPath[Math.min(index + 1, cameraPath.length - 1)] ?? fallbackView;
    target.lerpVectors(from.position, to.position, THREE.MathUtils.smoothstep(mix, 0, 1));
    target.x += pointer.current.x * 0.45;
    target.y += pointer.current.y * 0.2;
    camera.position.lerp(target, 1 - Math.exp(-3.5 * delta));
    look.lerpVectors(from.look, to.look, THREE.MathUtils.smoothstep(mix, 0, 1));
    currentLook.current.lerp(look, 1 - Math.exp(-4.5 * delta));
    camera.lookAt(currentLook.current);
  });
  return null;
}

function OliveTree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1.8, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.34, 3.6, 7]} />
        <meshStandardMaterial color={WOOD} roughness={1} />
      </mesh>
      {([[-0.7, 3.5, 0.2], [0.5, 3.8, 0], [0, 4.25, -0.35], [0.8, 3.25, 0.3]] as [number, number, number][]).map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <dodecahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial color={i % 2 ? GREEN : DARK_GREEN} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Villa() {
  return (
    <group>
      <mesh position={[0, 2.2, -2.5]} castShadow receiveShadow>
        <boxGeometry args={[15, 4.4, 7]} />
        <meshStandardMaterial color={PLASTER} roughness={0.82} />
      </mesh>
      <mesh position={[-3.8, 5.1, -2.8]} castShadow>
        <boxGeometry args={[6.5, 2.3, 5.6]} />
        <meshStandardMaterial color={PLASTER} roughness={0.85} />
      </mesh>
      <mesh position={[-3.8, 6.35, -2.8]} rotation-y={Math.PI / 4} castShadow>
        <cylinderGeometry args={[4.2, 4.2, 0.35, 4]} />
        <meshStandardMaterial color={TERRACOTTA} roughness={0.8} />
      </mesh>
      {[-5.8, -3.8, -1.8].map((x) => (
        <group key={x} position={[x, 2.2, 1.02]}>
          <mesh>
            <boxGeometry args={[1.45, 3.1, 0.18]} />
            <meshPhysicalMaterial color={GLASS} transparent opacity={0.62} roughness={0.05} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.12]}>
            <boxGeometry args={[0.08, 3.2, 0.08]} />
            <meshStandardMaterial color={WOOD} />
          </mesh>
        </group>
      ))}
      {[2.2, 4.2].map((x) => (
        <mesh key={x} position={[x, 2.1, 1.02]}>
          <boxGeometry args={[1.25, 2.7, 0.16]} />
          <meshPhysicalMaterial color={GLASS} transparent opacity={0.58} roughness={0.08} />
        </mesh>
      ))}
      <mesh position={[0, 4.6, 1]} receiveShadow>
        <boxGeometry args={[15.8, 0.24, 1.8]} />
        <meshStandardMaterial color={STONE} roughness={0.95} />
      </mesh>
      {[-7.3, -5, -2.5, 0, 2.5, 5, 7.3].map((x) => (
        <mesh key={x} position={[x, 2.2, 2]} castShadow>
          <cylinderGeometry args={[0.16, 0.22, 4.4, 12]} />
          <meshStandardMaterial color={STONE} roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[0, 0.18, 4.2]} receiveShadow>
        <boxGeometry args={[19, 0.35, 6]} />
        <meshStandardMaterial color={STONE} roughness={1} />
      </mesh>
      <mesh position={[3.8, 0.22, 7.8]} receiveShadow>
        <boxGeometry args={[10, 0.42, 4.7]} />
        <meshStandardMaterial color={STONE} roughness={1} />
      </mesh>
      <mesh position={[3.8, 0.45, 7.8]}>
        <boxGeometry args={[9.2, 0.28, 3.9]} />
        <meshPhysicalMaterial color={WATER} roughness={0.08} metalness={0.05} transmission={0.15} />
      </mesh>
      <group position={[-3.2, 0.6, 3.4]}>
        <mesh position={[0, 0.42, 0]} castShadow><boxGeometry args={[3.4, 0.65, 1.25]} /><meshStandardMaterial color={LINEN} roughness={1} /></mesh>
        <mesh position={[0, 0.95, 0.5]} castShadow><boxGeometry args={[3.4, 0.75, 0.26]} /><meshStandardMaterial color={LINEN} roughness={1} /></mesh>
        <mesh position={[2.4, 0.38, 0]}><cylinderGeometry args={[0.55, 0.55, 0.12, 32]} /><meshStandardMaterial color={TERRACOTTA} /></mesh>
      </group>
      <group position={[-4.7, 0.52, -1]}>
        <mesh><boxGeometry args={[3.4, 0.22, 1.25]} /><meshStandardMaterial color={WOOD} roughness={0.7} /></mesh>
        {[[-1.45,-0.42,-0.45],[1.45,-0.42,-0.45],[-1.45,-0.42,0.45],[1.45,-0.42,0.45]].map((p,i)=><mesh key={i} position={p as [number,number,number]}><boxGeometry args={[0.12,0.85,0.12]} /><meshStandardMaterial color={WOOD}/></mesh>)}
      </group>
      <OliveTree position={[-10, 0, 0]} scale={1.15} />
      <OliveTree position={[10, 0, -4]} scale={0.9} />
      <OliveTree position={[-9, 0, 8]} scale={0.75} />
      {[-7, -4, -1, 2, 5, 8].map((x, i) => (
        <mesh key={x} position={[x, 0.45, 11 + (i % 2) * 0.35]} castShadow>
          <sphereGeometry args={[0.48, 12, 8]} />
          <meshStandardMaterial color={i % 2 ? GREEN : DARK_GREEN} roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function Grounds() {
  return (
    <>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[70, 70, 48, 48]} />
        <meshStandardMaterial color={GREEN} roughness={1} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 16]} receiveShadow>
        <planeGeometry args={[70, 18]} />
        <meshStandardMaterial color={WATER} roughness={0.15} metalness={0.05} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.03, 7]} receiveShadow>
        <planeGeometry args={[7, 16]} />
        <meshStandardMaterial color={STONE} roughness={1} />
      </mesh>
    </>
  );
}

export function VillaScene({ progress, pointer }: { progress: React.RefObject<number>; pointer: React.RefObject<{ x: number; y: number }> }) {
  return (
    <>
      <color attach="background" args={["#8eb9c1"]} />
      <fog attach="fog" args={["#8eb9c1", 36, 75]} />
      <hemisphereLight args={["#dceef0", "#4c5f39", 1.4]} />
      <directionalLight position={[12, 18, 10]} intensity={2.5} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-camera-left={-18} shadow-camera-right={18} shadow-camera-top={18} shadow-camera-bottom={-18} />
      <Environment>
        <Lightformer intensity={2.4} position={[0, 12, 6]} scale={[18, 8, 1]} />
        <Lightformer intensity={1.4} color="#f1c58e" position={[-12, 5, 3]} rotation-y={Math.PI / 2} scale={[12, 5, 1]} />
      </Environment>
      <Grounds />
      <Villa />
      <CameraTour progress={progress} pointer={pointer} />
    </>
  );
}
