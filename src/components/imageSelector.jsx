import React from "react"
import {useEffect, useState, useRef, useContext} from "react";

import AppContext from "./appContext";

function ImageSelector() {

    const app = useContext(AppContext);

    useEffect(() => {
        const loadImage = async () => {
            if (app.selectedImage &&
                document.getElementById("status").state === "ready" && 
                document.getElementById("imageSrc").src!="") {
                
                const img = document.getElementById("imageSrc");
                app.setHeight(img.clientHeight);
                app.setWidth(img.clientWidth);
                // app.setSrcMat(await cv.imread(document.getElementById("imageSrc")));
            }
            else {
                setTimeout(loadImage, 100);
            }
        };

        loadImage();
    }, [app.selectedImage, app.imgHeight, app.imgWidth]);

    return (
        <div>
            {app.selectedImage && <button onClick={() => {app.setSelectedImage(null)}}>Remove</button>}
            <input
                type="file"
                name="myImage"
                onChange={
                    (event) => {
                        app.setSelectedImage(event.target.files[0]);
                    }
                }
            />
        </div>
    );
};

export {ImageSelector}



// import React from "react"
// import { MyImage } from "./image";
// import { CVOut } from "./cvout";
// import {useEffect, useState, useRef} from "react";

// import { Canvas } from "./canvas";
// import { CanvasProvider } from "./canvasContext";

// function ImageSelector(){
//     const [selectedImage, setSelectedImage] = useState(null);
//     // const [srcMat, setSrcMat] = useState(null);
//     const [canvasMat, setCanvasMat] = useState(null);
//     const [imgHeight, setHeight] = useState(null);
//     const [imgWidth, setWidth] = useState(null);

//     const overlapStyle = {
//         position: "absolute",
//         top: "300px"
//         // border: "3px solid black"
//     }

//     const sideStyle = {
//         position: "absolute",
//         border: "3px solid black",
//         left: "500px"
//     }

//     const changeStrokeColor = () => {
//         const canvas = document.getElementById("drawCanvas");
//         const context = canvas.getContext("2d");
//         console.log(context.strokeStyle)
//         if (context.strokeStyle === "#0000ff")
//             context.strokeStyle = "red";
//         else
//             context.strokeStyle = "blue";
//     }

//     // const clear = async () => {
//     //     const canv = document.getElementById("drawCanvas");
//     //     if (canv != null) {
//     //         canv.clear
//     //     }
//     // }

//     const apply = async () => {
//         const canv = document.getElementById("drawCanvas");
//         if (canv !== null){
//             let img = new Image();
//             img.src = canv.toDataURL('image/png');
//             await new Promise(r => {
//                 img.onload = r
//             })
//             // let row = img.height;
//             // let col = img.width;
//             setCanvasMat(await cv.imread(img));
//             // if (canvasMat !== null) {
//             //     console.log(canvasMat);
//             //     let src = canvasMat.clone();


//             //     let R = src.ucharAt(row, col * src.channels());
//             //     let G = src.ucharAt(row, col * src.channels() + 1);
//             //     let B = src.ucharAt(row, col * src.channels() + 2);
//             //     let A = src.ucharAt(row, col * src.channels() + 3);

//             //     let pixels = [R, G, B, A];
//             //     console.log(pixels);
//             // }
//         }
//     }

    

//     useEffect(() => {
//         const loadImage = async () => {
//             if (selectedImage &&
                
//                 document.getElementById("status").state === "ready" && 
//                 document.getElementById("imageSrc").src!="") {
                
//                 const img = document.getElementById("imageSrc");
//                 setHeight(img.clientHeight);
//                 setWidth(img.clientWidth);
//                 // setSrcMat(await cv.imread(document.getElementById("imageSrc")));
//             }
//             else {
//                 setTimeout(loadImage, 100);
//             }
//         };

//         loadImage();
//     }, [selectedImage, imgHeight, imgWidth]);

//     return (
//         <div>

//         {/* {selectedImage && (
//             <div>
//                 <MyImage style={overlapStyle} selectedImage = {selectedImage}/>
//                 <CVOut style={sideStyle} mat={canvasMat}/>
//                 <CanvasProvider>
//                     <Canvas style={overlapStyle} imgHeight = {imgHeight} imgWidth = {imgWidth}/>
//                 </CanvasProvider>

//                 <br />
//                 <button onClick={() => setSelectedImage(null)}>Remove</button>
//                 <br />
//                 <button onClick={() => changeStrokeColor()}>Change color</button>
//                 <br />
//                 <button onClick={() => apply()}>Apply</button>
//             </div>
//         )}
    
//         <br />
//         <br /> */}
        
//         <input
//             type="file"
//             name="myImage"
//             onChange={
//                 (event) => {
//                     setSelectedImage(event.target.files[0]);
//                 }
//             }
//         />
//         </div>
//     );
// };

// export {ImageSelector}