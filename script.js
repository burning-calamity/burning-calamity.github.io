function sayHello() {
  alert("Hello!");
}
async function requestExtraPermissions() {
  setText("permissionStatus", "Requesting extra permissions...");

  await requestExtraGPS();
  await requestCameraAndMicrophone();
  await requestNotifications();
  await requestClipboardRead();

  setText("permissionStatus", "Finished requesting available permissions.");
}

function requestExtraGPS() {
  return new Promise(function(resolve) {
    if (!navigator.geolocation) {
      setText("extraGpsLatitude", "Geolocation not supported");
      setText("extraGpsLongitude", "Geolocation not supported");
      setText("extraGpsAccuracy", "Geolocation not supported");
      resolve();
      return;
    }

    setText("extraGpsLatitude", "Requesting permission...");
    setText("extraGpsLongitude", "Requesting permission...");
    setText("extraGpsAccuracy", "Requesting permission...");

    navigator.geolocation.getCurrentPosition(
      function(position) {
        setText("extraGpsLatitude", position.coords.latitude);
        setText("extraGpsLongitude", position.coords.longitude);
        setText("extraGpsAccuracy", position.coords.accuracy + " meters");
        resolve();
      },
      function(error) {
        let message = "Permission denied or unavailable";

        if (error.code === 1) message = "Permission denied";
        if (error.code === 2) message = "Position unavailable";
        if (error.code === 3) message = "Request timed out";

        setText("extraGpsLatitude", message);
        setText("extraGpsLongitude", message);
        setText("extraGpsAccuracy", message);
        resolve();
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}

async function requestCameraAndMicrophone() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    setText("cameraStatus", "Camera API not supported");
    setText("microphoneStatus", "Microphone API not supported");
    return;
  }

  try {
    setText("cameraStatus", "Requesting permission...");
    setText("microphoneStatus", "Requesting permission...");

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    const videoTracks = stream.getVideoTracks();
    const audioTracks = stream.getAudioTracks();

    if (videoTracks.length > 0) {
      const videoTrack = videoTracks[0];
      const videoSettings = videoTrack.getSettings ? videoTrack.getSettings() : {};

      setText(
        "cameraStatus",
        "Allowed — " +
        (videoTrack.label || "Camera detected") +
        ", " +
        (videoSettings.width || "unknown width") +
        " × " +
        (videoSettings.height || "unknown height") +
        ", " +
        (videoSettings.frameRate || "unknown FPS") +
        " FPS"
      );

      const preview = document.getElementById("cameraPreview");
      if (preview) {
        preview.srcObject = stream;
        preview.style.display = "block";
      }
    } else {
      setText("cameraStatus", "No camera track detected");
    }

    if (audioTracks.length > 0) {
      const audioTrack = audioTracks[0];

      setText(
        "microphoneStatus",
        "Allowed — " + (audioTrack.label || "Microphone detected")
      );
    } else {
      setText("microphoneStatus", "No microphone track detected");
    }

  } catch (error) {
    setText("cameraStatus", "Permission denied or unavailable");
    setText("microphoneStatus", "Permission denied or unavailable");
  }
}

async function requestNotifications() {
  if (!("Notification" in window)) {
    setText("notificationStatus", "Notifications not supported");
    return;
  }

  try {
    const permission = await Notification.requestPermission();
    setText("notificationStatus", permission);

    if (permission === "granted") {
      new Notification("Permission granted", {
        body: "This website can now show browser notifications."
      });
    }
  } catch (error) {
    setText("notificationStatus", "Could not request notification permission");
  }
}

async function requestClipboardRead() {
  if (!navigator.clipboard || !navigator.clipboard.readText) {
    setText("clipboardReadStatus", "Clipboard read not supported");
    return;
  }

  try {
    const text = await navigator.clipboard.readText();

    if (text.length === 0) {
      setText("clipboardReadStatus", "Allowed — clipboard is empty");
    } else {
      setText("clipboardReadStatus", "Allowed — clipboard text length: " + text.length + " characters");
      collectedInfo.clipboardTextPreview = text.slice(0, 200);
      updateRawInfo();
    }
  } catch (error) {
    setText("clipboardReadStatus", "Permission denied or unavailable");
  }
}
