function resetPassword() {
	let userInfo = JSON.parse(localStorage.getItem("userInfo"))

	let captcha = document.getElementById("security-reset-password-captcha").value
	let newPassword = document.getElementById("security-reset-password-input").value

	let data = {
		"UserName": rsaEncrypt(userInfo.data.UserName),
		"Password": rsaEncrypt(newPassword),
		"VerifyCode": rsaEncrypt(captcha)
	}

	fetch("https://homa.snapgenshin.com/Passport/ResetPassword", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(response => response.json())
		.then(data => {
			if (data.retcode === 0) {
				alert("重置成功")
			} else {
				alert("重置失败：" + data.message)
			}

		})
}

function cancelAccount() {
	let userInfo = JSON.parse(localStorage.getItem("userInfo"))

	let captcha = document.getElementById("security-cancel-account-captcha").value
	let password = document.getElementById("security-cancel-account-password").value

	let data = {
		"UserName": rsaEncrypt(userInfo.data.UserName),
		"Password": rsaEncrypt(password),
		"VerifyCode": rsaEncrypt(captcha)
	}

	fetch("https://homa.snapgenshin.com/Passport/CancelRegistration", {
		method: "POST",
		headers: {
			"Authorization": BearerWrap(getToken()),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(response => response.json())
		.then(data => {
			if (data.retcode === 0) {
				alert("注销成功")
			} else {
				alert("注销失败：" + data.message)
			}
		})
}

/**
 * @param type reset, cancel
 */
function captcha(type) {
	let userInfo = JSON.parse(localStorage.getItem("userInfo"))

	let data = {"UserName": rsaEncrypt(userInfo.data.UserName)}
	switch (type) {
		case "reset":
			data["IsResetPassword"] = true
			break
		case "cancel":
			data["IsCancelRegistration"] = true
			break
	}

	fetch("https://homa.snapgenshin.com/Passport/Verify", {
		method: "POST",
		headers: {
			"Authorization": BearerWrap(getToken()),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(response => response.json())
		.then(data => {
			if (data.retcode === 0) {
				alert("验证码已发送")
			} else {
				alert("发送失败：" + data.message)
			}
		})
}