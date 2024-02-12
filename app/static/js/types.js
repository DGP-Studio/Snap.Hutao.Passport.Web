/**
 * @typedef {object} UserInfo
 * @property {string} UserName - Original username
 * @property {string} NormalizedUserName - Upper username
 * @property {boolean} IsLicensedDeveloper - Is licensed developer
 * @property {boolean} IsMaintainer - Is maintainer
 * @property {string} GachaLogExpireAt - Gacha log service (Hutao Cloud) expiration time
 */

/**
 * @typedef {object} AuthorizationStatus
 * @property {boolean} IsAuthorized - Is authorized with GitHub
 * @property {string} RefreshToken - GitHub Refresh token
 * @property {int} ExpiresAt - GitHub Refresh token expiration time
 */

/**
 * @typedef {object} GachaEntry
 * @property {string} Uid - Uid
 * @property {boolean} Excluded - Excluded from statistics
 * @property {int} ItemCount - Item count
 */