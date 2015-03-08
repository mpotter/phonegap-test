var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },

  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  }
};

function captureSuccess(mediaFiles) {
  var i, len;
  for (i = 0, len = mediaFiles.length; i < len; i += 1) {
    uploadFile(mediaFiles[i]);
  }
}

// Called if something bad happens.
function captureError(error) {
  var msg = 'An error occurred during capture: ' + error.code;
  navigator.notification.alert(msg, null, 'Uh oh!');
}

// A button will call this function
function captureVideo() {
  // Launch device video recording application.
  navigator.device.capture.captureVideo(captureSuccess, captureError, {limit: 1, duration: 30});
}

// Upload files to server
function uploadFile(mediaFile) {
  var ft = new FileTransfer(),
  path = mediaFile.fullPath,
  name = mediaFile.name;

  ft.upload(path,
    "http://my.domain.com/upload.php",
    function(result) {
      console.log('Upload success: ' + result.responseCode);
      console.log(result.bytesSent + ' bytes sent');
    },
    function(error) {
      console.log('Error uploading file ' + path + ': ' + error.code);
    },
    { fileName: name });
}
