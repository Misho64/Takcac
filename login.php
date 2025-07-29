<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST["username"]);
    $password = trim($_POST["password"]);

    // التحقق من وجود الحقول
    if (empty($username) || empty($password)) {
        die("❌ يجب ملء جميع الحقول.");
    }

    $file = 'key.txt';
    $found = false;

    if (file_exists($file)) {
        $users = file($file, FILE_IGNORE_NEW_LINES);

        foreach ($users as $line) {
            list($savedUser, $savedPass, $savedBirth) = explode('|', $line);

            if ($savedUser === $username && $savedPass === $password) {
                $found = true;
                break;
            }
        }
    }

    if ($found) {
        // نجاح الدخول - يمكنك تغييره لصفحة ترحيب
        header("Location: welcome.html");
        exit;
    } else {
        die("❌ اسم المستخدم أو كلمة المرور غير صحيحة.");
    }
}
?>
