function runStatistics() {
	fetch("https://homa.snapgenshin.com/Statistics/Run", {
		headers: {
			"Authorization": BearerWrap(getToken())
		}
	}).then(response => response.json())
		.then(data => {
			if (data.retcode === 0) {
				alert("操作成功");
			} else {
				alert("操作失败：" + data.message);
			}
		})
		.catch(error => {
			console.error("Error:", error);
			alert("操作失败：" + error);
		});
}

function compensateHutaoCloud() {
	let days = document.getElementById("management-compensation-days-input").value

	fetch(`https://homa.snapgenshin.com/GachaLog/Compensation?days=${days}`, {
		headers: {
			"Authorization": BearerWrap(getToken())
		}
	}).then(response => response.json())
		.then(data => {
			if (data.retcode === 0) {
				alert("操作成功，" + data.message);
			} else {
				alert("操作失败：" + data.message);
			}
		})
		.catch(error => {
			console.error("Error:", error);
			alert("操作失败：" + error);
		});
}

function designateHutaoCloud() {
	let username = document.getElementById("management-designation-user-input").value
	let days = document.getElementById("management-designation-days-input").value

	fetch(`https://homa.snapgenshin.com/GachaLog/Designation?userName=${username}&days=${days}`, {
		headers: {
			"Authorization": BearerWrap(getToken())
		}
	}).then(response => response.json())
		.then(data => {
			if (data.retcode === 0) {
				alert("操作成功，" + data.message);
			} else {
				alert("操作失败：" + data.message);
			}
		})
		.catch(error => {
			console.error("Error:", error);
			alert("操作失败：" + error);
		});
}

function uploadAnn() {
	let title = document.getElementById("management-ann-title").value
	let link = document.getElementById("management-ann-link").value
	let maxVersion = document.getElementById("management-ann-version-threshold").value
	let content = document.getElementById("management-ann-content").value
	let severity = document.getElementById("management-ann-severity").value

	let data = {"Title": title, "Link": link, "MaxPresentVersion": maxVersion, "Content": content, "Severity": severity}

	fetch("https://homa.snapgenshin.com/Announcement/Upload", {
		method: "POST",
		headers: {
			"Authorization": BearerWrap(getToken()),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(response => response.json())
		.then(data => {
			if (data.retcode === 0) {
				alert("操作成功");
			} else {
				alert("操作失败：" + data.message);
			}
		})
		.catch(error => {
			console.error("Error:", error);
			alert("操作失败：" + error);
		});
}