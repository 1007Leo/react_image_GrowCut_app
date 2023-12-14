import React from "react"
import {useEffect, useState, createContext} from "react";

import AppContext from "./appContext";
import { ImageSelector } from "./imageSelector";
import { MyImage } from "./image";
import { Canvas } from "./canvas";
import { CanvasProvider } from "./canvasContext";
import { CVOut } from "./cvout";

function App(){

    const [selectedImage, setSelectedImage] = useState(null);
    const [imgHeight, setHeight] = useState(null);
    const [imgWidth, setWidth] = useState(null);
    const [canvasMat, setCanvasMat] = useState(null);
    const [srcMat, setSrcMat] = useState(null);

    const appData = {
        selectedImage, setSelectedImage,
        imgHeight, setHeight,
        imgWidth, setWidth,
        canvasMat, setCanvasMat,
        srcMat, setSrcMat
    }

    const overlapStyle = {
        position: "absolute",
        top: "300px"
        // border: "3px solid black"
    }

    return(
            <main className='main'>
                <p id="status" state="loading">OpenCV.js is loading...</p>
                <AppContext.Provider value={appData}>
                    <ImageSelector />
                    <MyImage style={overlapStyle}/>
                    <CanvasProvider>
                        <Canvas style={overlapStyle}/>
                    </CanvasProvider>
                    <CVOut />
                </AppContext.Provider>
            </main>
        
    )
}

export {App};
