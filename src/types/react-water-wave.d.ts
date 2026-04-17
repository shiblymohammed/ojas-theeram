declare module 'react-water-wave' {
  import { ReactNode, ComponentType } from 'react';

  interface WaterWaveProps {
    imageUrl: string;
    dropRadius?: number;
    perturbance?: number;
    resolution?: number;
    interactive?: boolean;
    crossOrigin?: string;
    children?: (methods: {
      pause: () => void;
      play: () => void;
      stop: () => void;
      drop: (x: number, y: number, radius: number, strength: number) => void;
    }) => ReactNode;
    style?: React.CSSProperties;
    className?: string;
  }

  const WaterWave: ComponentType<WaterWaveProps>;
  export default WaterWave;
}
