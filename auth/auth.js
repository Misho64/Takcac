import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// تهيئة Firestore
const db = getFirestore();

// التعامل مع الفورم
const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // يمنع إعادة تحميل الصفحة

  const displayName = document.getElementById("displayName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    // إنشاء الحساب
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // حفظ الاسم في Firestore مع uid كمفتاح
    await setDoc(doc(db, "users", user.uid), {
      name: displayName,
      email: email
    });

    // حفظ UID في localStorage
    localStorage.setItem("uid", user.uid);

    // توجيه المستخدم إلى home.html
    window.location.href = "../home.html";
  } catch (error) {
    alert("حدث خطأ: " + error.message);
    console.error("خطأ في التسجيل:", error);
  }
});
