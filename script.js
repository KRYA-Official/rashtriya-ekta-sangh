import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

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

window.signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((result) => {
    const user = result.user;
    const card = document.getElementById('id-card');
    
    document.getElementById('auth-section').style.display = 'none';
    card.style.display = 'block';
    
    // नाम सेट करना
    document.getElementById('user-name').innerText = user.displayName;
    
    // फोटो सेट करना
    const img = document.createElement('img');
    img.src = user.photoURL;
    img.style.width = "100px";
    img.style.borderRadius = "50%";
    img.style.marginBottom = "10px";
    img.style.border = "3px solid #013220";
    card.insertBefore(img, card.firstChild);

    // यूनिक आईडी सेट करना
    const uniqueId = "ID-" + Math.floor(10000 + Math.random() * 90000);
    const idElement = document.createElement('p');
    idElement.innerHTML = "<b>यूनिक आईडी:</b> " + uniqueId;
    idElement.style.color = "#013220";
    card.appendChild(idElement);
  });
};
