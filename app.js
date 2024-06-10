//Get stream element

var videoElement = document.getElementById("stream");
if (videoElement === null) {
    throw 'videoElement not found on page';
}

// Get the buttons
const startRecordingBtn = document.getElementById('start-recording-btn');
const stopRecordingBtn = document.getElementById('stop-recording-btn');
const downloadRecordingBtn = document.getElementById('download-recording-btn');

// Create a recorder instance
let recorder;

// Add event listeners to the buttons
startRecordingBtn.addEventListener('click', () => {
  // Get the video element
  const video = document.querySelector('video');

  // Create a MediaStream from the video element
  const mediaStream = video.captureStream();

  // Create a recorder instance
  recorder = new RecordRTC(mediaStream, {
    type: 'video',
    //set video type and codecs
    mimeType: 'video/webm:codecs=vp9',
    recorderType: RecordRTC.MediaStreamRecorder,
    // disable logs
    disableLogs: true,

    // get intervals based blobs
    // value in milliseconds
    //timeSlice: 1000,

    // requires timeSlice above
    // returns blob via callback function
    //ondataavailable: function(blob) {},

    // auto stop recording if camera stops
    //checkForInactiveTracks: false,

    // requires timeSlice above
    //onTimeStamp: function(timestamp) {},

    // both for audio and video tracks
    //bitsPerSecond: 128000,

    // only for audio track
    //audioBitsPerSecond: 128000,

    // only for video track
    videoBitsPerSecond: 20000000,

    // used by CanvasRecorder and WhammyRecorder
    // // it is kind of a "frameRate"
    //frameInterval: 60,

    // if you are recording multiple streams into single file
    // this helps you see what is being recorded
    //previewStream: function(stream) {},

    // used by CanvasRecorder and WhammyRecorder
    // you can pass {width:640, height: 480} as well
    // video: HTMLVideoElement,

    // // used by CanvasRecorder and WhammyRecorder
    // canvas: {
    //     width: 1920,
    //     height: 1080
    // },

    // used by StereoAudioRecorder
    // the range 22050 to 96000.
    //sampleRate: 96000,

    // used by StereoAudioRecorder
    // the range 22050 to 96000.
    // let us force 16khz recording:
    //desiredSampRate: 16000,

    // used by StereoAudioRecorder
    // Legal values are (256, 512, 1024, 2048, 4096, 8192, 16384).
    //bufferSize: 16384,

    // used by StereoAudioRecorder
    // 1 or 2
    //numberOfAudioChannels: 2,

    // // used by WebAssemblyRecorder
    // frameRate: 60,

    // // used by WebAssemblyRecorder
    // bitrate: 128000,

    // used by MultiStreamRecorder - to access HTMLCanvasElement
    //elementClass: 'multi-streams-mixer'
});
  //console.log(recorder.config);
  // Start recording
  recorder.startRecording();

  // Enable the stop recording button
  stopRecordingBtn.disabled = false;
});

stopRecordingBtn.addEventListener('click', () => {
  // Stop recording
  recorder.stopRecording();

  // Enable the download recording button
  downloadRecordingBtn.disabled = false;
});

downloadRecordingBtn.addEventListener('click', () => {
  // Get the recorded blob
  const blob = recorder.getBlob();

  // Create a URL for the recorded blob
  const url = URL.createObjectURL(blob);

  // Create a download link
  const a = document.createElement('a');
  a.href = url;
  a.download = 'recording.webm';

  // Click the download link
  a.click();

  // Revoke the URL
  URL.revokeObjectURL(url);
});