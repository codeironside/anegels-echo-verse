import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { BookModel } from './BookModel';

export const BookshelfScene: React.FC = () => {
  return (
    <div className="w-full h-[50vh]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <Suspense fallback={null}>
          <BookModel position={[-2, 0, 0]} />
          <BookModel position={[0, 0, 0]} />
          <BookModel position={[2, 0, 0]} />
        </Suspense>

        <OrbitControls 
          enableZoom={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};