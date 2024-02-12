function logout() {
	clearCookies()
	localStorage.clear();
	window.location.href = "login.html";
}

/**
 * @param state user-info, security, hutao-cloud, management
 */
function showContent(state) {
	for (let tab_div of document.getElementsByClassName('tab-div')) {
		tab_div.style.display = 'none';
	}

	switch (state) {
		case 'user-info':
			document.getElementById('user-info').style.display = 'block';
			showUserInfo();
			break;
		case 'security':
			document.getElementById('security').style.display = 'block';
			break;
		case 'hutao-cloud':
			document.getElementById('hutao-cloud').style.display = 'block';
			showHutaoCloud();
			break;
		case 'management':
			document.getElementById('management').style.display = 'block';
			break;
		default:
			alert('Unknown content type')
			break;
	}
}

function setSidebarUserInfo(userInfo) {
	document.getElementById("nav-avatar").src = "https://www.gravatar.com/avatar/" + hashEmail(userInfo.data.UserName);
	document.getElementById("nav-username").textContent = userInfo.data.UserName;
	document.getElementById("nav-management").style.display = (userInfo.data.IsLicensedDeveloper || userInfo.data.IsMaintainer) ? 'block' : 'none';
}

window.onload = function () {
	// init user info
	let token = getToken();
	if (!token) {
		window.location.href = "login.html";
	}

	if (!localStorage.getItem("userInfoExpire") || Date.now() >= parseInt(localStorage.getItem("userInfoExpire"))) {
		localStorage.removeItem("userInfo")
	}

	fetch("https://homa.snapgenshin.com/Passport/UserInfo", {
		headers: {
			"Authorization": BearerWrap(token)
		}
	})
		.then(response => response.json())
		.then(data => {
			let userInfo = JSON.stringify(data);
			localStorage.setItem("userInfo", userInfo);
			localStorage.setItem("userInfoExpire", (Date.now() + 1000 * 60 * 60 * 3).toString());

			setSidebarUserInfo(data)
		})
		.catch(error => console.log(error));

	if (window.location.hash === '') {
		showContent('user-info')
	} else {
		showContent(window.location.hash.slice(1))
	}
};