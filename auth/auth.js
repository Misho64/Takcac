import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("register-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // منع إعادة تحميل الصفحة

  const displayName = document.getElementById("displayName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // إنشاء المستخدم
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // حفظ الاسم في Firestore
    await setDoc(doc(db, "users", user.uid), {
      displayName: displayName,
      email: email
    });

    // حفظ UID في localStorage لاستخدامه لاحقًا
    localStorage.setItem("uid", user.uid);

    // تحويل المستخدم إلى صفحة home
    window.location.href = "../home.html";
  } catch (error) {
    console.error("حدث خطأ:", error.code, error.message);
    alert("حدث خطأ: " + error.message);
  }
});
