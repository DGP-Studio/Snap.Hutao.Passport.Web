function showMessageBlock(text, isError) {
  let messageElement = document.getElementById('message');
  let messageTextElement = document.getElementById('message-text');

  messageTextElement.textContent = text;
  messageElement.style.backgroundColor = isError ? '#f8d7da' : '#d4edda';
  messageElement.style.color = isError ? '#721c24' : '#155724';
  messageElement.style.display = 'block';

  if (isError) {
    setTimeout(function () {
      messageElement.style.display = 'none';
    }, 3000);
  }
}

function adjustImageSize() {
  let container = document.querySelector('.container');
  let image = document.querySelector('#login-image');
  let size = Math.min(container.offsetWidth, container.offsetHeight) * 0.35;
  size = Math.min(size, 256);
  image.style.width = size + 'px';
  image.style.height = size + 'px';
}

function login(normalEmail, encryptedEmail, encryptedPassword) {
  showMessageBlock('正在登录中...', false);

  fetch('https://homa.snapgenshin.com/Passport/Login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      UserName: encryptedEmail,
      Password: encryptedPassword
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.retcode === 0) {
        setTokenWithExpiry(data.data);

        localStorage.setItem('userEmail', normalEmail);
        localStorage.setItem('e', encryptedEmail);
        localStorage.setItem('p', encryptedPassword);
        showMessageBlock('登录成功', false);
        setTimeout(function () {
          window.location.href = 'dashboard.html';
        }, 1000);
      } else {
        showMessageBlock('登录失败：' + data.message, true);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showMessageBlock('登录失败：' + error, true);
    });
}

window.addEventListener('resize', adjustImageSize);
window.addEventListener('load', function () {
  const token = getToken()

  if (token) {
    const tokenExp = getTokenExp(token);

    if (Date.now() < tokenExp) {
      window.location.href = 'dashboard.html';
    } else {
      const encryptedEmail = localStorage.getItem('e');
      const encryptedPassword = localStorage.getItem('p');
      const email = localStorage.getItem('userEmail');

      if (!encryptedEmail || !encryptedPassword || !email) {
        showMessageBlock('当前账号已登出', true);
        setTimeout(function () {
          showMessageBlock('', false);
        }, 3000);
      } else {
        login(email, encryptedEmail, encryptedPassword);
      }
    }
  } else {
    adjustImageSize();
  }
});

document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault();

  let email = document.getElementById('email-input').value;
  let password = document.getElementById('password-input').value;

  Promise.all([rsaEncrypt(email), rsaEncrypt(password)])
    .then(([encryptedEmail, encryptedPassword]) => {
      login(email, encryptedEmail, encryptedPassword);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});