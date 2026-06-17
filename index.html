const collectedInfo = {};

let privacyModeEnabled = false;
let cameraCaptureInterval = null;
let activeCameraStream = null;
let latestCameraFrameDataUrl = null;

let micMeterStream = null;
let micAudioContext = null;
let micAnalyser = null;
let micAnimationFrame = null;

let motionEnabled = false;
let wakeLockObject = null;
let watchedBattery = null;

let inputTestRunning = false;
let idleTrackingInterval = null;
let idleTrackingEnabled = false;
let lastActivityTime = Date.now();

let autoStopCountdown = null;
let autoStopRemaining = 0;

let cameraAnalysisInterval = null;
let sessionTimerInterval = null;
let sessionStartTime = null;
let networkWatcherRunning = false;

let permissionHistory = [];
let localEventLogRunning = false;
let localEventLog = [];


/* =========================
   BASIC HELPERS
========================= */

function safeValue(value) {
  if (value === undefined || value === null || value === "") {
    return "Unavailable";
  }

  return String(value);
}

function setText(id, value) {
  const finalValue = safeValue(value);
  const element = document.getElementById(id);

  if (element) {
    element.textContent = finalValue;
  }

  collectedInfo[id] = finalValue;
  updateRawInfo();
}

function setValue(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.value = value;
  }

  collectedInfo[id] = value;
  updateRawInfo();
}

function updateRawInfo() {
  const raw = document.getElementById("rawInfo");

  if (raw) {
    raw.textContent = JSON.stringify(collectedInfo, null, 2);
  }
}

function boolLabel(value) {
  if (value === true) return "Yes";
  if (value === false) return "No";
  if (value === undefined || value === null) return "Unavailable";
  return String(value);
}

function riskFlag(value) {
  return value === true || value === "true" || value === 1;
}

function formatBytes(bytes) {
  const number = Number(bytes);

  if (!Number.isFinite(number)) {
    return "Unavailable";
  }

  const units = ["bytes", "KB", "MB", "GB", "TB"];
  let size = number;
  let index = 0;

  while (size >= 1024 && index < units.length - 1) {
    size = size / 1024;
    index++;
  }

  return size.toFixed(2) + " " + units[index];
}

function roundNumber(value, decimals) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "Unavailable";
  }

  return number.toFixed(decimals);
}

async function sha256Text(text) {
  if (!window.crypto || !crypto.subtle) {
    return "Crypto API unavailable";
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map(function(byte) {
    return byte.toString(16).padStart(2, "0");
  }).join("");
}

const sha256FromString = sha256Text;

function storageAvailable(type) {
  try {
    const storage = window[type];
    const key = "__storage_test__";

    storage.setItem(key, key);
    storage.removeItem(key);

    return "Available";
  } catch (error) {
    return "Unavailable";
  }
}

function checkWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    return gl ? "Supported" : "Not supported";
  } catch (error) {
    return "Not supported";
  }
}


/* =========================
   DEVICE DETECTION
========================= */

function detectBrowser() {
  const ua = navigator.userAgent;

  if (ua.includes("Edg/")) return "Microsoft Edge";
  if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Firefox/")) return "Firefox";
  if (ua.includes("Chrome/")) return "Chrome";
  if (ua.includes("Safari/")) return "Safari";

  return "Unknown browser";
}

function detectOS() {
  const ua = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();

  if (ua.includes("android")) return "Android";
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) return "iOS";
  if (platform.includes("win")) return "Windows";
  if (platform.includes("mac")) return "macOS";
  if (platform.includes("linux")) return "Linux";

  return "Unknown operating system";
}

function detectDeviceType() {
  const ua = navigator.userAgent.toLowerCase();

  if (/ipad|tablet/.test(ua)) return "Tablet";
  if (/mobile|iphone|android/.test(ua)) return "Phone";

  return "Desktop or laptop";
}


/* =========================
   BASIC COLLECTION
========================= */

function collectBasicInfo() {
  setText("browser", detectBrowser());
  setText("os", detectOS());
  setText("deviceType", detectDeviceType());
  setText("userAgent", navigator.userAgent);
  setText("platform", navigator.platform);
  setText("language", navigator.language);
  setText("languages", Array.isArray(navigator.languages) ? navigator.languages.join(", ") : "Unavailable");
  setText("cookies", navigator.cookieEnabled ? "Yes" : "No");
  setText("doNotTrack", navigator.doNotTrack || window.doNotTrack || "Unavailable");
  setText("online", navigator.onLine ? "Yes" : "No");

  setText("screenSize", screen.width + " × " + screen.height);
  setText("availableScreenSize", screen.availWidth + " × " + screen.availHeight);
  setText("windowSize", window.innerWidth + " × " + window.innerHeight);
  setText("colorDepth", screen.colorDepth + " bits");
  setText("pixelDepth", screen.pixelDepth + " bits");
  setText("devicePixelRatio", window.devicePixelRatio);

  if ("maxTouchPoints" in navigator && navigator.maxTouchPoints > 0) {
    setText("touchSupport", "Yes, " + navigator.maxTouchPoints + " touch point(s)");
  } else {
    setText("touchSupport", "No");
  }

  setText("localTime", new Date().toString());

  try {
    setText("timezone", Intl.DateTimeFormat().resolvedOptions().timeZone);
  } catch (error) {
    setText("timezone", "Unavailable");
  }

  setText("timezoneOffset", new Date().getTimezoneOffset() + " minutes from UTC");
  setText("cpuThreads", navigator.hardwareConcurrency || "Unavailable");
  setText("deviceMemory", "deviceMemory" in navigator ? navigator.deviceMemory + " GB approx." : "Unavailable");

  setText("localStorageSupport", storageAvailable("localStorage"));
  setText("sessionStorageSupport", storageAvailable("sessionStorage"));
  setText("indexedDBSupport", "indexedDB" in window ? "Supported" : "Not supported");
  setText("serviceWorkerSupport", "serviceWorker" in navigator ? "Supported" : "Not supported");
  setText("webglSupport", checkWebGL());
}

function collectPageInfo() {
  setText("pageUrl", window.location.href);
  setText("referrer", document.referrer || "No referrer");
  setText("pageTitle", document.title || "Unavailable");
}

async function collectIPInfo() {
  try {
    const response = await fetch("https://ipapi.co/json/");

    if (!response.ok) {
      throw new Error("IP lookup failed");
    }

    const data = await response.json();

    setText("ip", data.ip);
    setText("city", data.city);
    setText("region", data.region);
    setText("country", data.country_name);
    setText("postal", data.postal);
    setText("ipLatitude", data.latitude);
    setText("ipLongitude", data.longitude);
    setText("isp", data.org);
    setText("asn", data.asn);
    setText("currency", data.currency);
    setText("callingCode", data.country_calling_code);

    collectedInfo.ipApiRaw = data;
    updateRawInfo();
  } catch (error) {
    [
      "ip",
      "city",
      "region",
      "country",
      "postal",
      "ipLatitude",
      "ipLongitude",
      "isp",
      "asn",
      "currency",
      "callingCode"
    ].forEach(function(id) {
      setText(id, "Could not load");
    });
  }
}

function collectNetworkInfo() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  if (!connection) {
    setText("connectionType", "Unavailable");
    setText("effectiveConnection", "Unavailable");
    setText("downlink", "Unavailable");
    setText("rtt", "Unavailable");
    setText("saveData", "Unavailable");
    return;
  }

  setText("connectionType", connection.type || "Unavailable");
  setText("effectiveConnection", connection.effectiveType || "Unavailable");
  setText("downlink", connection.downlink !== undefined ? connection.downlink + " Mbps" : "Unavailable");
  setText("rtt", connection.rtt !== undefined ? connection.rtt + " ms" : "Unavailable");
  setText("saveData", connection.saveData !== undefined ? (connection.saveData ? "Yes" : "No") : "Unavailable");
}

async function collectBatteryInfo() {
  if (!navigator.getBattery) {
    setText("batteryLevel", "Unavailable");
    setText("batteryCharging", "Unavailable");
    return;
  }

  try {
    const battery = await navigator.getBattery();

    setText("batteryLevel", Math.round(battery.level * 100) + "%");
    setText("batteryCharging", battery.charging ? "Yes" : "No");
  } catch (error) {
    setText("batteryLevel", "Unavailable");
    setText("batteryCharging", "Unavailable");
  }
}

async function collectStorageEstimate() {
  if (!navigator.storage || !navigator.storage.estimate) {
    setText("storageQuota", "Unavailable");
    setText("storageUsed", "Unavailable");
    return;
  }

  try {
    const estimate = await navigator.storage.estimate();

    setText("storageQuota", formatBytes(estimate.quota));
    setText("storageUsed", formatBytes(estimate.usage));
  } catch (error) {
    setText("storageQuota", "Unavailable");
    setText("storageUsed", "Unavailable");
  }
}


/* =========================
   VPN / PROXY / IP RISK
========================= */

async function checkVpnAndIpRisk() {
  setText("vpnCheckStatus", "Checking...");

  try {
    const response = await fetch("https://api.ipapi.is/");

    if (!response.ok) {
      throw new Error("VPN lookup failed");
    }

    const data = await response.json();

    setText("isVpn", boolLabel(data.is_vpn));
    setText("isProxy", boolLabel(data.is_proxy));
    setText("isTor", boolLabel(data.is_tor));
    setText("isDatacenter", boolLabel(data.is_datacenter));
    setText("isMobile", boolLabel(data.is_mobile));
    setText("isSatellite", boolLabel(data.is_satellite));
    setText("isCrawler", boolLabel(data.is_crawler));
    setText("isAbuser", boolLabel(data.is_abuser));

    setText("vpnProvider", data.vpn ? data.vpn.service || "Unavailable" : "No VPN provider detected");
    setText("vpnType", data.vpn ? data.vpn.type || data.vpn.exit_node_region || "Unavailable" : "No VPN detected");
    setText("vpnLastSeen", data.vpn ? data.vpn.last_seen_str || "Unavailable" : "No VPN detected");

    setText("datacenterName", data.datacenter ? data.datacenter.datacenter || "Unavailable" : "No datacenter detected");
    setText("datacenterDomain", data.datacenter ? data.datacenter.domain || "Unavailable" : "No datacenter detected");
    setText("datacenterNetwork", data.datacenter ? data.datacenter.network || "Unavailable" : "No datacenter detected");

    setText("companyName", data.company ? data.company.name || "Unavailable" : "Unavailable");
    setText("companyDomain", data.company ? data.company.domain || "Unavailable" : "Unavailable");

    setText("asnOrg", data.asn ? data.asn.org || data.asn.descr || "Unavailable" : "Unavailable");
    setText("asnNumber", data.asn ? data.asn.asn || "Unavailable" : "Unavailable");
    setText("asnRoute", data.asn ? data.asn.route || "Unavailable" : "Unavailable");

    const flags = [];

    if (riskFlag(data.is_vpn)) flags.push("VPN");
    if (riskFlag(data.is_proxy)) flags.push("Proxy");
    if (riskFlag(data.is_tor)) flags.push("Tor");
    if (riskFlag(data.is_datacenter)) flags.push("Datacenter / hosting");
    if (riskFlag(data.is_abuser)) flags.push("Abusive IP");
    if (riskFlag(data.is_crawler)) flags.push("Crawler / bot");

    if (flags.length > 0) {
      setText("ipRiskSummary", "Detected flags: " + flags.join(", "));
    } else {
      setText("ipRiskSummary", "No VPN/proxy/Tor/datacenter flags detected. This does not prove the user is not using a VPN.");
    }

    collectedInfo.ipRiskRaw = data;
    updateRawInfo();

    setText("vpnCheckStatus", "Finished");
  } catch (error) {
    setText("vpnCheckStatus", "Could not check VPN/proxy status");
    setText("ipRiskSummary", "VPN/proxy check failed");
  }
}


/* =========================
   CONSENT
========================= */

function checkExtraConsent() {
  const checkbox = document.getElementById("extraConsentCheckbox");
  const allowed = !!(checkbox && checkbox.checked);

  setText("consentStatus", allowed ? "Granted" : "Not granted");

  return allowed;
}

function requireExtraConsent() {
  if (!checkExtraConsent()) {
    alert("Please tick the consent checkbox before running this test.");
    return false;
  }

  return true;
}


/* =========================
   GPS
========================= */

function getGPSLocation() {
  if (!requireExtraConsent()) return;

  if (!navigator.geolocation) {
    alert("Geolocation is not supported by this browser.");
    return;
  }

  setText("gpsLatitude", "Requesting permission...");
  setText("gpsLongitude", "Requesting permission...");
  setText("gpsAccuracy", "Requesting permission...");

  navigator.geolocation.getCurrentPosition(
    function(position) {
      setText("gpsLatitude", position.coords.latitude);
      setText("gpsLongitude", position.coords.longitude);
      setText("gpsAccuracy", position.coords.accuracy + " meters");
    },
    function(error) {
      let message = "Permission denied or unavailable";

      if (error.code === 1) message = "Permission denied";
      if (error.code === 2) message = "Position unavailable";
      if (error.code === 3) message = "Request timed out";

      setText("gpsLatitude", message);
      setText("gpsLongitude", message);
      setText("gpsAccuracy", message);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
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

function openExactGpsMap() {
  const lat = collectedInfo.gpsLatitude || collectedInfo.extraGpsLatitude;
  const lon = collectedInfo.gpsLongitude || collectedInfo.extraGpsLongitude;

  if (
    !lat ||
    !lon ||
    String(lat).includes("Permission") ||
    String(lon).includes("Permission") ||
    lat === "Unavailable" ||
    lon === "Unavailable" ||
    lat === "Not requested" ||
    lon === "Not requested"
  ) {
    setText("exactGpsMapStatus", "No exact GPS location available");
    alert("Request GPS permission first.");
    return;
  }

  const url =
    "https://www.openstreetmap.org/?mlat=" +
    encodeURIComponent(lat) +
    "&mlon=" +
    encodeURIComponent(lon) +
    "#map=16/" +
    encodeURIComponent(lat) +
    "/" +
    encodeURIComponent(lon);

  setText("exactGpsMapStatus", url);
  window.open(url, "_blank");
}

function openIpLocationMap() {
  const lat = collectedInfo.ipLatitude;
  const lon = collectedInfo.ipLongitude;

  if (!lat || !lon || lat === "Unavailable" || lat === "Could not load") {
    alert("IP location is unavailable.");
    return;
  }

  const url =
    "https://www.openstreetmap.org/?mlat=" +
    encodeURIComponent(lat) +
    "&mlon=" +
    encodeURIComponent(lon) +
    "#map=12/" +
    encodeURIComponent(lat) +
    "/" +
    encodeURIComponent(lon);

  setText("ipMapLink", url);
  window.open(url, "_blank");
}


/* =========================
   EXTRA PERMISSIONS
========================= */

async function requestAdditionalPermissions() {
  if (!requireExtraConsent()) return;

  setText("additionalPermissionStatus", "Requesting additional permissions...");

  await requestExtraGPS();
  await requestCameraAndMicrophone();
  await listMediaDevices();
  await requestNotifications();
  await requestClipboardRead();

  setText("additionalPermissionStatus", "Finished requesting available additional permissions.");
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

    activeCameraStream = stream;

    const video = document.getElementById("cameraPreview");

    if (video) {
      video.srcObject = stream;
      video.style.display = "block";
      await video.play().catch(function() {});
    }

    const videoTrack = stream.getVideoTracks()[0];
    const audioTrack = stream.getAudioTracks()[0];

    if (videoTrack) {
      const settings = videoTrack.getSettings ? videoTrack.getSettings() : {};

      setText("cameraStatus", "Allowed");
      setText("cameraLabel", videoTrack.label || "Camera detected");
      setText("cameraResolution", settings.width && settings.height ? settings.width + " × " + settings.height : "Unavailable");
      setText("cameraFps", settings.frameRate ? settings.frameRate + " FPS" : "Unavailable");
    }

    if (audioTrack) {
      setText("microphoneStatus", "Allowed");
      setText("microphoneLabel", audioTrack.label || "Microphone detected");
    }
  } catch (error) {
    setText("cameraStatus", "Permission denied or unavailable");
    setText("microphoneStatus", "Permission denied or unavailable");
  }
}

async function listMediaDevices() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    setText("mediaDevices", "Media device listing not supported");
    return;
  }

  try {
    const devices = await navigator.mediaDevices.enumerateDevices();

    const summary = devices.map(function(device, index) {
      return "#" + (index + 1) + " " + device.kind + " — " + (device.label || "label hidden until permission");
    }).join(" | ");

    setText("mediaDevices", summary || "No media devices found");
  } catch (error) {
    setText("mediaDevices", "Permission denied or unavailable");
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
    setText("clipboardPreview", "Unavailable");
    return;
  }

  try {
    const text = await navigator.clipboard.readText();

    if (text.length === 0) {
      setText("clipboardReadStatus", "Allowed — clipboard is empty");
      setText("clipboardPreview", "Clipboard is empty");
    } else {
      setText("clipboardReadStatus", "Allowed — clipboard text length: " + text.length + " characters");
      setText("clipboardPreview", text.slice(0, 200));
      collectedInfo.clipboardTextPreview = text.slice(0, 200);
      updateRawInfo();
    }
  } catch (error) {
    setText("clipboardReadStatus", "Permission denied or unavailable");
    setText("clipboardPreview", "Unavailable");
  }
}


/* =========================
   CAMERA FRAME CAPTURE
========================= */

async function startCameraDataCapture() {
  if (!requireExtraConsent()) return;

  const video = document.getElementById("cameraPreview");
  const canvas = document.getElementById("cameraCanvas");
  const output = document.getElementById("cameraDataString");

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    setText("cameraCaptureStatus", "Camera API not supported");
    return;
  }

  try {
    if (!activeCameraStream) {
      activeCameraStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });
    }

    video.srcObject = activeCameraStream;
    video.style.display = "block";

    await video.play();

    setText("cameraCaptureStatus", "Capturing one frame per second");

    if (cameraCaptureInterval) {
      clearInterval(cameraCaptureInterval);
    }

    cameraCaptureInterval = setInterval(function() {
      if (!video.videoWidth || !video.videoHeight) {
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataString = canvas.toDataURL("image/jpeg", 0.75);

      latestCameraFrameDataUrl = imageDataString;

      if (output) {
        output.value = imageDataString;
      }

      setText("lastFrameTime", new Date().toString());
      setText("lastFrameSize", imageDataString.length + " characters");

      collectedInfo.lastCameraFrameDataUrlLength = imageDataString.length;
      collectedInfo.lastCameraFrameDataUrlPreview = imageDataString.slice(0, 200) + "...";
      collectedInfo.lastCameraFrameCapturedAt = new Date().toISOString();

      updateRawInfo();
    }, 1000);
  } catch (error) {
    setText("cameraCaptureStatus", "Camera permission denied or unavailable");
  }
}

function stopCameraDataCapture() {
  if (cameraCaptureInterval) {
    clearInterval(cameraCaptureInterval);
    cameraCaptureInterval = null;
  }

  setText("cameraCaptureStatus", "Stopped");
}

function downloadLatestCameraFrame() {
  if (!latestCameraFrameDataUrl) {
    alert("No camera frame has been captured yet.");
    return;
  }

  const link = document.createElement("a");
  link.href = latestCameraFrameDataUrl;
  link.download = "camera-frame.jpg";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function takeCameraSnapshot() {
  const video = document.getElementById("cameraPreview");
  const canvas = document.getElementById("cameraCanvas");
  const gallery = document.getElementById("snapshotGallery");

  if (!video || !canvas || !gallery || !video.videoWidth || !video.videoHeight) {
    setText("snapshotStatus", "Camera is not active");
    return;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const url = canvas.toDataURL("image/jpeg", 0.85);

  const link = document.createElement("a");
  link.href = url;
  link.download = "camera-snapshot.jpg";

  const image = document.createElement("img");
  image.src = url;
  image.alt = "Camera snapshot";
  image.style.width = "150px";
  image.style.borderRadius = "8px";
  image.style.border = "1px solid #ccc";

  link.appendChild(image);
  gallery.prepend(link);

  setText("snapshotStatus", "Snapshot captured at " + new Date().toString());

  collectedInfo.latestSnapshotLength = url.length;
  collectedInfo.latestSnapshotPreview = url.slice(0, 200) + "...";

  updateRawInfo();
}

function clearCameraSnapshots() {
  const gallery = document.getElementById("snapshotGallery");

  if (gallery) {
    gallery.innerHTML = "";
  }

  setText("snapshotStatus", "Snapshots cleared");
}


/* =========================
   CAMERA ANALYSIS
========================= */

async function analyzeSingleCameraFrame() {
  if (!requireExtraConsent()) return;

  const video = document.getElementById("cameraPreview");
  const canvas = document.getElementById("cameraCanvas");

  if (!video || !canvas || !video.videoWidth || !video.videoHeight) {
    setText("cameraAnalysisStatus", "Camera is not active");
    return;
  }

  const width = video.videoWidth;
  const height = video.videoHeight;

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, width, height);

  const imageData = context.getImageData(0, 0, width, height).data;

  let totalBrightness = 0;
  let totalRed = 0;
  let totalGreen = 0;
  let totalBlue = 0;
  let count = 0;

  for (let i = 0; i < imageData.length; i += 64) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];

    totalRed += r;
    totalGreen += g;
    totalBlue += b;
    totalBrightness += (0.299 * r) + (0.587 * g) + (0.114 * b);
    count++;
  }

  const avgBrightness = Math.round(totalBrightness / count);
  const avgRed = Math.round(totalRed / count);
  const avgGreen = Math.round(totalGreen / count);
  const avgBlue = Math.round(totalBlue / count);

  const rgb = "rgb(" + avgRed + ", " + avgGreen + ", " + avgBlue + ")";
  const frameHash = await sha256Text(canvas.toDataURL("image/jpeg", 0.65));

  setText("cameraAnalysisStatus", "Analyzed at " + new Date().toString());
  setText("analysisFrameDimensions", width + " × " + height);
  setText("averageBrightness", avgBrightness + " / 255");
  setText("dominantColor", rgb);
  setText("frameHash", frameHash);

  const swatch = document.getElementById("dominantColorSwatch");

  if (swatch) {
    swatch.style.background = rgb;
  }

  collectedInfo.cameraAnalysis = {
    width: width,
    height: height,
    averageBrightness: avgBrightness,
    dominantColor: rgb,
    frameHash: frameHash,
    analyzedAt: new Date().toISOString()
  };

  updateRawInfo();
}

function startCameraAnalysis() {
  if (!requireExtraConsent()) return;

  if (cameraAnalysisInterval) {
    clearInterval(cameraAnalysisInterval);
  }

  setText("cameraAnalysisStatus", "Running every second");

  analyzeSingleCameraFrame();

  cameraAnalysisInterval = setInterval(analyzeSingleCameraFrame, 1000);
}

function stopCameraAnalysis() {
  if (cameraAnalysisInterval) {
    clearInterval(cameraAnalysisInterval);
    cameraAnalysisInterval = null;
  }

  setText("cameraAnalysisStatus", "Stopped");
}

async function detectBarcodeFromCamera() {
  if (!requireExtraConsent()) return;

  if (!("BarcodeDetector" in window)) {
    setText("barcodeDetectionStatus", "BarcodeDetector API not supported");
    setText("detectedBarcodes", "Unavailable");
    return;
  }

  const video = document.getElementById("cameraPreview");
  const canvas = document.getElementById("cameraCanvas");

  if (!video || !canvas || !video.videoWidth || !video.videoHeight) {
    setText("barcodeDetectionStatus", "Camera is not active");
    setText("detectedBarcodes", "None");
    return;
  }

  try {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const detector = new BarcodeDetector({
      formats: [
        "qr_code",
        "ean_13",
        "ean_8",
        "code_128",
        "code_39",
        "upc_a",
        "upc_e",
        "data_matrix",
        "pdf417"
      ]
    });

    const codes = await detector.detect(canvas);

    const summary = codes.map(function(code, index) {
      return "#" + (index + 1) + " " + code.format + ": " + code.rawValue;
    }).join(" | ");

    setText("barcodeDetectionStatus", "Detected " + codes.length + " code(s)");
    setText("detectedBarcodes", summary || "No codes detected");

    collectedInfo.detectedBarcodes = codes.map(function(code) {
      return {
        format: code.format,
        rawValue: code.rawValue
      };
    });

    updateRawInfo();
  } catch (error) {
    setText("barcodeDetectionStatus", "Could not detect barcode");
  }
}

function collectCameraCapabilities() {
  const video = document.getElementById("cameraPreview");
  const output = document.getElementById("cameraCapabilitiesOutput");

  if (!output) return;

  if (!video || !video.srcObject) {
    output.textContent = "Camera stream is not active.";
    return;
  }

  const track = video.srcObject.getVideoTracks()[0];

  if (!track) {
    output.textContent = "No video track found.";
    return;
  }

  const result = {
    label: track.label || "Unavailable",
    kind: track.kind,
    readyState: track.readyState,
    enabled: track.enabled,
    muted: track.muted,
    settings: track.getSettings ? track.getSettings() : "Unavailable",
    capabilities: track.getCapabilities ? track.getCapabilities() : "Unavailable",
    constraints: track.getConstraints ? track.getConstraints() : "Unavailable"
  };

  output.textContent = JSON.stringify(result, null, 2);
  collectedInfo.cameraCapabilities = result;
  updateRawInfo();
}


/* =========================
   MICROPHONE METER
========================= */

async function startMicrophoneMeter() {
  if (!requireExtraConsent()) return;

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    setText("micMeterStatus", "Microphone API not supported");
    return;
  }

  try {
    micMeterStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });

    micAudioContext = new (window.AudioContext || window.webkitAudioContext)();

    const source = micAudioContext.createMediaStreamSource(micMeterStream);

    micAnalyser = micAudioContext.createAnalyser();
    micAnalyser.fftSize = 256;

    source.connect(micAnalyser);

    const dataArray = new Uint8Array(micAnalyser.frequencyBinCount);

    function updateMeter() {
      if (!micAnalyser) return;

      micAnalyser.getByteFrequencyData(dataArray);

      const total = dataArray.reduce(function(a, b) {
        return a + b;
      }, 0);

      const average = total / dataArray.length;
      const percentage = Math.min(100, Math.round((average / 255) * 100));

      setText("micVolume", percentage + "%");

      const bar = document.getElementById("micVolumeBar");

      if (bar) {
        bar.style.width = percentage + "%";
      }

      collectedInfo.microphoneVolumePercent = percentage;
      updateRawInfo();

      micAnimationFrame = requestAnimationFrame(updateMeter);
    }

    setText("micMeterStatus", "Running");
    updateMeter();
  } catch (error) {
    setText("micMeterStatus", "Microphone permission denied or unavailable");
  }
}

function stopMicrophoneMeter() {
  if (micAnimationFrame) {
    cancelAnimationFrame(micAnimationFrame);
    micAnimationFrame = null;
  }

  if (micMeterStream) {
    micMeterStream.getTracks().forEach(function(track) {
      track.stop();
    });

    micMeterStream = null;
  }

  if (micAudioContext) {
    micAudioContext.close();
    micAudioContext = null;
  }

  micAnalyser = null;

  const bar = document.getElementById("micVolumeBar");

  if (bar) {
    bar.style.width = "0%";
  }

  setText("micVolume", "Stopped");
  setText("micMeterStatus", "Stopped");
}


/* =========================
   UI TOOLS
========================= */

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function togglePrivacyMode() {
  privacyModeEnabled = !privacyModeEnabled;

  const sensitiveIds = [
    "ip",
    "city",
    "region",
    "country",
    "postal",
    "ipLatitude",
    "ipLongitude",
    "isp",
    "asn",
    "gpsLatitude",
    "gpsLongitude",
    "extraGpsLatitude",
    "extraGpsLongitude",
    "clipboardPreview",
    "cameraDataString",
    "rawInfo"
  ];

  sensitiveIds.forEach(function(id) {
    const element = document.getElementById(id);

    if (element) {
      element.classList.toggle("hidden-sensitive", privacyModeEnabled);
    }
  });

  setText("privacyModeStatus", privacyModeEnabled ? "On" : "Off");
}

function generatePageQRCode() {
  const box = document.getElementById("qrBox");

  if (!box) return;

  const url =
    "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=" +
    encodeURIComponent(window.location.href);

  box.innerHTML =
    '<img src="' +
    url +
    '" alt="QR code" width="180" height="180"><p class="small">QR code for this page URL.</p>';

  collectedInfo.pageQrCodeGenerated = "Yes";
  updateRawInfo();
}


/* =========================
   PERMISSIONS
========================= */

async function queryPermission(permissionName, outputId) {
  if (!navigator.permissions || !navigator.permissions.query) {
    setText(outputId, "Permissions API not supported");
    return;
  }

  try {
    const result = await navigator.permissions.query({
      name: permissionName
    });

    setText(outputId, result.state);
  } catch (error) {
    setText(outputId, "Not supported or unavailable");
  }
}

async function checkPermissions() {
  await queryPermission("geolocation", "geoPermission");
  await queryPermission("camera", "cameraPermission");
  await queryPermission("microphone", "microphonePermission");
  await queryPermission("notifications", "notificationsPermission");
  await queryPermission("clipboard-read", "clipboardPermission");
}

async function runFullPermissionAudit() {
  const names = [
    "geolocation",
    "camera",
    "microphone",
    "notifications",
    "clipboard-read",
    "clipboard-write",
    "persistent-storage",
    "midi",
    "background-sync"
  ];

  const results = {};
  const output = document.getElementById("permissionAuditOutput");

  if (!navigator.permissions || !navigator.permissions.query) {
    if (output) output.textContent = "Permissions API not supported.";
    return;
  }

  for (const name of names) {
    try {
      const result = await navigator.permissions.query({
        name: name
      });

      results[name] = result.state;
    } catch (error) {
      results[name] = "not supported or unavailable";
    }
  }

  if (output) {
    output.textContent = JSON.stringify(results, null, 2);
  }

  collectedInfo.permissionAudit = results;
  updateRawInfo();
}

async function saveCurrentPermissionSnapshot() {
  const names = [
    "geolocation",
    "camera",
    "microphone",
    "notifications",
    "clipboard-read",
    "clipboard-write",
    "persistent-storage"
  ];

  const snapshot = {
    time: new Date().toISOString(),
    permissions: {}
  };

  if (!navigator.permissions || !navigator.permissions.query) {
    snapshot.error = "Permissions API unavailable";
  } else {
    for (const name of names) {
      try {
        const result = await navigator.permissions.query({
          name: name
        });

        snapshot.permissions[name] = result.state;
      } catch (error) {
        snapshot.permissions[name] = "unsupported";
      }
    }
  }

  permissionHistory.push(snapshot);

  const output = document.getElementById("permissionHistoryOutput");

  if (output) {
    output.textContent = JSON.stringify(permissionHistory, null, 2);
  }

  collectedInfo.permissionHistory = permissionHistory;
  updateRawInfo();
}

function clearPermissionHistory() {
  permissionHistory = [];

  const output = document.getElementById("permissionHistoryOutput");

  if (output) {
    output.textContent = "No permission history yet";
  }

  delete collectedInfo.permissionHistory;
  updateRawInfo();
}


/* =========================
   FINGERPRINTING
========================= */

async function generateFingerprint() {
  const data = [
    navigator.userAgent,
    navigator.platform,
    navigator.language,
    Array.isArray(navigator.languages) ? navigator.languages.join(",") : "",
    screen.width,
    screen.height,
    screen.colorDepth,
    screen.pixelDepth,
    window.devicePixelRatio,
    navigator.hardwareConcurrency || "",
    navigator.deviceMemory || "",
    Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    navigator.cookieEnabled ? "cookies-on" : "cookies-off",
    checkWebGL()
  ].join("|");

  const hash = await sha256Text(data);

  setText("fingerprintHash", hash);
}

async function runAdvancedFingerprintTests() {
  await generateCanvasFingerprint();
  collectAdvancedWebGLInfo();
  collectAudioContextInfo();
  detectCommonFonts();
}

async function generateCanvasFingerprint() {
  try {
    const canvas = document.createElement("canvas");

    canvas.width = 400;
    canvas.height = 120;

    const context = canvas.getContext("2d");

    context.textBaseline = "top";
    context.font = "18px Arial";
    context.fillStyle = "#f60";
    context.fillRect(10, 10, 120, 80);

    context.fillStyle = "#069";
    context.fillText("Canvas fingerprint test 12345", 20, 30);

    context.fillStyle = "rgba(102,204,0,.7)";
    context.font = "20px Times New Roman";
    context.fillText("burning-calamity.github.io", 20, 65);

    context.strokeStyle = "#333";
    context.arc(300, 60, 40, 0, Math.PI * 2);
    context.stroke();

    const dataUrl = canvas.toDataURL();
    const hash = await sha256Text(dataUrl);

    setText("canvasFingerprintHash", hash);

    collectedInfo.canvasFingerprintDataLength = dataUrl.length;
    collectedInfo.canvasFingerprintHash = hash;

    updateRawInfo();
  } catch (error) {
    setText("canvasFingerprintHash", "Could not generate canvas fingerprint");
  }
}

function collectAdvancedWebGLInfo() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) {
      setText("webglVendor", "WebGL unavailable");
      setText("webglRenderer", "WebGL unavailable");
      setText("webglVersion", "WebGL unavailable");
      setText("webglMaxTextureSize", "WebGL unavailable");
      return;
    }

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");

    setText("webglVendor", debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR));
    setText("webglRenderer", debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
    setText("webglVersion", gl.getParameter(gl.VERSION));
    setText("webglMaxTextureSize", gl.getParameter(gl.MAX_TEXTURE_SIZE));
  } catch (error) {
    setText("webglVendor", "Unavailable");
    setText("webglRenderer", "Unavailable");
    setText("webglVersion", "Unavailable");
    setText("webglMaxTextureSize", "Unavailable");
  }
}

function collectAudioContextInfo() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      setText("audioSampleRate", "AudioContext unavailable");
      setText("audioBaseLatency", "AudioContext unavailable");
      return;
    }

    const audioContext = new AudioContextClass();

    setText("audioSampleRate", audioContext.sampleRate + " Hz");
    setText("audioBaseLatency", "baseLatency" in audioContext ? audioContext.baseLatency + " seconds" : "Unavailable");

    audioContext.close();
  } catch (error) {
    setText("audioSampleRate", "Unavailable");
    setText("audioBaseLatency", "Unavailable");
  }
}

function detectCommonFonts() {
  const fonts = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Courier New",
    "Georgia",
    "Trebuchet MS",
    "Comic Sans MS",
    "Impact",
    "Segoe UI",
    "Roboto",
    "San Francisco",
    "Helvetica Neue",
    "Monaco",
    "Consolas",
    "Ubuntu",
    "Noto Sans",
    "DejaVu Sans"
  ];

  const baseFonts = ["monospace", "sans-serif", "serif"];
  const testString = "mmmmmmmmmmlli";
  const testSize = "72px";

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  function getWidth(font) {
    context.font = testSize + " " + font;
    return context.measureText(testString).width;
  }

  const baseWidths = {};

  baseFonts.forEach(function(baseFont) {
    baseWidths[baseFont] = getWidth(baseFont);
  });

  const detected = [];

  fonts.forEach(function(font) {
    let found = false;

    baseFonts.forEach(function(baseFont) {
      if (getWidth("'" + font + "'," + baseFont) !== baseWidths[baseFont]) {
        found = true;
      }
    });

    if (found) {
      detected.push(font);
    }
  });

  setText("fontDetectionResult", detected.join(", ") || "No tested fonts detected");

  collectedInfo.detectedFontsEstimate = detected;
  updateRawInfo();
}

async function testCanvasNoise() {
  try {
    const hashes = [];

    for (let i = 0; i < 3; i++) {
      const canvas = document.createElement("canvas");

      canvas.width = 300;
      canvas.height = 100;

      const context = canvas.getContext("2d");

      context.fillStyle = "#f4f4f4";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "#222";
      context.font = "18px Arial";
      context.fillText("Canvas noise test " + Math.PI, 20, 30);

      context.fillStyle = "rgba(255,0,0,.5)";
      context.arc(180, 50, 30, 0, Math.PI * 2);
      context.fill();

      hashes.push(await sha256Text(canvas.toDataURL()));
    }

    const unique = Array.from(new Set(hashes));

    setText("canvasNoiseStatus", unique.length === 1 ? "No changing canvas noise detected" : "Possible canvas randomization/noise detected");

    collectedInfo.canvasNoiseTest = {
      hashes: hashes,
      uniqueHashCount: unique.length
    };

    updateRawInfo();
  } catch (error) {
    setText("canvasNoiseStatus", "Could not run canvas noise test");
  }
}


/* =========================
   PRIVACY ANALYSIS
========================= */

function runPrivacyAnalysis() {
  const findings = [];
  let score = 100;

  const ip = String(collectedInfo.ip || "");
  const city = String(collectedInfo.city || "");
  const country = String(collectedInfo.country || "");
  const timezone = String(collectedInfo.timezone || "");
  const ua = navigator.userAgent || "";

  if (ip && ip !== "Unavailable" && ip !== "Could not load") {
    score -= 15;
    findings.push("Public IP is visible.");
  }

  if (city && city !== "Unavailable" && city !== "Could not load") {
    score -= 10;
    findings.push("Approximate city is visible from IP.");
  }

  if (timezone && timezone !== "Unavailable") {
    score -= 5;
    findings.push("Timezone is visible.");
  }

  if (navigator.hardwareConcurrency) {
    score -= 5;
    findings.push("CPU thread count is visible.");
  }

  if ("deviceMemory" in navigator) {
    score -= 5;
    findings.push("Approximate device memory is visible.");
  }

  if (screen.width && screen.height) {
    score -= 5;
    findings.push("Screen size is visible.");
  }

  if (navigator.languages && navigator.languages.length > 1) {
    score -= 5;
    findings.push("Multiple browser languages are visible.");
  }

  if (navigator.webdriver) {
    score -= 25;
    findings.push("navigator.webdriver is true.");
  }

  const headlessHints = [];

  if (navigator.webdriver) headlessHints.push("webdriver=true");
  if (/HeadlessChrome/i.test(ua)) headlessHints.push("HeadlessChrome in user agent");
  if (!navigator.plugins || navigator.plugins.length === 0) headlessHints.push("no plugins exposed");

  setText("headlessStatus", headlessHints.length ? headlessHints.join(", ") : "No obvious headless indicators");
  setText("fingerprintRisk", "High — many browser signals are visible");
  setText("timezoneIpMismatch", checkTimezoneIpMismatch(country, timezone));

  score = Math.max(0, Math.min(100, score));

  setText("privacyScore", score + "/100");
  setText("privacyAnalysisSummary", findings.join(" ") || "Few browser signals detected.");

  collectedInfo.privacyScore = score;
  collectedInfo.privacyFindings = findings;
  collectedInfo.headlessHints = headlessHints;

  updateRawInfo();
  detectAdBlocker();
}

function checkTimezoneIpMismatch(country, timezone) {
  if (!country || !timezone || country === "Unavailable" || country === "Could not load") {
    return "Unavailable";
  }

  const countryLower = country.toLowerCase();
  const timezoneLower = timezone.toLowerCase();

  const map = [
    {
      country: "italy",
      zones: ["rome", "europe"]
    },
    {
      country: "united states",
      zones: ["america"]
    },
    {
      country: "canada",
      zones: ["america"]
    },
    {
      country: "united kingdom",
      zones: ["london", "europe"]
    },
    {
      country: "france",
      zones: ["paris", "europe"]
    },
    {
      country: "germany",
      zones: ["berlin", "europe"]
    },
    {
      country: "spain",
      zones: ["madrid", "europe"]
    },
    {
      country: "japan",
      zones: ["tokyo", "asia"]
    },
    {
      country: "china",
      zones: ["shanghai", "asia"]
    },
    {
      country: "australia",
      zones: ["australia"]
    },
    {
      country: "india",
      zones: ["kolkata", "asia"]
    }
  ];

  const match = map.find(function(item) {
    return countryLower.includes(item.country);
  });

  if (!match) {
    return "No rough comparison rule for this country";
  }

  const zoneMatches = match.zones.some(function(zone) {
    return timezoneLower.includes(zone);
  });

  if (zoneMatches) {
    return "Looks consistent";
  }

  return "Possible mismatch: IP country is " + country + ", browser timezone is " + timezone;
}

function detectAdBlocker() {
  const bait = document.createElement("div");

  bait.className = "adsbox ad-banner advertisement adsbygoogle";
  bait.style.cssText = "position:absolute;left:-9999px;width:1px;height:1px";

  document.body.appendChild(bait);

  setTimeout(function() {
    const blocked =
      bait.offsetHeight === 0 ||
      bait.offsetWidth === 0 ||
      getComputedStyle(bait).display === "none" ||
      getComputedStyle(bait).visibility === "hidden";

    setText("adBlockStatus", blocked ? "Likely enabled" : "Not detected");

    bait.remove();
  }, 100);
}


/* =========================
   WEBRTC / NETWORK
========================= */

async function runWebRtcLeakTest() {
  setText("webRtcStatus", "Running...");

  const RTCPeerConnectionClass =
    window.RTCPeerConnection ||
    window.webkitRTCPeerConnection ||
    window.mozRTCPeerConnection;

  if (!RTCPeerConnectionClass) {
    setText("webRtcStatus", "WebRTC not supported");
    setText("webRtcCandidates", "Unavailable");
    return;
  }

  const candidates = [];

  try {
    const pc = new RTCPeerConnectionClass({
      iceServers: []
    });

    pc.createDataChannel("test");

    pc.onicecandidate = function(event) {
      if (event && event.candidate && event.candidate.candidate) {
        candidates.push(event.candidate.candidate);
      }
    };

    const offer = await pc.createOffer();

    await pc.setLocalDescription(offer);

    await new Promise(function(resolve) {
      setTimeout(resolve, 1500);
    });

    pc.close();

    const unique = Array.from(new Set(candidates));

    setText("webRtcStatus", unique.length ? "Finished" : "No candidates exposed");
    setText("webRtcCandidates", unique.join(" | ") || "None");

    collectedInfo.webRtcCandidates = unique;
    updateRawInfo();
  } catch (error) {
    setText("webRtcStatus", "Could not run WebRTC test");
    setText("webRtcCandidates", "Unavailable");
  }
}

async function runNetworkDiagnostics() {
  setText("httpsStatus", location.protocol === "https:" ? "Yes" : "No");
  setText("originStatus", location.origin);
  setText("protocolStatus", location.protocol);
  setText("hostStatus", location.host);
  setText("pathStatus", location.pathname);

  await testSiteLatency();
  await testExternalConnectivity();
}

async function testSiteLatency() {
  try {
    const start = performance.now();

    await fetch(location.href, {
      method: "HEAD",
      cache: "no-store"
    });

    setText("siteLatencyStatus", Math.round(performance.now() - start) + " ms");
  } catch (error) {
    setText("siteLatencyStatus", "Could not test");
  }
}

async function testExternalConnectivity() {
  try {
    const start = performance.now();

    await fetch("https://api.ipify.org?format=json", {
      cache: "no-store"
    });

    setText("externalConnectivityStatus", "Online — " + Math.round(performance.now() - start) + " ms");
  } catch (error) {
    setText("externalConnectivityStatus", "External request blocked or unavailable");
  }
}

async function runSpeedEstimate() {
  setText("speedTestStatus", "Running...");

  try {
    const url =
      "https://raw.githubusercontent.com/github/explore/main/topics/javascript/javascript.png?cacheBust=" +
      Date.now();

    const start = performance.now();

    const response = await fetch(url, {
      cache: "no-store"
    });

    const blob = await response.blob();
    const seconds = (performance.now() - start) / 1000;
    const mbps = (blob.size * 8) / seconds / 1000000;

    setText("speedTestStatus", "Finished");
    setText("downloadSpeedEstimate", mbps.toFixed(2) + " Mbps from small test file");

    collectedInfo.speedTestMbps = mbps.toFixed(2);
    updateRawInfo();
  } catch (error) {
    setText("speedTestStatus", "Could not run speed test");
  }
}

async function checkSameOriginHeaders() {
  const output = document.getElementById("sameOriginHeadersOutput");

  if (!output) return;

  try {
    const response = await fetch(location.href, {
      cache: "no-store"
    });

    const headers = {};

    response.headers.forEach(function(value, key) {
      headers[key] = value;
    });

    const result = {
      url: location.href,
      status: response.status,
      statusText: response.statusText,
      headers: headers
    };

    output.textContent = JSON.stringify(result, null, 2);

    collectedInfo.sameOriginHeaders = result;
    updateRawInfo();
  } catch (error) {
    output.textContent = "Could not fetch same-origin headers.";
  }
}


/* =========================
   BENCHMARKS
========================= */

function runCpuBenchmark() {
  setText("cpuBenchmarkStatus", "Running...");

  setTimeout(function() {
    const start = performance.now();
    let result = 0;

    for (let i = 0; i < 8000000; i++) {
      result += Math.sqrt(i) * Math.sin(i);
    }

    const elapsed = performance.now() - start;
    const score = Math.round(1000000 / elapsed);

    setText("cpuBenchmarkStatus", "Finished");
    setText("cpuBenchmarkTime", elapsed.toFixed(2) + " ms");
    setText("cpuBenchmarkScore", score);

    collectedInfo.cpuBenchmarkResult = result;
    updateRawInfo();
  }, 50);
}

function runWorkerBenchmark() {
  if (!window.Worker) {
    setText("workerBenchmarkStatus", "Web Workers not supported");
    return;
  }

  setText("workerBenchmarkStatus", "Running...");

  const code = `
    self.onmessage = function() {
      const start = performance.now();
      let result = 0;

      for (let i = 0; i < 12000000; i++) {
        result += Math.sqrt(i) * Math.cos(i);
      }

      self.postMessage({
        elapsed: performance.now() - start,
        result: result
      });
    };
  `;

  const blob = new Blob([code], {
    type: "application/javascript"
  });

  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);

  worker.onmessage = function(event) {
    setText("workerBenchmarkStatus", "Finished");
    setText("workerBenchmarkTime", event.data.elapsed.toFixed(2) + " ms");
    setText("workerBenchmarkResult", String(event.data.result).slice(0, 20));

    worker.terminate();
    URL.revokeObjectURL(url);
  };

  worker.onerror = function() {
    setText("workerBenchmarkStatus", "Worker benchmark failed");

    worker.terminate();
    URL.revokeObjectURL(url);
  };

  worker.postMessage("start");
}


/* =========================
   STORAGE / COOKIES / INDEXEDDB
========================= */

function runStorageStressTest() {
  const key = "__storage_stress_test__";
  let data = "x";
  let lastSuccessfulSize = 0;

  try {
    localStorage.removeItem(key);

    for (let i = 0; i < 24; i++) {
      data += data;
      localStorage.setItem(key, data);
      lastSuccessfulSize = data.length;
    }

    localStorage.removeItem(key);

    setText("localStorageWriteTest", "Passed");
    setText("localStorageLimitEstimate", formatBytes(lastSuccessfulSize));
  } catch (error) {
    try {
      localStorage.removeItem(key);
    } catch (cleanupError) {}

    setText("localStorageWriteTest", "Stopped at browser quota");
    setText("localStorageLimitEstimate", formatBytes(lastSuccessfulSize));
  }
}

function runCookieDiagnostics() {
  try {
    const name = "__visitor_info_cookie_test__";
    const value = String(Date.now());

    document.cookie = name + "=" + value + "; path=/; SameSite=Lax";

    const ok = document.cookie.includes(name + "=" + value);

    setText("cookieWriteStatus", ok ? "Passed" : "Failed or blocked");
    setText("visibleCookiesStatus", document.cookie || "No JavaScript-visible cookies");

    document.cookie = name + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
  } catch (error) {
    setText("cookieWriteStatus", "Unavailable");
    setText("visibleCookiesStatus", "Unavailable");
  }
}

function runIndexedDbDiagnostics() {
  if (!("indexedDB" in window)) {
    setText("indexedDbWriteStatus", "IndexedDB not supported");
    setText("indexedDbReadStatus", "IndexedDB not supported");
    setText("indexedDbDeleteStatus", "IndexedDB not supported");
    return;
  }

  const dbName = "__visitor_info_test_db__";
  const storeName = "test_store";
  const key = "test_key";
  const value = {
    message: "IndexedDB test",
    time: new Date().toISOString()
  };

  const request = indexedDB.open(dbName, 1);

  request.onupgradeneeded = function(event) {
    const db = event.target.result;

    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName);
    }
  };

  request.onerror = function() {
    setText("indexedDbWriteStatus", "Open failed");
    setText("indexedDbReadStatus", "Unavailable");
    setText("indexedDbDeleteStatus", "Unavailable");
  };

  request.onsuccess = function(event) {
    const db = event.target.result;
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);

    const writeRequest = store.put(value, key);

    writeRequest.onsuccess = function() {
      setText("indexedDbWriteStatus", "Passed");

      const readRequest = store.get(key);

      readRequest.onsuccess = function() {
        setText("indexedDbReadStatus", readRequest.result && readRequest.result.message === value.message ? "Passed" : "Failed");

        const deleteRequest = store.delete(key);

        deleteRequest.onsuccess = function() {
          setText("indexedDbDeleteStatus", "Passed");
          db.close();
          indexedDB.deleteDatabase(dbName);
        };

        deleteRequest.onerror = function() {
          setText("indexedDbDeleteStatus", "Failed");
          db.close();
        };
      };

      readRequest.onerror = function() {
        setText("indexedDbReadStatus", "Failed");
        setText("indexedDbDeleteStatus", "Skipped");
        db.close();
      };
    };

    writeRequest.onerror = function() {
      setText("indexedDbWriteStatus", "Failed");
      setText("indexedDbReadStatus", "Skipped");
      setText("indexedDbDeleteStatus", "Skipped");
      db.close();
    };
  };
}


/* =========================
   INPUT / MOTION / BATTERY
========================= */

function startKeyboardMouseTest() {
  if (inputTestRunning) {
    setText("inputTestStatus", "Already running");
    return;
  }

  inputTestRunning = true;

  document.addEventListener("keydown", handleKeyTest);
  document.addEventListener("mousemove", handleMouseMoveTest);
  document.addEventListener("click", handleClickTest);

  setText("inputTestStatus", "Running");
}

function stopKeyboardMouseTest() {
  inputTestRunning = false;

  document.removeEventListener("keydown", handleKeyTest);
  document.removeEventListener("mousemove", handleMouseMoveTest);
  document.removeEventListener("click", handleClickTest);

  setText("inputTestStatus", "Stopped");
}

function handleKeyTest(event) {
  setText(
    "lastKeyPressed",
    "key=" +
      event.key +
      ", code=" +
      event.code +
      ", ctrl=" +
      event.ctrlKey +
      ", shift=" +
      event.shiftKey +
      ", alt=" +
      event.altKey
  );
}

function handleMouseMoveTest(event) {
  setText("lastMousePosition", "x=" + event.clientX + ", y=" + event.clientY);
}

function handleClickTest(event) {
  setText("lastClickPosition", "x=" + event.clientX + ", y=" + event.clientY);
}

async function startMotionAndOrientation() {
  if (!requireExtraConsent()) return;

  try {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      const permission = await DeviceOrientationEvent.requestPermission();

      if (permission !== "granted") {
        setText("motionStatus", "Orientation permission denied");
        return;
      }
    }

    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      const permission = await DeviceMotionEvent.requestPermission();

      if (permission !== "granted") {
        setText("motionStatus", "Motion permission denied");
        return;
      }
    }

    motionEnabled = true;

    window.addEventListener("deviceorientation", handleDeviceOrientation);
    window.addEventListener("devicemotion", handleDeviceMotion);

    setText("motionStatus", "Running");
  } catch (error) {
    setText("motionStatus", "Motion or orientation unavailable");
  }
}

function stopMotionAndOrientation() {
  motionEnabled = false;

  window.removeEventListener("deviceorientation", handleDeviceOrientation);
  window.removeEventListener("devicemotion", handleDeviceMotion);

  setText("motionStatus", "Stopped");
}

function handleDeviceOrientation(event) {
  if (!motionEnabled) return;

  setText("orientationAlpha", roundNumber(event.alpha, 2));
  setText("orientationBeta", roundNumber(event.beta, 2));
  setText("orientationGamma", roundNumber(event.gamma, 2));
}

function handleDeviceMotion(event) {
  if (!motionEnabled || !event.acceleration) return;

  setText("accelerationX", roundNumber(event.acceleration.x, 3));
  setText("accelerationY", roundNumber(event.acceleration.y, 3));
  setText("accelerationZ", roundNumber(event.acceleration.z, 3));
}

async function startBatteryWatcher() {
  if (!navigator.getBattery) {
    setText("batteryWatcherStatus", "Battery API not supported");
    return;
  }

  try {
    watchedBattery = await navigator.getBattery();

    updateBatteryWatcherValues();

    [
      "chargingchange",
      "levelchange",
      "chargingtimechange",
      "dischargingtimechange"
    ].forEach(function(eventName) {
      watchedBattery.addEventListener(eventName, updateBatteryWatcherValues);
    });

    setText("batteryWatcherStatus", "Running");
  } catch (error) {
    setText("batteryWatcherStatus", "Unavailable");
  }
}

function updateBatteryWatcherValues() {
  if (!watchedBattery) return;

  setText("batteryLevel", Math.round(watchedBattery.level * 100) + "%");
  setText("batteryCharging", watchedBattery.charging ? "Yes" : "No");
  setText("batteryChargingTime", watchedBattery.chargingTime === Infinity ? "Infinity / unavailable" : watchedBattery.chargingTime + " seconds");
  setText("batteryDischargingTime", watchedBattery.dischargingTime === Infinity ? "Infinity / unavailable" : watchedBattery.dischargingTime + " seconds");
}


/* =========================
   PAGE CONTROLS
========================= */

function enterFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
      .then(function() {
        setText("fullscreenStatus", "Active");
      })
      .catch(function() {
        setText("fullscreenStatus", "Could not enter fullscreen");
      });
  } else {
    document.exitFullscreen()
      .then(function() {
        setText("fullscreenStatus", "Not active");
      })
      .catch(function() {
        setText("fullscreenStatus", "Could not exit fullscreen");
      });
  }
}

async function toggleWakeLock() {
  if (!("wakeLock" in navigator)) {
    setText("wakeLockStatus", "Wake Lock API not supported");
    return;
  }

  try {
    if (wakeLockObject) {
      await wakeLockObject.release();
      wakeLockObject = null;
      setText("wakeLockStatus", "Released");
      return;
    }

    wakeLockObject = await navigator.wakeLock.request("screen");

    wakeLockObject.addEventListener("release", function() {
      setText("wakeLockStatus", "Released");
      wakeLockObject = null;
    });

    setText("wakeLockStatus", "Active");
  } catch (error) {
    setText("wakeLockStatus", "Could not activate wake lock");
  }
}

function testVibration() {
  if (!("vibrate" in navigator)) {
    setText("vibrationStatus", "Vibration API not supported");
    return;
  }

  setText("vibrationStatus", navigator.vibrate([100, 50, 100]) ? "Vibration triggered" : "Vibration unavailable");
}

function collectPerformanceInfo() {
  try {
    const entries = performance.getEntriesByType("navigation");

    if (entries && entries.length > 0) {
      const navigation = entries[0];
      const loadTime = navigation.loadEventEnd - navigation.startTime;

      setText("pageLoadTime", loadTime > 0 ? loadTime.toFixed(2) + " ms" : "Still loading or unavailable");
    }
  } catch (error) {
    setText("pageLoadTime", "Unavailable");
  }

  setText("domNodes", document.getElementsByTagName("*").length);

  if (performance.memory) {
    setText("jsHeapUsed", formatBytes(performance.memory.usedJSHeapSize));
    setText("jsHeapLimit", formatBytes(performance.memory.jsHeapSizeLimit));
  } else {
    setText("jsHeapUsed", "Unavailable");
    setText("jsHeapLimit", "Unavailable");
  }
}

function startAutoStopTimer() {
  cancelAutoStopTimer();

  autoStopRemaining = 30;

  setText("autoStopStatus", "Auto-stop in 30 seconds");

  autoStopCountdown = setInterval(function() {
    autoStopRemaining--;

    setText("autoStopStatus", "Auto-stop in " + autoStopRemaining + " seconds");

    if (autoStopRemaining <= 0) {
      cancelAutoStopTimer();
      stopAllSensorsAndStreams();
      setText("autoStopStatus", "Camera/microphone/sensors stopped");
    }
  }, 1000);
}

function cancelAutoStopTimer() {
  if (autoStopCountdown) {
    clearInterval(autoStopCountdown);
    autoStopCountdown = null;
  }

  setText("autoStopStatus", "Not active");
}


/* =========================
   SESSION / IDLE / NETWORK WATCHERS
========================= */

function startSessionTimer() {
  if (sessionTimerInterval) {
    setText("sessionTimerStatus", "Already running");
    return;
  }

  sessionStartTime = Date.now();

  sessionTimerInterval = setInterval(function() {
    const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

    setText("timeOnPage", minutes + " minute(s), " + seconds + " second(s)");
  }, 1000);

  setText("sessionTimerStatus", "Running");
}

function stopSessionTimer() {
  if (sessionTimerInterval) {
    clearInterval(sessionTimerInterval);
    sessionTimerInterval = null;
  }

  setText("sessionTimerStatus", "Stopped");
}

function startNetworkWatcher() {
  if (networkWatcherRunning) {
    setText("networkWatcherStatus", "Already running");
    return;
  }

  networkWatcherRunning = true;

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  if (connection && connection.addEventListener) {
    connection.addEventListener("change", handleNetworkChange);
    setText("networkWatcherStatus", "Running");
  } else {
    setText("networkWatcherStatus", "Connection change event unavailable");
  }
}

function stopNetworkWatcher() {
  networkWatcherRunning = false;

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  if (connection && connection.removeEventListener) {
    connection.removeEventListener("change", handleNetworkChange);
  }

  setText("networkWatcherStatus", "Stopped");
}

function handleNetworkChange() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  const summary = {
    time: new Date().toISOString(),
    type: connection.type || "Unavailable",
    effectiveType: connection.effectiveType || "Unavailable",
    downlink: connection.downlink || "Unavailable",
    rtt: connection.rtt || "Unavailable",
    saveData: connection.saveData || false
  };

  setText("lastNetworkChange", JSON.stringify(summary));

  collectedInfo.lastNetworkChange = summary;
  updateRawInfo();
}

function startIdleAndVisibilityTracking() {
  if (idleTrackingEnabled) {
    setText("idleTrackingStatus", "Already running");
    return;
  }

  idleTrackingEnabled = true;
  lastActivityTime = Date.now();

  [
    "mousemove",
    "keydown",
    "click",
    "scroll",
    "touchstart"
  ].forEach(function(eventName) {
    document.addEventListener(eventName, markUserActivity);
  });

  document.addEventListener("visibilitychange", updateVisibilityStatus);

  idleTrackingInterval = setInterval(updateIdleStatus, 1000);

  setText("idleTrackingStatus", "Running");
  updateVisibilityStatus();
  updateIdleStatus();
}

function stopIdleAndVisibilityTracking() {
  idleTrackingEnabled = false;

  [
    "mousemove",
    "keydown",
    "click",
    "scroll",
    "touchstart"
  ].forEach(function(eventName) {
    document.removeEventListener(eventName, markUserActivity);
  });

  document.removeEventListener("visibilitychange", updateVisibilityStatus);

  if (idleTrackingInterval) {
    clearInterval(idleTrackingInterval);
    idleTrackingInterval = null;
  }

  setText("idleTrackingStatus", "Stopped");
}

function markUserActivity() {
  lastActivityTime = Date.now();
  setText("lastUserActivity", new Date(lastActivityTime).toString());
}

function updateIdleStatus() {
  setText("idleTimeStatus", Math.round((Date.now() - lastActivityTime) / 1000) + " second(s)");
}

function updateVisibilityStatus() {
  setText("tabVisibilityStatus", document.visibilityState);
}


/* =========================
   CAPABILITY LAB
========================= */

function runCapabilityLab() {
  setText("secureContextStatus", window.isSecureContext ? "Yes" : "No");
  setText("pwaInstallStatus", "onbeforeinstallprompt" in window ? "Supported" : "Not exposed or not supported");
  setText("offlineCacheStatus", "caches" in window ? "Cache API supported" : "Cache API not supported");
  setText("barcodeDetectorStatus", "BarcodeDetector" in window ? "Supported" : "Not supported");
  setText("bluetoothStatus", "bluetooth" in navigator ? "Supported" : "Not supported");
  setText("usbStatus", "usb" in navigator ? "Supported" : "Not supported");
  setText("serialStatus", "serial" in navigator ? "Supported" : "Not supported");
  setText("nfcStatus", "NDEFReader" in window ? "Supported" : "Not supported");
  setText("paymentRequestStatus", "PaymentRequest" in window ? "Supported" : "Not supported");
  setText("credentialStatus", "credentials" in navigator ? "Supported" : "Not supported");

  if (window.PublicKeyCredential) {
    PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
      .then(function(available) {
        setText("webauthnStatus", available ? "Supported, platform authenticator available" : "Supported, but platform authenticator unavailable");
      })
      .catch(function() {
        setText("webauthnStatus", "Supported, availability check failed");
      });
  } else {
    setText("webauthnStatus", "Not supported");
  }
}

function collectViewportAndOrientation() {
  if (screen.orientation) {
    setText("screenOrientationStatus", screen.orientation.type + ", angle " + screen.orientation.angle);
  } else {
    setText("screenOrientationStatus", "Screen Orientation API unavailable");
  }

  if (window.visualViewport) {
    setText(
      "visualViewportStatus",
      "width=" +
        Math.round(visualViewport.width) +
        ", height=" +
        Math.round(visualViewport.height) +
        ", scale=" +
        visualViewport.scale +
        ", offsetLeft=" +
        Math.round(visualViewport.offsetLeft) +
        ", offsetTop=" +
        Math.round(visualViewport.offsetTop)
    );

    setText("zoomEstimateStatus", "Visual viewport scale: " + visualViewport.scale);
  } else {
    setText("visualViewportStatus", "Visual Viewport API unavailable");
    setText("zoomEstimateStatus", "Unavailable");
  }

  if (window.CSS && CSS.supports) {
    const supported =
      CSS.supports("padding-top: env(safe-area-inset-top)") ||
      CSS.supports("padding-top: constant(safe-area-inset-top)");

    setText("safeAreaStatus", supported ? "Supported" : "Not detected");
  } else {
    setText("safeAreaStatus", "CSS.supports unavailable");
  }
}

async function lockScreenOrientation() {
  if (!screen.orientation || !screen.orientation.lock) {
    setText("orientationLockStatus", "Orientation lock not supported");
    return;
  }

  try {
    await screen.orientation.lock("portrait");
    setText("orientationLockStatus", "Locked to portrait");
  } catch (error) {
    setText("orientationLockStatus", "Could not lock orientation. Fullscreen may be required.");
  }
}

function unlockScreenOrientation() {
  if (!screen.orientation || !screen.orientation.unlock) {
    setText("orientationLockStatus", "Orientation unlock not supported");
    return;
  }

  try {
    screen.orientation.unlock();
    setText("orientationLockStatus", "Unlocked");
  } catch (error) {
    setText("orientationLockStatus", "Could not unlock orientation");
  }
}

async function collectClientHints() {
  if (!navigator.userAgentData) {
    setText("uaDataSupported", "Not supported");
    setText("uaBrands", "Unavailable");
    setText("uaMobile", "Unavailable");
    setText("uaPlatform", "Unavailable");
    setText("uaArchitecture", "Unavailable");
    setText("uaBitness", "Unavailable");
    setText("uaFullVersionList", "Unavailable");
    return;
  }

  setText("uaDataSupported", "Supported");
  setText("uaBrands", JSON.stringify(navigator.userAgentData.brands || []));
  setText("uaMobile", navigator.userAgentData.mobile ? "Yes" : "No");
  setText("uaPlatform", navigator.userAgentData.platform || "Unavailable");

  try {
    const highEntropy = await navigator.userAgentData.getHighEntropyValues([
      "architecture",
      "bitness",
      "model",
      "platformVersion",
      "uaFullVersion",
      "fullVersionList"
    ]);

    setText("uaArchitecture", highEntropy.architecture || "Unavailable");
    setText("uaBitness", highEntropy.bitness || "Unavailable");
    setText("uaFullVersionList", JSON.stringify(highEntropy.fullVersionList || []));

    collectedInfo.userAgentHighEntropy = highEntropy;
    updateRawInfo();
  } catch (error) {
    setText("uaArchitecture", "Unavailable");
    setText("uaBitness", "Unavailable");
    setText("uaFullVersionList", "Unavailable");
  }
}

async function runRuntimeCapabilityChecks() {
  setText("wasmStatus", typeof WebAssembly === "object" ? "Supported" : "Not supported");
  setText("webcodecsStatus", "VideoEncoder" in window || "VideoDecoder" in window ? "Supported" : "Not supported");
  setText("sharedArrayBufferStatus", "SharedArrayBuffer" in window ? "Supported" : "Not supported");
  setText("crossOriginIsolationStatus", window.crossOriginIsolated ? "Yes" : "No");
  setText("offscreenCanvasStatus", "OffscreenCanvas" in window ? "Supported" : "Not supported");

  if (!navigator.gpu) {
    setText("webgpuStatus", "Not supported");
    setText("webgpuAdapter", "Unavailable");
    return;
  }

  try {
    setText("webgpuStatus", "Supported");

    const adapter = await navigator.gpu.requestAdapter();

    if (!adapter) {
      setText("webgpuAdapter", "No adapter available");
      return;
    }

    const info = adapter.info || {};

    const summary = {
      vendor: info.vendor || "Unavailable",
      architecture: info.architecture || "Unavailable",
      device: info.device || "Unavailable",
      description: info.description || "Unavailable",
      features: Array.from(adapter.features || [])
    };

    setText("webgpuAdapter", JSON.stringify(summary));

    collectedInfo.webgpuAdapter = summary;
    updateRawInfo();
  } catch (error) {
    setText("webgpuStatus", "Supported, but access failed");
    setText("webgpuAdapter", "Unavailable");
  }
}

function checkSensorSupport() {
  setText("accelerometerStatus", "Accelerometer" in window ? "Supported" : "Not supported");
  setText("gyroscopeStatus", "Gyroscope" in window ? "Supported" : "Not supported");
  setText("magnetometerStatus", "Magnetometer" in window ? "Supported" : "Not supported");
  setText("ambientLightStatus", "AmbientLightSensor" in window ? "Supported" : "Not supported");
  setText("absoluteOrientationStatus", "AbsoluteOrientationSensor" in window ? "Supported" : "Not supported");
  setText("relativeOrientationStatus", "RelativeOrientationSensor" in window ? "Supported" : "Not supported");
}

function mq(query, yesText, noText) {
  if (!window.matchMedia) {
    return "matchMedia unavailable";
  }

  return matchMedia(query).matches ? yesText : noText;
}

function collectUserPreferenceSignals() {
  setText("reducedDataStatus", mq("(prefers-reduced-data: reduce)", "Reduced data preferred", "No reduced data preference detected"));
  setText("reducedTransparencyStatus", mq("(prefers-reduced-transparency: reduce)", "Reduced transparency preferred", "No reduced transparency preference detected"));
  setText("invertedColorsStatus", mq("(inverted-colors: inverted)", "Inverted colors active", "Inverted colors not detected"));
  setText("forcedColorsStatus", mq("(forced-colors: active)", "Forced colors active", "Forced colors not detected"));
  setText("dynamicRangeStatus", mq("(dynamic-range: high)", "High dynamic range display likely", "Standard dynamic range or unavailable"));
}

function checkBrowserPolicies() {
  const output = {
    secureContext: window.isSecureContext,
    crossOriginIsolated: window.crossOriginIsolated,
    referrerPolicy: document.referrerPolicy || "Unavailable",
    cookieEnabled: navigator.cookieEnabled,
    origin: location.origin,
    protocol: location.protocol,
    permissionsPolicy: "Unavailable",
    featurePolicy: "Unavailable"
  };

  try {
    if (document.permissionsPolicy && document.permissionsPolicy.features) {
      output.permissionsPolicy = document.permissionsPolicy.features();
    }
  } catch (error) {}

  try {
    if (document.featurePolicy && document.featurePolicy.features) {
      output.featurePolicy = document.featurePolicy.features();
    }
  } catch (error) {}

  const element = document.getElementById("browserPolicyOutput");

  if (element) {
    element.textContent = JSON.stringify(output, null, 2);
  }

  collectedInfo.browserPolicies = output;
  updateRawInfo();
}


/* =========================
   MEDIA / CSS / EXTRA TESTS
========================= */

function checkMediaCodecSupport() {
  const video = document.createElement("video");
  const audio = document.createElement("audio");

  const codecs = {
    videoMp4H264: video.canPlayType('video/mp4; codecs="avc1.42E01E"'),
    videoWebmVp8: video.canPlayType('video/webm; codecs="vp8"'),
    videoWebmVp9: video.canPlayType('video/webm; codecs="vp9"'),
    videoOggTheora: video.canPlayType('video/ogg; codecs="theora"'),
    audioMp3: audio.canPlayType("audio/mpeg"),
    audioOggVorbis: audio.canPlayType('audio/ogg; codecs="vorbis"'),
    audioWebmOpus: audio.canPlayType('audio/webm; codecs="opus"'),
    audioWav: audio.canPlayType('audio/wav; codecs="1"')
  };

  const output = document.getElementById("mediaCodecOutput");

  if (output) {
    output.textContent = JSON.stringify(codecs, null, 2);
  }

  collectedInfo.mediaCodecSupport = codecs;
  updateRawInfo();
}

function checkCssFeatures() {
  const output = document.getElementById("cssFeatureOutput");

  if (!window.CSS || !CSS.supports) {
    if (output) output.textContent = "CSS.supports is unavailable.";
    return;
  }

  const features = {
    grid: CSS.supports("display", "grid"),
    flexbox: CSS.supports("display", "flex"),
    backdropFilter: CSS.supports("backdrop-filter", "blur(4px)") || CSS.supports("-webkit-backdrop-filter", "blur(4px)"),
    positionSticky: CSS.supports("position", "sticky"),
    containerQueries: CSS.supports("container-type", "inline-size"),
    cssVariables: CSS.supports("--test-var", "1"),
    colorScheme: CSS.supports("color-scheme", "dark"),
    aspectRatio: CSS.supports("aspect-ratio", "16 / 9"),
    subgrid: CSS.supports("grid-template-columns", "subgrid"),
    hasSelector: CSS.supports("selector(:has(*))"),
    dvhUnit: CSS.supports("height", "100dvh"),
    clamp: CSS.supports("width", "clamp(100px, 50vw, 500px)")
  };

  if (output) {
    output.textContent = JSON.stringify(features, null, 2);
  }

  collectedInfo.cssFeatureSupport = features;
  updateRawInfo();
}

function runExtraBrowserTests() {
  setText("pdfViewerStatus", navigator.pdfViewerEnabled ? "Enabled" : "Unavailable or disabled");

  setText(
    "pluginsStatus",
    navigator.plugins && navigator.plugins.length
      ? Array.from(navigator.plugins).map(function(plugin) {
          return plugin.name;
        }).join(", ")
      : "No plugins exposed"
  );

  setText(
    "mimeTypesStatus",
    navigator.mimeTypes && navigator.mimeTypes.length
      ? Array.from(navigator.mimeTypes).slice(0, 30).map(function(mime) {
          return mime.type;
        }).join(", ")
      : "No MIME types exposed"
  );

  if (window.matchMedia) {
    setText("colorSchemeStatus", matchMedia("(prefers-color-scheme: dark)").matches ? "Dark" : "Light or no preference");
    setText("reducedMotionStatus", matchMedia("(prefers-reduced-motion: reduce)").matches ? "Reduced motion preferred" : "No reduced motion preference");
    setText("contrastStatus", matchMedia("(prefers-contrast: more)").matches ? "More contrast preferred" : "No high contrast preference detected");
    setText("pointerStatus", matchMedia("(pointer: coarse)").matches ? "Coarse pointer, likely touch" : matchMedia("(pointer: fine)").matches ? "Fine pointer, likely mouse/trackpad" : "No pointer preference detected");
    setText("hoverStatus", matchMedia("(hover: hover)").matches ? "Hover supported" : "Hover not supported or unavailable");
  }
}

async function testShareApi() {
  if (!navigator.share) {
    setText("shareApiStatus", "Share API not supported");
    return;
  }

  try {
    await navigator.share({
      title: document.title,
      text: "Visitor information page",
      url: location.href
    });

    setText("shareApiStatus", "Share dialog opened");
  } catch (error) {
    setText("shareApiStatus", "Share cancelled or unavailable");
  }
}

function testFilePicker() {
  const input = document.createElement("input");

  input.type = "file";
  input.multiple = true;

  input.onchange = function() {
    if (!input.files || input.files.length === 0) {
      setText("filePickerStatus", "No files selected");
      return;
    }

    const summary = Array.from(input.files).map(function(file) {
      return file.name + " (" + formatBytes(file.size) + ", " + (file.type || "unknown type") + ")";
    }).join(" | ");

    setText("filePickerStatus", summary);
  };

  input.click();
}

function testSpeechSynthesis() {
  if (!("speechSynthesis" in window)) {
    setText("speechStatus", "Speech synthesis not supported");
    return;
  }

  speechSynthesis.speak(new SpeechSynthesisUtterance("Speech synthesis is supported in this browser."));
  setText("speechStatus", "Speech output triggered");
}

function testGamepads() {
  if (!navigator.getGamepads) {
    setText("gamepadStatus", "Gamepad API not supported");
    return;
  }

  const gamepads = Array.from(navigator.getGamepads()).filter(Boolean);

  if (!gamepads.length) {
    setText("gamepadStatus", "No gamepads detected");
    return;
  }

  const summary = gamepads.map(function(gamepad, index) {
    return "#" + (index + 1) + " " + gamepad.id + " — buttons: " + gamepad.buttons.length + ", axes: " + gamepad.axes.length;
  }).join(" | ");

  setText("gamepadStatus", summary);
}

function checkSpeechAndAudioOutput() {
  const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;

  setText("speechRecognitionStatus", SpeechRecognitionClass ? "Supported" : "Not supported");

  if ("speechSynthesis" in window) {
    const voices = speechSynthesis.getVoices();

    setText(
      "speechVoicesStatus",
      voices.length
        ? voices.slice(0, 20).map(function(voice) {
            return voice.name + " (" + voice.lang + ")";
          }).join(" | ")
        : "Supported, but no voices exposed yet"
    );
  } else {
    setText("speechVoicesStatus", "Not supported");
  }

  setText("audioOutputStatus", HTMLMediaElement.prototype.setSinkId ? "Audio output device selection supported" : "Audio output selection not supported");
}

if ("speechSynthesis" in window) {
  speechSynthesis.onvoiceschanged = function() {
    if (document.getElementById("speechVoicesStatus")) {
      checkSpeechAndAudioOutput();
    }
  };
}

function checkSupportedApis() {
  const apiSupport = {
    geolocation: "geolocation" in navigator,
    mediaDevices: "mediaDevices" in navigator,
    getUserMedia: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
    enumerateDevices: !!(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices),
    notifications: "Notification" in window,
    clipboard: "clipboard" in navigator,
    permissions: "permissions" in navigator,
    serviceWorker: "serviceWorker" in navigator,
    indexedDB: "indexedDB" in window,
    localStorage: storageAvailable("localStorage") === "Available",
    sessionStorage: storageAvailable("sessionStorage") === "Available",
    webGL: checkWebGL() === "Supported",
    battery: "getBattery" in navigator,
    networkInformation: !!(navigator.connection || navigator.mozConnection || navigator.webkitConnection),
    vibration: "vibrate" in navigator,
    share: "share" in navigator,
    crypto: "crypto" in window,
    bluetooth: "bluetooth" in navigator,
    usb: "usb" in navigator,
    serial: "serial" in navigator
  };

  const output = document.getElementById("supportedApis");

  if (output) {
    output.textContent = JSON.stringify(apiSupport, null, 2);
  }

  collectedInfo.supportedApis = apiSupport;
  updateRawInfo();
}


/* =========================
   PRIVATE MODE / CONSISTENCY
========================= */

async function estimatePrivateMode() {
  setText("privateModeEstimate", "Checking...");

  let score = 0;
  const reasons = [];
  let quota = "Unavailable";

  try {
    if (navigator.storage && navigator.storage.estimate) {
      const estimate = await navigator.storage.estimate();

      quota = formatBytes(estimate.quota || 0);

      if (estimate.quota > 0 && estimate.quota < 150 * 1024 * 1024) {
        score += 40;
        reasons.push("Storage quota appears low.");
      }

      setText("privateModeStorageSignal", quota);
    }
  } catch (error) {
    score += 30;
    reasons.push("Storage quota check failed.");
  }

  try {
    localStorage.setItem("__private_mode_test__", "1");
    localStorage.removeItem("__private_mode_test__");
  } catch (error) {
    score += 40;
    reasons.push("localStorage write failed.");
  }

  let result = "Probably normal browsing mode";

  if (score >= 40) result = "Possible private/incognito mode";
  if (score >= 70) result = "Likely private/incognito mode";

  setText("privateModeEstimate", result + " — " + (reasons.join(" ") || "No strong private-mode signals detected."));

  collectedInfo.privateModeEstimate = {
    score: score,
    result: result,
    reasons: reasons,
    quota: quota
  };

  updateRawInfo();
}

function runConsistencyChecks() {
  checkLanguageTimezoneConsistency();
  estimateHardwareClass();
}

function checkLanguageTimezoneConsistency() {
  const language = navigator.language || "";
  const languages = Array.isArray(navigator.languages) ? navigator.languages.join(", ") : "";
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";

  const text = (language + " " + languages + " " + timezone).toLowerCase();

  const checks = [
    {
      name: "Italian language with European timezone",
      match: text.includes("it") && text.includes("europe")
    },
    {
      name: "English language with American timezone",
      match: text.includes("en") && text.includes("america")
    },
    {
      name: "Japanese language with Tokyo timezone",
      match: text.includes("ja") && text.includes("tokyo")
    },
    {
      name: "Chinese language with Asian timezone",
      match: (text.includes("zh") || text.includes("cn")) && text.includes("asia")
    }
  ];

  const matched = checks.filter(function(item) {
    return item.match;
  });

  setText(
    "languageTimezoneConsistency",
    matched.length
      ? "Looks consistent: " +
          matched.map(function(item) {
            return item.name;
          }).join(", ")
      : "No obvious language/timezone match. This does not prove VPN use."
  );
}

function estimateHardwareClass() {
  const cores = navigator.hardwareConcurrency || 0;
  const memory = navigator.deviceMemory || 0;
  const pixels = (screen.width || 0) * (screen.height || 0);

  let score = 0;

  if (cores >= 4) score++;
  if (cores >= 8) score++;
  if (memory >= 4) score++;
  if (memory >= 8) score++;
  if (pixels >= 1920 * 1080) score++;
  if (pixels >= 2560 * 1440) score++;

  let result = "Low or unknown";

  if (score >= 2) result = "Mid-range";
  if (score >= 4) result = "High-end";

  setText(
    "hardwareClassEstimate",
    result +
      " — cores: " +
      (cores || "unavailable") +
      ", memory: " +
      (memory || "unavailable") +
      " GB, screen: " +
      screen.width +
      " × " +
      screen.height
  );
}


/* =========================
   LOCAL EVENT LOG
========================= */

function addLocalEventLogEntry(type, details) {
  const entry = {
    time: new Date().toISOString(),
    type: type,
    details: details
  };

  localEventLog.push(entry);

  if (localEventLog.length > 200) {
    localEventLog.shift();
  }

  const output = document.getElementById("localEventLogOutput");

  if (output) {
    output.textContent = JSON.stringify(localEventLog.slice(-50), null, 2);
  }

  collectedInfo.localEventLogCount = localEventLog.length;
  updateRawInfo();
}

function startLocalEventLog() {
  if (localEventLogRunning) {
    setText("eventLogStatus", "Already running");
    return;
  }

  localEventLogRunning = true;

  document.addEventListener("visibilitychange", logVisibilityEvent);
  window.addEventListener("online", logOnlineEvent);
  window.addEventListener("offline", logOfflineEvent);
  window.addEventListener("resize", logResizeEvent);
  document.addEventListener("fullscreenchange", logFullscreenEvent);

  setText("eventLogStatus", "Running");
  addLocalEventLogEntry("log-started", "Local event log started");
}

function stopLocalEventLog() {
  localEventLogRunning = false;

  document.removeEventListener("visibilitychange", logVisibilityEvent);
  window.removeEventListener("online", logOnlineEvent);
  window.removeEventListener("offline", logOfflineEvent);
  window.removeEventListener("resize", logResizeEvent);
  document.removeEventListener("fullscreenchange", logFullscreenEvent);

  setText("eventLogStatus", "Stopped");
  addLocalEventLogEntry("log-stopped", "Local event log stopped");
}

function clearLocalEventLog() {
  localEventLog = [];

  const output = document.getElementById("localEventLogOutput");

  if (output) {
    output.textContent = "No events logged";
  }

  setText("eventLogStatus", "Cleared");
}

function downloadLocalEventLog() {
  const blob = new Blob([JSON.stringify(localEventLog, null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "local-event-log.json";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

function logVisibilityEvent() {
  addLocalEventLogEntry("visibility", document.visibilityState);
}

function logOnlineEvent() {
  addLocalEventLogEntry("network", "online");
}

function logOfflineEvent() {
  addLocalEventLogEntry("network", "offline");
}

function logResizeEvent() {
  addLocalEventLogEntry("resize", innerWidth + " × " + innerHeight);
}

function logFullscreenEvent() {
  addLocalEventLogEntry("fullscreen", document.fullscreenElement ? "entered" : "exited");
}


/* =========================
   NOTES
========================= */

function saveLocalNotes() {
  const box = document.getElementById("localNotesBox");

  if (!box) {
    setText("localNotesStatus", "Notes box missing");
    return;
  }

  try {
    localStorage.setItem("__visitor_info_local_notes__", box.value);
    setText("localNotesStatus", "Saved locally at " + new Date().toString());
  } catch (error) {
    setText("localNotesStatus", "Could not save notes");
  }
}

function loadLocalNotes() {
  const box = document.getElementById("localNotesBox");

  if (!box) return;

  try {
    box.value = localStorage.getItem("__visitor_info_local_notes__") || "";
    setText("localNotesStatus", "Loaded locally");
  } catch (error) {
    setText("localNotesStatus", "Could not load notes");
  }
}

function clearLocalNotes() {
  const box = document.getElementById("localNotesBox");

  try {
    localStorage.removeItem("__visitor_info_local_notes__");

    if (box) {
      box.value = "";
    }

    setText("localNotesStatus", "Cleared");
  } catch (error) {
    setText("localNotesStatus", "Could not clear notes");
  }
}


/* =========================
   SEARCH / EXPORT / REPORTS
========================= */

function searchCollectedInfo() {
  const input = document.getElementById("reportSearchInput");
  const query = input ? input.value.toLowerCase().trim() : "";

  if (!query) {
    setText("reportSearchResults", "No search yet");
    return;
  }

  const matches = Object.keys(collectedInfo).filter(function(key) {
    const text = key.toLowerCase() + " " + JSON.stringify(collectedInfo[key]).toLowerCase();
    return text.includes(query);
  });

  setText("reportSearchResults", matches.join(", ") || "No matches");
}

function makeRedactedCopy() {
  const redacted = {};

  Object.keys(collectedInfo).forEach(function(key) {
    if (/ip|city|region|postal|latitude|longitude|gps|clipboard|frame|camera|cookie|barcode/i.test(key)) {
      redacted[key] = "[REDACTED]";
    } else {
      redacted[key] = collectedInfo[key];
    }
  });

  return redacted;
}

function downloadRedactedJson() {
  const blob = new Blob([JSON.stringify(makeRedactedCopy(), null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "visitor-info-redacted.json";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);

  setText("redactedExportStatus", "Redacted JSON downloaded");
}

async function copyRedactedJson() {
  if (!navigator.clipboard) {
    setText("redactedExportStatus", "Clipboard unavailable");
    return;
  }

  try {
    await navigator.clipboard.writeText(JSON.stringify(makeRedactedCopy(), null, 2));
    setText("redactedExportStatus", "Redacted JSON copied");
  } catch (error) {
    setText("redactedExportStatus", "Could not copy redacted JSON");
  }
}

function makePublicSafeSummary() {
  return {
    browser: collectedInfo.browser || detectBrowser(),
    os: collectedInfo.os || detectOS(),
    deviceType: collectedInfo.deviceType || detectDeviceType(),
    screenSize: collectedInfo.screenSize || "Unavailable",
    language: collectedInfo.language || navigator.language || "Unavailable",
    timezone: collectedInfo.timezone || "Unavailable",
    online: collectedInfo.online || (navigator.onLine ? "Yes" : "No"),
    secureContext: window.isSecureContext ? "Yes" : "No",
    url: location.href
  };
}

async function copyPublicSafeSummary() {
  const text = JSON.stringify(makePublicSafeSummary(), null, 2);

  setText("publicSafeSummary", text);

  if (!navigator.clipboard) {
    alert("Clipboard unavailable.");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    alert("Public-safe summary copied.");
  } catch (error) {
    alert("Could not copy summary.");
  }
}

function downloadReportCsv() {
  const rows = [["key", "value"]];

  Object.keys(collectedInfo).forEach(function(key) {
    let value = collectedInfo[key];

    if (typeof value === "object") {
      value = JSON.stringify(value);
    }

    rows.push([key, String(value).replace(/\n/g, " ")]);
  });

  const csv = rows.map(function(row) {
    return row.map(function(cell) {
      return '"' + String(cell).replace(/"/g, '""') + '"';
    }).join(",");
  }).join("\n");

  const blob = new Blob([csv], {
    type: "text/csv"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "visitor-info-report.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

function copyInfo() {
  const raw = document.getElementById("rawInfo").textContent;

  if (!navigator.clipboard) {
    alert("Clipboard API is not supported.");
    return;
  }

  navigator.clipboard.writeText(raw)
    .then(function() {
      alert("Information copied to clipboard.");
    })
    .catch(function() {
      alert("Could not copy information.");
    });
}

function downloadInfo() {
  const blob = new Blob([JSON.stringify(collectedInfo, null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "visitor-info.json";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

function printReport() {
  window.print();
}

async function testClipboardWrite() {
  if (!navigator.clipboard || !navigator.clipboard.writeText) {
    setText("clipboardWriteStatus", "Clipboard write not supported");
    return;
  }

  try {
    await navigator.clipboard.writeText("Clipboard write test from " + location.href);
    setText("clipboardWriteStatus", "Success");
  } catch (error) {
    setText("clipboardWriteStatus", "Permission denied or unavailable");
  }
}


/* =========================
   CLEANUP
========================= */

function clearSensitiveInfo() {
  const ids = [
    "ip",
    "city",
    "region",
    "postal",
    "ipLatitude",
    "ipLongitude",
    "isp",
    "asn",
    "gpsLatitude",
    "gpsLongitude",
    "gpsAccuracy",
    "extraGpsLatitude",
    "extraGpsLongitude",
    "extraGpsAccuracy",
    "cameraLabel",
    "microphoneLabel",
    "mediaDevices",
    "clipboardPreview",
    "cameraDataString"
  ];

  ids.forEach(function(id) {
    const element = document.getElementById(id);

    if (element) {
      if (element.tagName === "TEXTAREA") {
        element.value = "";
      } else {
        element.textContent = "Cleared";
      }
    }

    delete collectedInfo[id];
  });

  setText("cleanupStatus", "Sensitive values cleared locally");
  updateRawInfo();
}

function stopAllSensorsAndStreams() {
  try {
    stopCameraDataCapture();
  } catch (error) {}

  try {
    stopMicrophoneMeter();
  } catch (error) {}

  try {
    stopMotionAndOrientation();
  } catch (error) {}

  try {
    stopKeyboardMouseTest();
  } catch (error) {}

  try {
    stopCameraAnalysis();
  } catch (error) {}

  if (activeCameraStream) {
    activeCameraStream.getTracks().forEach(function(track) {
      track.stop();
    });

    activeCameraStream = null;
  }

  const video = document.getElementById("cameraPreview");

  if (video) {
    video.srcObject = null;
    video.style.display = "none";
  }

  setText("cleanupStatus", "Stopped available sensors, streams, and listeners");
}

function wipeAllCollectedInfo() {
  Object.keys(collectedInfo).forEach(function(key) {
    delete collectedInfo[key];
  });

  document.querySelectorAll("span[id]").forEach(function(span) {
    span.textContent = "Cleared";
  });

  document.querySelectorAll("textarea").forEach(function(textarea) {
    textarea.value = "";
  });

  const raw = document.getElementById("rawInfo");

  if (raw) {
    raw.textContent = "{}";
  }

  setText("cleanupStatus", "All collected info wiped from this page");
}


/* =========================
   STARTUP EVENTS
========================= */

window.addEventListener("resize", function() {
  setText("windowSize", innerWidth + " × " + innerHeight);
});

window.addEventListener("online", function() {
  setText("online", "Yes");
});

window.addEventListener("offline", function() {
  setText("online", "No");
});

document.addEventListener("fullscreenchange", function() {
  setText("fullscreenStatus", document.fullscreenElement ? "Active" : "Not active");
});

if (window.visualViewport) {
  visualViewport.addEventListener("resize", collectViewportAndOrientation);
  visualViewport.addEventListener("scroll", collectViewportAndOrientation);
}

setInterval(function() {
  setText("localTime", new Date().toString());
}, 1000);


/* =========================
   INITIAL RUN
========================= */

collectBasicInfo();
collectIPInfo();
checkVpnAndIpRisk();
collectNetworkInfo();
collectBatteryInfo();
collectStorageEstimate();
collectPageInfo();
collectPerformanceInfo();
runCapabilityLab();
collectViewportAndOrientation();
checkMediaCodecSupport();
checkCssFeatures();
collectClientHints();
runRuntimeCapabilityChecks();
checkSensorSupport();
collectUserPreferenceSignals();
checkBrowserPolicies();
checkSpeechAndAudioOutput();
runExtraBrowserTests();
runNetworkDiagnostics();
runCookieDiagnostics();
startSessionTimer();
runConsistencyChecks();
loadLocalNotes();
