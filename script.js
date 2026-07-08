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

// 1. शपथ पत्र का टेक्स्ट अपडेट करने का फंक्शन
window.updateOath = () => {
    const gender = document.getElementById("gender-select").value;
    const oathText = document.getElementById("oath-text");
    if (gender === "male") {
        oathText.innerHTML = "मैं, शपथ लेता हूँ कि मैं संगठन का एक निष्ठावान <b>कार्यकर्ता</b> रहूँगा। मैं सच बोलूँगा और कभी झूठ का साथ नहीं दूँगा। मैं हमेशा सच्चाई के साथ खड़ा रहूँगा।";
    } else {
        oathText.innerHTML = "मैं, शपथ लेती हूँ कि मैं संगठन की एक निष्ठावान <b>कार्यकर्ता</b> रहूँगी। मैं सच बोलूँगी और कभी झूठ का साथ नहीं दूँगी। मैं हमेशा सच्चाई के साथ खड़ी रहूँगी।";
    }
};

// 2. शपथ स्वीकार करने पर बटन इनेबल करने का फंक्शन
window.toggleSignInButton = () => {
    const btn = document.getElementById("google-btn");
    if (document.getElementById("oath-check").checked) {
        btn.disabled = false;
        btn.style.background = "#013220";
        btn.style.color = "#d4af37";
        btn.style.cursor = "pointer";
        btn.innerText = "Google से जुड़ें";
    } else {
        btn.disabled = true;
        btn.style.background = "#cccccc";
        btn.style.color = "#666";
        btn.style.cursor = "not-allowed";
        btn.innerText = "शपथ लेने के बाद लॉग-इन करें";
    }
};

// 3. कार्ड दिखाने का मुख्य फंक्शन
const showCard = (user) => {
    document.getElementById('oath-section').style.display = 'none';
    document.getElementById('auth-section').style.display = 'none';
    const card = document.getElementById('id-card');
    card.style.display = 'block';
    
    document.getElementById('user-name').innerText = user.displayName;
    
    // फोटो जोड़ना
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

// 4. गूगल साइन-इन
window.signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
        showCard(result.user);
    });
};

// 5. पेज रिफ्रेश पर लॉगिन बनाए रखना
onAuthStateChanged(auth, (user) => {
    if (user) {
        showCard(user);
    }
});

// पेज लोड होते ही शपथ लोड करें
window.updateOath();
