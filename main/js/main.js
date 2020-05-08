'use strict';

/*
get the local video stream
--- simplify more ---
*/

// type of media(s) to be streamed
const mediaStreamConstraints = {video: true,};

// fetch the stream from video HTML tag and save interval it
const localVideo = document.querySelector('video');

let localStream;

// adding MediaStream to the video elements
function fetchLocalMediaStream(mediaStream){
  localStream = mediaStream;
  localVideo.srcObject = mediaStream;
}

// log the error message in console
function localMediaStreamError(error){
  console.log('navigator.getUserMedia error:', error);
}

// initialize the media stream function
navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
.then(fetchLocalMediaStream).catch(localMediaStreamError);
