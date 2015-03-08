var camera = {

  captureSuccess: function(mediaFiles) {
    if (mediaFiles.length > 1) {
      navigator.notification.alert("Error", null, "There should only be one media file.");
      return;
    }

    var video = mediaFiles[0];

    var sourceTag = document.createElement('source')
    var test = window.resolveLocalFileSystemURL(video.fullPath);
    console.log(test);
    sourceTag.id = "theSource";
    sourceTag.src = video.fullPath;

    var videoTag = document.createElement('video');
    videoTag.id = "theVideo";
    videoTag.width = "240";
    videoTag.height = "160";
    videoTag.controls = "controls";

    var appElement = document.getElementById('app');
    appElement.innerHTML = '';
    appElement.appendChild(videoTag);
    videoTag.appendChild(sourceTag);
  },

  captureError: function(error) {
    var msg = 'An error occurred during capture: ' + error.code;
    navigator.notification.alert(msg, null, 'Uh oh!');
  },

  captureVideo: function() {
    // Launch device video recording application.
    navigator.device.capture.captureVideo(this.captureSuccess, this.captureError, {limit: 1, duration: 30});
  },

  // Upload files to server
  uploadFile: function(mediaFile) {
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
}
