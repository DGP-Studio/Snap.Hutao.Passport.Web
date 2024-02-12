function showUserInfo() {
	let token = getToken();
	if (!token) {
		window.location.href = "login.html";
	}

	let cachedUserInfo = localStorage.getItem("userInfo");
	if (cachedUserInfo) {
		let userInfo = JSON.parse(cachedUserInfo);
		updateUserInfo(userInfo);
		let userEmailFromLocalStorage = localStorage.getItem("userEmail");
		document.getElementById("nav-avatar").src = "https://www.gravatar.com/avatar/" + hashEmail(userEmailFromLocalStorage);
	} else {
		fetch("https://homa.snapgenshin.com/Passport/UserInfo", {
			headers: {
				"Authorization": BearerWrap(token)
			}
		})
			.then(response => response.json())
			.then(data => {
				updateUserInfo(data);
				localStorage.setItem("userInfo", JSON.stringify(data));
			})
			.catch(error => console.log(error));
	}

	// 请求 GitHub 授权状态
	fetch("https://homa.snapgenshin.com/OAuth/Github/AuthorizationStatus", {
		headers: {
			"Authorization": BearerWrap(token)
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
}

function hashEmail(email) {
	if (!email) {
		return 0;
	}

	return CryptoJS.SHA256(email).toString();
}

function updateUserInfo(data) {
	let userEmailFromLocalStorage = localStorage.getItem("userEmail");
	document.getElementById("user-info-avatar").src = "https://www.gravatar.com/avatar/" + hashEmail(userEmailFromLocalStorage);
	document.getElementById("user-info-email").textContent = userEmailFromLocalStorage;
	document.getElementById("user-info-developer").textContent = data.data.IsLicensedDeveloper ? "是" : "否";
	document.getElementById("user-info-maintainer").textContent = data.data.IsMaintainer ? "是" : "否";
	document.getElementById("user-info-gacha-expire").textContent = new Date(data.data.GachaLogExpireAt).toLocaleString();
	document.getElementById("nav-avatar").src = "https://www.gravatar.com/avatar/" + hashEmail(userEmailFromLocalStorage);
	document.getElementById("nav-username").textContent = userEmailFromLocalStorage;

	document.getElementById("nav-management").style.display = (data.data.IsLicensedDeveloper || data.data.IsMaintainer) ? 'block' : 'none';
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