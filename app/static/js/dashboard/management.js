function compensateHutaoCloud() {
	let days = document.getElementById("management-compensation-days-input").value

	if (!days) {
		alert("Please input valid days");
		return;
	}

	if (confirm(`Confirm to compensate ${days} days?`)) {
		fetch(`https://homa.snapgenshin.com/Service/GachaLog/Compensation?days=${days}`, {
			headers: {
				"Authorization": BearerWrap(getToken())
			}
		}).then(response => response.json())
			.then(data => {
				if (data.retcode === 0) {
					alert("Success, " + data.message);
				} else {
					alert("Failed, " + data.message);
				}
			})
			.catch(error => {
				console.error("Error:", error);
				alert("Error, " + error);
			});
	}
}

function designateHutaoCloud() {
	let username = document.getElementById("management-designation-user-input").value
	let days = document.getElementById("management-designation-days-input").value

	if (!username || !days) {
		alert("Please input valid username and days");
		return;
	}

	if (confirm(`Confirm to designate ${username} for ${days} days?`)) {
		fetch(`https://homa.snapgenshin.com/Service/GachaLog/Designation?userName=${username}&days=${days}`, {
			headers: {
				"Authorization": BearerWrap(getToken())
			}
		}).then(response => response.json())
			.then(data => {
				if (data.retcode === 0) {
					alert("Success, " + data.message);
				} else {
					alert("Failed, " + data.message);
				}
			})
			.catch(error => {
				console.error("Error:", error);
				alert("Error, " + error);
			});
	}
}

function uploadAnn() {
	let title = document.getElementById("management-ann-title").value
	let link = document.getElementById("management-ann-link").value
	let maxVersion = document.getElementById("management-ann-version-threshold").value
	let content = document.getElementById("management-ann-content").value
	let severity = document.getElementById("management-ann-severity").value

	let data = {}

	if (title) {
		data["Title"] = title
	}

	if (link) {
		data["Link"] = link
	}

	if (maxVersion) {
		data["MaxPresentVersion"] = maxVersion
	}

	if (content) {
		data["Content"] = content
	}

	if (severity) {
		data["Severity"] = parseInt(severity)
	}

	if (maxVersion && !/^\d+\.\d+\.\d+\.\d+$/.test(maxVersion)) {
		alert("Please input valid version. e.g. 1.9.5.0");
		return;
	}

	if (confirm(`Confirm to upload announcement?\nUpload body: ${JSON.stringify(data)}`)) {
		fetch("https://homa.snapgenshin.com/Service/Announcement/Upload", {
			method: "POST",
			headers: {
				"Authorization": BearerWrap(getToken()),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(response => response.json())
			.then(data => {
				if (data.retcode === 0) {
					alert("Success, " + data.message);
				} else {
					alert("Failed, " + data.message);
				}
			})
			.catch(error => {
				console.error("Error:", error);
				alert("Error, " + error);
			});
	}
}