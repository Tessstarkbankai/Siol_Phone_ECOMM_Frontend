import { useEffect, useRef } from "react";
import createGlobe, { type COBEOptions, type Globe as COBEGlobe } from "cobe";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
  config?: Partial<COBEOptions>;
}

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.93, 0.95, 0.98],
  markerColor: [0.85, 0.11, 0.14], // Wonderchef crimson red
  glowColor: [1, 0.92, 0.92],
  markers: [
    // India Flagship Experience Centers & Stores
    { location: [28.6139, 77.209], size: 0.08 }, // Delhi NCR
    { location: [19.076, 72.8777], size: 0.1 }, // Mumbai (Flagship HQ)
    { location: [12.9716, 77.5946], size: 0.08 }, // Bengaluru
    { location: [22.5726, 88.3639], size: 0.07 }, // Kolkata
    { location: [17.385, 78.4867], size: 0.07 }, // Hyderabad
    { location: [23.0225, 72.5714], size: 0.07 }, // Ahmedabad
    { location: [26.8467, 80.9462], size: 0.06 }, // Lucknow
    { location: [13.0827, 80.2707], size: 0.07 }, // Chennai
    { location: [18.5204, 73.8567], size: 0.07 }, // Pune
  ],
};

export function Globe({ className, config = {} }: GlobeProps) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    let globe: COBEGlobe | null = null;
    let animFrameId: number;

    const render = () => {
      if (!pointerInteracting.current) {
        phi += 0.004;
      }
      if (globe) {
        globe.update({
          phi: phi + pointerInteractionMovement.current,
          width: width * 2 || 800,
          height: width * 2 || 800,
        });
      }
      animFrameId = requestAnimationFrame(render);
    };

    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        ...GLOBE_CONFIG,
        width: width * 2 || 800,
        height: width * 2 || 800,
        ...config,
      });
      animFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animFrameId);
      if (globe) {
        globe.destroy();
      }
      window.removeEventListener("resize", onResize);
    };
  }, [config]);

  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[550px]",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-100 transition-opacity duration-1000 [contain:layout_paint_size] cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.008;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.008;
          }
        }}
      />
    </div>
  );
}

export default Globe;
