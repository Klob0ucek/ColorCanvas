import React, {useEffect} from 'react';
import Canvas from "./components/Canvas.tsx";
import {useState} from "react";
import PaintPicker from "./components/PaintPicker.tsx";
import './App.css';
import ToolPicker from "./components/ToolPicker";

function App() {
  const [paint, setPaint] = useState( '#000000');
  const [hover, setHover] = useState(true);

  return (
    <div>
      <h1>Color Canvas</h1>
      <Canvas paint={paint} hover={hover}/>
      <PaintPicker paint={paint} setPaint={setPaint}/>
      <ToolPicker hover={hover} setHover={setHover}/>
    </div>
  )
}

export default App
