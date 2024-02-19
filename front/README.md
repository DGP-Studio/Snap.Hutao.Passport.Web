## 框架文档

[https://pro.arco.design/](https://pro.arco.design/)

## 设计文档

https://g1fsgaeigj1.feishu.cn/docx/O5IedaHMeoDZfXxDIKUc3oy2nzd

## 本地启动
```
pnpm run dev
```


## 接口返回
https://homa.snapgenshin.com/Passport/Login

```json
{
  "retcode": 514002,
  "message": "邮箱或密码不正确",
  "l10nKey": "ServerPassportUserNameOrPasswordIncorrect"
}
```

```json
{
  "data": "eyJhbGciOiJIUzI1NiI5cCIX6IkpXVCJ9.eyJVc2VySWQiOiI0NDA1NyeIsIm5iZiI6MTcwODI2NXQ...",
  "retcode": 0,
  "message": "登录成功",
  "l10nKey": "ServerPassportLoginSucceed"
}
```

https://homa.snapgenshin.com/Passport/UserInfo
```json
{
  "data": {
    "NormalizedUserName": "X@gmail.COM",
    "UserName": "x@gmail.com",
    "IsLicensedDeveloper": false,
    "IsMaintainer": false,
    "GachaLogExpireAt": "1970-01-01T00:00:00+00:00"
  },
  "retcode": 0,
  "message": "获取用户信息成功"
}
```
