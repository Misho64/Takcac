<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST["username"]);
    $password = trim($_POST["password"]);
    $confirmPassword = trim($_POST["confirmPassword"]);
    $birthdate = trim($_POST["birthdate"]);

    // التحقق من الحقول
    if (empty($username) || empty($password) || empty($confirmPassword) || empty($birthdate)) {
        die("❌ جميع الحقول مطلوبة.");
    }

    // التحقق من الحد الأدنى لكلمة السر
    if (strlen($password) < 10) {
        die("❌ كلمة المرور يجب أن تكون 10 أحرف على الأقل.");
    }

    // التحقق من تطابق كلمة المرور
    if ($password !== $confirmPassword) {
        die("❌ كلمة المرور غير متطابقة.");
    }

    // إنشاء السطر لتخزينه
    $dataLine = "$username|$password|$birthdate\n";

    $file = 'key.txt';

    // التحقق من تكرار اسم المستخدم
    if (file_exists($file)) {
        $existingUsers = file($file, FILE_IGNORE_NEW_LINES);
        foreach ($existingUsers as $line) {
            list($savedUser, $savedPass, $savedDate) = explode('|', $line);
            if ($savedUser === $username) {
                die("❌ اسم المستخدم موجود بالفعل.");
            }
        }
    }

    // حفظ البيانات
    file_put_contents($file, $dataLine, FILE_APPEND);

    // إعادة التوجيه بعد النجاح
    header("Location: auth/login.html");
    exit;
}
?>
