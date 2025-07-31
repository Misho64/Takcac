// استيراد التهيئة والمصادقة من Firebase
import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔹 تسجيل حساب جديد (Register)
const registerForm = document.querySelector(".register-box");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // تم إنشاء الحساب بنجاح
        const user = userCredential.user;
        console.log("✅ تم التسجيل:", user);
        alert("تم إنشاء الحساب بنجاح 🎉");
        window.location.href = "login.html"; // إعادة التوجيه إلى صفحة تسجيل الدخول
      })
      .catch((error) => {
        console.error("❌ خطأ:", error.message);
        alert("فشل في إنشاء الحساب: " + error.message);
      });
  });
}

// 🔹 تسجيل الدخول (Login)
const loginForm = document.querySelector(".login-box");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // تم تسجيل الدخول بنجاح
        const user = userCredential.user;
        console.log("✅ تم تسجيل الدخول:", user);
        alert("مرحبًا بك 🎉");
        window.location.href = "../index.html"; // إعادة التوجيه إلى الصفحة الرئيسية
      })
      .catch((error) => {
        console.error("❌ خطأ:", error.message);
        alert("فشل تسجيل الدخول: " + error.message);
      });
  });
}
