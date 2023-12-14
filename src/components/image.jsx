import React from "react"
import {useEffect, useState, useContext} from "react";

import AppContext from "./appContext";

function MyImage(props){
    const [imgURL, setImgURL] = useState(null);
    const [style, setStyle] = useState(null);

    const app = useContext(AppContext);

    useEffect(()=>{
        if (app.selectedImage) {
            setImgURL(URL.createObjectURL(app.selectedImage));
            setStyle(props.style);
        }
        else {
            setImgURL(null)
            setStyle(null);
        }
    }, [app.selectedImage, props.style]);

    return(
        <div>
            <img
                style={style}
                id="imageSrc"
                alt="No Image"
                width={"250px"}
                src={imgURL}
            />
        </div>
    )
}

export {MyImage}