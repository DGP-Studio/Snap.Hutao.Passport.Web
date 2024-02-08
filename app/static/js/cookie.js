function getCookie(key) {
	return loadCookies()[key]
}

/**
 * Set Cookie
 * @param key
 * @param value
 * @param expires Timestamp, refers to Date.getTime()
 * @param path
 * @param domain
 */
function setCookie(key, value, expires, path = "/", domain = window.location.hostname) {
	document.cookie = `${key}=${value}; expires=${new Date(expires).toUTCString()}; path=${path}; domain=${domain}`;
}

function clearCookies() {
	let cookies = loadCookies()
	for (let key of Object.keys(cookies)) {
		setCookie(key, "", new Date(0).getTime())
	}
}

function loadCookies() {
	const cookiesStr = document.cookie;
	const cookieParts = cookiesStr.split(";");

	let cookies = {}

	for (let cookieStr of cookieParts) {
		if (cookieStr.indexOf("expires") === -1 && cookieStr.indexOf("domain") === -1 && cookieStr.indexOf("path") === -1) {
			let kv = cookieStr.split("=")
			cookies[kv[0]] = kv[1]
		}
	}

	return cookies
}