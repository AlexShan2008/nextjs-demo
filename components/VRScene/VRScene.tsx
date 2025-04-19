import React, { useEffect } from 'react';
import start from '@/utils/vr';

const VRScene: React.FC = () => {
  useEffect(() => {
    // Start VR and get cleanup function
    const cleanup = start();

    // Return cleanup function to be called on unmount
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return <div id="vrApp"></div>;
};

export default VRScene;
