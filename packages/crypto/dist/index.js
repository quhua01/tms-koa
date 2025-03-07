"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeAccountV1 = exports.encodeAccountV1 = exports.Crypto = void 0;
const crypto_js_1 = require("crypto-js");
class Encrypt {
    v1(text, key) {
        if (key.length !== 16)
            return [false, '秘钥长度不足16位'];
        key = crypto_js_1.default.enc.Utf8.parse(key);
        let rst = crypto_js_1.default.AES.encrypt(text, key, {
            mode: crypto_js_1.default.mode.ECB,
            padding: crypto_js_1.default.pad.Pkcs7,
        });
        return [true, rst.toString()];
    }
    v2(text) {
        let buff = Buffer.from(text);
        return [true, buff.toString('base64')];
    }
}
class Decrypt {
    v1(text, key) {
        if (key.length !== 16)
            return [false, '秘钥长度不足16位'];
        key = crypto_js_1.default.enc.Utf8.parse(key);
        let rst = crypto_js_1.default.AES.decrypt(text, key, {
            mode: crypto_js_1.default.mode.ECB,
            padding: crypto_js_1.default.pad.Pkcs7,
        });
        return [true, rst.toString(crypto_js_1.default.enc.Utf8)];
    }
    v2(text) {
        let buff = Buffer.from(text, 'base64');
        return [true, buff.toString('utf-8')];
    }
}
class Crypto {
}
exports.Crypto = Crypto;
Crypto.encrypt = new Encrypt();
Crypto.decrypt = new Decrypt();
function encodeAccountV1(accountInfo) {
    let username = accountInfo.username;
    let password = accountInfo.password;
    let key = accountInfo.adc || '12345678910ADc,.';
    let unRst = Crypto.encrypt.v1(username, key);
    if (unRst[0] === false)
        return [false, unRst[1]];
    else
        username = unRst[1];
    let pwdRst = Crypto.encrypt.v1(password, key);
    if (pwdRst[0] === false)
        return [false, pwdRst[1]];
    else
        password = pwdRst[1];
    return [true, { username, password }];
}
exports.encodeAccountV1 = encodeAccountV1;
function decodeAccountV1(ctx) {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let key = ctx.request.query.adc || ctx.request.body.adc || '12345678910ADc,.';
    let unRst = Crypto.decrypt.v1(username, key);
    if (unRst[0] === false)
        return [false, unRst[1]];
    else
        username = unRst[1];
    let pwdRst = Crypto.decrypt.v1(password, key);
    if (pwdRst[0] === false)
        return [false, pwdRst[1]];
    else
        password = pwdRst[1];
    return [true, { username, password }];
}
exports.decodeAccountV1 = decodeAccountV1;
