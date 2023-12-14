import React, { useEffect, useContext, useRef, useState } from "react";

import AppContext from "./appContext";

// enabling drawing on the blank canvas
const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const app = useContext(AppContext);

  // defining width & height of the canvas
  const prepareCanvas = (imgWidth, imgHeight) => {
    const canvas = canvasRef.current;
    canvas.width = imgWidth;
    canvas.heigh = imgHeight;
    canvas.style.width = `${imgWidth}px`;
    canvas.style.height = `${imgHeight}px`;

    // defining the thickness and colour of our brush
    const context = canvas.getContext("2d");
    context.scale(1, 150/imgHeight);
    context.lineCap = "round";
    context.strokeStyle = "blue";
    context.lineWidth = 2;
    contextRef.current = context;
  };

  const startDrawing = ({ nativeEvent }) => {
    if (contextRef.current !== null) {
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  };

  const finishDrawing = () => {
    if (contextRef.current !== null) {
      contextRef.current.closePath();
      setIsDrawing(false);
    }
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  // Once the canvas is cleared it return to the default colour
  const clearCanvas = (color) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
    apply()
  };

  const disableCanvas = () => {
    contextRef.current = null
  }

  const changeColor = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context.strokeStyle === "#0000ff")
        context.strokeStyle = "red";
    else
        context.strokeStyle = "blue";
  }

  const apply = async () => {
    const canvas = canvasRef.current;
    if (canvas !== null){
        let img = new Image();
        img.src = canvas.toDataURL('image/png');
        await new Promise(r => {
            img.onload = r
        })
        app.setSrcMat(await cv.imread(img));
    }
  }

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        disableCanvas,
        changeColor,
        apply,
        draw
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
