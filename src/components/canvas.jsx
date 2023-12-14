import React,{ useEffect, useState, useContext} from "react";

import { useCanvas } from "./canvasContext";
import AppContext from "./appContext";

export function Canvas(props) {

  const [style, setStyle] = useState(null);
  const [clearState, setClearState] = useState(false)
  const app = useContext(AppContext);
  
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    clearCanvas,
    disableCanvas,
    changeColor,
    apply,
    draw
  } = useCanvas();

  useEffect(() => {
    if (app.selectedImage)
    {
      prepareCanvas(app.imgWidth, app.imgHeight);
      setStyle(props.style);
      if (clearState) {
        clearCanvas("transparent");
        setClearState(false);
      }
    }
    else
    {
      clearCanvas("white");
      disableCanvas();
      setStyle(null);
    }
  }, [app.selectedImage, app.imgWidth, app.imgHeight, clearState]);

  return (
    <div>
      <canvas 
      id="drawCanvas"
      style={style}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
      />
      {app.selectedImage && (
        <div>
          <button onClick={() => {setClearState(true)}}>Clear canvas</button>
          <button onClick={() => {changeColor()}}>Change stroke color</button>
          <br/>
          <button onClick={() => {apply()}}>Apply</button>
        </div>
        )
      }
    </div>
  );
}
