import React, { useRef, useEffect, useState } from 'react';
import './Draw_game.css';

const Draw_game = ({ updateResult }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000'); // 기본 색상: 검정

  const text = "집"; // 텍스트

  const updateCanvasSize = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const containerWidth = canvas.parentNode.offsetWidth * 0.9; // 부모 요소 너비의 90%
      const newHeight = window.innerWidth <= 450 ? containerWidth * (8 / 8.5) : containerWidth * (1 / 3.5);
      canvas.width = containerWidth;
      canvas.height = newHeight;
    }
  };

  useEffect(() => {
    updateCanvasSize();
    const context = canvasRef.current.getContext('2d');
    context.lineWidth = 5;
    context.lineCap = 'round';

    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext('2d');
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const startDrawingTouch = ({ nativeEvent }) => {
    const { touches } = nativeEvent;
    const touch = touches[0];
    const { clientX, clientY } = touch;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;
    const context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext('2d');
    context.strokeStyle = color; // 선택된 색상으로 그리기
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const drawTouch = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { touches } = nativeEvent;
    const touch = touches[0];
    const { clientX, clientY } = touch;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;
    const context = canvas.getContext('2d');
    context.strokeStyle = color; // 선택된 색상으로 그리기
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const endDrawing = () => {
    const context = canvasRef.current.getContext('2d');
    context.closePath();
    setIsDrawing(false);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    console.log("Drawing saved");

    // 부모 컴포넌트로 그림과 텍스트 전달
    if (updateResult) {
      updateResult({
        image: dataURL,
        text: text
      });
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log("Canvas cleared");
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <div className='Draw_wrap'>
      <h3>{text}</h3>  
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        onTouchStart={startDrawingTouch}
        onTouchMove={drawTouch}
        onTouchEnd={endDrawing}
        className='canvas'
      /><br/>
      <div className='draw_btn'>
        <input 
          type='color' 
          value={color} 
          onChange={handleColorChange} 
          className='color_picker'
        />
        <button onClick={clearCanvas} className='canvas_clear'>그림 지우기</button>
      </div>
      <button onClick={saveDrawing} className='canvas_result'>
        그림을 완성했습니다&nbsp;&nbsp;&nbsp;<i className="fa-solid fa-right-long"></i>
      </button>
    </div>
  );
};

export default Draw_game;
