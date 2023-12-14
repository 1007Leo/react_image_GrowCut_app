import React from "react"
import {useEffect, useState, useContext} from "react";

import AppContext from "./appContext";

function CVOut(props){
    const [style, setStyle] = useState(null);

    const app = useContext(AppContext);

    useEffect(()=>{
        if (app.srcMat !== null){
            cv.imshow("canvasOutput", app.srcMat);
        }
        setStyle(props.style);
    }, [props.style, app.srcMat]);

    return(
        <div>
            <canvas style={style} id="canvasOutput" ></canvas>
        </div>
    )
}

export {CVOut}