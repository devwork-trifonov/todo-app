import React, { useEffect, useState, useCallback, useRef } from "react"
import { useDropzone } from "react-dropzone"
import throttle from "lodash.throttle"

import { ImgContainer, SubmitBtn, TargetRectangle } from "./UploadPhoto.style"

const style = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
}

const canvasDrawingPropsInitialValues = {
  imgWidth: 0,
  imgHeight: 0,
  canvWidth: 0,
  canvHeight: 0,
  sx: 0,
  sy: 0,
  sxRatio: 0,
  syRatio: 0,
  sWidth: 0,
  sHeight: 0,
  dx: 0,
  dy: 0,
  dxWhenMouseDown: 0,
  dyWhenMouseDown: 0,
  dWidth: 0,
  dHeight: 0,
  mouseClickOffsetX: 0,
  mouseClickOffsetY: 0,
  src: "",
}

let canvasDrawingProps = Object.assign({}, canvasDrawingPropsInitialValues)

let canvasContext
let imageForDrawing

export function UploadPhoto({ updatePhoto }) {
  let [imgsrc, setImgsrc] = useState({})
  let [canvasZeroCoordX, setCanvasZeroCoordX] = useState(0)
  let [canvasZeroCoordY, setCanvasZeroCoordY] = useState(0)
  let [canvasDimensions, setCanvasDimensions] = useState({
    canvWidth: 0,
    canvHeight: 0,
  })

  const targetRectangle = useRef()
  const canvasElement = useRef()
  const imgPreview = useRef()

  const changeCanvasZeroCoordinates = useCallback(() => {
    throttle(() => {
      setCanvasZeroCoordX(canvasElement.current.getBoundingClientRect().left)
      setCanvasZeroCoordY(canvasElement.current.getBoundingClientRect().top)
    }, 40)
  }, [])

  useEffect(() => {
    changeCanvasZeroCoordinates()
    document.addEventListener("scroll", changeCanvasZeroCoordinates)
    return () =>
      document.removeEventListener("scroll", changeCanvasZeroCoordinates)
  }, [changeCanvasZeroCoordinates])

  useEffect(() => {
    document.addEventListener("mousemove", mouseMove)
    document.addEventListener("mouseup", mouseUp)
    return () => {
      document.removeEventListener("mousemove", mouseMove)
      document.removeEventListener("mouseup", mouseUp)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  })

  function onDrop(acceptedFiles) {
    if (acceptedFiles[0]) {
      let file = acceptedFiles[0]
      let fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onloadend = (event) => {
        canvasContext = imgPreview.current.getContext("2d")
        canvasContext.clearRect(0, 0, 640, 640)
        imageForDrawing = new Image()
        let src = event.target.result
        imageForDrawing.src = src
        setImgsrc(src)
        let width
        let height
        imageForDrawing.addEventListener("load", () => {
          let ratioWidth = imageForDrawing.width / 640
          let ratioHeight = imageForDrawing.height / 640
          if (imageForDrawing.width > imageForDrawing.height) {
            width = imageForDrawing.width / ratioWidth
            height = imageForDrawing.height / ratioWidth
            const halfHeight = height / 2
            canvasUpdate({
              imgWidth: imageForDrawing.width,
              imgHeight: imageForDrawing.height,
              canvWidth: width,
              canvHeight: height,
              dx: 0,
              dy: 0,
              sx: 0,
              sy: 0,
              dHeight: halfHeight,
              dWidth: halfHeight,
              sHeight: imageForDrawing.height / 2,
              sWidth: (imageForDrawing.width * halfHeight) / width,
              src: src,
              sxRatio:
                (imageForDrawing.width * halfHeight) / width / halfHeight,
              syRatio: imageForDrawing.height / 2 / halfHeight,
            })
            setCanvasDimensions({
              canvWidth: width,
              canvHeight: height,
            })
          } else {
            width = imageForDrawing.width / ratioHeight
            height = imageForDrawing.height / ratioHeight
            const halfWidth = width / 2

            canvasUpdate({
              canvWidth: width,
              canvHeight: height,
              dx: 0,
              dy: 0,
              sx: 0,
              sy: 0,
              dHeight: halfWidth,
              dWidth: halfWidth,
              sHeight: imageForDrawing.width / 2,
              sWidth: (imageForDrawing.width * halfWidth) / width,
              src: src,
              sxRatio: (imageForDrawing.width * halfWidth) / width / halfWidth,
              syRatio: imageForDrawing.width / 2 / halfWidth,
            })

            setCanvasDimensions({
              canvWidth: width,
              canvHeight: height,
            })
          }
        })
      }
    }
  }

  function canvasUpdate(obj) {
    canvasDrawingProps = Object.assign(canvasDrawingProps, obj)
    stylingTargetRectangle()
    drawImg()
  }

  const stylingTargetRectangle = () => {
    const targetRectangleStyle = {
      left: `${canvasDrawingProps.dx}px`,
      top: `${canvasDrawingProps.dy}px`,
      width: `${canvasDrawingProps.dWidth}px`,
      height: `${canvasDrawingProps.dHeight}px`,
      border: "3px solid #000000",
    }
    let attributes = Object.keys(targetRectangleStyle)
    for (let attribute of attributes) {
      targetRectangle.current.style.setProperty(
        attribute,
        targetRectangleStyle[attribute]
      )
    }
  }

  function drawImg() {
    const {
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight,
    } = canvasDrawingProps
    canvasContext.clearRect(0, 0, 640, 640)
    canvasContext.drawImage(
      imageForDrawing,
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight
    )
  }

  function mouseDown(event) {
    if (event.target == targetRectangle.current) {
      document.body.style.userSelect = "none"
      let mouseClickOffsetX = event.clientX - canvasZeroCoordX
      let mouseClickOffsetY = event.clientY - canvasZeroCoordY
      canvasUpdate({
        isChangingTarget: true,
        mouseClickOffsetX: mouseClickOffsetX,
        mouseClickOffsetY: mouseClickOffsetY,
        dxWhenMouseDown: canvasDrawingProps.dx,
        dyWhenMouseDown: canvasDrawingProps.dy,
      })
    }
  }

  function mouseMove(event) {
    if (!canvasDrawingProps.isChangingTarget) {
      return
    }
    const clientX = event.clientX
    const clientY = event.clientY
    const {
      canvWidth,
      canvHeight,
      sxRatio,
      syRatio,
      dWidth,
      dHeight,
      mouseClickOffsetX,
      mouseClickOffsetY,
      dxWhenMouseDown,
      dyWhenMouseDown,
    } = canvasDrawingProps
    const mouseOffsetDeltaX = clientX - canvasZeroCoordX - mouseClickOffsetX
    const mouseOffsetDeltaY = clientY - canvasZeroCoordY - mouseClickOffsetY
    const newDx = dxWhenMouseDown + mouseOffsetDeltaX
    const newDy = dyWhenMouseDown + mouseOffsetDeltaY
    if (newDx >= 0 && newDx < canvWidth - dWidth) {
      canvasUpdate({
        sx: newDx * sxRatio,
        dx: newDx,
      })
    }
    if (newDy >= 0 && newDy < canvHeight - dHeight) {
      canvasUpdate({
        sy: newDy * syRatio,
        dy: newDy,
      })
    }
  }

  function mouseUp() {
    if (!canvasDrawingProps.isChangingTarget) return
    canvasUpdate({ isChangingTarget: false })
    document.body.style.userSelect = "auto"
  }

  function canvasToBlob() {
    if (!canvasDrawingProps.imgWidth) return
    setCanvasDimensions({
      canvWidth: canvasDrawingProps.dWidth,
      canvHeight: canvasDrawingProps.dHeight,
    })
    setTimeout(() => {
      canvasUpdate({
        dx: 0,
        dy: 0,
      })
      imgPreview.current.toBlob((blob) => {
        setCanvasDimensions({
          canvWidth: 0,
          canvHeight: 0,
        })
        canvasDrawingProps = Object.assign({}, canvasDrawingPropsInitialValues)
        updatePhoto(blob)
      })
    }, 0)
  }
  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Перетащите фотографию сюда или нажмите, чтобы выбрать.</p>
        )}
      </div>

      <ImgContainer
        ref={canvasElement}
        onMouseDown={mouseDown}
        style={{
          backgroundImage: `url(${imgsrc})`,
          width: `${canvasDimensions.canvWidth}px`,
          height: `${canvasDimensions.canvHeight}px`,
        }}
      >
        <canvas
          ref={imgPreview}
          width={canvasDimensions.canvWidth}
          height={canvasDimensions.canvHeight}
        ></canvas>
        <TargetRectangle ref={targetRectangle}></TargetRectangle>
      </ImgContainer>
      <SubmitBtn onClick={canvasToBlob}>Сменить фото профиля</SubmitBtn>
    </div>
  )
}
