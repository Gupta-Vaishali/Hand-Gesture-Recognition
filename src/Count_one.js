// Import dependencies
import { Finger, FingerCurl, FingerDirection, GestureDescription } from "fingerpose";

// Define Gesture Description
export const countOneGesture = new GestureDescription('Number : 1');

// Thumb
countOneGesture.addCurl(Finger.Thumb, FingerCurl.FullCurl, 0.7);
countOneGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.7);
countOneGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.7);

// Index
countOneGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
countOneGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.8);

// Middle Fingers
for(let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]){
    countOneGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
    countOneGesture.addDirection(finger, FingerDirection.DiagonalLeftDown, 0.6);
    countOneGesture.addDirection(finger, FingerDirection.DiagonalRightDown, 0.6);
}
