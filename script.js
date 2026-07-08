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
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('id-card').style.display = 'block';
    document.getElementById('user-name').innerText = user.displayName;
  });
};
