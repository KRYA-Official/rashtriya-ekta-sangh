import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBzqLMQFgA7EBDM5XvgdXtJCKSKyWXgWlI",
  authDomain: "krya-global.firebaseapp.com",
  projectId: "krya-global",
  storageBucket: "krya-global.firebasestorage.app",
  messagingSenderId: "372340448782",
  appId: "1:372340448782:web:8e26d6d1169a3b8af8665f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// कार्ड दिखाने और डेटा भरने का मुख्य फंक्शन
const showCard = (user) => {
    const card = document.getElementById('id-card');
    document.getElementById('auth-section').style.display = 'none';
    card.style.display = 'block';
    
    document.getElementById('user-name').innerText = user.displayName;
    document.getElementById('user-designation').innerText = "राष्ट्रीय डिजिटल संयोजक";
    
    // फोटो जोड़ना (अगर पहले से मौजूद नहीं है)
    if (!card.querySelector('img')) {
        const img = document.createElement('img');
        img.src = user.photoURL;
        img.style.width = "100px";
        img.style.borderRadius = "50%";
        img.style.marginBottom = "10px";
        img.style.border = "3px solid #013220";
        card.insertBefore(img, card.firstChild);
    }
};

// 1. गूगल साइन-इन हैंडलर
window.signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((result) => {
    showCard(result.user);
  });
};

// 2. पेज रिफ्रेश होने पर लॉगिन बरकरार रखने के लिए
onAuthStateChanged(auth, (user) => {
  if (user) {
    showCard(user);
  }
});
