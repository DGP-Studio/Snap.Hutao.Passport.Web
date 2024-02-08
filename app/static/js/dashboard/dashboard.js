function logout() {
	clearCookies()
	localStorage.clear();
	window.location.href = "login.html";
}

/**
 * @param state userinfo, security, hutaocloud, management
 */
function showContent(state) {
	for (let tab_div of document.getElementsByClassName('tab-div')) {
		tab_div.style.display = 'none';
	}

	switch (state) {
		case 'userinfo':
			document.getElementById('user-info-tab').style.display = 'block';
			showUserInfo();
			break;
		case 'security':
			document.getElementById('security-tab').style.display = 'block';
			break;
		case 'hutaocloud':
			document.getElementById('hutao-cloud-tab').style.display = 'block';
			showHutaoCloud(); // TODO
			break;
		case 'management':
			document.getElementById('management-tab').style.display = 'block';
			break;
		default:
			alert('Unknown content type')
			break;
	}
}