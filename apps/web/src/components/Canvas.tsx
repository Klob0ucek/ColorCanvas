import React from 'react';
import useCanvas from "../hooks/useCanvas.ts";
import {cn} from "../utils.ts";
import "./canvas.css"

interface CanvasProps {
  paint: string;
  className?: string;
}

const PIXEL_COUNT = 8000;

const Canvas: React.FC<CanvasProps> = ({paint, className}) => {
  const {pixels, updatePixel} = useCanvas(PIXEL_COUNT);

  return (
    <div className={cn(className, "canvas")}>
      {
        pixels.map((color, index) => (
          <div
            key={index}
            className="canvas__square"
            style={{
              backgroundColor: color,
            }}
            onClick={() => updatePixel(index, paint)}
          />
        ))
      }
    </div>
  )
}

export default Canvas;