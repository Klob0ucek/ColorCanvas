import React from 'react';
import Canvas from "./components/Canvas.tsx";
import {useState} from "react";
import PaintPicker from "./components/PaintPicker.tsx";
import './App.css';

function App() {
  const [paint, setPaint] = useState( '#000000');

  return (
    <div>
      <h1>Color Canvas</h1>
      <Canvas paint={paint}/>
      <PaintPicker paint={paint} setPaint={setPaint}/>
    </div>
  )
}

export default App
