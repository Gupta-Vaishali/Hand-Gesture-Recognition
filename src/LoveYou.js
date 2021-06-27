// Import dependencies
import { Finger, FingerCurl, FingerDirection, GestureDescription } from "fingerpose";

// Define Gesture Description
export const loveYouGesture = new GestureDescription('i_love_you');

// Thumb
loveYouGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
loveYouGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.5);
loveYouGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.5);

// Index
loveYouGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
loveYouGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.5);

// Pinky
loveYouGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
loveYouGesture.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.5);

// Middle Fingers
for(let finger of [Finger.Middle, Finger.Ring]){
    loveYouGesture.addCurl(finger, FingerCurl.FullCurl, 0.9);
    loveYouGesture.addDirection(finger, FingerDirection.VerticalDown, 0.8);
}
