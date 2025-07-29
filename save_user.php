<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"] ?? '';
    $password = $_POST["password"] ?? '';
    $birthdate = $_POST["birthdate"] ?? '';

    // تحقق من صحة البيانات
    if (strlen($password) < 10) {
        die("كلمة المرور يجب أن تكون 10 أحرف على الأقل.");
    }

    // تشفير كلمة المرور
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // تنسيق البيانات
    $entry = "الاسم: $username | كلمة السر: $hashedPassword | تاريخ الميلاد: $birthdate" . PHP_EOL;

    // حفظ في ملف key.txt
    file_put_contents("key.txt", $entry, FILE_APPEND | LOCK_EX);

    // إعادة التوجيه بعد التسجيل
    header("Location: auth/login.html");
    exit;
} else {
    echo "طريقة الطلب غير صحيحة.";
}
?>
