import React, {useEffect} from 'react';
import useCanvas from "../hooks/useCanvas.ts";
import {cn} from "../utils.ts";
import "./canvas.css"
import {useColorWebSocket} from "../hooks/useWebSocket";

interface CanvasProps {
  paint: string;
  className?: string;
}

const PIXEL_COUNT = 8000;

const Canvas: React.FC<CanvasProps> = ({paint, className}) => {
  const {pixels, updatePixel} = useCanvas(PIXEL_COUNT);
  const {lastJsonMessage, sendJsonMessage} = useColorWebSocket();

  useEffect(() => {
    if (lastJsonMessage !== null) {
      // console.log('Received: ', lastJsonMessage.index, lastJsonMessage.color)
      updatePixel(lastJsonMessage.index, lastJsonMessage.color);
    }
  }, [lastJsonMessage]);

  const handlePixelClick = (index: number, paint: string) => {
    // console.log('Sending: ', index, paint)
    sendJsonMessage({index: index, color: paint});
  };

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
            onClick={() => handlePixelClick(index, paint)}
          />
        ))
      }
    </div>
  )
}

export default Canvas;