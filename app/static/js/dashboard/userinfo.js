function showUserInfo() {
  // 请求 GitHub 授权状态
  fetch("https://homa.snapgenshin.com/OAuth/Github/AuthorizationStatus", {
    headers: {
      "Authorization": BearerWrap(getToken())
    }
  })
    .then(response => response.json())
    .then(data => {
      // 更新绑定状态
      let isAuthorized = data.data.IsAuthorized;

      document.getElementById("user-info-github-status").textContent = isAuthorized ? "已绑定" : "未绑定";
      document.getElementById("user-info-bind-github-btn").style.display = isAuthorized ? "none" : "block";
      document.getElementById("user-info-unbind-github-btn").style.display = isAuthorized ? "block" : "none";
    })
    .catch(error => console.log(error));

  new Promise(function (resolve, reject) {
    let checkInterval = setInterval(function () {
      let userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        clearInterval(checkInterval);
        resolve(userInfo);
      }
    }, 500);
  }).then(userInfo => updateUserInfo(JSON.parse(userInfo)))
}

function updateUserInfo(data) {
  document.getElementById("user-info-avatar").src = "https://www.gravatar.com/avatar/" + hashEmail(data.data.UserName);
  document.getElementById("user-info-email").textContent = data.data.UserName;
  document.getElementById("user-info-developer").textContent = data.data.IsLicensedDeveloper ? "是" : "否";
  document.getElementById("user-info-maintainer").textContent = data.data.IsMaintainer ? "是" : "否";
  document.getElementById("user-info-gacha-expire").textContent = new Date(data.data.GachaLogExpireAt).toLocaleString();
}

function BindGithub() {
  window.location.href = `https://homa.snapgenshin.com/OAuth/Github/RedirectLogin?token=${encodeURIComponent(getToken())}`
}

function UnbindGithub() {
  fetch("https://homa.snapgenshin.com/OAuth/Github/UnAuthorize", {
    headers: {
      "Authorization": BearerWrap(getToken())
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.retcode === 0) {
        alert("解绑成功");
        window.location.reload();
      } else {
        alert("解绑失败：" + data.message);
      }
    })
}