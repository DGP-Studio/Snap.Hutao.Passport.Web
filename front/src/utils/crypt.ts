import forge from 'node-forge';

const PUBLIC_KEY =
  '-----BEGIN PUBLIC KEY-----' +
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5W2SEyZSlP2zBI1Sn8Gd' +
  'TwbZoXlUGNKyoVrY8SVYu9GMefdGZCrUQNkCG/Np8pWPmSSEFGd5oeug/oIMtCZQ' +
  'NOn0drlR+pul/XZ1KQhKmj/arWjN1XNok2qXF7uxhqD0JyNT/Fxy6QvzqIpBsM9S' +
  '7ajm8/BOGlPG1SInDPaqTdTRTT30AuN+IhWEEFwT3Ctv1SmDupHs2Oan5qM7Y3uw' +
  'b6K1rbnk5YokiV2FzHajGUymmSKXqtG1USZzwPqImpYb4Z0M/StPFWdsKqexBqMM' +
  'mkXckI5O98GdlszEmQ0Ejv5Fx9fR2rXRwM76S4iZTfabYpiMbb4bM42mHMauupj6' +
  '9QIDAQAB' +
  '-----END PUBLIC KEY-----';
const publicKeyObj = forge.pki.publicKeyFromPem(PUBLIC_KEY);
const rsaEncrypt = (str: string) => {
  const encrypted = publicKeyObj.encrypt(str, 'RSA-OAEP', {
    md: forge.md.sha1.create(),
  });
  return forge.util.encode64(encrypted);
};

const sha256hash = (str: string) => {
  return forge.sha256.create().update(str).digest().toHex().toString();
}

export {rsaEncrypt, sha256hash};
