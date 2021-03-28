import React, { useEffect, useState, useCallback, useMemo, useRef } from "react"
import { useDropzone } from "react-dropzone"
import throttle from "lodash.throttle"

export default function ChangePhoto({ canvasPropsObject, updatePhoto }) {
  let [imgsrc1, setimgsrc1] = useState({})
  let [canvasZeroCoordX, setCanvasZeroCoordX] = useState(0)
  let [canvasZeroCoordY, setCanvasZeroCoordY] = useState(0)
  let [canvasProps, setCanvasProps] = useState({
    canvWidth: 0,
    canvHeight: 0,
  })
  const targetRectangle = useRef()
  const canvasElement = useRef()
  const imgPreview = useRef()

  useEffect(() => {
    changeCanvasZeroCoordinates()
    document.addEventListener("scroll", changeCanvasZeroCoordinates)
    return () =>
      document.removeEventListener("scroll", changeCanvasZeroCoordinates)
  }, [])

  const changeCanvasZeroCoordinates = useCallback(() => {
    throttle(() => {
      setCanvasZeroCoordX(canvasElement.current.getBoundingClientRect().left)
      setCanvasZeroCoordY(canvasElement.current.getBoundingClientRect().top)
    }, 40)
  })

  const baseStyle = {
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
  const style = useMemo(() => ({ ...baseStyle }))

  const rectangleStyle = () => {
    const targetRectangleStyle = {
      left: `${canvasPropsObject.props.dx}px`,
      top: `${canvasPropsObject.props.dy}px`,
      width: `${canvasPropsObject.props.dWidth}px`,
      height: `${canvasPropsObject.props.dHeight}px`,
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

  function canvasUpdate(obj) {
    for (let key of Object.keys(obj)) {
      canvasPropsObject[key] = obj[key]
    }
    drawImg()
    rectangleStyle()
  }

  function drawImg() {
    const canv = imgPreview.current.getContext("2d")
    const {
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight,
      src,
    } = canvasPropsObject.props
    canv.clearRect(0, 0, 640, 640)
    let img = new Image()
    img.src = src
    img.addEventListener("load", () => {
      canv.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    })
  }
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles[0]) {
      let file = acceptedFiles[0]
      let fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onloadend = (event) => {
        let canv = imgPreview.current.getContext("2d")
        canv.clearRect(0, 0, 640, 640)
        let img = new Image()
        let src = event.target.result
        img.src = src
        setimgsrc1(src)
        let width
        let height
        img.addEventListener("load", () => {
          let ratioWidth = img.width / 640
          let ratioHeight = img.height / 640
          if (img.width > img.height) {
            width = img.width / ratioWidth
            height = img.height / ratioWidth
            const halfHeight = height / 2
            canvasUpdate({
              imgWidth: img.width,
              imgHeight: img.height,
              canvWidth: width,
              canvHeight: height,
              dx: 0,
              dy: 0,
              sx: 0,
              sy: 0,
              dHeight: halfHeight,
              dWidth: halfHeight,
              sHeight: img.height / 2,
              sWidth: (img.width * halfHeight) / width,
              src: src,
              sxRatio: (img.width * halfHeight) / width / halfHeight,
              syRatio: img.height / 2 / halfHeight,
            })
            setCanvasProps({
              canvWidth: width,
              canvHeight: height,
            })
          } else {
            width = img.width / ratioHeight
            height = img.height / ratioHeight
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
              sHeight: img.width / 2,
              sWidth: (img.width * halfWidth) / width,
              src: src,
              sxRatio: (img.width * halfWidth) / width / halfWidth,
              syRatio: img.width / 2 / halfWidth,
            })

            setCanvasProps({
              canvWidth: width,
              canvHeight: height,
            })
          }
        })
      }
    }
  }

  function canvasToBlob() {
    setCanvasProps({
      canvWidth: canvasPropsObject.props.dWidth,
      canvHeight: canvasPropsObject.props.dHeight,
    })
    canvasUpdate({
      dx: 0,
      dy: 0,
    })

    setTimeout(() => {
      imgPreview.current.toBlob((blob) => {
        updatePhoto(blob)
      }, 5)
    })
  }

  const onDropAccepted = useCallback((files) => {}, [])

  const onDropRejected = useCallback((files) => {}, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropAccepted,
    onDropRejected,
    multiple: false,
  })

  const mouseMoveThrottled = throttle(changeStateObject, 20)

  function mouseMove(event) {
    if (canvasPropsObject.props.isChangingTarget) {
      mouseMoveThrottled(event.clientX, event.clientY)
    }
  }

  function changeStateObject(clientX, clientY) {
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
    } = canvasPropsObject.props
    const mouseOffsetDeltaX = clientX - canvasZeroCoordX - mouseClickOffsetX
    const mouseOffsetDeltaY = clientY - canvasZeroCoordY - mouseClickOffsetY
    const newDx = dxWhenMouseDown + mouseOffsetDeltaX
    const newDy = dyWhenMouseDown + mouseOffsetDeltaY
    if (
      newDx >= 0 &&
      newDy >= 0 &&
      newDx < canvWidth - dWidth &&
      newDy < canvHeight - dHeight
    ) {
      canvasUpdate({
        sx: newDx * sxRatio,
        sy: newDy * syRatio,
        dx: newDx,
        dy: newDy,
      })
    }
  }

  function imgMouseDown(event) {
    if (event.target == targetRectangle.current) {
      let mouseClickOffsetX = event.clientX - canvasZeroCoordX
      let mouseClickOffsetY = event.clientY - canvasZeroCoordY
      canvasUpdate({
        isChangingTarget: true,
        mouseClickOffsetX: mouseClickOffsetX,
        mouseClickOffsetY: mouseClickOffsetY,
        dxWhenMouseDown: canvasPropsObject.props.dx,
        dyWhenMouseDown: canvasPropsObject.props.dy,
      })
    }
  }
  function mouseUp() {
    canvasUpdate({ isChangingTarget: false })
  }

  return (
    <div className="upload-photo">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Перетащите фотографию сюда или нажмите, чтобы выбрать.</p>
        )}
      </div>

      <div
        className="upload-photo__img-container"
        id="img-container"
        ref={canvasElement}
        onMouseDown={imgMouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
        style={{
          backgroundImage: `url(${imgsrc1})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          width: `${canvasProps.canvWidth}px`,
          height: `${canvasProps.canvHeight}px`,
        }}
      >
        <canvas
          id="img-preview"
          className="img-preview"
          ref={imgPreview}
          width={canvasProps.canvWidth}
          height={canvasProps.canvHeight}
        ></canvas>
        <div
          id="target-rectangle"
          ref={targetRectangle}
          style={{
            position: "absolute",
          }}
        ></div>
      </div>
      <button
        className="btn btn_purpose_account-actions upload-photo__btn"
        onClick={canvasToBlob}
      >
        Сменить фото профиля
      </button>
    </div>
  )
}
