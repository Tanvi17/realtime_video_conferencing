'use strict';

/*
Get access to user's camera and microphone.
Capture the Media Stream of local data.
*/

// type of media(s) to get
const mediaStreamConstraints = {
  video: true,
  audio: true,
};

// initial start time of connection between peers
let startTime = null;

// initiate peer connections, streams and video elements
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

let localStream;
let remoteStream;

let localPeerConnection;
let remotePeerConnection;

// fetch the stream from video HTML tag and save interval it
// const localVideo = document.querySelector('video');


// Define Local and Remote MediaStreams

// sets MediaStream as the video element src
function fetchLocalMediaStream(mediaStream){
  localVideo.srcObject = mediaStream;
  localStream = mediaStream;
  trace('Recieved local stream');
  callButton.disabled = false;
}

// log the error message in console
function handleLocalMediaStreamError(error){
  console.log(`navigator.getUserMedia error: ${error.toString()}.`);
}

// remote MediaStream event, if success
function fetchRemoteMediaStream(event){
  const mediaStream = event.stream;
  remoteVideo.srcObject = mediaStream;
  remoteStream = mediaStream;
  trace('Recieved remote stream');
}


// Add behavior for video streams

// Logs a message with the id and size of a video element.
function logVideoLoaded(event) {
  const video = event.target;
  trace(`${video.id} videoWidth: ${video.videoWidth}px, ` +
        `videoHeight: ${video.videoHeight}px.`);
}

// Logs a message with the id and size of a video element.
// This event is fired when video begins streaming.
function logResizedVideo(event) {
  logVideoLoaded(event);

  if (startTime) {
    const elapsedTime = window.performance.now() - startTime;
    startTime = null;
    trace(`Setup time: ${elapsedTime.toFixed(3)}ms.`);
  }
}

localVideo.addEventListener('loadedmetadata', logVideoLoaded);
remoteVideo.addEventListener('loadedmetadata', logVideoLoaded);
remoteVideo.addEventListener('onresize', logResizedVideo);




// browser requests cam permission and if granted, initialize the media stream function
navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
.then(fetchLocalMediaStream).catch(handleLocalMediaStreamError);
