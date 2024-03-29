import React, {useRef,useState} from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam' ;
//import logo from './logo.svg';
import './App.css';
import {drawHand} from './utilities';
import * as fp from 'fingerpose';

import {loveYouGesture} from './LoveYou';
import {helloGesture} from './Hello';
import {countOneGesture} from './Count_one';
import {thumbsDownGesture} from './ThumbsDown';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [count,setCount] = useState(null);

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log('Handpose model loaded.');
    // Loop and detect hands
    setInterval(()=>{
      detect(net);
    },100)
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ){
      // Get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video properties - height and width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections 
      const hand = await net.estimateHands(video);
      //console.log(hand);

      if(hand.length >0){
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
          loveYouGesture,
          helloGesture,
          countOneGesture,
          thumbsDownGesture,
        ]);

        const gesture = await GE.estimate(hand[0].landmarks,1);
        //console.log(gesture);
        if(gesture.gestures !== undefined && gesture.gestures.length > 0){
          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null,confidence)
          );
          setCount(gesture.gestures[maxConfidence].name);
          console.log(count);
        }

      }

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      ctx.strokeStyle = "plum";
      ctx.lineWidth = 4;
      drawHand(hand, ctx);
    }
  }

  runHandpose();

  return (
    <div className="App">
      <header className="App-header">
        <Webcam ref={webcamRef}
        style={{
          position:'absolute',
          marginLeft:'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zindex: 9,
          width: 640,
          height: 480
        }} />
        <canvas ref={canvasRef}
        style ={{
          position:'absolute',
          marginLeft:'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zindex: 9,
          width: 640,
          height: 480,
          strokeStyle: "plum",
          lineWidth: 1
        }} />
      </header>
    </div>
  );
}

export default App;
