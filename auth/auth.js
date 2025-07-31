// استيراد التهيئة والمصادقة من Firebase
import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔹 تسجيل حساب جديد (Register)
const registerForm = document.querySelector(".register-box");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // حفظ اسم المستخدم في Firestore باستخدام UID
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email
      });

      console.log("✅ تم التسجيل:", user);
      alert("تم إنشاء الحساب بنجاح 🎉");
      window.location.href = "login.html";
    } catch (error) {
      console.error("❌ خطأ:", error.message);
      alert("فشل في إنشاء الحساب: " + error.message);
    }
  });
}

// 🔹 تسجيل الدخول (Login)
const loginForm = document.querySelector(".login-box");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // حفظ UID في localStorage
      localStorage.setItem("uid", user.uid);

      console.log("✅ تم تسجيل الدخول:", user);
      alert("مرحبًا بك 🎉");
      window.location.href = "../index.html";
    } catch (error) {
      console.error("❌ خطأ:", error.message);
      alert("فشل تسجيل الدخول: " + error.message);
    }
  });
}
