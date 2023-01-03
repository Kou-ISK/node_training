$(function () {
    $('#registration-form').submit(function () {
        var usernameValue = $('#name').val();
        var emailValue = $('#email').val();
        var errorCount = 0;

        if (usernameValue === "") {
            $('#username-error-message').text('ユーザー名を入力してください');
            errorCount += 1;
        } else {
            $('#username-error-message').text('');
        }

        if (emailValue === "") {
            $('#email-error-message').text('メールアドレスを入力してください');
            errorCount += 1;
        } else if (!emailValue.match(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
            $('#email-error-message').text('メールアドレスが正しくありません');
            errorCount += 1;
        } else {
            $('#email-error-message').text('');
        }

        if (errorCount !== 0) {
            return false;
        }
    });
});
