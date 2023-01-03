function draw() {
    //描画コンテキストの取得
    var canvas = document.getElementById('sample');
    if (canvas.getContext) {
        console.log('描画開始');
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        var toeX = 250;
        var toeY = 245;
        var doutaiLength = Number(document.getElementById('bodyHeight').value) * 0.55 * 2 / 3;
        var headRadius = Number(document.getElementById('bodyHeight').value) * 0.55 * 1 / 8;
        var neckLength = Number(document.getElementById('bodyHeight').value) * 0.55 * 1 / 12;
        var hizaUeLength = Number(document.getElementById('bodyHeight').value) * 0.45 * 3 / 8;
        var hizaShitaLength = Number(document.getElementById('bodyHeight').value) * 0.45 * 5 / 8;
        var footLength = 24;
        //地面と足の角度
        var footAngle = Number(document.getElementById('footAngle').value);
        //足首の角度
        var ankleAngle = Number(document.getElementById('ankleAngle').value) + footAngle - 180;
        //膝の角度
        var kneeAngle = 180 - (Number(document.getElementById('kneeAngle').value) - ankleAngle);
        //股関節の角度
        var kokansetsuAngle = Number(document.getElementById('kokansetsuAngle').value) + kneeAngle - 180;
        //首の角度
        var neckAngle = Number(document.getElementById('neckAngle').value) + kokansetsuAngle;


        //各点の座標
        var ankleX = toeX - footLength * Math.cos(footAngle * (Math.PI / 180));
        var ankleY = toeY - footLength * Math.sin(footAngle * (Math.PI / 180));
        var kneeX = ankleX - hizaShitaLength * Math.cos(ankleAngle * (Math.PI / 180));
        var kneeY = ankleY - hizaShitaLength * Math.sin(ankleAngle * (Math.PI / 180));
        var kokansetsuX = kneeX - hizaUeLength * Math.cos(kneeAngle * (Math.PI / 180));
        var kokansetsuY = kneeY - hizaUeLength * Math.sin(kneeAngle * (Math.PI / 180));
        var shoulderX = kokansetsuX - doutaiLength * Math.cos(kokansetsuAngle * (Math.PI / 180));
        var shoulderY = kokansetsuY - doutaiLength * Math.sin(kokansetsuAngle * (Math.PI / 180));
        var headX = shoulderX - ((neckLength + headRadius) * Math.cos(neckAngle * (Math.PI / 180)));
        var headY = shoulderY - ((neckLength + headRadius) * Math.sin(neckAngle * (Math.PI / 180)));

        //新しいパスを開始する
        context.beginPath();
        context.lineWidth = 2;
        context.moveTo(toeX, toeY);
        context.lineTo(ankleX, ankleY);
        context.strokeStyle = '#FFF';
        context.stroke();

        context.beginPath();
        context.lineWidth = 2;
        context.moveTo(kneeX, kneeY);
        context.lineTo(kokansetsuX, kokansetsuY);
        context.stroke();

        context.beginPath();
        context.strokeStyle = '#FFF';
        context.moveTo(kokansetsuX, kokansetsuY);
        context.lineTo(shoulderX, shoulderY);
        context.stroke();


        context.beginPath();
        context.lineWidth = 2;
        context.moveTo(kneeX, kneeY);
        context.lineTo(ankleX, ankleY);
        context.stroke();

        context.beginPath();
        context.lineWidth = 2;
        context.moveTo(shoulderX, shoulderY);
        context.lineTo(headX, headY);

        //パスを閉じる（最後の座標から開始座標に向けてラインを引く）
        //context.closePath();
        //現在のパスを輪郭表示する
        context.stroke();
        //　円を描く（頭の部分）
        context.beginPath();
        context.strokeStyle = '#FFF';//　線の色調整
        context.lineWidth = 2;//　線の太さ調整
        context.arc(headX, headY, headRadius, 0, Math.PI * 2, false);
        context.stroke();

        // 関節の描画
        context.beginPath();
        context.strokeStyle = '#900'
        context.arc(shoulderX, shoulderY, 3, 0, Math.PI * 2, false);
        context.fillStyle = '#900'
        context.fill();
        context.stroke();
        context.beginPath();
        context.strokeStyle = '#900'
        context.arc(kokansetsuX, kokansetsuY, 3, 0, Math.PI * 2, false);
        context.fillStyle = '#900'
        context.fill();
        context.stroke();
        context.beginPath();
        context.strokeStyle = '#900'
        context.arc(kneeX, kneeY, 3, 0, Math.PI * 2, false);
        context.fillStyle = '#900'
        context.fill();
        context.stroke();
        context.beginPath();
        context.strokeStyle = '#900'
        context.arc(ankleX, ankleY, 3, 0, Math.PI * 2, false);
        context.fillStyle = '#900'
        context.fill();
        context.stroke();
        context.beginPath();
        context.strokeStyle = '#900'
        context.arc(toeX, toeY, 3, 0, Math.PI * 2, false);
        context.fillStyle = '#900'
        context.fill();
        context.stroke();
    }
}

function triple() {
    document.getElementById('kokansetsuAngle').setAttribute('value', Number(document.getElementById('kokansetsuAngle').value) + Number(document.getElementById('tripleExtensionAngle').value))
    document.getElementById('kneeAngle').setAttribute('value', Number(document.getElementById('kneeAngle').value) + Number(document.getElementById('tripleExtensionAngle').value))
    document.getElementById('ankleAngle').setAttribute('value', Number(document.getElementById('ankleAngle').value) + Number(document.getElementById('tripleExtensionAngle').value))
    document.getElementById('footAngle').setAttribute('value', Number(document.getElementById('footAngle').value) - Number(document.getElementById('tripleExtensionAngle').value))
    draw()
}