import { useState, useRef, useEffect } from 'react'
import { Button, Dialog } from '@mui/material';

function DrawBackground({image, setImage}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        console.log("Opening background drawing form at " + Date.now());
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Draw Background
        </Button>
        <DrawForm open={open} handleClose={handleClose} image={image} setImage={setImage}/>
        </>
    );
}

function DrawForm({ open, handleClose, image, setImage }) {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth='l'>
        <div id="container" style={{margin:"1rem"}}>
        <DrawCanvas image={image} setImage={setImage}/>
        </div>
        </Dialog>
    )
}

function DrawCanvas({image, setImage}) {
    const canvasRef = useRef(null);
    const [ctx, setCtx] = useState(null);

    const [drawing, setDrawing] = useState(false)
    const [erase, setErase] = useState(false)
    const [strokeColor, setColor] = useState('#000000')
    const [lineWidth, setWidth] = useState(3)
  
    const handleClear = () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    const handleDrawDown = (e) => {
        console.log(ctx);
        setDrawing(true)
        if (erase) {
        ctx.strokeStyle = 'white'; // bg color
        } else {
        ctx.strokeStyle = strokeColor;
        }
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      }
      const handleDrawMove = (e) => {
        if (drawing && ctx) {
          ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
          ctx.stroke();
        }
      }
      const handleDrawUp = () => {
        setDrawing(false)
      }

    const resizeCanvasToDisplaySize = () => {
    const canvas = canvasRef.current;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }
    return false;
    }

    const checkContext = () => {
        console.log(canvasRef)
        if (canvasRef.current) {
            console.log("canvas ready")
            resizeCanvasToDisplaySize();
            const context = canvasRef.current.getContext("2d");
            setCtx(context);
        }
        else console.log("canvas not ready");
    };
    useEffect(checkContext, [canvasRef, setCtx]); // renders as soon as DrawForm is in DrawBackground (before open is true)

    const saveImage = () => {
        const dataURL = canvasRef.current.toDataURL("img/jpeg");
        setImage("url(" + dataURL + ")");
        // // window.open(dataURL, '_blank');
        // const link = document.createElement('a');
        // link.href = dataURL;
        // // set download attribute and triger click event to initiate download
        // link.download = 'canvas_image.png';
        // link.click();
    }

    return (
        <>
        <div id="canvasHeader">
            <div id="tools">
            <input type="color" id="colorPicker" value={strokeColor} onChange={(e) => setColor(e.target.value)}/>
            <input type="range" id="sizePicker"  orient="vertical" min="1" max="10" value={lineWidth} onChange={(e) => setWidth(e.target.value)}/>
            <button id="eraseButton" onClick={() => setErase(!erase)} className={erase ? 'clicked' : ''}>Erase</button>
            <button id="clearButton" onClick={handleClear}>Clear All</button>
            </div>
            <Button variant="contained" onClick={saveImage}>Save</Button>
        </div>
        <canvas id="canvasElement" style= {{border: "1px solid black" }} ref={canvasRef}
        onMouseDown={(e) => handleDrawDown(e)} onMouseMove={(e) => handleDrawMove(e)} onMouseUp={handleDrawUp}>hello?</canvas>
        </>
    )
}

export default DrawBackground;
