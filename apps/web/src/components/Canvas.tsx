import React, {useEffect, useRef, useState} from 'react';
import {cn} from "../utils.ts";
import "./canvas.css"
import {useColorWebSocket} from "../hooks/useWebSocket";

interface CanvasProps {
  paintColor: string;
  className?: string;
}

const PIXEL_SIZE = 10;
const TILE_COUNT = 8000;
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = (TILE_COUNT / (CANVAS_WIDTH / PIXEL_SIZE)) * PIXEL_SIZE; // 800px

const Canvas: React.FC<CanvasProps> = ({className, paintColor}) => {
  const [isPainting, setIsPainting] = useState(false);
  const canvasRef = useRef(null);
  const { sendJsonMessage, lastJsonMessage } = useColorWebSocket();

  // Function to get the mouse position relative to the canvas
  const getMousePos = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor((event.clientX - rect.left) / PIXEL_SIZE),
      y: Math.floor((event.clientY - rect.top) / PIXEL_SIZE),
    };
  };

  const getTileIndex = (pos) => {
    const tilesPerRow = CANVAS_WIDTH / PIXEL_SIZE;
    return pos.y * tilesPerRow + pos.x; // Formula to get the index of the tile based on the row and column
  };

  // Start painting
  const startPainting = (event) => {
    setIsPainting(true);
    paint(getMousePos(event));
  };

  // Stop painting
  const stopPainting = () => {
    setIsPainting(false);
  };

  const handlePainting = (event) => {
    const pos = getMousePos(event);
    const index = getTileIndex(pos); // Calculate the index of the tile
    paint(pos); // Paint the tile

    // Send WebSocket data (assuming black as the color for now)
    sendJsonMessage({ index, color: paintColor});
  };

  // Paint on the canvas
  const paint = (pos) => {
    const ctx = canvasRef.current.getContext('2d');
    if (ctx && pos) {
      ctx.fillStyle = paintColor; // Set the color to black
      ctx.fillRect(pos.x * PIXEL_SIZE, pos.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
    }
  };

  // Handle mouse move for painting
  const handleMouseMove = (event) => {
    if (!isPainting) return;
    handlePainting(event);
  };

  // Initialize the canvas with a white background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }, []);

  useEffect(() => {
      if (lastJsonMessage !== null) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          const pos = { x: lastJsonMessage.index % (CANVAS_WIDTH / PIXEL_SIZE), y: Math.floor(lastJsonMessage.index / (CANVAS_WIDTH / PIXEL_SIZE)) };
          ctx.fillStyle = lastJsonMessage.color;
          ctx.fillRect(pos.x * PIXEL_SIZE, pos.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
        }
      }
    }, [lastJsonMessage]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      onMouseDown={startPainting}
      onMouseUp={stopPainting}
      onMouseLeave={stopPainting}
      onMouseMove={handleMouseMove}
      className={cn(className, 'canvas')}
    />
  );
}

export default Canvas;