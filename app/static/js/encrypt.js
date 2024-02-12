function rsaEncrypt(message) {
	let publicKey = "-----BEGIN PUBLIC KEY-----" +
		"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5W2SEyZSlP2zBI1Sn8Gd" +
		"TwbZoXlUGNKyoVrY8SVYu9GMefdGZCrUQNkCG/Np8pWPmSSEFGd5oeug/oIMtCZQ" +
		"NOn0drlR+pul/XZ1KQhKmj/arWjN1XNok2qXF7uxhqD0JyNT/Fxy6QvzqIpBsM9S" +
		"7ajm8/BOGlPG1SInDPaqTdTRTT30AuN+IhWEEFwT3Ctv1SmDupHs2Oan5qM7Y3uw" +
		"b6K1rbnk5YokiV2FzHajGUymmSKXqtG1USZzwPqImpYb4Z0M/StPFWdsKqexBqMM" +
		"mkXckI5O98GdlszEmQ0Ejv5Fx9fR2rXRwM76S4iZTfabYpiMbb4bM42mHMauupj6" +
		"9QIDAQAB" +
		"-----END PUBLIC KEY-----";
	const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
	let encrypted = publicKeyObj.encrypt(message, 'RSA-OAEP', {
		md: forge.md.sha1.create()
	});
	return forge.util.encode64(encrypted);
}

function hashEmail(email) {
	if (!email) {
		return 0;
	}

	return CryptoJS.SHA256(email).toString();
}