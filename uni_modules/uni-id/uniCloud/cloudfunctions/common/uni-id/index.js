"use strict";

function e(e) {
	return e && "object" == typeof e && "default" in e ? e.default : e
}
var t = e(require("fs")),
	r = e(require("path")),
	n = e(require("crypto")),
	i = e(require("querystring")),
	o = e(require("buffer")),
	s = e(require("stream")),
	a = e(require("util"));
class c extends Error {
	constructor(e) {
		super(e.message), this.errMsg = e.message || "", Object.defineProperties(this, {
			message: {
				get() {
					return `errCode: ${e.code||""} | errMsg: ` + this.errMsg
				},
				set(e) {
					this.errMsg = e
				}
			}
		})
	}
}
const u = Object.prototype.toString,
	f = Object.prototype.hasOwnProperty;

function d(e, t) {
	return f.call(e, t)
}

function l(e) {
	return "[object Object]" === u.call(e)
}

function p(e) {
	return "function" == typeof e
}

function m(e) {
	return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
}
const h = /_(\w)/g,
	g = /[A-Z]/g;

function y(e) {
	return e.replace(h, (e, t) => t ? t.toUpperCase() : "")
}

function w(e) {
	return e.replace(g, e => "_" + e.toLowerCase())
}

function v(e, t) {
	let r, n;
	switch (t) {
		case "snake2camel":
			n = y, r = h;
			break;
		case "camel2snake":
			n = w, r = g
	}
	for (const i in e)
		if (d(e, i) && r.test(i)) {
			const r = n(i);
			e[r] = e[i], delete e[i], l(e[r]) ? e[r] = v(e[r], t) : Array.isArray(e[r]) && (e[r] = e[r].map(e => v(e,
				t)))
		} return e
}

function b(e) {
	return v(e, "snake2camel")
}

function _(e) {
	return v(e, "camel2snake")
}

function E(e) {
	return function(e, t = "-") {
		e = e || new Date;
		const r = [];
		return r.push(e.getFullYear()), r.push(("00" + (e.getMonth() + 1)).substr(-2)), r.push(("00" + e.getDate())
			.substr(-2)), r.join(t)
	}(e = e || new Date) + " " + function(e, t = ":") {
		e = e || new Date;
		const r = [];
		return r.push(("00" + e.getHours()).substr(-2)), r.push(("00" + e.getMinutes()).substr(-2)), r.push(("00" +
			e.getSeconds()).substr(-2)), r.join(t)
	}(e)
}

function S() {
	"development" === process.env.NODE_ENV && console.log(...arguments)
}

function x(e = 6) {
	let t = "";
	for (let r = 0; r < e; r++) t += Math.floor(10 * Math.random());
	return t
}

function k(e) {
	return Array.from(new Set(e))
}

function C(e = {}, t) {
	if (!t || !e) return e;
	const r = ["_pre", "_purify", "_post"];
	t._pre && (e = t._pre(e));
	let n = {
		shouldDelete: new Set([])
	};
	if (t._purify) {
		const e = t._purify;
		for (const t in e) e[t] = new Set(e[t]);
		n = Object.assign(n, e)
	}
	if (l(t))
		for (const i in t) {
			const o = t[i];
			p(o) && -1 === r.indexOf(i) ? e[i] = o(e) : "string" == typeof o && -1 === r.indexOf(i) && (e[i] = e[o], n
				.shouldDelete.add(o))
		} else p(t) && (e = t(e));
	if (n.shouldDelete)
		for (const t of n.shouldDelete) delete e[t];
	return t._post && (e = t._post(e)), e
}

function j(e, t) {
	const r = new e(t);
	return new Proxy(r, {
		get: function(e, t) {
			if ("function" == typeof e[t] && 0 !== t.indexOf("_") && e._protocols && e._protocols[t]) {
				const r = e._protocols[t];
				return async function(n) {
					n = C(n, r.args);
					let i = await e[t](n);
					return i = C(i, r.returnValue), i
				}
			}
			return e[t]
		}
	})
}

function T(e) {
	let t, r, n = e - Date.now(),
		i = "后";
	n < 0 && (i = "前", n = -n);
	const o = Math.floor(n / 1e3),
		s = Math.floor(o / 60),
		a = Math.floor(s / 60),
		c = Math.floor(a / 24),
		u = Math.floor(c / 30),
		f = Math.floor(u / 12);
	switch (!0) {
		case f > 0:
			t = f, r = "年";
			break;
		case u > 0:
			t = u, r = "月";
			break;
		case c > 0:
			t = c, r = "天";
			break;
		case a > 0:
			t = a, r = "小时";
			break;
		case s > 0:
			t = s, r = "分钟";
			break;
		default:
			t = o, r = "秒"
	}
	return `${t}${r}${i}`
}
const I = async function() {};

function P(e) {
	return I.constructor === e.constructor ? async function() {
		const t = await e.apply(this, arguments);
		return l(t) && t.msg && (t.message = t.msg), t
	}: function() {
		const t = e.apply(this, arguments);
		return l(t) && t.msg && (t.message = t.msg), t
	}
}
const R = uniCloud.database(),
	A = R.collection("uni-id-users"),
	O = R.collection("opendb-verify-codes"),
	M = R.collection("uni-id-roles"),
	D = R.collection("uni-id-permissions"),
	L = 90002;
async function B({
	name: e,
	url: t,
	data: r,
	options: n,
	defaultOptions: i
}) {
	let o = {};
	const s = _(Object.assign({}, r));
	s && s.access_token && delete s.access_token;
	try {
		n = Object.assign({}, i, n, {
			data: s
		}), o = await uniCloud.httpclient.request(t, n)
	} catch (t) {
		return function(e, t) {
			throw new c({
				code: t.code || -2,
				message: t.message || e + " fail"
			})
		}(e, t)
	}
	let a = o.data;
	const u = o.headers["content-type"];
	if (!Buffer.isBuffer(a) || 0 !== u.indexOf("text/plain") && 0 !== u.indexOf("application/json")) Buffer
		.isBuffer(a) && (a = {
			buffer: a,
			contentType: u
		});
	else try {
		a = JSON.parse(a.toString())
	} catch (e) {
		a = a.toString()
	}
	return b(function(e, t) {
		if (t.errcode) throw new c({
			code: t.errcode || -2,
			message: t.errmsg || e + " fail"
		});
		return delete t.errcode, delete t.errmsg, {
			...t,
			errMsg: e + " ok",
			errCode: 0
		}
	}(e, a || {
		errCode: -2,
		errMsg: "Request failed"
	}))
}

function N(e, t) {
	let r = "";
	if (t && t.accessToken) {
		r = `${e.indexOf("?")>-1?"&":"?"}access_token=${t.accessToken}`
	}
	return `${e}${r}`
}
class $ {
	constructor(e) {
		this.options = Object.assign({
			baseUrl: "https://api.weixin.qq.com",
			timeout: 5e3
		}, e)
	}
	async _requestWxOpenapi({
		name: e,
		url: t,
		data: r,
		options: n
	}) {
		const i = {
			method: "GET",
			dataType: "json",
			dataAsQueryString: !0,
			timeout: this.options.timeout
		};
		return await B({
			name: "auth." + e,
			url: `${this.options.baseUrl}${N(t,r)}`,
			data: r,
			options: n,
			defaultOptions: i
		})
	}
	async code2Session(e) {
		return await this._requestWxOpenapi({
			name: "code2Session",
			url: "/sns/jscode2session",
			data: {
				grant_type: "authorization_code",
				appid: this.options.appId,
				secret: this.options.secret,
				js_code: e
			}
		})
	}
	async getOauthAccessToken(e) {
		return await this._requestWxOpenapi({
			name: "getOauthAccessToken",
			url: "/sns/oauth2/access_token",
			data: {
				grant_type: "authorization_code",
				appid: this.options.appId,
				secret: this.options.secret,
				code: e
			}
		})
	}
}
const K = {
	RSA: "RSA-SHA1",
	RSA2: "RSA-SHA256"
};
var V = {
	code2Session: {
		returnValue: {
			openid: "userId"
		}
	}
};
class U extends class {
	constructor(e = {}) {
		if (!e.appId) throw new Error("appId required");
		if (!e.privateKey) throw new Error("privateKey required");
		const t = {
			gateway: "https://openapi.alipay.com/gateway.do",
			timeout: 5e3,
			charset: "utf-8",
			version: "1.0",
			signType: "RSA2",
			timeOffset: -(new Date).getTimezoneOffset() / 60,
			keyType: "PKCS8"
		};
		e.sandbox && (e.gateway = "https://openapi.alipaydev.com/gateway.do"), this.options = Object.assign({}, t,
			e);
		const r = "PKCS8" === this.options.keyType ? "PRIVATE KEY" : "RSA PRIVATE KEY";
		this.options.privateKey = this._formatKey(this.options.privateKey, r), this.options.alipayPublicKey && (this
			.options.alipayPublicKey = this._formatKey(this.options.alipayPublicKey, "PUBLIC KEY"))
	}
	_formatKey(e, t) {
		return `-----BEGIN ${t}-----\n${e}\n-----END ${t}-----`
	}
	_formatUrl(e, t) {
		let r = e;
		const n = ["app_id", "method", "format", "charset", "sign_type", "sign", "timestamp", "version",
			"notify_url", "return_url", "auth_token", "app_auth_token"
		];
		for (const e in t)
			if (n.indexOf(e) > -1) {
				const n = encodeURIComponent(t[e]);
				r = `${r}${r.includes("?")?"&":"?"}${e}=${n}`, delete t[e]
			} return {
			execParams: t,
			url: r
		}
	}
	_getSign(e, t) {
		const r = t.bizContent || null;
		delete t.bizContent;
		const i = Object.assign({
			method: e,
			appId: this.options.appId,
			charset: this.options.charset,
			version: this.options.version,
			signType: this.options.signType,
			timestamp: E((o = this.options.timeOffset, new Date(Date.now() + 6e4 * ((new Date)
				.getTimezoneOffset() + 60 * (o || 0)))))
		}, t);
		var o;
		r && (i.bizContent = JSON.stringify(_(r)));
		const s = _(i),
			a = Object.keys(s).sort().map(e => {
				let t = s[e];
				return "[object String]" !== Array.prototype.toString.call(t) && (t = JSON.stringify(t)),
					`${e}=${t}`
			}).join("&"),
			c = n.createSign(K[this.options.signType]).update(a, "utf8").sign(this.options.privateKey, "base64");
		return Object.assign(s, {
			sign: c
		})
	}
	async _exec(e, t = {}, r = {}) {
		const n = this._getSign(e, t),
			{
				url: i,
				execParams: o
			} = this._formatUrl(this.options.gateway, n),
			{
				status: s,
				data: a
			} = await uniCloud.httpclient.request(i, {
				method: "POST",
				data: o,
				dataType: "text",
				timeout: this.options.timeout
			});
		if (200 !== s) throw new Error("request fail");
		const c = JSON.parse(a),
			u = e.replace(/\./g, "_") + "_response",
			f = c[u],
			d = c.error_response;
		if (f) {
			if (!r.validateSign || this._checkResponseSign(a, u)) {
				if (!f.code || "10000" === f.code) {
					return {
						errCode: 0,
						errMsg: f.msg || "",
						...b(f)
					}
				}
				const e = f.sub_code ? `${f.sub_code} ${f.sub_msg}` : "" + (f.msg || "unkonwn error");
				throw new Error(e)
			}
			throw new Error("返回结果签名错误")
		}
		if (d) throw new Error(d.sub_msg || d.msg || "接口返回错误");
		throw new Error("request fail")
	}
	_checkResponseSign(e, t) {
		if (!this.options.alipayPublicKey || "" === this.options.alipayPublicKey) return console.warn(
			"options.alipayPublicKey is empty"), !0;
		if (!e) return !1;
		const r = this._getSignStr(e, t),
			i = JSON.parse(e).sign,
			o = n.createVerify(K[this.options.signType]);
		return o.update(r, "utf8"), o.verify(this.options.alipayPublicKey, i, "base64")
	}
	_getSignStr(e, t) {
		let r = e.trim();
		const n = e.indexOf(t + '"'),
			i = e.lastIndexOf('"sign"');
		return r = r.substr(n + t.length + 1), r = r.substr(0, i), r = r.replace(/^[^{]*{/g, "{"), r = r.replace(
			/\}([^}]*)$/g, "}"), r
	}
	_notifyRSACheck(e, t, r) {
		const i = Object.keys(e).sort().filter(e => e).map(t => {
			let r = e[t];
			return "[object String]" !== Array.prototype.toString.call(r) && (r = JSON.stringify(r)),
				`${t}=${decodeURIComponent(r)}`
		}).join("&");
		return n.createVerify(K[r]).update(i, "utf8").verify(this.options.alipayPublicKey, t, "base64")
	}
	_checkNotifySign(e) {
		const t = e.sign;
		if (!this.options.alipayPublicKey || !t) return !1;
		const r = e.sign_type || this.options.signType || "RSA2",
			n = {
				...e
			};
		delete n.sign, n.sign_type = r;
		return !!this._notifyRSACheck(n, t, r) || (delete n.sign_type, this._notifyRSACheck(n, t, r))
	}
	_verifyNotify(e) {
		if (!e.headers) throw new Error("通知格式不正确");
		let t;
		for (const r in e.headers) "content-type" === r.toLowerCase() && (t = e.headers[r]);
		if (!1 !== e.isBase64Encoded && -1 === t.indexOf("application/x-www-form-urlencoded")) throw new Error(
			"通知格式不正确");
		const r = i.parse(e.body);
		if (this._checkNotifySign(r)) return b(r);
		throw new Error("通知验签未通过")
	}
} {
	constructor(e) {
		super(e), this._protocols = V
	}
	async code2Session(e) {
		return await this._exec("alipay.system.oauth.token", {
			grantType: "authorization_code",
			code: e
		})
	}
}

function q(e) {
	var t = e[0];
	return t < "0" || t > "7" ? "00" + e : e
}

function H(e) {
	var t = e.toString(16);
	return t.length % 2 ? "0" + t : t
}

function F(e) {
	if (e <= 127) return H(e);
	var t = H(e);
	return H(128 + t.length / 2) + t
}

function J(e, t) {
	return e(t = {
		exports: {}
	}, t.exports), t.exports
}
var G = J((function(e, t) {
		var r = o.Buffer;

		function n(e, t) {
			for (var r in e) t[r] = e[r]
		}

		function i(e, t, n) {
			return r(e, t, n)
		}
		r.from && r.alloc && r.allocUnsafe && r.allocUnsafeSlow ? e.exports = o : (n(o, t), t.Buffer = i), i
			.prototype = Object.create(r.prototype), n(r, i), i.from = function(e, t, n) {
				if ("number" == typeof e) throw new TypeError("Argument must not be a number");
				return r(e, t, n)
			}, i.alloc = function(e, t, n) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				var i = r(e);
				return void 0 !== t ? "string" == typeof n ? i.fill(t, n) : i.fill(t) : i.fill(0), i
			}, i.allocUnsafe = function(e) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				return r(e)
			}, i.allocUnsafeSlow = function(e) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				return o.SlowBuffer(e)
			}
	})),
	z = (G.Buffer, G.Buffer);

function W(e) {
	if (this.buffer = null, this.writable = !0, this.readable = !0, !e) return this.buffer = z.alloc(0), this;
	if ("function" == typeof e.pipe) return this.buffer = z.alloc(0), e.pipe(this), this;
	if (e.length || "object" == typeof e) return this.buffer = e, this.writable = !1, process.nextTick(function() {
		this.emit("end", e), this.readable = !1, this.emit("close")
	}.bind(this)), this;
	throw new TypeError("Unexpected data type (" + typeof e + ")")
}
a.inherits(W, s), W.prototype.write = function(e) {
	this.buffer = z.concat([this.buffer, z.from(e)]), this.emit("data", e)
}, W.prototype.end = function(e) {
	e && this.write(e), this.emit("end", e), this.emit("close"), this.writable = !1, this.readable = !1
};
var X = W,
	Y = o.Buffer,
	Z = o.SlowBuffer,
	Q = ee;

function ee(e, t) {
	if (!Y.isBuffer(e) || !Y.isBuffer(t)) return !1;
	if (e.length !== t.length) return !1;
	for (var r = 0, n = 0; n < e.length; n++) r |= e[n] ^ t[n];
	return 0 === r
}
ee.install = function() {
	Y.prototype.equal = Z.prototype.equal = function(e) {
		return ee(this, e)
	}
};
var te = Y.prototype.equal,
	re = Z.prototype.equal;

function ne(e) {
	return (e / 8 | 0) + (e % 8 == 0 ? 0 : 1)
}
ee.restore = function() {
	Y.prototype.equal = te, Z.prototype.equal = re
};
var ie = {
	ES256: ne(256),
	ES384: ne(384),
	ES512: ne(521)
};
var oe = function(e) {
		var t = ie[e];
		if (t) return t;
		throw new Error('Unknown algorithm "' + e + '"')
	},
	se = G.Buffer;

function ae(e) {
	if (se.isBuffer(e)) return e;
	if ("string" == typeof e) return se.from(e, "base64");
	throw new TypeError("ECDSA signature must be a Base64 string or a Buffer")
}

function ce(e, t, r) {
	for (var n = 0; t + n < r && 0 === e[t + n];) ++n;
	return e[t + n] >= 128 && --n, n
}
var ue = {
		derToJose: function(e, t) {
			e = ae(e);
			var r = oe(t),
				n = r + 1,
				i = e.length,
				o = 0;
			if (48 !== e[o++]) throw new Error('Could not find expected "seq"');
			var s = e[o++];
			if (129 === s && (s = e[o++]), i - o < s) throw new Error('"seq" specified length of "' + s +
				'", only "' + (i - o) + '" remaining');
			if (2 !== e[o++]) throw new Error('Could not find expected "int" for "r"');
			var a = e[o++];
			if (i - o - 2 < a) throw new Error('"r" specified length of "' + a + '", only "' + (i - o - 2) +
				'" available');
			if (n < a) throw new Error('"r" specified length of "' + a + '", max of "' + n + '" is acceptable');
			var c = o;
			if (o += a, 2 !== e[o++]) throw new Error('Could not find expected "int" for "s"');
			var u = e[o++];
			if (i - o !== u) throw new Error('"s" specified length of "' + u + '", expected "' + (i - o) + '"');
			if (n < u) throw new Error('"s" specified length of "' + u + '", max of "' + n + '" is acceptable');
			var f = o;
			if ((o += u) !== i) throw new Error('Expected to consume entire buffer, but "' + (i - o) +
				'" bytes remain');
			var d = r - a,
				l = r - u,
				p = se.allocUnsafe(d + a + l + u);
			for (o = 0; o < d; ++o) p[o] = 0;
			e.copy(p, o, c + Math.max(-d, 0), c + a);
			for (var m = o = r; o < m + l; ++o) p[o] = 0;
			return e.copy(p, o, f + Math.max(-l, 0), f + u), p = (p = p.toString("base64")).replace(/=/g, "")
				.replace(/\+/g, "-").replace(/\//g, "_")
		},
		joseToDer: function(e, t) {
			e = ae(e);
			var r = oe(t),
				n = e.length;
			if (n !== 2 * r) throw new TypeError('"' + t + '" signatures must be "' + 2 * r + '" bytes, saw "' + n +
				'"');
			var i = ce(e, 0, r),
				o = ce(e, r, e.length),
				s = r - i,
				a = r - o,
				c = 2 + s + 1 + 1 + a,
				u = c < 128,
				f = se.allocUnsafe((u ? 2 : 3) + c),
				d = 0;
			return f[d++] = 48, u ? f[d++] = c : (f[d++] = 129, f[d++] = 255 & c), f[d++] = 2, f[d++] = s, i < 0 ? (
					f[d++] = 0, d += e.copy(f, d, 0, r)) : d += e.copy(f, d, i, r), f[d++] = 2, f[d++] = a, o < 0 ?
				(f[d++] = 0, e.copy(f, d, r)) : e.copy(f, d, r + o), f
		}
	},
	fe = G.Buffer,
	de = "secret must be a string or buffer",
	le = "key must be a string or a buffer",
	pe = "function" == typeof n.createPublicKey;

function me(e) {
	if (!fe.isBuffer(e) && "string" != typeof e) {
		if (!pe) throw we(le);
		if ("object" != typeof e) throw we(le);
		if ("string" != typeof e.type) throw we(le);
		if ("string" != typeof e.asymmetricKeyType) throw we(le);
		if ("function" != typeof e.export) throw we(le)
	}
}

function he(e) {
	if (!fe.isBuffer(e) && "string" != typeof e && "object" != typeof e) throw we(
		"key must be a string, a buffer or an object")
}

function ge(e) {
	return e.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

function ye(e) {
	var t = 4 - (e = e.toString()).length % 4;
	if (4 !== t)
		for (var r = 0; r < t; ++r) e += "=";
	return e.replace(/\-/g, "+").replace(/_/g, "/")
}

function we(e) {
	var t = [].slice.call(arguments, 1),
		r = a.format.bind(a, e).apply(null, t);
	return new TypeError(r)
}

function ve(e) {
	var t;
	return t = e, fe.isBuffer(t) || "string" == typeof t || (e = JSON.stringify(e)), e
}

function be(e) {
	return function(t, r) {
		! function(e) {
			if (!fe.isBuffer(e)) {
				if ("string" == typeof e) return e;
				if (!pe) throw we(de);
				if ("object" != typeof e) throw we(de);
				if ("secret" !== e.type) throw we(de);
				if ("function" != typeof e.export) throw we(de)
			}
		}(r), t = ve(t);
		var i = n.createHmac("sha" + e, r);
		return ge((i.update(t), i.digest("base64")))
	}
}

function _e(e) {
	return function(t, r, n) {
		var i = be(e)(t, n);
		return Q(fe.from(r), fe.from(i))
	}
}

function Ee(e) {
	return function(t, r) {
		he(r), t = ve(t);
		var i = n.createSign("RSA-SHA" + e);
		return ge((i.update(t), i.sign(r, "base64")))
	}
}

function Se(e) {
	return function(t, r, i) {
		me(i), t = ve(t), r = ye(r);
		var o = n.createVerify("RSA-SHA" + e);
		return o.update(t), o.verify(i, r, "base64")
	}
}

function xe(e) {
	return function(t, r) {
		he(r), t = ve(t);
		var i = n.createSign("RSA-SHA" + e);
		return ge((i.update(t), i.sign({
			key: r,
			padding: n.constants.RSA_PKCS1_PSS_PADDING,
			saltLength: n.constants.RSA_PSS_SALTLEN_DIGEST
		}, "base64")))
	}
}

function ke(e) {
	return function(t, r, i) {
		me(i), t = ve(t), r = ye(r);
		var o = n.createVerify("RSA-SHA" + e);
		return o.update(t), o.verify({
			key: i,
			padding: n.constants.RSA_PKCS1_PSS_PADDING,
			saltLength: n.constants.RSA_PSS_SALTLEN_DIGEST
		}, r, "base64")
	}
}

function Ce(e) {
	var t = Ee(e);
	return function() {
		var r = t.apply(null, arguments);
		return r = ue.derToJose(r, "ES" + e)
	}
}

function je(e) {
	var t = Se(e);
	return function(r, n, i) {
		return n = ue.joseToDer(n, "ES" + e).toString("base64"), t(r, n, i)
	}
}

function Te() {
	return function() {
		return ""
	}
}

function Ie() {
	return function(e, t) {
		return "" === t
	}
}
pe && (le += " or a KeyObject", de += "or a KeyObject");
var Pe = function(e) {
		var t = {
				hs: be,
				rs: Ee,
				ps: xe,
				es: Ce,
				none: Te
			},
			r = {
				hs: _e,
				rs: Se,
				ps: ke,
				es: je,
				none: Ie
			},
			n = e.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/i);
		if (!n) throw we(
			'"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".',
			e);
		var i = (n[1] || n[3]).toLowerCase(),
			o = n[2];
		return {
			sign: t[i](o),
			verify: r[i](o)
		}
	},
	Re = o.Buffer,
	Ae = function(e) {
		return "string" == typeof e ? e : "number" == typeof e || Re.isBuffer(e) ? e.toString() : JSON.stringify(e)
	},
	Oe = G.Buffer;

function Me(e, t) {
	return Oe.from(e, t).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

function De(e) {
	var t = e.header,
		r = e.payload,
		n = e.secret || e.privateKey,
		i = e.encoding,
		o = Pe(t.alg),
		s = function(e, t, r) {
			r = r || "utf8";
			var n = Me(Ae(e), "binary"),
				i = Me(Ae(t), r);
			return a.format("%s.%s", n, i)
		}(t, r, i),
		c = o.sign(s, n);
	return a.format("%s.%s", s, c)
}

function Le(e) {
	var t = e.secret || e.privateKey || e.key,
		r = new X(t);
	this.readable = !0, this.header = e.header, this.encoding = e.encoding, this.secret = this.privateKey = this.key =
		r, this.payload = new X(e.payload), this.secret.once("close", function() {
			!this.payload.writable && this.readable && this.sign()
		}.bind(this)), this.payload.once("close", function() {
			!this.secret.writable && this.readable && this.sign()
		}.bind(this))
}
a.inherits(Le, s), Le.prototype.sign = function() {
	try {
		var e = De({
			header: this.header,
			payload: this.payload.buffer,
			secret: this.secret.buffer,
			encoding: this.encoding
		});
		return this.emit("done", e), this.emit("data", e), this.emit("end"), this.readable = !1, e
	} catch (e) {
		this.readable = !1, this.emit("error", e), this.emit("close")
	}
}, Le.sign = De;
var Be = Le,
	Ne = G.Buffer,
	$e = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

function Ke(e) {
	if (function(e) {
			return "[object Object]" === Object.prototype.toString.call(e)
		}(e)) return e;
	try {
		return JSON.parse(e)
	} catch (e) {
		return
	}
}

function Ve(e) {
	var t = e.split(".", 1)[0];
	return Ke(Ne.from(t, "base64").toString("binary"))
}

function Ue(e) {
	return e.split(".")[2]
}

function qe(e) {
	return $e.test(e) && !!Ve(e)
}

function He(e, t, r) {
	if (!t) {
		var n = new Error("Missing algorithm parameter for jws.verify");
		throw n.code = "MISSING_ALGORITHM", n
	}
	var i = Ue(e = Ae(e)),
		o = function(e) {
			return e.split(".", 2).join(".")
		}(e);
	return Pe(t).verify(o, i, r)
}

function Fe(e, t) {
	if (t = t || {}, !qe(e = Ae(e))) return null;
	var r = Ve(e);
	if (!r) return null;
	var n = function(e, t) {
		t = t || "utf8";
		var r = e.split(".")[1];
		return Ne.from(r, "base64").toString(t)
	}(e);
	return ("JWT" === r.typ || t.json) && (n = JSON.parse(n, t.encoding)), {
		header: r,
		payload: n,
		signature: Ue(e)
	}
}

function Je(e) {
	var t = (e = e || {}).secret || e.publicKey || e.key,
		r = new X(t);
	this.readable = !0, this.algorithm = e.algorithm, this.encoding = e.encoding, this.secret = this.publicKey = this
		.key = r, this.signature = new X(e.signature), this.secret.once("close", function() {
			!this.signature.writable && this.readable && this.verify()
		}.bind(this)), this.signature.once("close", function() {
			!this.secret.writable && this.readable && this.verify()
		}.bind(this))
}
a.inherits(Je, s), Je.prototype.verify = function() {
	try {
		var e = He(this.signature.buffer, this.algorithm, this.key.buffer),
			t = Fe(this.signature.buffer, this.encoding);
		return this.emit("done", e, t), this.emit("data", e), this.emit("end"), this.readable = !1, e
	} catch (e) {
		this.readable = !1, this.emit("error", e), this.emit("close")
	}
}, Je.decode = Fe, Je.isValid = qe, Je.verify = He;
var Ge = Je,
	ze = {
		ALGORITHMS: ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384",
			"ES512"
		],
		sign: Be.sign,
		verify: Ge.verify,
		decode: Ge.decode,
		isValid: Ge.isValid,
		createSign: function(e) {
			return new Be(e)
		},
		createVerify: function(e) {
			return new Ge(e)
		}
	},
	We = function(e, t) {
		t = t || {};
		var r = ze.decode(e, t);
		if (!r) return null;
		var n = r.payload;
		if ("string" == typeof n) try {
			var i = JSON.parse(n);
			null !== i && "object" == typeof i && (n = i)
		} catch (e) {}
		return !0 === t.complete ? {
			header: r.header,
			payload: n,
			signature: r.signature
		} : n
	},
	Xe = function(e, t) {
		Error.call(this, e), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.name =
			"JsonWebTokenError", this.message = e, t && (this.inner = t)
	};
(Xe.prototype = Object.create(Error.prototype)).constructor = Xe;
var Ye = Xe,
	Ze = function(e, t) {
		Ye.call(this, e), this.name = "NotBeforeError", this.date = t
	};
(Ze.prototype = Object.create(Ye.prototype)).constructor = Ze;
var Qe = Ze,
	et = function(e, t) {
		Ye.call(this, e), this.name = "TokenExpiredError", this.expiredAt = t
	};
(et.prototype = Object.create(Ye.prototype)).constructor = et;
var tt = et,
	rt = 1e3,
	nt = 60 * rt,
	it = 60 * nt,
	ot = 24 * it,
	st = function(e, t) {
		t = t || {};
		var r = typeof e;
		if ("string" === r && e.length > 0) return function(e) {
			if ((e = String(e)).length > 100) return;
			var t =
				/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i
				.exec(e);
			if (!t) return;
			var r = parseFloat(t[1]);
			switch ((t[2] || "ms").toLowerCase()) {
				case "years":
				case "year":
				case "yrs":
				case "yr":
				case "y":
					return 315576e5 * r;
				case "weeks":
				case "week":
				case "w":
					return 6048e5 * r;
				case "days":
				case "day":
				case "d":
					return r * ot;
				case "hours":
				case "hour":
				case "hrs":
				case "hr":
				case "h":
					return r * it;
				case "minutes":
				case "minute":
				case "mins":
				case "min":
				case "m":
					return r * nt;
				case "seconds":
				case "second":
				case "secs":
				case "sec":
				case "s":
					return r * rt;
				case "milliseconds":
				case "millisecond":
				case "msecs":
				case "msec":
				case "ms":
					return r;
				default:
					return
			}
		}(e);
		if ("number" === r && isFinite(e)) return t.long ? function(e) {
			var t = Math.abs(e);
			if (t >= ot) return at(e, t, ot, "day");
			if (t >= it) return at(e, t, it, "hour");
			if (t >= nt) return at(e, t, nt, "minute");
			if (t >= rt) return at(e, t, rt, "second");
			return e + " ms"
		}(e) : function(e) {
			var t = Math.abs(e);
			if (t >= ot) return Math.round(e / ot) + "d";
			if (t >= it) return Math.round(e / it) + "h";
			if (t >= nt) return Math.round(e / nt) + "m";
			if (t >= rt) return Math.round(e / rt) + "s";
			return e + "ms"
		}(e);
		throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
	};

function at(e, t, r, n) {
	var i = t >= 1.5 * r;
	return Math.round(e / r) + " " + n + (i ? "s" : "")
}
var ct = function(e, t) {
		var r = t || Math.floor(Date.now() / 1e3);
		if ("string" == typeof e) {
			var n = st(e);
			if (void 0 === n) return;
			return Math.floor(r + n / 1e3)
		}
		return "number" == typeof e ? r + e : void 0
	},
	ut = J((function(e, t) {
		var r;
		t = e.exports = J, r = "object" == typeof process && process.env && process.env.NODE_DEBUG &&
			/\bsemver\b/i.test(process.env.NODE_DEBUG) ? function() {
				var e = Array.prototype.slice.call(arguments, 0);
				e.unshift("SEMVER"), console.log.apply(console, e)
			} : function() {}, t.SEMVER_SPEC_VERSION = "2.0.0";
		var n = Number.MAX_SAFE_INTEGER || 9007199254740991,
			i = t.re = [],
			o = t.src = [],
			s = 0,
			a = s++;
		o[a] = "0|[1-9]\\d*";
		var c = s++;
		o[c] = "[0-9]+";
		var u = s++;
		o[u] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
		var f = s++;
		o[f] = "(" + o[a] + ")\\.(" + o[a] + ")\\.(" + o[a] + ")";
		var d = s++;
		o[d] = "(" + o[c] + ")\\.(" + o[c] + ")\\.(" + o[c] + ")";
		var l = s++;
		o[l] = "(?:" + o[a] + "|" + o[u] + ")";
		var p = s++;
		o[p] = "(?:" + o[c] + "|" + o[u] + ")";
		var m = s++;
		o[m] = "(?:-(" + o[l] + "(?:\\." + o[l] + ")*))";
		var h = s++;
		o[h] = "(?:-?(" + o[p] + "(?:\\." + o[p] + ")*))";
		var g = s++;
		o[g] = "[0-9A-Za-z-]+";
		var y = s++;
		o[y] = "(?:\\+(" + o[g] + "(?:\\." + o[g] + ")*))";
		var w = s++,
			v = "v?" + o[f] + o[m] + "?" + o[y] + "?";
		o[w] = "^" + v + "$";
		var b = "[v=\\s]*" + o[d] + o[h] + "?" + o[y] + "?",
			_ = s++;
		o[_] = "^" + b + "$";
		var E = s++;
		o[E] = "((?:<|>)?=?)";
		var S = s++;
		o[S] = o[c] + "|x|X|\\*";
		var x = s++;
		o[x] = o[a] + "|x|X|\\*";
		var k = s++;
		o[k] = "[v=\\s]*(" + o[x] + ")(?:\\.(" + o[x] + ")(?:\\.(" + o[x] + ")(?:" + o[m] + ")?" + o[y] +
			"?)?)?";
		var C = s++;
		o[C] = "[v=\\s]*(" + o[S] + ")(?:\\.(" + o[S] + ")(?:\\.(" + o[S] + ")(?:" + o[h] + ")?" + o[y] +
			"?)?)?";
		var j = s++;
		o[j] = "^" + o[E] + "\\s*" + o[k] + "$";
		var T = s++;
		o[T] = "^" + o[E] + "\\s*" + o[C] + "$";
		var I = s++;
		o[I] = "(?:^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])";
		var P = s++;
		o[P] = "(?:~>?)";
		var R = s++;
		o[R] = "(\\s*)" + o[P] + "\\s+", i[R] = new RegExp(o[R], "g");
		var A = s++;
		o[A] = "^" + o[P] + o[k] + "$";
		var O = s++;
		o[O] = "^" + o[P] + o[C] + "$";
		var M = s++;
		o[M] = "(?:\\^)";
		var D = s++;
		o[D] = "(\\s*)" + o[M] + "\\s+", i[D] = new RegExp(o[D], "g");
		var L = s++;
		o[L] = "^" + o[M] + o[k] + "$";
		var B = s++;
		o[B] = "^" + o[M] + o[C] + "$";
		var N = s++;
		o[N] = "^" + o[E] + "\\s*(" + b + ")$|^$";
		var $ = s++;
		o[$] = "^" + o[E] + "\\s*(" + v + ")$|^$";
		var K = s++;
		o[K] = "(\\s*)" + o[E] + "\\s*(" + b + "|" + o[k] + ")", i[K] = new RegExp(o[K], "g");
		var V = s++;
		o[V] = "^\\s*(" + o[k] + ")\\s+-\\s+(" + o[k] + ")\\s*$";
		var U = s++;
		o[U] = "^\\s*(" + o[C] + ")\\s+-\\s+(" + o[C] + ")\\s*$";
		var q = s++;
		o[q] = "(<|>)?=?\\s*\\*";
		for (var H = 0; H < 35; H++) r(H, o[H]), i[H] || (i[H] = new RegExp(o[H]));

		function F(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof J) return e;
			if ("string" != typeof e) return null;
			if (e.length > 256) return null;
			if (!(t.loose ? i[_] : i[w]).test(e)) return null;
			try {
				return new J(e, t)
			} catch (e) {
				return null
			}
		}

		function J(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof J) {
				if (e.loose === t.loose) return e;
				e = e.version
			} else if ("string" != typeof e) throw new TypeError("Invalid Version: " + e);
			if (e.length > 256) throw new TypeError("version is longer than 256 characters");
			if (!(this instanceof J)) return new J(e, t);
			r("SemVer", e, t), this.options = t, this.loose = !!t.loose;
			var o = e.trim().match(t.loose ? i[_] : i[w]);
			if (!o) throw new TypeError("Invalid Version: " + e);
			if (this.raw = e, this.major = +o[1], this.minor = +o[2], this.patch = +o[3], this.major > n || this
				.major < 0) throw new TypeError("Invalid major version");
			if (this.minor > n || this.minor < 0) throw new TypeError("Invalid minor version");
			if (this.patch > n || this.patch < 0) throw new TypeError("Invalid patch version");
			o[4] ? this.prerelease = o[4].split(".").map((function(e) {
				if (/^[0-9]+$/.test(e)) {
					var t = +e;
					if (t >= 0 && t < n) return t
				}
				return e
			})) : this.prerelease = [], this.build = o[5] ? o[5].split(".") : [], this.format()
		}
		t.parse = F, t.valid = function(e, t) {
			var r = F(e, t);
			return r ? r.version : null
		}, t.clean = function(e, t) {
			var r = F(e.trim().replace(/^[=v]+/, ""), t);
			return r ? r.version : null
		}, t.SemVer = J, J.prototype.format = function() {
			return this.version = this.major + "." + this.minor + "." + this.patch, this.prerelease
				.length && (this.version += "-" + this.prerelease.join(".")), this.version
		}, J.prototype.toString = function() {
			return this.version
		}, J.prototype.compare = function(e) {
			return r("SemVer.compare", this.version, this.options, e), e instanceof J || (e = new J(e, this
				.options)), this.compareMain(e) || this.comparePre(e)
		}, J.prototype.compareMain = function(e) {
			return e instanceof J || (e = new J(e, this.options)), z(this.major, e.major) || z(this.minor, e
				.minor) || z(this.patch, e.patch)
		}, J.prototype.comparePre = function(e) {
			if (e instanceof J || (e = new J(e, this.options)), this.prerelease.length && !e.prerelease
				.length) return -1;
			if (!this.prerelease.length && e.prerelease.length) return 1;
			if (!this.prerelease.length && !e.prerelease.length) return 0;
			var t = 0;
			do {
				var n = this.prerelease[t],
					i = e.prerelease[t];
				if (r("prerelease compare", t, n, i), void 0 === n && void 0 === i) return 0;
				if (void 0 === i) return 1;
				if (void 0 === n) return -1;
				if (n !== i) return z(n, i)
			} while (++t)
		}, J.prototype.inc = function(e, t) {
			switch (e) {
				case "premajor":
					this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc(
						"pre", t);
					break;
				case "preminor":
					this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", t);
					break;
				case "prepatch":
					this.prerelease.length = 0, this.inc("patch", t), this.inc("pre", t);
					break;
				case "prerelease":
					0 === this.prerelease.length && this.inc("patch", t), this.inc("pre", t);
					break;
				case "major":
					0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length || this.major++,
						this.minor = 0, this.patch = 0, this.prerelease = [];
					break;
				case "minor":
					0 === this.patch && 0 !== this.prerelease.length || this.minor++, this.patch = 0, this
						.prerelease = [];
					break;
				case "patch":
					0 === this.prerelease.length && this.patch++, this.prerelease = [];
					break;
				case "pre":
					if (0 === this.prerelease.length) this.prerelease = [0];
					else {
						for (var r = this.prerelease.length; --r >= 0;) "number" == typeof this.prerelease[
							r] && (this.prerelease[r]++, r = -2); - 1 === r && this.prerelease.push(0)
					}
					t && (this.prerelease[0] === t ? isNaN(this.prerelease[1]) && (this.prerelease = [t,
						0]) : this.prerelease = [t, 0]);
					break;
				default:
					throw new Error("invalid increment argument: " + e)
			}
			return this.format(), this.raw = this.version, this
		}, t.inc = function(e, t, r, n) {
			"string" == typeof r && (n = r, r = void 0);
			try {
				return new J(e, r).inc(t, n).version
			} catch (e) {
				return null
			}
		}, t.diff = function(e, t) {
			if (Z(e, t)) return null;
			var r = F(e),
				n = F(t),
				i = "";
			if (r.prerelease.length || n.prerelease.length) {
				i = "pre";
				var o = "prerelease"
			}
			for (var s in r)
				if (("major" === s || "minor" === s || "patch" === s) && r[s] !== n[s]) return i + s;
			return o
		}, t.compareIdentifiers = z;
		var G = /^[0-9]+$/;

		function z(e, t) {
			var r = G.test(e),
				n = G.test(t);
			return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1
		}

		function W(e, t, r) {
			return new J(e, r).compare(new J(t, r))
		}

		function X(e, t, r) {
			return W(e, t, r) > 0
		}

		function Y(e, t, r) {
			return W(e, t, r) < 0
		}

		function Z(e, t, r) {
			return 0 === W(e, t, r)
		}

		function Q(e, t, r) {
			return 0 !== W(e, t, r)
		}

		function ee(e, t, r) {
			return W(e, t, r) >= 0
		}

		function te(e, t, r) {
			return W(e, t, r) <= 0
		}

		function re(e, t, r, n) {
			switch (t) {
				case "===":
					return "object" == typeof e && (e = e.version), "object" == typeof r && (r = r.version),
						e === r;
				case "!==":
					return "object" == typeof e && (e = e.version), "object" == typeof r && (r = r.version),
						e !== r;
				case "":
				case "=":
				case "==":
					return Z(e, r, n);
				case "!=":
					return Q(e, r, n);
				case ">":
					return X(e, r, n);
				case ">=":
					return ee(e, r, n);
				case "<":
					return Y(e, r, n);
				case "<=":
					return te(e, r, n);
				default:
					throw new TypeError("Invalid operator: " + t)
			}
		}

		function ne(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof ne) {
				if (e.loose === !!t.loose) return e;
				e = e.value
			}
			if (!(this instanceof ne)) return new ne(e, t);
			r("comparator", e, t), this.options = t, this.loose = !!t.loose, this.parse(e), this.semver === ie ?
				this.value = "" : this.value = this.operator + this.semver.version, r("comp", this)
		}
		t.rcompareIdentifiers = function(e, t) {
			return z(t, e)
		}, t.major = function(e, t) {
			return new J(e, t).major
		}, t.minor = function(e, t) {
			return new J(e, t).minor
		}, t.patch = function(e, t) {
			return new J(e, t).patch
		}, t.compare = W, t.compareLoose = function(e, t) {
			return W(e, t, !0)
		}, t.rcompare = function(e, t, r) {
			return W(t, e, r)
		}, t.sort = function(e, r) {
			return e.sort((function(e, n) {
				return t.compare(e, n, r)
			}))
		}, t.rsort = function(e, r) {
			return e.sort((function(e, n) {
				return t.rcompare(e, n, r)
			}))
		}, t.gt = X, t.lt = Y, t.eq = Z, t.neq = Q, t.gte = ee, t.lte = te, t.cmp = re, t.Comparator = ne;
		var ie = {};

		function oe(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof oe) return e.loose === !!t.loose && e.includePrerelease === !!t
				.includePrerelease ? e : new oe(e.raw, t);
			if (e instanceof ne) return new oe(e.value, t);
			if (!(this instanceof oe)) return new oe(e, t);
			if (this.options = t, this.loose = !!t.loose, this.includePrerelease = !!t.includePrerelease, this
				.raw = e, this.set = e.split(/\s*\|\|\s*/).map((function(e) {
					return this.parseRange(e.trim())
				}), this).filter((function(e) {
					return e.length
				})), !this.set.length) throw new TypeError("Invalid SemVer Range: " + e);
			this.format()
		}

		function se(e) {
			return !e || "x" === e.toLowerCase() || "*" === e
		}

		function ae(e, t, r, n, i, o, s, a, c, u, f, d, l) {
			return ((t = se(r) ? "" : se(n) ? ">=" + r + ".0.0" : se(i) ? ">=" + r + "." + n + ".0" : ">=" +
				t) + " " + (a = se(c) ? "" : se(u) ? "<" + (+c + 1) + ".0.0" : se(f) ? "<" + c + "." + (+u +
					1) + ".0" : d ? "<=" + c + "." + u + "." + f + "-" + d : "<=" + a)).trim()
		}

		function ce(e, t, n) {
			for (var i = 0; i < e.length; i++)
				if (!e[i].test(t)) return !1;
			if (t.prerelease.length && !n.includePrerelease) {
				for (i = 0; i < e.length; i++)
					if (r(e[i].semver), e[i].semver !== ie && e[i].semver.prerelease.length > 0) {
						var o = e[i].semver;
						if (o.major === t.major && o.minor === t.minor && o.patch === t.patch) return !0
					} return !1
			}
			return !0
		}

		function ue(e, t, r) {
			try {
				t = new oe(t, r)
			} catch (e) {
				return !1
			}
			return t.test(e)
		}

		function fe(e, t, r, n) {
			var i, o, s, a, c;
			switch (e = new J(e, n), t = new oe(t, n), r) {
				case ">":
					i = X, o = te, s = Y, a = ">", c = ">=";
					break;
				case "<":
					i = Y, o = ee, s = X, a = "<", c = "<=";
					break;
				default:
					throw new TypeError('Must provide a hilo val of "<" or ">"')
			}
			if (ue(e, t, n)) return !1;
			for (var u = 0; u < t.set.length; ++u) {
				var f = t.set[u],
					d = null,
					l = null;
				if (f.forEach((function(e) {
						e.semver === ie && (e = new ne(">=0.0.0")), d = d || e, l = l || e, i(e.semver,
							d.semver, n) ? d = e : s(e.semver, l.semver, n) && (l = e)
					})), d.operator === a || d.operator === c) return !1;
				if ((!l.operator || l.operator === a) && o(e, l.semver)) return !1;
				if (l.operator === c && s(e, l.semver)) return !1
			}
			return !0
		}
		ne.prototype.parse = function(e) {
			var t = this.options.loose ? i[N] : i[$],
				r = e.match(t);
			if (!r) throw new TypeError("Invalid comparator: " + e);
			this.operator = r[1], "=" === this.operator && (this.operator = ""), r[2] ? this.semver = new J(
				r[2], this.options.loose) : this.semver = ie
		}, ne.prototype.toString = function() {
			return this.value
		}, ne.prototype.test = function(e) {
			return r("Comparator.test", e, this.options.loose), this.semver === ie || ("string" ==
				typeof e && (e = new J(e, this.options)), re(e, this.operator, this.semver, this
					.options))
		}, ne.prototype.intersects = function(e, t) {
			if (!(e instanceof ne)) throw new TypeError("a Comparator is required");
			var r;
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), "" === this.operator) return r = new oe(e.value, t), ue(this.value, r, t);
			if ("" === e.operator) return r = new oe(this.value, t), ue(e.semver, r, t);
			var n = !(">=" !== this.operator && ">" !== this.operator || ">=" !== e.operator && ">" !== e
					.operator),
				i = !("<=" !== this.operator && "<" !== this.operator || "<=" !== e.operator && "<" !== e
					.operator),
				o = this.semver.version === e.semver.version,
				s = !(">=" !== this.operator && "<=" !== this.operator || ">=" !== e.operator && "<=" !== e
					.operator),
				a = re(this.semver, "<", e.semver, t) && (">=" === this.operator || ">" === this
				.operator) && ("<=" === e.operator || "<" === e.operator),
				c = re(this.semver, ">", e.semver, t) && ("<=" === this.operator || "<" === this
				.operator) && (">=" === e.operator || ">" === e.operator);
			return n || i || o && s || a || c
		}, t.Range = oe, oe.prototype.format = function() {
			return this.range = this.set.map((function(e) {
				return e.join(" ").trim()
			})).join("||").trim(), this.range
		}, oe.prototype.toString = function() {
			return this.range
		}, oe.prototype.parseRange = function(e) {
			var t = this.options.loose;
			e = e.trim();
			var n = t ? i[U] : i[V];
			e = e.replace(n, ae), r("hyphen replace", e), e = e.replace(i[K], "$1$2$3"), r(
					"comparator trim", e, i[K]), e = (e = (e = e.replace(i[R], "$1~")).replace(i[D], "$1^"))
				.split(/\s+/).join(" ");
			var o = t ? i[N] : i[$],
				s = e.split(" ").map((function(e) {
					return function(e, t) {
						return r("comp", e, t), e = function(e, t) {
							return e.trim().split(/\s+/).map((function(e) {
								return function(e, t) {
									r("caret", e, t);
									var n = t.loose ? i[B] : i[L];
									return e.replace(n, (function(t, n, i,
										o, s) {
										var a;
										return r("caret", e, t,
												n, i, o, s), se(
												n) ? a = "" :
											se(i) ? a = ">=" +
											n + ".0.0 <" + (+n +
												1) + ".0.0" :
											se(o) ? a = "0" ===
											n ? ">=" + n + "." +
											i + ".0 <" + n +
											"." + (+i + 1) +
											".0" : ">=" + n +
											"." + i + ".0 <" + (
												+n + 1) +
											".0.0" : s ? (r(
													"replaceCaret pr",
													s), a =
												"0" === n ?
												"0" === i ?
												">=" + n + "." +
												i + "." + o +
												"-" + s + " <" +
												n + "." + i +
												"." + (+o + 1) :
												">=" + n + "." +
												i + "." + o +
												"-" + s + " <" +
												n + "." + (+i +
													1) + ".0" :
												">=" + n + "." +
												i + "." + o +
												"-" + s + " <" +
												(+n + 1) +
												".0.0") : (r(
													"no pr"),
												a = "0" === n ?
												"0" === i ?
												">=" + n + "." +
												i + "." + o +
												" <" + n + "." +
												i + "." + (+o +
													1) : ">=" +
												n + "." + i +
												"." + o + " <" +
												n + "." + (+i +
													1) + ".0" :
												">=" + n + "." +
												i + "." + o +
												" <" + (+n +
												1) + ".0.0"), r(
												"caret return",
												a), a
									}))
								}(e, t)
							})).join(" ")
						}(e, t), r("caret", e), e = function(e, t) {
							return e.trim().split(/\s+/).map((function(e) {
								return function(e, t) {
									var n = t.loose ? i[O] : i[A];
									return e.replace(n, (function(t, n, i,
										o, s) {
										var a;
										return r("tilde", e, t,
												n, i, o, s), se(
												n) ? a = "" :
											se(i) ? a = ">=" +
											n + ".0.0 <" + (+n +
												1) + ".0.0" :
											se(o) ? a = ">=" +
											n + "." + i +
											".0 <" + n + "." + (
												+i + 1) + ".0" :
											s ? (r("replaceTilde pr",
													s), a =
												">=" + n + "." +
												i + "." + o +
												"-" + s + " <" +
												n + "." + (+i +
													1) + ".0") :
											a = ">=" + n + "." +
											i + "." + o + " <" +
											n + "." + (+i + 1) +
											".0", r(
												"tilde return",
												a), a
									}))
								}(e, t)
							})).join(" ")
						}(e, t), r("tildes", e), e = function(e, t) {
							return r("replaceXRanges", e, t), e.split(/\s+/).map((function(
								e) {
								return function(e, t) {
									e = e.trim();
									var n = t.loose ? i[T] : i[j];
									return e.replace(n, (function(t, n, i,
										o, s, a) {
										r("xRange", e, t, n, i,
											o, s, a);
										var c = se(i),
											u = c || se(o),
											f = u || se(s);
										return "=" === n && f &&
											(n = ""), c ? t =
											">" === n || "<" ===
											n ? "<0.0.0" : "*" :
											n && f ? (u && (o =
													0), s = 0,
												">" === n ? (n =
													">=", u ? (
														i = +i +
														1, o =
														0, s = 0
														) : (
														o = +o +
														1, s = 0
														)) :
												"<=" === n && (
													n = "<", u ?
													i = +i + 1 :
													o = +o + 1),
												t = n + i +
												"." + o + "." +
												s) : u ? t =
											">=" + i +
											".0.0 <" + (+i +
											1) + ".0.0" : f && (
												t = ">=" + i +
												"." + o +
												".0 <" + i +
												"." + (+o + 1) +
												".0"), r(
												"xRange return",
												t), t
									}))
								}(e, t)
							})).join(" ")
						}(e, t), r("xrange", e), e = function(e, t) {
							return r("replaceStars", e, t), e.trim().replace(i[q], "")
						}(e, t), r("stars", e), e
					}(e, this.options)
				}), this).join(" ").split(/\s+/);
			return this.options.loose && (s = s.filter((function(e) {
				return !!e.match(o)
			}))), s = s.map((function(e) {
				return new ne(e, this.options)
			}), this)
		}, oe.prototype.intersects = function(e, t) {
			if (!(e instanceof oe)) throw new TypeError("a Range is required");
			return this.set.some((function(r) {
				return r.every((function(r) {
					return e.set.some((function(e) {
						return e.every((function(e) {
							return r.intersects(e, t)
						}))
					}))
				}))
			}))
		}, t.toComparators = function(e, t) {
			return new oe(e, t).set.map((function(e) {
				return e.map((function(e) {
					return e.value
				})).join(" ").trim().split(" ")
			}))
		}, oe.prototype.test = function(e) {
			if (!e) return !1;
			"string" == typeof e && (e = new J(e, this.options));
			for (var t = 0; t < this.set.length; t++)
				if (ce(this.set[t], e, this.options)) return !0;
			return !1
		}, t.satisfies = ue, t.maxSatisfying = function(e, t, r) {
			var n = null,
				i = null;
			try {
				var o = new oe(t, r)
			} catch (e) {
				return null
			}
			return e.forEach((function(e) {
				o.test(e) && (n && -1 !== i.compare(e) || (i = new J(n = e, r)))
			})), n
		}, t.minSatisfying = function(e, t, r) {
			var n = null,
				i = null;
			try {
				var o = new oe(t, r)
			} catch (e) {
				return null
			}
			return e.forEach((function(e) {
				o.test(e) && (n && 1 !== i.compare(e) || (i = new J(n = e, r)))
			})), n
		}, t.minVersion = function(e, t) {
			e = new oe(e, t);
			var r = new J("0.0.0");
			if (e.test(r)) return r;
			if (r = new J("0.0.0-0"), e.test(r)) return r;
			r = null;
			for (var n = 0; n < e.set.length; ++n) {
				e.set[n].forEach((function(e) {
					var t = new J(e.semver.version);
					switch (e.operator) {
						case ">":
							0 === t.prerelease.length ? t.patch++ : t.prerelease.push(0), t
								.raw = t.format();
						case "":
						case ">=":
							r && !X(r, t) || (r = t);
							break;
						case "<":
						case "<=":
							break;
						default:
							throw new Error("Unexpected operation: " + e.operator)
					}
				}))
			}
			if (r && e.test(r)) return r;
			return null
		}, t.validRange = function(e, t) {
			try {
				return new oe(e, t).range || "*"
			} catch (e) {
				return null
			}
		}, t.ltr = function(e, t, r) {
			return fe(e, t, "<", r)
		}, t.gtr = function(e, t, r) {
			return fe(e, t, ">", r)
		}, t.outside = fe, t.prerelease = function(e, t) {
			var r = F(e, t);
			return r && r.prerelease.length ? r.prerelease : null
		}, t.intersects = function(e, t, r) {
			return e = new oe(e, r), t = new oe(t, r), e.intersects(t)
		}, t.coerce = function(e) {
			if (e instanceof J) return e;
			if ("string" != typeof e) return null;
			var t = e.match(i[I]);
			if (null == t) return null;
			return F(t[1] + "." + (t[2] || "0") + "." + (t[3] || "0"))
		}
	})),
	ft = (ut.SEMVER_SPEC_VERSION, ut.re, ut.src, ut.parse, ut.valid, ut.clean, ut.SemVer, ut.inc, ut.diff, ut
		.compareIdentifiers, ut.rcompareIdentifiers, ut.major, ut.minor, ut.patch, ut.compare, ut.compareLoose, ut
		.rcompare, ut.sort, ut.rsort, ut.gt, ut.lt, ut.eq, ut.neq, ut.gte, ut.lte, ut.cmp, ut.Comparator, ut.Range, ut
		.toComparators, ut.satisfies, ut.maxSatisfying, ut.minSatisfying, ut.minVersion, ut.validRange, ut.ltr, ut.gtr,
		ut.outside, ut.prerelease, ut.intersects, ut.coerce, ut.satisfies(process.version, "^6.12.0 || >=8.0.0")),
	dt = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512"],
	lt = ["RS256", "RS384", "RS512"],
	pt = ["HS256", "HS384", "HS512"];
ft && (dt.splice(3, 0, "PS256", "PS384", "PS512"), lt.splice(3, 0, "PS256", "PS384", "PS512"));
var mt = /^\s+|\s+$/g,
	ht = /^[-+]0x[0-9a-f]+$/i,
	gt = /^0b[01]+$/i,
	yt = /^0o[0-7]+$/i,
	wt = /^(?:0|[1-9]\d*)$/,
	vt = parseInt;

function bt(e) {
	return e != e
}

function _t(e, t) {
	return function(e, t) {
		for (var r = -1, n = e ? e.length : 0, i = Array(n); ++r < n;) i[r] = t(e[r], r, e);
		return i
	}(t, (function(t) {
		return e[t]
	}))
}
var Et, St, xt = Object.prototype,
	kt = xt.hasOwnProperty,
	Ct = xt.toString,
	jt = xt.propertyIsEnumerable,
	Tt = (Et = Object.keys, St = Object, function(e) {
		return Et(St(e))
	}),
	It = Math.max;

function Pt(e, t) {
	var r = Ot(e) || function(e) {
			return function(e) {
				return Lt(e) && Mt(e)
			}(e) && kt.call(e, "callee") && (!jt.call(e, "callee") || "[object Arguments]" == Ct.call(e))
		}(e) ? function(e, t) {
			for (var r = -1, n = Array(e); ++r < e;) n[r] = t(r);
			return n
		}(e.length, String) : [],
		n = r.length,
		i = !!n;
	for (var o in e) !t && !kt.call(e, o) || i && ("length" == o || At(o, n)) || r.push(o);
	return r
}

function Rt(e) {
	if (r = (t = e) && t.constructor, n = "function" == typeof r && r.prototype || xt, t !== n) return Tt(e);
	var t, r, n, i = [];
	for (var o in Object(e)) kt.call(e, o) && "constructor" != o && i.push(o);
	return i
}

function At(e, t) {
	return !!(t = null == t ? 9007199254740991 : t) && ("number" == typeof e || wt.test(e)) && e > -1 && e % 1 == 0 &&
		e < t
}
var Ot = Array.isArray;

function Mt(e) {
	return null != e && function(e) {
		return "number" == typeof e && e > -1 && e % 1 == 0 && e <= 9007199254740991
	}(e.length) && ! function(e) {
		var t = Dt(e) ? Ct.call(e) : "";
		return "[object Function]" == t || "[object GeneratorFunction]" == t
	}(e)
}

function Dt(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}

function Lt(e) {
	return !!e && "object" == typeof e
}
var Bt = function(e, t, r, n) {
		var i;
		e = Mt(e) ? e : (i = e) ? _t(i, function(e) {
			return Mt(e) ? Pt(e) : Rt(e)
		}(i)) : [], r = r && !n ? function(e) {
			var t = function(e) {
					if (!e) return 0 === e ? e : 0;
					if ((e = function(e) {
							if ("number" == typeof e) return e;
							if (function(e) {
									return "symbol" == typeof e || Lt(e) && "[object Symbol]" == Ct.call(e)
								}(e)) return NaN;
							if (Dt(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = Dt(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace(mt, "");
							var r = gt.test(e);
							return r || yt.test(e) ? vt(e.slice(2), r ? 2 : 8) : ht.test(e) ? NaN : +e
						}(e)) === 1 / 0 || e === -1 / 0) {
						return 17976931348623157e292 * (e < 0 ? -1 : 1)
					}
					return e == e ? e : 0
				}(e),
				r = t % 1;
			return t == t ? r ? t - r : t : 0
		}(r) : 0;
		var o = e.length;
		return r < 0 && (r = It(o + r, 0)),
			function(e) {
				return "string" == typeof e || !Ot(e) && Lt(e) && "[object String]" == Ct.call(e)
			}(e) ? r <= o && e.indexOf(t, r) > -1 : !!o && function(e, t, r) {
				if (t != t) return function(e, t, r, n) {
					for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i;)
						if (t(e[o], o, e)) return o;
					return -1
				}(e, bt, r);
				for (var n = r - 1, i = e.length; ++n < i;)
					if (e[n] === t) return n;
				return -1
			}(e, t, r) > -1
	},
	Nt = Object.prototype.toString;
var $t = function(e) {
		return !0 === e || !1 === e || function(e) {
			return !!e && "object" == typeof e
		}(e) && "[object Boolean]" == Nt.call(e)
	},
	Kt = /^\s+|\s+$/g,
	Vt = /^[-+]0x[0-9a-f]+$/i,
	Ut = /^0b[01]+$/i,
	qt = /^0o[0-7]+$/i,
	Ht = parseInt,
	Ft = Object.prototype.toString;

function Jt(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}
var Gt = function(e) {
		return "number" == typeof e && e == function(e) {
			var t = function(e) {
					if (!e) return 0 === e ? e : 0;
					if ((e = function(e) {
							if ("number" == typeof e) return e;
							if (function(e) {
									return "symbol" == typeof e || function(e) {
										return !!e && "object" == typeof e
									}(e) && "[object Symbol]" == Ft.call(e)
								}(e)) return NaN;
							if (Jt(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = Jt(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace(Kt, "");
							var r = Ut.test(e);
							return r || qt.test(e) ? Ht(e.slice(2), r ? 2 : 8) : Vt.test(e) ? NaN : +e
						}(e)) === 1 / 0 || e === -1 / 0) {
						return 17976931348623157e292 * (e < 0 ? -1 : 1)
					}
					return e == e ? e : 0
				}(e),
				r = t % 1;
			return t == t ? r ? t - r : t : 0
		}(e)
	},
	zt = Object.prototype.toString;
var Wt = function(e) {
	return "number" == typeof e || function(e) {
		return !!e && "object" == typeof e
	}(e) && "[object Number]" == zt.call(e)
};
var Xt = Function.prototype,
	Yt = Object.prototype,
	Zt = Xt.toString,
	Qt = Yt.hasOwnProperty,
	er = Zt.call(Object),
	tr = Yt.toString,
	rr = function(e, t) {
		return function(r) {
			return e(t(r))
		}
	}(Object.getPrototypeOf, Object);
var nr = function(e) {
		if (! function(e) {
				return !!e && "object" == typeof e
			}(e) || "[object Object]" != tr.call(e) || function(e) {
				var t = !1;
				if (null != e && "function" != typeof e.toString) try {
					t = !!(e + "")
				} catch (e) {}
				return t
			}(e)) return !1;
		var t = rr(e);
		if (null === t) return !0;
		var r = Qt.call(t, "constructor") && t.constructor;
		return "function" == typeof r && r instanceof r && Zt.call(r) == er
	},
	ir = Object.prototype.toString,
	or = Array.isArray;
var sr = function(e) {
		return "string" == typeof e || !or(e) && function(e) {
			return !!e && "object" == typeof e
		}(e) && "[object String]" == ir.call(e)
	},
	ar = /^\s+|\s+$/g,
	cr = /^[-+]0x[0-9a-f]+$/i,
	ur = /^0b[01]+$/i,
	fr = /^0o[0-7]+$/i,
	dr = parseInt,
	lr = Object.prototype.toString;

function pr(e, t) {
	var r;
	if ("function" != typeof t) throw new TypeError("Expected a function");
	return e = function(e) {
			var t = function(e) {
					if (!e) return 0 === e ? e : 0;
					if ((e = function(e) {
							if ("number" == typeof e) return e;
							if (function(e) {
									return "symbol" == typeof e || function(e) {
										return !!e && "object" == typeof e
									}(e) && "[object Symbol]" == lr.call(e)
								}(e)) return NaN;
							if (mr(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = mr(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace(ar, "");
							var r = ur.test(e);
							return r || fr.test(e) ? dr(e.slice(2), r ? 2 : 8) : cr.test(e) ? NaN : +e
						}(e)) === 1 / 0 || e === -1 / 0) {
						return 17976931348623157e292 * (e < 0 ? -1 : 1)
					}
					return e == e ? e : 0
				}(e),
				r = t % 1;
			return t == t ? r ? t - r : t : 0
		}(e),
		function() {
			return --e > 0 && (r = t.apply(this, arguments)), e <= 1 && (t = void 0), r
		}
}

function mr(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}
var hr = function(e) {
		return pr(2, e)
	},
	gr = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "HS256", "HS384", "HS512", "none"];
ft && gr.splice(3, 0, "PS256", "PS384", "PS512");
var yr = {
		expiresIn: {
			isValid: function(e) {
				return Gt(e) || sr(e) && e
			},
			message: '"expiresIn" should be a number of seconds or string representing a timespan'
		},
		notBefore: {
			isValid: function(e) {
				return Gt(e) || sr(e) && e
			},
			message: '"notBefore" should be a number of seconds or string representing a timespan'
		},
		audience: {
			isValid: function(e) {
				return sr(e) || Array.isArray(e)
			},
			message: '"audience" must be a string or array'
		},
		algorithm: {
			isValid: Bt.bind(null, gr),
			message: '"algorithm" must be a valid string enum value'
		},
		header: {
			isValid: nr,
			message: '"header" must be an object'
		},
		encoding: {
			isValid: sr,
			message: '"encoding" must be a string'
		},
		issuer: {
			isValid: sr,
			message: '"issuer" must be a string'
		},
		subject: {
			isValid: sr,
			message: '"subject" must be a string'
		},
		jwtid: {
			isValid: sr,
			message: '"jwtid" must be a string'
		},
		noTimestamp: {
			isValid: $t,
			message: '"noTimestamp" must be a boolean'
		},
		keyid: {
			isValid: sr,
			message: '"keyid" must be a string'
		},
		mutatePayload: {
			isValid: $t,
			message: '"mutatePayload" must be a boolean'
		}
	},
	wr = {
		iat: {
			isValid: Wt,
			message: '"iat" should be a number of seconds'
		},
		exp: {
			isValid: Wt,
			message: '"exp" should be a number of seconds'
		},
		nbf: {
			isValid: Wt,
			message: '"nbf" should be a number of seconds'
		}
	};

function vr(e, t, r, n) {
	if (!nr(r)) throw new Error('Expected "' + n + '" to be a plain object.');
	Object.keys(r).forEach((function(i) {
		var o = e[i];
		if (o) {
			if (!o.isValid(r[i])) throw new Error(o.message)
		} else if (!t) throw new Error('"' + i + '" is not allowed in "' + n + '"')
	}))
}
var br = {
		audience: "aud",
		issuer: "iss",
		subject: "sub",
		jwtid: "jti"
	},
	_r = ["expiresIn", "notBefore", "noTimestamp", "audience", "issuer", "subject", "jwtid"],
	Er = function(e, t, r, n) {
		var i;
		if ("function" != typeof r || n || (n = r, r = {}), r || (r = {}), r = Object.assign({}, r), i = n || function(
				e, t) {
				if (e) throw e;
				return t
			}, r.clockTimestamp && "number" != typeof r.clockTimestamp) return i(new Ye(
			"clockTimestamp must be a number"));
		if (void 0 !== r.nonce && ("string" != typeof r.nonce || "" === r.nonce.trim())) return i(new Ye(
			"nonce must be a non-empty string"));
		var o = r.clockTimestamp || Math.floor(Date.now() / 1e3);
		if (!e) return i(new Ye("jwt must be provided"));
		if ("string" != typeof e) return i(new Ye("jwt must be a string"));
		var s, a = e.split(".");
		if (3 !== a.length) return i(new Ye("jwt malformed"));
		try {
			s = We(e, {
				complete: !0
			})
		} catch (e) {
			return i(e)
		}
		if (!s) return i(new Ye("invalid token"));
		var c, u = s.header;
		if ("function" == typeof t) {
			if (!n) return i(new Ye(
				"verify must be called asynchronous if secret or public key is provided as a callback"));
			c = t
		} else c = function(e, r) {
			return r(null, t)
		};
		return c(u, (function(t, n) {
			if (t) return i(new Ye("error in secret or public key callback: " + t.message));
			var c, f = "" !== a[2].trim();
			if (!f && n) return i(new Ye("jwt signature is required"));
			if (f && !n) return i(new Ye("secret or public key must be provided"));
			if (f || r.algorithms || (r.algorithms = ["none"]), r.algorithms || (r.algorithms = ~n
					.toString().indexOf("BEGIN CERTIFICATE") || ~n.toString().indexOf("BEGIN PUBLIC KEY") ?
					dt : ~n.toString().indexOf("BEGIN RSA PUBLIC KEY") ? lt : pt), !~r.algorithms.indexOf(s
					.header.alg)) return i(new Ye("invalid algorithm"));
			try {
				c = ze.verify(e, s.header.alg, n)
			} catch (e) {
				return i(e)
			}
			if (!c) return i(new Ye("invalid signature"));
			var d = s.payload;
			if (void 0 !== d.nbf && !r.ignoreNotBefore) {
				if ("number" != typeof d.nbf) return i(new Ye("invalid nbf value"));
				if (d.nbf > o + (r.clockTolerance || 0)) return i(new Qe("jwt not active", new Date(1e3 * d
					.nbf)))
			}
			if (void 0 !== d.exp && !r.ignoreExpiration) {
				if ("number" != typeof d.exp) return i(new Ye("invalid exp value"));
				if (o >= d.exp + (r.clockTolerance || 0)) return i(new tt("jwt expired", new Date(1e3 * d
					.exp)))
			}
			if (r.audience) {
				var l = Array.isArray(r.audience) ? r.audience : [r.audience];
				if (!(Array.isArray(d.aud) ? d.aud : [d.aud]).some((function(e) {
						return l.some((function(t) {
							return t instanceof RegExp ? t.test(e) : t === e
						}))
					}))) return i(new Ye("jwt audience invalid. expected: " + l.join(" or ")))
			}
			if (r.issuer && ("string" == typeof r.issuer && d.iss !== r.issuer || Array.isArray(r.issuer) &&
					-1 === r.issuer.indexOf(d.iss))) return i(new Ye("jwt issuer invalid. expected: " + r
				.issuer));
			if (r.subject && d.sub !== r.subject) return i(new Ye("jwt subject invalid. expected: " + r
				.subject));
			if (r.jwtid && d.jti !== r.jwtid) return i(new Ye("jwt jwtid invalid. expected: " + r.jwtid));
			if (r.nonce && d.nonce !== r.nonce) return i(new Ye("jwt nonce invalid. expected: " + r.nonce));
			if (r.maxAge) {
				if ("number" != typeof d.iat) return i(new Ye("iat required when maxAge is specified"));
				var p = ct(r.maxAge, d.iat);
				if (void 0 === p) return i(new Ye(
					'"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'
					));
				if (o >= p + (r.clockTolerance || 0)) return i(new tt("maxAge exceeded", new Date(1e3 * p)))
			}
			if (!0 === r.complete) {
				var m = s.signature;
				return i(null, {
					header: u,
					payload: d,
					signature: m
				})
			}
			return i(null, d)
		}))
	},
	Sr = function(e, t, r, n) {
		"function" == typeof r ? (n = r, r = {}) : r = r || {};
		var i = "object" == typeof e && !Buffer.isBuffer(e),
			o = Object.assign({
				alg: r.algorithm || "HS256",
				typ: i ? "JWT" : void 0,
				kid: r.keyid
			}, r.header);

		function s(e) {
			if (n) return n(e);
			throw e
		}
		if (!t && "none" !== r.algorithm) return s(new Error("secretOrPrivateKey must have a value"));
		if (void 0 === e) return s(new Error("payload is required"));
		if (i) {
			try {
				! function(e) {
					vr(wr, !0, e, "payload")
				}(e)
			} catch (e) {
				return s(e)
			}
			r.mutatePayload || (e = Object.assign({}, e))
		} else {
			var a = _r.filter((function(e) {
				return void 0 !== r[e]
			}));
			if (a.length > 0) return s(new Error("invalid " + a.join(",") + " option for " + typeof e + " payload"))
		}
		if (void 0 !== e.exp && void 0 !== r.expiresIn) return s(new Error(
			'Bad "options.expiresIn" option the payload already has an "exp" property.'));
		if (void 0 !== e.nbf && void 0 !== r.notBefore) return s(new Error(
			'Bad "options.notBefore" option the payload already has an "nbf" property.'));
		try {
			! function(e) {
				vr(yr, !1, e, "options")
			}(r)
		} catch (e) {
			return s(e)
		}
		var c = e.iat || Math.floor(Date.now() / 1e3);
		if (r.noTimestamp ? delete e.iat : i && (e.iat = c), void 0 !== r.notBefore) {
			try {
				e.nbf = ct(r.notBefore, c)
			} catch (e) {
				return s(e)
			}
			if (void 0 === e.nbf) return s(new Error(
				'"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'
				))
		}
		if (void 0 !== r.expiresIn && "object" == typeof e) {
			try {
				e.exp = ct(r.expiresIn, c)
			} catch (e) {
				return s(e)
			}
			if (void 0 === e.exp) return s(new Error(
				'"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'
				))
		}
		Object.keys(br).forEach((function(t) {
			var n = br[t];
			if (void 0 !== r[t]) {
				if (void 0 !== e[n]) return s(new Error('Bad "options.' + t +
					'" option. The payload already has an "' + n + '" property.'));
				e[n] = r[t]
			}
		}));
		var u = r.encoding || "utf8";
		if ("function" != typeof n) return ze.sign({
			header: o,
			payload: e,
			secret: t,
			encoding: u
		});
		n = n && hr(n), ze.createSign({
			header: o,
			privateKey: t,
			payload: e,
			encoding: u
		}).once("error", n).once("done", (function(e) {
			n(null, e)
		}))
	};
let xr = [];
class kr {
	constructor(e) {
		this.fetched = !1, this.options = Object.assign({
			baseUrl: "https://appleid.apple.com",
			timeout: 1e4
		}, e)
	}
	async _fetch(e, t) {
		const {
			baseUrl: r
		} = this.options;
		return uniCloud.httpclient.request(r + e, t)
	}
	async verifyIdentityToken(e) {
		const t = e.split(".")[0],
			r = JSON.parse(Buffer.from(t, "base64").toString()).kid;
		if (!xr.length) try {
			xr = await this.getAuthKeys()
		} catch (e) {
			return {
				code: 10705,
				msg: e.message
			}
		}
		let n = this.getUsedKey(xr, r);
		if (!Object.keys(n).length && !this.fetched) {
			try {
				xr = await this.getAuthKeys()
			} catch (e) {
				return {
					code: 10705,
					msg: e.message
				}
			}
			n = this.getUsedKey(xr, r)
		}
		let i = null;
		try {
			i = Er(e, function(e, t) {
				var r = Buffer.from(e, "base64"),
					n = Buffer.from(t, "base64"),
					i = r.toString("hex"),
					o = n.toString("hex");
				i = q(i), o = q(o);
				var s = i.length / 2,
					a = o.length / 2,
					c = F(s),
					u = F(a),
					f = "30" + F(s + a + c.length / 2 + u.length / 2 + 2) + "02" + c + i + "02" + u + o;
				return "-----BEGIN RSA PUBLIC KEY-----\n" + Buffer.from(f, "hex").toString("base64").match(
					/.{1,64}/g).join("\n") + "\n-----END RSA PUBLIC KEY-----\n"
			}(n.n, n.e), {
				algorithms: n.alg
			})
		} catch (e) {
			return {
				code: 10705,
				msg: e.message
			}
		}
		return {
			code: 0,
			msg: i
		}
	}
	async getAuthKeys() {
		const {
			status: e,
			data: t
		} = await this._fetch("/auth/keys", {
			method: "GET",
			dataType: "json",
			timeout: this.options.timeout
		});
		if (this.fetched = !0, 200 !== e) throw new Error("request fail");
		return t.keys
	}
	getUsedKey(e, t) {
		let r = {};
		for (let n = 0; n < e.length; n++) {
			const i = e[n];
			if (i.kid === t) {
				r = i;
				break
			}
		}
		return r
	}
}
var Cr = function(e = {}) {
		return e.appId = e.appid, e.secret = e.appsecret, j($, e)
	},
	jr = function(e = {}) {
		return e.appId = e.appid, j(U, e)
	},
	Tr = function(e = {}) {
		return j(kr, e)
	};

function Ir(e = 6) {
	const t = ["2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N",
		"P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
	];
	let r = "";
	for (let n = 0; n < e; n++) r += t[Math.floor(Math.random() * t.length)];
	return r
}
const Pr = uniCloud.database().command;
const Rr = uniCloud.database();
const Ar = uniCloud.database();
async function Or(e) {
	const t = ["apiKey", "apiSecret"];
	for (let r = 0, n = t.length; r < n; r++) {
		const n = t[r];
		if (!e[n]) throw new Error("请在config.json中service.univerify下配置" + n)
	}
	if (!e.openid || !e.access_token) throw new Error("一键登录需要传递openid和access_token");
	return function(e) {
		const t = {
			0: "成功",
			4e3: "缺失参数",
			4001: "apiKey不存在",
			4002: "sign校验不通过",
			4003: "appid不存在",
			4004: "应用未开通一键登录服务",
			4005: "应用开通的一键登录服务正在审核中",
			4006: "服务空间不在白名单中",
			4100: "账户余额不足",
			5e3: "获取手机号失败，请稍后重试(或其他未知错误)"
		};
		return {
			...e,
			msg: t[e.code] ? "[getPhoneNumber] 获取手机号: " + t[e.code] : e.errMsg
		}
	}(await uniCloud.getPhoneNumber({
		provider: "univerify",
		...e
	}))
}
const Mr = uniCloud.database();
const Dr = uniCloud.database();
const Lr = uniCloud.database();
const Br = uniCloud.database().command;
const Nr = uniCloud.database();
const $r = uniCloud.database();
const Kr = uniCloud.database();
const Vr = uniCloud.database();
const Ur = uniCloud.database();
const qr = uniCloud.database().command;
const Hr = uniCloud.database();
var Fr = Object.freeze({
	__proto__: null,
	getUserInfo: async function({
		uid: e,
		field: t
	}) {
		const r = {};
		if (t && t.length)
			for (let e = 0; e < t.length; e++) r[t[e]] = !0;
		let n;
		return n = t && t.length ? await A.doc(e).field(r).get() : await A.doc(e).get(), 0 === n.data
			.length ? {
				code: 80301,
				msg: "未查询到用户信息"
			} : {
				code: 0,
				msg: "获取用户信息成功",
				userInfo: n.data[0]
			}
	},
	getUserInfoByToken: async function(e) {
		const t = this._verifyToken(e);
		return t.code || (delete t.iat, delete t.exp), t
	},
	resetPwd: async function({
		uid: e,
		password: t
	}) {
		const {
			passwordHash: r,
			version: n
		} = this.encryptPwd(t), i = {
			password: r,
			token: []
		};
		return n && (i.password_secret_version = n), S("upRes", await A.doc(e).update(i)), {
			code: 0,
			msg: "密码重置成功"
		}
	},
	setAvatar: async function(e) {
		return S("setAvatar -> upRes", await A.doc(e.uid).update({
			avatar: e.avatar
		})), {
			code: 0,
			msg: "头像设置成功"
		}
	},
	updatePwd: async function(e) {
		const t = await A.doc(e.uid).get();
		if (t && t.data && t.data.length > 0) {
			if (0 === this._checkPwd(t.data[0], e.oldPassword).code) {
				const {
					passwordHash: r,
					version: n
				} = this.encryptPwd(e.newPassword), i = {
					password: r,
					token: []
				};
				n && (i.password_secret_version = n);
				return S("upRes", await A.doc(t.data[0]._id).update(i)), {
					code: 0,
					msg: "修改成功"
				}
			}
			return {
				code: 40202,
				msg: "旧密码错误"
			}
		}
		return {
			code: 40201,
			msg: "用户不存在"
		}
	},
	updateUser: async function(e) {
		const t = e.uid;
		if (!t) return {
			code: 80101,
			msg: "缺少uid参数"
		};
		delete e.uid;
		const {
			username: r,
			email: n
		} = e, {
			usernameToLowerCase: i,
			emailToLowerCase: o
		} = this._getConfig();
		let s = r && r.trim(),
			a = n && n.trim();
		return s && (i && (s = s.toLowerCase()), e.username = s), a && (o && (a = a.toLowerCase()), e
			.email = a), S("update -> upRes", await A.doc(t).update(e)), {
			code: 0,
			msg: "修改成功"
		}
	},
	_getAlipayApi: function({
		platform: e
	} = {}) {
		const t = e || this.context.PLATFORM;
		if (!t) throw new Error("未能获取客户端平台信息，请主动传入platform");
		const r = this._getConfig(t);
		if (!r.oauth || !r.oauth.alipay) throw new Error(
		`请在公用模块uni-id的config.json或init方法中添加${t}平台支付宝登录配置项`);
		return ["appid", "privateKey"].forEach(e => {
			if (!r.oauth.alipay[e]) throw new Error(
				`请在公用模块uni-id的config.json或init方法中添加配置项：${t}.oauth.alipay.${e}`)
		}), jr({
			...r.oauth.alipay,
			clientType: t
		})
	},
	_getValidInviteCode: async function({
		inviteCode: e
	}) {
		let t, r = 10;
		e ? (r = 1, t = e) : t = Ir();
		let n = !1;
		try {
			for (; r > 0 && !n;) {
				r--;
				if (0 === (await A.where({
						invite_code: t
					}).get()).data.length) {
					n = !0;
					break
				}
				t = Ir()
			}
			return n ? {
				code: 0,
				inviteCode: t
			} : e ? {
				code: 80401,
				msg: "邀请码重复，设置失败"
			} : {
				code: 80402,
				msg: "邀请码设置失败稍后再试"
			}
		} catch (e) {
			return {
				code: 90001,
				msg: "数据库读写异常"
			}
		}
	},
	_addUser: async function(e, t = {}) {
		const r = this._getConfig(),
			n = {
				...e,
				register_date: Date.now(),
				register_ip: this.context.CLIENTIP
			},
			i = (await A.add(n)).id;
		let o;
		if (r.removePermissionAndRoleFromToken) {
			const e = t.needPermission;
			o = await this.createToken({
				uid: i,
				needPermission: e
			})
		} else {
			const t = e.role || [];
			let r;
			r = 0 === t.length || t.includes("admin") ? [] : await this._getPermissionListByRoleList(t), o =
				await this.createToken({
					uid: i,
					role: t,
					permission: r
				})
		}
		const {
			token: s,
			tokenExpired: a
		} = o;
		return await A.doc(i).update({
			token: [s]
		}), {
			token: s,
			tokenExpired: a,
			uid: i,
			type: "register",
			userInfo: Object.assign({}, n, {
				token: s
			})
		}
	},
	_loginExec: async function(e, t = {}) {
		if (1 === e.status) return {
			code: 10001,
			msg: "账号已禁用"
		};
		const r = this._getConfig();
		let n = e.token || [];
		"string" == typeof n && (n = [n]);
		const i = this._getExpiredToken(n);
		let o;
		if (n = n.filter(e => -1 === i.indexOf(e)), r.removePermissionAndRoleFromToken) {
			const r = t.needPermission;
			o = await this.createToken({
				uid: e._id,
				needPermission: r
			})
		} else {
			const t = e.role || [];
			let r;
			r = 0 === t.length || t.includes("admin") ? [] : await this._getPermissionListByRoleList(t), o =
				await this.createToken({
					uid: e._id,
					role: t,
					permission: r
				})
		}
		const {
			token: s,
			tokenExpired: a
		} = o;
		n.push(s), e.token = n;
		const c = {
			last_login_date: Date.now(),
			last_login_ip: this.context.CLIENTIP,
			token: n,
			...t.extraData
		};
		await A.doc(e._id).update(c);
		const u = Object.assign({}, e, c);
		return {
			code: 0,
			msg: "登录成功",
			token: s,
			uid: u._id,
			username: u.username,
			type: "login",
			userInfo: u,
			tokenExpired: a
		}
	},
	_registerExec: async function(e, t = {}) {
		const {
			my_invite_code: r
		} = e;
		if (this._getConfig().autoSetInviteCode || r) {
			const t = await this._getValidInviteCode({
				inviteCode: r
			});
			if (t.code > 0) return t;
			e.my_invite_code = t.inviteCode
		}
		return {
			code: 0,
			msg: "注册成功",
			...await this._addUser(e, t)
		}
	},
	_getWeixinApi: function({
		platform: e
	} = {}) {
		const t = e || this.context.PLATFORM;
		if (!t) throw new Error("未能获取客户端平台信息，请主动传入platform");
		const r = this._getConfig(t);
		if (!r.oauth || !r.oauth.weixin) throw new Error(`请在公用模块uni-id的config.json或init方法中添加${t}平台微信登录配置项`);
		return ["appid", "appsecret"].forEach(e => {
			if (!r.oauth.weixin[e]) throw new Error(
				`请在公用模块uni-id的config.json或init方法中添加配置项：${t}.oauth.weixin.${e}`)
		}), Cr({
			...r.oauth.weixin,
			clientType: t
		})
	},
	_getMatchedUser: function(e, t) {
		if (0 === e.length) return {
			code: 10002,
			msg: "用户不存在"
		};
		let r;
		const n = {},
			i = {};
		for (let r = e.length - 1; r >= 0; r--) {
			const o = e[r];
			for (let s = 0; s < t.length; s++) {
				const {
					field: a,
					value: c,
					fallbackValue: u
				} = t[s];
				c && o[a] === c ? (n[a] = o, e.splice(r, 1)) : u && o[a] === u && (n[a] || (n[a] = o), i[
					a] = !0, e.splice(r, 1))
			}
		}
		const o = Object.keys(n);
		let s;
		switch (o.length) {
			case 0:
				r = e[0], e.splice(0, 1);
				break;
			case 1:
				s = o[0], r = n[s];
				break;
			default:
				return {
					code: 10003, msg: "匹配到多个账号，请联系管理员处理"
				}
		}
		return e.length > 0 ? {
			code: 10003,
			msg: "匹配到多个账号，请联系管理员处理"
		} : {
			code: 0,
			msg: "",
			userMatched: r,
			fieldMatched: s,
			isFallbackValueMatched: !!s && i[s]
		}
	},
	acceptInvite: async function({
		uid: e,
		inviteCode: t
	}) {
		const r = await A.where({
			_id: Pr.neq(e),
			inviter_uid: Pr.not(Pr.all([e])),
			my_invite_code: t
		}).get();
		if (1 !== r.data.length) return {
			code: 80501,
			msg: "邀请码无效"
		};
		const n = [r.data[0]._id].concat(r.data[0].inviter_uid || []),
			i = await A.doc(e).field({
				my_invite_code: !0,
				inviter_uid: !0
			}).get();
		if (0 === i.data.length) return {
			code: 80502,
			msg: "uid错误用户不存在"
		};
		if (i.data[0].inviter_uid && i.data[0].inviter_uid.length > 0) return {
			code: 80503,
			msg: "邀请码不可修改"
		};
		const o = Date.now();
		return await A.doc(e).update({
			inviter_uid: n,
			invite_time: o
		}), await A.where({
			inviter_uid: e
		}).update({
			inviter_uid: Pr.push(n)
		}), {
			code: 0,
			msg: "邀请码填写成功"
		}
	},
	getInvitedUser: async function({
		uid: e,
		level: t = 1,
		limit: r = 20,
		offset: n = 0,
		needTotal: i = !1
	}) {
		const o = {
			code: 0,
			msg: "获取邀请列表成功",
			invitedUser: (await A.where({
				["inviter_uid." + (t - 1)]: e
			}).field({
				_id: !0,
				username: !0,
				mobile: !0,
				invite_time: !0
			}).orderBy("invite_time", "desc").skip(n).limit(r).get()).data
		};
		if (i) {
			const r = await A.where({
				["inviter_uid." + (t - 1)]: e
			}).count();
			o.total = r.total
		}
		return o
	},
	setUserInviteCode: async function({
		uid: e,
		myInviteCode: t
	}) {
		const r = await this._getValidInviteCode({
			inviteCode: t
		});
		return r.code > 0 ? r : (await A.doc(e).update({
			my_invite_code: r.inviteCode
		}), {
			code: 0,
			msg: "邀请码设置成功",
			myInviteCode: r.inviteCode
		})
	},
	loginByAlipay: async function(e) {
		let t = e;
		"string" == typeof e && (t = {
			code: e
		});
		const r = t.needPermission,
			n = t.platform || this.context.PLATFORM,
			{
				openid: i
			} = await this._getAlipayApi({
				platform: n
			}).code2Session(t.code);
		if (!i) return {
			code: 10501,
			msg: "获取openid失败"
		};
		const o = await A.where({
			ali_openid: i
		}).get();
		if (o && o.data && o.data.length > 0) {
			const e = o.data[0],
				t = await this._loginExec(e, {
					needPermission: r
				});
			if (0 !== t.code) return t;
			const {
				userInfo: n
			} = t;
			return {
				...t,
				openid: i,
				mobileConfirmed: 1 === n.mobile_confirmed,
				emailConfirmed: 1 === n.email_confirmed
			}
		} {
			const e = {
				ali_openid: i
			};
			e.my_invite_code = t.myInviteCode, e.role = t.role;
			const n = await this._registerExec(e, {
				needPermission: r
			});
			return 0 !== n.code ? n : {
				...n,
				openid: i,
				mobileConfirmed: !1,
				emailConfirmed: !1
			}
		}
	},
	loginByEmail: async function({
		email: e,
		code: t,
		password: r,
		myInviteCode: n,
		type: i,
		needPermission: o,
		role: s
	}) {
		if (!(e = e && e.trim())) return {
			code: L,
			msg: "邮箱不可为空"
		};
		const {
			emailToLowerCase: a
		} = this._getConfig();
		let c = e;
		a && (c = e.toLowerCase());
		const u = await this.verifyCode({
			email: c,
			code: t,
			type: i || "login"
		});
		if (0 !== u.code) return u;
		let f = {
			email: e,
			email_confirmed: 1
		};
		const d = {
				field: "email",
				value: e
			},
			l = Rr.command;
		c !== e && (f = l.or(f, {
			email: c,
			email_confirmed: 1
		}), d.fallbackValue = c);
		const p = await A.where(f).get();
		if (p && p.data && p.data.length > 0) {
			if ("register" === i) return {
				code: 10301,
				msg: "此邮箱已注册"
			};
			const e = this._getMatchedUser(p.data, [d]);
			if (e.code) return e;
			const {
				userMatched: t
			} = e, r = await this._loginExec(t, {
				needPermission: o
			});
			return 0 !== r.code ? r : {
				...r,
				email: c
			}
		} {
			if ("login" === i) return {
				code: 10302,
				msg: "此邮箱尚未注册"
			};
			const e = {
					email: c,
					email_confirmed: 1
				},
				t = r && r.trim();
			if (t) {
				const {
					passwordHash: r,
					version: n
				} = this.encryptPwd(t);
				e.password = r, n && (e.password_secret_version = n)
			}
			e.my_invite_code = n, e.role = s;
			const a = await this._registerExec(e, {
				needPermission: o
			});
			return 0 !== a.code ? a : {
				...a,
				email: c
			}
		}
	},
	loginBySms: async function({
		mobile: e,
		code: t,
		password: r,
		inviteCode: n,
		myInviteCode: i,
		type: o,
		needPermission: s,
		role: a
	}) {
		if (!(e = e && e.trim())) return {
			code: L,
			msg: "手机号码不可为空"
		};
		const c = this._getConfig();
		if (c.forceInviteCode && !o) throw new Error("[loginBySms]强制使用邀请码注册时，需指明type为register还是login");
		const u = await this.verifyCode({
			mobile: e,
			code: t,
			type: o || "login"
		});
		if (0 !== u.code) return u;
		const f = {
				mobile: e,
				mobile_confirmed: 1
			},
			d = await A.where(f).get();
		if (d && d.data && d.data.length > 0) {
			if ("register" === o) return {
				code: 10201,
				msg: "此手机号已注册"
			};
			const t = d.data[0],
				r = await this._loginExec(t, {
					needPermission: s
				});
			return 0 !== r.code ? r : {
				...r,
				mobile: e
			}
		} {
			const t = Date.now();
			if ("login" === o) return {
				code: 10203,
				msg: "此手机号尚未注册"
			};
			const u = {
					mobile: e,
					mobile_confirmed: 1,
					register_ip: this.context.CLIENTIP,
					register_date: t
				},
				f = r && r.trim();
			if (f) {
				const {
					passwordHash: e,
					version: t
				} = this.encryptPwd(f);
				u.password = e, t && (u.password_secret_version = t)
			}
			if (n) {
				const e = await A.where({
					my_invite_code: n
				}).get();
				if (1 !== e.data.length) return {
					code: 10202,
					msg: "邀请码无效"
				};
				u.inviter_uid = [e.data[0]._id].concat(e.data[0].inviter_uid || []), u.invite_time = t
			} else if (c.forceInviteCode) return {
				code: 10202,
				msg: "邀请码无效"
			};
			u.my_invite_code = i, u.role = a;
			const d = await this._registerExec(u, {
				needPermission: s
			});
			return 0 !== d.code ? d : {
				...d,
				mobile: e
			}
		}
	},
	loginByWeixin: async function(e) {
		let t = e;
		"string" == typeof e && (t = {
			code: e
		});
		const r = t.needPermission,
			n = t.platform || this.context.PLATFORM,
			{
				openid: i,
				unionid: o,
				sessionKey: s
			} = await this._getWeixinApi({
				platform: n
			})["mp-weixin" === n ? "code2Session" : "getOauthAccessToken"](t.code);
		if (!i) return {
			code: 10401,
			msg: "获取openid失败"
		};
		const a = Ar.command,
			c = [{
				wx_openid: {
					[n]: i
				}
			}];
		o && c.push({
			wx_unionid: o
		});
		const u = await A.where(a.or(...c)).get();
		if (u && u.data && u.data.length > 0) {
			const e = u.data[0],
				t = {
					wx_openid: {
						[n]: i
					}
				};
			o && (t.wx_unionid = o);
			const a = await this._loginExec(e, {
				needPermission: r,
				extraData: t
			});
			if (0 !== a.code) return a;
			const {
				userInfo: c
			} = a;
			return {
				...a,
				openid: i,
				unionid: o,
				sessionKey: s,
				mobileConfirmed: 1 === c.mobile_confirmed,
				emailConfirmed: 1 === c.email_confirmed
			}
		} {
			const e = {
					wx_openid: {
						[n]: i
					},
					wx_unionid: o
				},
				a = t.myInviteCode;
			e.my_invite_code = a, e.role = t.role;
			const c = await this._registerExec(e, {
				needPermission: r
			});
			return 0 !== c.code ? c : {
				...c,
				openid: i,
				unionid: o,
				sessionKey: s,
				mobileConfirmed: !1,
				emailConfirmed: !1
			}
		}
	},
	loginByUniverify: async function({
		openid: e,
		access_token: t,
		password: r,
		inviteCode: n,
		myInviteCode: i,
		type: o,
		needPermission: s,
		role: a
	}) {
		const c = this._getConfig(),
			u = c && c.service && c.service.univerify;
		if (!u) throw new Error("请在config.json中配置service.univerify下一键登录相关参数");
		if (c.forceInviteCode && !o) throw new Error(
			"[loginByUniverify] 强制使用邀请码注册时，需指明type为register还是login");
		const f = await Or({
			...u,
			openid: e,
			access_token: t
		});
		if (0 !== f.code) return f;
		const d = String(f.phoneNumber),
			l = await A.where({
				mobile: d
			}).get();
		if (l && l.data && l.data.length > 0) {
			if ("register" === o) return {
				code: 10601,
				msg: "此手机号已注册"
			};
			const e = l.data[0],
				t = await this._loginExec(e, {
					needPermission: s
				});
			return 0 !== t.code ? t : {
				...t,
				mobile: d
			}
		}
		if ("login" === o) return {
			code: 10602,
			msg: "此手机号尚未注册"
		};
		const p = Date.now(),
			m = {
				mobile: d,
				my_invite_code: i,
				mobile_confirmed: 1,
				role: a
			},
			h = r && r.trim();
		if (h) {
			const {
				passwordHash: e,
				version: t
			} = this.encryptPwd(h);
			m.password = e, t && (m.password_secret_version = t)
		}
		if (n) {
			let e = await A.where({
				my_invite_code: n
			}).get();
			if (1 !== e.data.length) return {
				code: 10202,
				msg: "邀请码无效"
			};
			e = e.data[0], m.inviter_uid = [e._id].concat(e.inviter_uid || []), m.invite_time = p
		} else if (c.forceInviteCode) return {
			code: 10202,
			msg: "邀请码无效"
		};
		m.my_invite_code = i;
		const g = await this._registerExec(m, {
			needPermission: s
		});
		return 0 !== g.code ? g : {
			...g,
			mobile: d
		}
	},
	loginByApple: async function({
		nickName: e,
		fullName: t,
		email: r,
		authorizationCode: n,
		identityToken: i,
		realUserStatus: o,
		inviteCode: s,
		myInviteCode: a,
		type: c,
		needPermission: u,
		platform: f,
		role: d
	}) {
		const l = this._getConfig(),
			p = l && l["app-plus"] && l["app-plus"].oauth && l["app-plus"].oauth.apple;
		if (!p) throw new Error("请在config.json或init方法中，app-plus.oauth.apple 下配置相关参数");
		const {
			bundleId: m
		} = p;
		if (!m) throw new Error("请在config.json或init方法中 app-plus.oauth.apple 下配置bundleId");
		if (!i) throw new Error("[loginByApple] 苹果登录需要传递identityToken");
		const h = f || this.context.PLATFORM;
		t = e || (t && Object.keys(t).length > 0 ? t.familyName + t.givenName : "");
		const {
			code: g,
			msg: y
		} = await Tr({
			clientType: h
		}).verifyIdentityToken(i);
		if (0 !== g) return {
			code: g,
			msg: y
		};
		const {
			iss: w,
			sub: v,
			aud: b,
			email: _
		} = y;
		if ("https://appleid.apple.com" !== w) return {
			code: 10706,
			msg: "签发机构检验失败"
		};
		if (!v) return {
			code: 10701,
			msg: "获取用户唯一标识符失败"
		};
		if (m !== b) return {
			code: 10702,
			msg: "bundleId校验失败，请确认配置后重试"
		};
		const E = t || "新用户" + _.split("@")[0],
			S = await A.where({
				apple_openid: v
			}).get();
		if (S && S.data && S.data.length > 0) {
			if ("register" === c) return {
				code: 10703,
				msg: "此账户已注册"
			};
			const e = S.data[0],
				t = await this._loginExec(e, {
					needPermission: u
				});
			return 0 !== t.code ? t : {
				...t,
				openid: v
			}
		}
		if ("login" === c) return {
			code: 10704,
			msg: "此账户尚未注册"
		};
		const x = {
				nickname: E,
				apple_openid: v,
				my_invite_code: a,
				role: d
			},
			k = await this._registerExec(x, {
				needPermission: u
			});
		return 0 !== k.code ? k : {
			...k,
			openid: v
		}
	},
	login: async function({
		username: e,
		password: t,
		queryField: r = [],
		needPermission: n
	}) {
		const i = Mr.command,
			o = [];
		r && r.length || (r = ["username"]), r.length > 1 && console.warn(
			"检测到当前使用queryField匹配多字段进行登录操作，需要注意：uni-id并未限制用户名不能是手机号或邮箱，需要开发者自行限制。否则可能出现用户输入abc@xx.com会同时匹配到邮箱为此值的用户和用户名为此值的用户，导致登录失败"
			);
		const {
			usernameToLowerCase: s,
			emailToLowerCase: a,
			passwordErrorLimit: c,
			passwordErrorRetryTime: u
		} = this._getConfig(), f = {
			email: {
				email_confirmed: 1
			},
			mobile: {
				mobile_confirmed: 1
			}
		}, d = {}, l = e.trim();
		if (!l) return {
			code: L,
			msg: "用户名不可为空"
		};
		s && (d.username = l.toLowerCase()), a && (d.email = l.toLowerCase());
		const p = [];
		r.forEach(t => {
			o.push({
				[t]: e,
				...f[t]
			});
			const r = {
				field: t,
				value: e
			};
			"username" === t && d.username !== e ? (o.push({
				[t]: d.username,
				...f[t]
			}), r.fallbackValue = d.username) : "email" === t && d.email !== e && (o.push({
				[t]: d.email,
				...f[t]
			}), r.fallbackValue = d.email), p.push(r)
		});
		const m = await A.where(i.or(...o)).limit(1).get(),
			h = this.context.CLIENTIP,
			g = this._getMatchedUser(m.data, p);
		if (g.code) return g;
		const {
			userMatched: y
		} = g;
		let w = y.login_ip_limit || [];
		w = w.filter(e => e.last_error_time > Date.now() - 1e3 * u);
		let v = w.find(e => e.ip === h);
		if (v && v.error_times >= c) return {
			code: 10103,
			msg: `密码错误次数过多，请${T(v.last_error_time+1e3*u)}再试。`
		};
		const b = t && t.trim();
		if (!b) return {
			code: L,
			msg: "密码不可为空"
		};
		const _ = this._checkPwd(y, b);
		if (0 === _.code) {
			const e = w.indexOf(v);
			e > -1 && w.splice(e, 1);
			const t = {
					login_ip_limit: w
				},
				{
					passwordHash: r,
					passwordVersion: i
				} = _;
			r && i && (t.password = r, t.password_secret_version = i);
			const o = await this._loginExec(y, {
				needPermission: n,
				extraData: t
			});
			return o.code, o
		}
		return v ? (v.error_times++, v.last_error_time = Date.now()) : (v = {
			ip: h,
			error_times: 1,
			last_error_time: Date.now()
		}, w.push(v)), await A.doc(y._id).update({
			login_ip_limit: w
		}), {
			code: 10102,
			msg: "密码错误"
		}
	},
	register: async function(e) {
		const t = [],
			r = [{
				name: "username",
				desc: "用户名"
			}, {
				name: "email",
				desc: "邮箱",
				extraCond: {
					email_confirmed: 1
				}
			}, {
				name: "mobile",
				desc: "手机号",
				extraCond: {
					mobile_confirmed: 1
				}
			}],
			{
				usernameToLowerCase: n,
				emailToLowerCase: i
			} = this._getConfig(),
			o = e.needPermission;
		if (void 0 !== o && delete e.needPermission, r.forEach(r => {
				const o = r.name;
				let s = e[o] && e[o].trim();
				s ? (("username" === r.name && n || "email" === r.name && i) && (s = s.toLowerCase()),
					e[o] = s, t.push({
						[o]: s,
						...r.extraCond
					})) : delete e[o]
			}), 0 === t.length) return {
			code: 20101,
			msg: "用户名、邮箱、手机号不可同时为空"
		};
		const {
			username: s,
			email: a,
			mobile: c,
			myInviteCode: u
		} = e, f = Dr.command, d = await A.where(f.or(...t)).get();
		if (d && d.data.length > 0) {
			const t = d.data[0];
			for (let n = 0; n < r.length; n++) {
				const i = r[n];
				let o = !0;
				if (i.extraCond && (o = Object.keys(i.extraCond).every(e => t[e] === i.extraCond[e])), t[i
						.name] === e[i.name] && o) return {
					code: 20102,
					msg: i.desc + "已存在"
				}
			}
		}
		const l = e.password && e.password.trim();
		if (!l) return {
			code: L,
			msg: "密码不可为空"
		};
		const {
			passwordHash: p,
			version: m
		} = this.encryptPwd(l);
		e.password = p, m && (e.password_secret_version = m), e.my_invite_code = u, delete e.myInviteCode;
		const h = await this._registerExec(e, {
			needPermission: o
		});
		return 0 !== h.code ? h : {
			...h,
			username: s,
			email: a,
			mobile: c
		}
	},
	logout: async function(e) {
		const t = await this.checkToken(e);
		if (t.code && t.code > 0) return t;
		const r = Lr.command;
		return await A.doc(t.uid).update({
			token: r.pull(e)
		}), {
			code: 0,
			msg: "退出成功"
		}
	},
	getRoleByUid: async function({
		uid: e
	}) {
		if (!e) return {
			code: "PARAMETER_ERROR",
			msg: "用户Id不能为空"
		};
		const t = await A.doc(e).get();
		return 0 === t.data.length ? {
			code: "USER_NOT_EXIST",
			msg: "用户不存在"
		} : {
			code: 0,
			msg: "获取角色成功",
			role: t.data[0].role || []
		}
	},
	getPermissionByRole: async function({
		roleID: e
	}) {
		if (!e) return {
			code: "PARAMETER_ERROR",
			msg: "角色ID不能为空"
		};
		if ("admin" === e) {
			return {
				code: 0,
				msg: "获取权限成功",
				permission: (await D.limit(1e4).get()).data.map(e => e.permission_id)
			}
		}
		const t = await M.where({
			role_id: e
		}).get();
		return 0 === t.data.length ? {
			code: "ROLE_NOT_EXIST",
			msg: "角色不存在"
		} : {
			code: 0,
			msg: "获取权限成功",
			permission: t.data[0].permission || []
		}
	},
	getPermissionByUid: async function({
		uid: e
	}) {
		const t = await A.aggregate().match({
				_id: e
			}).project({
				role: !0
			}).unwind("$role").lookup({
				from: "uni-id-roles",
				localField: "role",
				foreignField: "role_id",
				as: "roleDetail"
			}).unwind("$roleDetail").replaceRoot({
				newRoot: "$roleDetail"
			}).end(),
			r = [];
		return t.data.forEach(e => {
			Array.prototype.push.apply(r, e.permission)
		}), {
			code: 0,
			msg: "获取权限成功",
			permission: k(r)
		}
	},
	bindRole: async function({
		uid: e,
		roleList: t,
		reset: r = !1
	}) {
		const n = {};
		return "string" == typeof t && (t = [t]), n.role = r ? t : Br.push(t), await A.doc(e).update(n), {
			code: 0,
			msg: "角色绑定成功"
		}
	},
	bindPermission: async function({
		roleID: e,
		permissionList: t,
		reset: r = !1
	}) {
		const n = {};
		return "string" == typeof t && (t = [t]), n.permission = r ? t : Br.push(t), await M.where({
			role_id: e
		}).update(n), {
			code: 0,
			msg: "权限绑定成功"
		}
	},
	unbindRole: async function({
		uid: e,
		roleList: t
	}) {
		return "string" == typeof t && (t = [t]), await A.doc(e).update({
			role: Br.pull(Br.in(t))
		}), {
			code: 0,
			msg: "角色解绑成功"
		}
	},
	unbindPermission: async function({
		roleID: e,
		permissionList: t
	}) {
		return "string" == typeof t && (t = [t]), await M.where({
			role_id: e
		}).update({
			permission: Br.pull(Br.in(t))
		}), {
			code: 0,
			msg: "权限解绑成功"
		}
	},
	addRole: async function({
		roleID: e,
		roleName: t,
		comment: r,
		permission: n = []
	}) {
		return e ? "admin" === e ? {
			code: "PARAMETER_ERROR",
			msg: "不可新增roleID为admin的角色"
		} : (await M.add({
			role_id: e,
			role_name: t,
			comment: r,
			permission: n,
			create_date: Date.now()
		}), {
			code: 0,
			msg: "角色新增成功"
		}) : {
			code: "PARAMETER_ERROR",
			msg: "roleID不能为空"
		}
	},
	addPermission: async function({
		permissionID: e,
		permissionName: t,
		comment: r
	}) {
		return e ? (await D.add({
			permission_id: e,
			permission_name: t,
			comment: r,
			create_date: Date.now()
		}), {
			code: 0,
			msg: "权限新增成功"
		}) : {
			code: "PARAMETER_ERROR",
			msg: "permissionID不能为空"
		}
	},
	getRoleList: async function({
		limit: e = 20,
		offset: t = 0,
		needTotal: r = !0
	}) {
		const n = {
			code: 0,
			msg: "获取角色列表成功",
			roleList: (await M.skip(t).limit(e).get()).data
		};
		if (r) {
			const {
				total: e
			} = await M.where({
				_id: Br.exists(!0)
			}).count();
			n.total = e
		}
		return n
	},
	getRoleInfo: async function(e) {
		const t = await M.where({
			role_id: e
		}).get();
		return 0 === t.data.length ? {
			code: "ROLE_ID_NOT_EXISTS",
			msg: "角色ID不存在"
		} : {
			code: 0,
			...t.data[0]
		}
	},
	updateRole: async function({
		roleID: e,
		roleName: t,
		comment: r,
		permission: n
	}) {
		return e ? (await M.where({
			role_id: e
		}).update({
			role_name: t,
			comment: r,
			permission: n
		}), {
			code: 0,
			msg: "角色更新成功"
		}) : {
			code: "PARAMETER_ERROR",
			msg: "参数错误，roleID不能为空"
		}
	},
	deleteRole: async function({
		roleID: e
	}) {
		const t = m(e);
		if ("string" === t) e = [e];
		else if ("array" !== t) throw new Error("roleID只能为字符串或者数组");
		return await M.where({
			role_id: Br.in(e)
		}).remove(), await A.where({
			role: Br.elemMatch(Br.in(e))
		}).update({
			role: Br.pullAll(e)
		}), {
			code: 0,
			msg: "角色删除成功"
		}
	},
	getPermissionList: async function({
		limit: e = 20,
		offset: t = 0,
		needTotal: r = !0
	}) {
		const n = {
			code: 0,
			msg: "获取权限列表成功",
			permissionList: (await D.skip(t).limit(e).get()).data
		};
		if (r) {
			const {
				total: e
			} = await D.where({
				_id: Br.exists(!0)
			}).count();
			n.total = e
		}
		return n
	},
	getPermissionInfo: async function(e) {
		const t = await D.where({
			permission_id: e
		}).get();
		return 0 === t.data.length ? {
			code: "PERMISSION_ID_NOT_EXISTS",
			msg: "权限ID不存在"
		} : {
			code: 0,
			...t.data[0]
		}
	},
	updatePermission: async function({
		permissionID: e,
		permissionName: t,
		comment: r
	}) {
		return e ? (await D.where({
			permission_id: e
		}).update({
			permission_name: t,
			comment: r
		}), {
			code: 0,
			msg: "权限更新成功"
		}) : {
			code: "PARAMETER_ERROR",
			msg: "参数错误，permissionID不能为空"
		}
	},
	deletePermission: async function({
		permissionID: e
	}) {
		const t = m(e);
		if ("string" === t) e = [e];
		else if ("array" !== t) throw new Error("permissionID只能为字符串或者数组");
		return await D.where({
			permission_id: Br.in(e)
		}).remove(), await M.where({
			permission: Br.elemMatch(Br.in(e))
		}).update({
			permission: Br.pullAll(e)
		}), {
			code: 0,
			msg: "权限删除成功"
		}
	},
	bindAlipay: async function({
		uid: e,
		code: t,
		platform: r
	}) {
		const n = r || this.context.PLATFORM,
			{
				openid: i
			} = await this._getAlipayApi({
				platform: n
			}).code2Session(t);
		if (!i) return {
			code: 60401,
			msg: "获取openid失败"
		};
		const o = await A.where({
			ali_openid: i
		}).get();
		return o && o.data && o.data.length > 0 ? {
			code: 60402,
			msg: "支付宝绑定失败，此账号已被绑定"
		} : (await A.doc(e).update({
			ali_openid: i
		}), {
			code: 0,
			openid: i,
			msg: "绑定成功"
		})
	},
	bindEmail: async function({
		uid: e,
		email: t,
		code: r
	}) {
		if (!(t = t && t.trim())) return {
			code: L,
			msg: "邮箱不可为空"
		};
		const {
			emailToLowerCase: n
		} = this._getConfig();
		n && (t = t.toLowerCase());
		const i = await A.where({
			email: t,
			email_confirmed: 1
		}).limit(1).get();
		if (i && i.data.length > 0) return {
			code: 60201,
			msg: "此邮箱已被绑定"
		};
		if (r) {
			const e = await this.verifyCode({
				email: t,
				code: r,
				type: "bind"
			});
			if (0 !== e.code) return e
		}
		return await A.doc(e).update({
			email: t,
			email_confirmed: 1
		}), {
			code: 0,
			msg: "邮箱绑定成功",
			email: t
		}
	},
	bindMobile: async function({
		uid: e,
		mobile: t,
		code: r,
		openid: n,
		access_token: i,
		type: o = "sms"
	}) {
		if ("univerify" === o) {
			const e = this._getConfig(),
				r = e && e.service && e.service.univerify;
			if (!r) throw new Error("请在config.json中配置service.univerify下一键登录相关参数");
			const o = await Or({
				...r,
				openid: n,
				access_token: i
			});
			if (0 !== o.code) return o;
			t = "" + o.phoneNumber
		}
		const s = await A.where({
			mobile: t,
			mobile_confirmed: 1
		}).count();
		if (s && s.total > 0) return {
			code: 60101,
			msg: "此手机号已被绑定"
		};
		if ("sms" === o && r) {
			const e = await this.verifyCode({
				mobile: t,
				code: r,
				type: "bind"
			});
			if (0 !== e.code) return e
		}
		return S("bindMobile -> upRes", await A.doc(e).update({
			mobile: t,
			mobile_confirmed: 1
		})), {
			code: 0,
			msg: "手机号码绑定成功",
			mobile: t
		}
	},
	bindWeixin: async function({
		uid: e,
		code: t,
		platform: r
	}) {
		const n = r || this.context.PLATFORM,
			{
				openid: i,
				unionid: o
			} = await this._getWeixinApi({
				platform: n
			})["mp-weixin" === n ? "code2Session" : "getOauthAccessToken"](t);
		if (!i) return {
			code: 60301,
			msg: "获取openid失败"
		};
		const s = Nr.command,
			a = [{
				wx_openid: {
					[n]: i
				}
			}];
		o && a.push({
			wx_unionid: o
		});
		const c = await A.where(s.or(...a)).get();
		if (c && c.data && c.data.length > 0) return {
			code: 60302,
			msg: "微信绑定失败，此微信账号已被绑定"
		};
		const u = {
			wx_openid: {
				[n]: i
			}
		};
		return o && (u.wx_unionid = o), await A.doc(e).update(u), {
			code: 0,
			openid: i,
			unionid: o,
			msg: "绑定成功"
		}
	},
	unbindAlipay: async function(e) {
		const t = $r.command,
			r = await A.doc(e).update({
				ali_openid: t.remove()
			});
		return S("upRes:", r), 1 === r.updated ? {
			code: 0,
			msg: "支付宝解绑成功"
		} : {
			code: 70401,
			msg: "支付宝解绑失败，请稍后再试"
		}
	},
	unbindEmail: async function({
		uid: e,
		email: t,
		code: r
	}) {
		if (t = t && t.trim(), !e || !t) return {
			code: L,
			msg: (e ? "邮箱" : "用户Id") + "不可为空"
		};
		const {
			emailToLowerCase: n
		} = this._getConfig();
		if (r) {
			const e = await this.verifyCode({
				email: t,
				code: r,
				type: "unbind"
			});
			if (0 !== e.code) return e
		}
		const i = Kr.command;
		let o = {
			_id: e,
			email: t
		};
		if (n) {
			const r = t.toLowerCase();
			r !== t && (o = i.or(o, {
				_id: e,
				email: r
			}))
		}
		return 1 === (await A.where(o).update({
			email: i.remove(),
			email_confirmed: i.remove()
		})).updated ? {
			code: 0,
			msg: "邮箱解绑成功"
		} : {
			code: 70201,
			msg: "邮箱解绑失败，请稍后再试"
		}
	},
	unbindMobile: async function({
		uid: e,
		mobile: t,
		code: r
	}) {
		if (r) {
			const e = await this.verifyCode({
				mobile: t,
				code: r,
				type: "unbind"
			});
			if (0 !== e.code) return e
		}
		const n = Vr.command;
		return 1 === (await A.where({
			_id: e,
			mobile: t
		}).update({
			mobile: n.remove(),
			mobile_confirmed: n.remove()
		})).updated ? {
			code: 0,
			msg: "手机号解绑成功"
		} : {
			code: 70101,
			msg: "手机号解绑失败，请稍后再试"
		}
	},
	unbindWeixin: async function(e) {
		const t = Ur.command,
			r = await A.doc(e).update({
				wx_openid: t.remove(),
				wx_unionid: t.remove()
			});
		return S("upRes:", r), 1 === r.updated ? {
			code: 0,
			msg: "微信解绑成功"
		} : {
			code: 70301,
			msg: "微信解绑失败，请稍后再试"
		}
	},
	code2SessionAlipay: async function(e) {
		let t = e;
		"string" == typeof e && (t = {
			code: e
		});
		try {
			const e = t.platform || this.context.PLATFORM,
				r = await this._getAlipayApi({
					platform: e
				}).code2Session(t.code);
			return r.openid ? {
				code: 0,
				msg: "",
				...r
			} : {
				code: 80701,
				msg: "获取openid失败"
			}
		} catch (e) {
			return {
				code: 80702,
				msg: e.message
			}
		}
	},
	code2SessionWeixin: async function(e) {
		let t = e;
		"string" == typeof e && (t = {
			code: e
		});
		try {
			const e = t.platform || this.context.PLATFORM,
				r = await this._getWeixinApi({
					platform: e
				})["mp-weixin" === e ? "code2Session" : "getOauthAccessToken"](t.code);
			return r.openid ? {
				code: 0,
				msg: "",
				...r
			} : {
				code: 80601,
				msg: "获取openid失败"
			}
		} catch (e) {
			return {
				code: 80602,
				msg: e.message
			}
		}
	},
	verifyAppleIdentityToken: async function({
		identityToken: e,
		platform: t
	}) {
		const r = t || this.context.PLATFORM,
			{
				code: n,
				msg: i
			} = await Tr({
				clientType: r
			}).verifyIdentityToken(e);
		return 0 !== n ? {
			code: n,
			msg: i
		} : {
			code: n,
			msg: "验证通过",
			...i
		}
	},
	wxBizDataCrypt: async function({
		code: e,
		sessionKey: t,
		encryptedData: r,
		iv: i
	}) {
		if (!r) return {
			code: 80805,
			msg: "encryptedData不可为空"
		};
		if (!i) return {
			code: 80806,
			msg: "iv不可为空"
		};
		if (!e && !t) return {
			code: 80804,
			msg: "code或sessionKey必须有其中一个"
		};
		const o = this._getWeixinApi();
		if (!t) {
			const r = await o.code2Session(e);
			if (!r.sessionKey) return {
				code: 80801,
				msg: "sessionKey获取失败"
			};
			t = r.sessionKey
		}
		t = Buffer.from(t, "base64"), r = Buffer.from(r, "base64"), i = Buffer.from(i, "base64");
		try {
			var s = n.createDecipheriv("aes-128-cbc", t, i);
			s.setAutoPadding(!0);
			var a = s.update(r, "binary", "utf8");
			a += s.final("utf8"), a = JSON.parse(a)
		} catch (e) {
			return {
				code: 80802,
				msg: "解密失败：" + e.message
			}
		}
		return a.watermark.appid !== o.options.appId ? {
			code: 80803,
			msg: "appid不匹配"
		} : {
			code: 0,
			msg: "解密成功",
			...a
		}
	},
	encryptPwd: function(e, {
		value: t,
		version: r
	} = {}) {
		if (!(e = e && e.trim())) throw new Error("密码不可为空");
		if (!t) {
			const e = this._getConfig(),
				{
					passwordSecret: n
				} = e;
			if ("array" === m(n)) {
				const e = n.sort((e, t) => e.version - t.version);
				t = e[e.length - 1].value, r = e[e.length - 1].version
			} else t = n
		}
		if (!t) throw new Error("passwordSecret不正确");
		const i = n.createHmac("sha1", t.toString("ascii"));
		return i.update(e), {
			passwordHash: i.digest("hex"),
			version: r
		}
	},
	checkToken: async function(e, {
		needPermission: t,
		needUserInfo: r = !0
	} = {}) {
		const n = this._getConfig();
		try {
			const i = this._verifyToken(e);
			if (i.code) return i;
			const {
				uid: o,
				needPermission: s,
				role: a,
				permission: c,
				exp: u
			} = i, f = a && c;
			t = void 0 === t ? s : t;
			const d = n.removePermissionAndRoleFromToken || !f || r,
				l = !n.removePermissionAndRoleFromToken && !f || n.removePermissionAndRoleFromToken && f ||
				n.tokenExpiresThreshold && u - Date.now() / 1e3 < n.tokenExpiresThreshold;
			let p = {};
			if (d || l) {
				const t = await A.doc(o).get();
				if (!t.data || 0 === t.data.length || !t.data[0].token) return {
					code: 30202,
					msg: "token不合法，请重新登录"
				};
				if (p = t.data[0], 1 === p.status) return {
					code: 10001,
					msg: "账号已禁用"
				};
				let r = p.token;
				if (r ? "string" == typeof r && (r = [r]) : r = [], -1 === r.indexOf(e)) return {
					code: 30202,
					msg: "token不合法，请重新登录"
				}
			}
			const m = {
				code: 0,
				msg: "token校验通过",
				uid: o
			};
			let h, g;
			if (f && (m.role = a, m.permission = c), r && (m.userInfo = p), (!f && t || l) && (h = m.role =
					p.role || [], g = 0 === h.length || h.includes("admin") ? m.permission = [] : m
					.permission = await this._getPermissionListByRoleList(m.role), t && (m.role = h, m
						.permission = g)), l) {
				let e;
				e = n.removePermissionAndRoleFromToken ? await this.createToken({
					uid: o,
					needPermission: s
				}) : await this.createToken({
					uid: o,
					role: h,
					permission: g
				});
				let t = p.token;
				t ? "string" == typeof t && (t = [t]) : t = [];
				const r = this._getExpiredToken(t);
				return t = t.filter(e => -1 === r.indexOf(e)), t.push(e.token), await A.doc(o).update({
					token: t,
					last_login_date: Date.now(),
					last_login_ip: this.context.CLIENTIP
				}), {
					...m,
					...e
				}
			}
			return m
		} catch (e) {
			return {
				code: 90001,
				msg: "数据库读写异常：" + e.message,
				err: e
			}
		}
	},
	createToken: function({
		uid: e,
		needPermission: t,
		role: r,
		permission: n
	}) {
		if (!e) return {
			code: 30101,
			msg: "缺少uid参数"
		};
		const i = {
				uid: e,
				needPermission: t,
				role: r,
				permission: n
			},
			o = this._getConfig();
		if (!this.interceptorMap.has("customToken")) {
			const e = {
				...i
			};
			return this._createTokenInternal({
				signContent: e,
				config: o
			})
		}
		const s = this.interceptorMap.get("customToken");
		if ("function" != typeof s) throw new Error("custom-token.js应导出一个function");
		const a = s(i);
		return a instanceof Promise ? a.then(e => this._createTokenInternal({
			signContent: e,
			config: o
		})) : this._createTokenInternal({
			signContent: a,
			config: o
		})
	},
	_checkPwd: function(e, t) {
		if (!t) return {
			code: 1,
			message: "密码不能为空"
		};
		const {
			password: r,
			password_secret_version: n
		} = e, i = this._getConfig(), {
			passwordSecret: o
		} = i, s = m(o);
		if ("string" === s) {
			const {
				passwordHash: e
			} = this.encryptPwd(t, {
				value: o
			});
			return e === r ? {
				code: 0,
				message: "密码校验通过"
			} : {
				code: 2,
				message: "密码不正确"
			}
		}
		if ("array" !== s) throw new Error("config内passwordSecret类型错误，只可设置string类型和array类型");
		const a = o.sort((e, t) => e.version - t.version);
		let c;
		if (c = n ? a.find(e => e.version === n) : a[0], !c) return {
			code: 3,
			message: "secretVersion不正确"
		};
		const u = a[a.length - 1],
			{
				passwordHash: f
			} = this.encryptPwd(t, c);
		if (f === r) {
			const e = {
				code: 0,
				message: "密码校验通过"
			};
			if (c !== u) {
				const {
					passwordHash: r,
					version: n
				} = this.encryptPwd(t, u);
				e.passwordHash = r, e.passwordVersion = n
			}
			return e
		}
		return {
			code: 4,
			message: ""
		}
	},
	_verifyToken: function(e) {
		const t = this._getConfig();
		let r;
		try {
			r = Er(e, t.tokenSecret)
		} catch (e) {
			return "TokenExpiredError" === e.name ? {
				code: 30203,
				msg: "token已过期，请重新登录",
				err: e
			} : {
				code: 30204,
				msg: "非法token",
				err: e
			}
		}
		return t.bindTokenToDevice && r.clientId && r.clientId !== this._getClientUaHash() ? {
			code: 30201,
			msg: "token不合法，请重新登录"
		} : r
	},
	_getExpiredToken: function(e) {
		const t = this._getConfig(),
			r = [];
		return e.forEach(e => {
			try {
				Er(e, t.tokenSecret)
			} catch (t) {
				r.push(e)
			}
		}), r
	},
	_getPermissionListByRoleList: async function(e) {
		if (!Array.isArray(e)) return [];
		if (0 === e.length) return [];
		if (e.includes("admin")) {
			return (await D.limit(500).get()).data.map(e => e.permission_id)
		}
		const t = await M.where({
				role_id: qr.in(e)
			}).get(),
			r = [];
		return t.data.forEach(e => {
			Array.prototype.push.apply(r, e.permission)
		}), k(r)
	},
	_getClientUaHash: function() {
		const e = n.createHash("md5"),
			t = /MicroMessenger/i.test(this.context.CLIENTUA) ? this.context.CLIENTUA.replace(
				/(MicroMessenger\S+).*/i, "$1") : this.context.CLIENTUA;
		return e.update(t), e.digest("hex")
	},
	_createTokenInternal: function({
		signContent: e,
		config: t
	}) {
		return "object" !== m(e) ? {
			code: 30101,
			msg: "token对应的payload为对象且必须包含uid"
		} : e.uid ? (t.bindTokenToDevice && (e.clientId = this._getClientUaHash()), {
			token: Sr(e, t.tokenSecret, {
				expiresIn: t.tokenExpiresIn
			}),
			tokenExpired: Date.now() + 1e3 * t.tokenExpiresIn
		}) : {
			code: 30101,
			msg: "token对应的payload必须包含uid"
		}
	},
	setVerifyCode: async function({
		mobile: e,
		email: t,
		code: r,
		expiresIn: n,
		type: i
	}) {
		if (t = t && t.trim(), e = e && e.trim(), t) {
			const {
				emailToLowerCase: e
			} = this._getConfig();
			e && (t = t.toLowerCase())
		}
		if (!e && !t || e && t) return {
			code: 50101,
			msg: "手机号和邮箱必须且只能给定其中一个"
		};
		r || (r = x()), n || (n = 180);
		const o = Date.now(),
			s = {
				mobile: e,
				email: t,
				type: i,
				code: r,
				state: 0,
				ip: this.context.CLIENTIP,
				created_at: o,
				expired_at: o + 1e3 * n
			};
		return S("addRes", await O.add(s)), {
			code: 0,
			mobile: e,
			email: t
		}
	},
	verifyCode: async function({
		mobile: e,
		email: t,
		code: r,
		type: n
	}) {
		if (t = t && t.trim(), e = e && e.trim(), t) {
			const {
				emailToLowerCase: e
			} = this._getConfig();
			e && (t = t.toLowerCase())
		}
		if (!e && !t || e && t) return {
			code: 50201,
			msg: "手机号和邮箱必须且只能给定其中一个"
		};
		const i = Hr.command,
			o = Date.now(),
			s = {
				mobile: e,
				email: t,
				type: n,
				code: r,
				state: 0,
				expired_at: i.gt(o)
			},
			a = await O.where(s).orderBy("created_at", "desc").limit(1).get();
		if (S("verifyRecord:", a), a && a.data && a.data.length > 0) {
			const e = a.data[0];
			return S("upRes", await O.doc(e._id).update({
				state: 1
			})), {
				code: 0,
				msg: "验证通过"
			}
		}
		return {
			code: 50202,
			msg: "验证码错误或已失效"
		}
	},
	sendSmsCode: async function({
		mobile: e,
		code: t,
		type: r,
		templateId: n
	}) {
		if (!e) throw new Error("手机号码不可为空");
		if (t || (t = x()), !r) throw new Error("验证码类型不可为空");
		const i = this._getConfig();
		let o = i && i.service && i.service.sms;
		if (!o) throw new Error("请在config.json或init方法中配置service.sms下短信相关参数");
		o = Object.assign({
			codeExpiresIn: 300
		}, o);
		const s = ["smsKey", "smsSecret"];
		if (!n && !o.name) throw new Error(
			"不传入templateId时应在config.json或init方法内service.sms下配置name字段以正确使用uniID_code模板");
		for (let e = 0, t = s.length; e < t; e++) {
			const t = s[e];
			if (!o[t]) throw new Error("请在config.json或init方法中service.sms下配置" + t)
		}
		const {
			name: a,
			smsKey: c,
			smsSecret: u,
			codeExpiresIn: f
		} = o;
		let d;
		switch (r) {
			case "login":
				d = "登录";
				break;
			default:
				d = "验证手机号"
		}
		try {
			const i = {
				name: a,
				code: t,
				action: d,
				expMinute: "" + Math.round(f / 60)
			};
			a && (i.name = a), await uniCloud.sendSms({
				smsKey: c,
				smsSecret: u,
				phone: e,
				templateId: n || "uniID_code",
				data: i
			});
			const o = await this.setVerifyCode({
				mobile: e,
				code: t,
				expiresIn: f,
				type: r
			});
			return o.code >= 0 ? o : {
				code: 0,
				msg: "验证码发送成功"
			}
		} catch (e) {
			return {
				code: 50301,
				msg: "验证码发送失败, " + e.message
			}
		}
	}
});
let Jr;
try {
	Jr = require("uni-config-center")
} catch (e) {}
const Gr =
	"\n传入配置的方式有以下几种：\n- 在uni-config-center公共模块的uni-id目录下放置config.json文件（推荐）\n- 在uni-id公共模块的目录下放置config.json文件\n- 使用init方法传入配置\n- 如果使用uni-config-center且HBuilderX版本低于3.1.8，批量上传云函数及公共模块后需要再单独上传一次uni-id";
class zr {
	constructor({
		context: e,
		config: t
	} = {}) {
		const r = Jr && Jr({
			pluginId: "uni-id"
		});
		this.pluginConfig = r, this.config = t || this._getConfigContent(), Object.defineProperty(this, "context", {
			get: () => e || global.__ctx__
		}), this.interceptorMap = new Map, r && r.hasFile("custom-token.js") && this.setInterceptor(
			"customToken", require(r.resolve("custom-token.js")))
	}
	_getConfigContent() {
		if (this.pluginConfig && this.pluginConfig.hasFile("config.json")) {
			this._hasConfigFile = !0;
			try {
				return this.pluginConfig.config()
			} catch (e) {
				return
			}
		}
		const e = r.resolve(__dirname, "config.json");
		this._hasConfigFile = t.existsSync(e);
		try {
			return require(e)
		} catch (e) {}
	}
	init(e) {
		this.config = e
	}
	setInterceptor(e, t) {
		this.interceptorMap.set(e, t)
	}
	_getConfig(e) {
		const t = this.config && 0 !== Object.keys(this.config).length;
		if (this._hasConfigFile && !t) throw new Error("请确保公用模块uni-id对应的配置文件格式正确（不可包含注释）" + Gr);
		if (!t) throw new Error("公用模块uni-id缺少配置信息" + Gr);
		const r = Object.assign(this.config, this.config[e || this.context.PLATFORM]) || {},
			n = Object.assign({
				bindTokenToDevice: !1,
				tokenExpiresIn: 7200,
				tokenExpiresThreshold: 1200,
				passwordErrorLimit: 6,
				passwordErrorRetryTime: 3600,
				usernameToLowerCase: !0,
				emailToLowerCase: !0
			}, r);
		return ["passwordSecret", "tokenSecret", "tokenExpiresIn", "passwordErrorLimit", "passwordErrorRetryTime"]
			.forEach(e => {
				if (!n || !n[e]) throw new Error("请在公用模块uni-id的配置信息中内添加配置项：" + e)
			}), n
	}
}
for (const e in Fr) zr.prototype[e] = P(Fr[e]);

function Wr({
	context: e,
	config: t
} = {}) {
	const r = new zr({
			context: e,
			config: t
		}),
		n = new Proxy(r, {
			get(e, t) {
				if (t in e) return "function" == typeof e[t] ? e[t].bind(n) : e[t]
			}
		});
	return n
}
zr.prototype.createInstance = Wr;
var Xr = Wr();
module.exports = Xr;
