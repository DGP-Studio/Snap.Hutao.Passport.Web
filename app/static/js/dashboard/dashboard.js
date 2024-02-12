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
			document.getElementById('user-info').style.display = 'block';
			showUserInfo();
			break;
		case 'security':
			document.getElementById('security').style.display = 'block';
			break;
		case 'hutaocloud':
			document.getElementById('hutao-cloud').style.display = 'block';
			showHutaoCloud(); // TODO
			break;
		case 'management':
			document.getElementById('management').style.display = 'block';
			break;
		default:
			alert('Unknown content type')
			break;
	}
}