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
		document.getElementById("sidebarAvatar").src = "https://www.gravatar.com/avatar/" + hashEmail(userEmailFromLocalStorage);
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

			let githubStatus = document.getElementById("githubStatus");
			let bindGithub = document.getElementById("bindGithub");
			let unbindGithub = document.getElementById("unbindGithub");
			if (isAuthorized) {
				githubStatus.textContent = "已绑定";
				unbindGithub.style.display = "block";
			} else {
				githubStatus.textContent = "未绑定";
				bindGithub.style.display = "block";
			}
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
	document.getElementById("userAvatar").src = "https://www.gravatar.com/avatar/" + hashEmail(userEmailFromLocalStorage);
	document.getElementById("userEmail").textContent = userEmailFromLocalStorage;
	document.getElementById("isDeveloper").textContent = data.data.IsLicensedDeveloper ? "是" : "否";
	document.getElementById("isMaintainer").textContent = data.data.IsMaintainer ? "是" : "否";
	document.getElementById("gachaLogExpire").textContent = new Date(data.data.GachaLogExpireAt).toLocaleString();
	document.getElementById("sidebarAvatar").src = "https://www.gravatar.com/avatar/" + hashEmail(userEmailFromLocalStorage);
	document.getElementById("sidebarUsername").textContent = userEmailFromLocalStorage;

	document.getElementById("management-nav-tab").style.display = (data.data.IsLicensedDeveloper || data.data.IsMaintainer) ? 'block' : 'none';
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