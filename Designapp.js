// ====== Firebase Config (replace with your Firebase keys) ======
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ====== Helper: Get Current Location ======
function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      callback({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      });
    }, () => {
      alert("Location access denied! Please enter manually.");
      callback(null);
    });
  } else {
    alert("Geolocation not supported in this browser.");
    callback(null);
  }
}

// ====== For Need Food Page ======
const needForm = document.getElementById("needForm");
if (needForm) {
  needForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("needName").value;
    const contact = document.getElementById("needContact").value;
    const address = document.getElementById("needAddress").value;

    getLocation((location) => {
      const newNeedRef = db.ref("homesNeedingFood").push();
      newNeedRef.set({
        name,
        contact,
        address,
        location: location || { lat: null, lng: null },
        timestamp: Date.now()
      });
      alert("✅ Request submitted successfully!");
      needForm.reset();
    });
  });
}

// ====== For Share Food Page ======
const shareForm = document.getElementById("shareForm");
if (shareForm) {
  shareForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const donorName = document.getElementById("donorName").value;
    const foodType = document.getElementById("foodType").value;
    const contact = document.getElementById("donorContact").value;

    getLocation((location) => {
      const newShareRef = db.ref("foodRequests").push();
      newShareRef.set({
        donorName,
        foodType,
        contact,
        location: location || { lat: null, lng: null },
        timestamp: Date.now()
      });
      alert("🙏 Thank you for sharing food!");
      shareForm.reset();
    });
  });
}
