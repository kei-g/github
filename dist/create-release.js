"use strict";var Mt=Object.create;var J=Object.defineProperty;var $t=Object.getOwnPropertyDescriptor;var It=Object.getOwnPropertyNames;var Nt=Object.getPrototypeOf,jt=Object.prototype.hasOwnProperty;var _=(e,t)=>()=>(e&&(t=e(e=0)),t);var R=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),kt=(e,t)=>{for(var r in t)J(e,r,{get:t[r],enumerable:!0})},qe=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of It(t))!jt.call(e,i)&&i!==r&&J(e,i,{get:()=>t[i],enumerable:!(n=$t(t,i))||n.enumerable});return e};var H=(e,t,r)=>(r=e!=null?Mt(Nt(e)):{},qe(t||!e||!e.__esModule?J(r,"default",{value:e,enumerable:!0}):r,e)),Dt=e=>qe(J({},"__esModule",{value:!0}),e);var K=R(I=>{"use strict";Object.defineProperty(I,"__esModule",{value:!0});I.toCommandProperties=I.toCommandValue=void 0;function Vt(e){return e==null?"":typeof e=="string"||e instanceof String?e:JSON.stringify(e)}I.toCommandValue=Vt;function Jt(e){return Object.keys(e).length?{title:e.title,file:e.file,line:e.startLine,endLine:e.endLine,col:e.startColumn,endColumn:e.endColumn}:{}}I.toCommandProperties=Jt});var Ie=R(b=>{"use strict";var Ht=b&&b.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),Kt=b&&b.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),zt=b&&b.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&Ht(t,e,r);return Kt(t,e),t};Object.defineProperty(b,"__esModule",{value:!0});b.issue=b.issueCommand=void 0;var Yt=zt(require("os")),Me=K();function $e(e,t,r){let n=new oe(e,t,r);process.stdout.write(n.toString()+Yt.EOL)}b.issueCommand=$e;function Wt(e,t=""){$e(e,{},t)}b.issue=Wt;var Be="::",oe=class{constructor(t,r,n){t||(t="missing.command"),this.command=t,this.properties=r,this.message=n}toString(){let t=Be+this.command;if(this.properties&&Object.keys(this.properties).length>0){t+=" ";let r=!0;for(let n in this.properties)if(this.properties.hasOwnProperty(n)){let i=this.properties[n];i&&(r?r=!1:t+=",",t+=`${n}=${Xt(i)}`)}}return t+=`${Be}${Qt(this.message)}`,t}};function Qt(e){return Me.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A")}function Xt(e){return Me.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C")}});function F(){return z>Y.length-16&&(Ne.default.randomFillSync(Y),z=0),Y.slice(z,z+=16)}var Ne,Y,z,ae=_(()=>{Ne=H(require("crypto")),Y=new Uint8Array(256),z=Y.length});var je,ke=_(()=>{je=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i});function Zt(e){return typeof e=="string"&&je.test(e)}var q,G=_(()=>{ke();q=Zt});function er(e,t=0){let r=(v[e[t+0]]+v[e[t+1]]+v[e[t+2]]+v[e[t+3]]+"-"+v[e[t+4]]+v[e[t+5]]+"-"+v[e[t+6]]+v[e[t+7]]+"-"+v[e[t+8]]+v[e[t+9]]+"-"+v[e[t+10]]+v[e[t+11]]+v[e[t+12]]+v[e[t+13]]+v[e[t+14]]+v[e[t+15]]).toLowerCase();if(!q(r))throw TypeError("Stringified UUID is invalid");return r}var v,U,V=_(()=>{G();v=[];for(let e=0;e<256;++e)v.push((e+256).toString(16).substr(1));U=er});function tr(e,t,r){let n=t&&r||0,i=t||new Array(16);e=e||{};let s=e.node||De,o=e.clockseq!==void 0?e.clockseq:ue;if(s==null||o==null){let h=e.random||(e.rng||F)();s==null&&(s=De=[h[0]|1,h[1],h[2],h[3],h[4],h[5]]),o==null&&(o=ue=(h[6]<<8|h[7])&16383)}let a=e.msecs!==void 0?e.msecs:Date.now(),u=e.nsecs!==void 0?e.nsecs:le+1,c=a-ce+(u-le)/1e4;if(c<0&&e.clockseq===void 0&&(o=o+1&16383),(c<0||a>ce)&&e.nsecs===void 0&&(u=0),u>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");ce=a,le=u,ue=o,a+=122192928e5;let l=((a&268435455)*1e4+u)%4294967296;i[n++]=l>>>24&255,i[n++]=l>>>16&255,i[n++]=l>>>8&255,i[n++]=l&255;let d=a/4294967296*1e4&268435455;i[n++]=d>>>8&255,i[n++]=d&255,i[n++]=d>>>24&15|16,i[n++]=d>>>16&255,i[n++]=o>>>8|128,i[n++]=o&255;for(let h=0;h<6;++h)i[n+h]=s[h];return t||U(i)}var De,ue,ce,le,Le,Fe=_(()=>{ae();V();ce=0,le=0;Le=tr});function rr(e){if(!q(e))throw TypeError("Invalid UUID");let t,r=new Uint8Array(16);return r[0]=(t=parseInt(e.slice(0,8),16))>>>24,r[1]=t>>>16&255,r[2]=t>>>8&255,r[3]=t&255,r[4]=(t=parseInt(e.slice(9,13),16))>>>8,r[5]=t&255,r[6]=(t=parseInt(e.slice(14,18),16))>>>8,r[7]=t&255,r[8]=(t=parseInt(e.slice(19,23),16))>>>8,r[9]=t&255,r[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,r[11]=t/4294967296&255,r[12]=t>>>24&255,r[13]=t>>>16&255,r[14]=t>>>8&255,r[15]=t&255,r}var W,fe=_(()=>{G();W=rr});function nr(e){e=unescape(encodeURIComponent(e));let t=[];for(let r=0;r<e.length;++r)t.push(e.charCodeAt(r));return t}function Q(e,t,r){function n(i,s,o,a){if(typeof i=="string"&&(i=nr(i)),typeof s=="string"&&(s=W(s)),s.length!==16)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let u=new Uint8Array(16+i.length);if(u.set(s),u.set(i,s.length),u=r(u),u[6]=u[6]&15|t,u[8]=u[8]&63|128,o){a=a||0;for(let c=0;c<16;++c)o[a+c]=u[c];return o}return U(u)}try{n.name=e}catch{}return n.DNS=ir,n.URL=sr,n}var ir,sr,de=_(()=>{V();fe();ir="6ba7b810-9dad-11d1-80b4-00c04fd430c8",sr="6ba7b811-9dad-11d1-80b4-00c04fd430c8"});function or(e){return Array.isArray(e)?e=Buffer.from(e):typeof e=="string"&&(e=Buffer.from(e,"utf8")),Ge.default.createHash("md5").update(e).digest()}var Ge,Ve,Je=_(()=>{Ge=H(require("crypto"));Ve=or});var ar,He,Ke=_(()=>{de();Je();ar=Q("v3",48,Ve),He=ar});function ur(e,t,r){e=e||{};let n=e.random||(e.rng||F)();if(n[6]=n[6]&15|64,n[8]=n[8]&63|128,t){r=r||0;for(let i=0;i<16;++i)t[r+i]=n[i];return t}return U(n)}var ze,Ye=_(()=>{ae();V();ze=ur});function cr(e){return Array.isArray(e)?e=Buffer.from(e):typeof e=="string"&&(e=Buffer.from(e,"utf8")),We.default.createHash("sha1").update(e).digest()}var We,Qe,Xe=_(()=>{We=H(require("crypto"));Qe=cr});var lr,Ze,et=_(()=>{de();Xe();lr=Q("v5",80,Qe),Ze=lr});var tt,rt=_(()=>{tt="00000000-0000-0000-0000-000000000000"});function fr(e){if(!q(e))throw TypeError("Invalid UUID");return parseInt(e.substr(14,1),16)}var nt,it=_(()=>{G();nt=fr});var st={};kt(st,{NIL:()=>tt,parse:()=>W,stringify:()=>U,v1:()=>Le,v3:()=>He,v4:()=>ze,v5:()=>Ze,validate:()=>q,version:()=>nt});var ot=_(()=>{Fe();Ke();Ye();et();rt();it();G();V();fe()});var lt=R(E=>{"use strict";var dr=E&&E.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),hr=E&&E.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),ut=E&&E.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&dr(t,e,r);return hr(t,e),t};Object.defineProperty(E,"__esModule",{value:!0});E.prepareKeyValueMessage=E.issueFileCommand=void 0;var at=ut(require("fs")),he=ut(require("os")),pr=(ot(),Dt(st)),ct=K();function mr(e,t){let r=process.env[`GITHUB_${e}`];if(!r)throw new Error(`Unable to find environment variable for file command ${e}`);if(!at.existsSync(r))throw new Error(`Missing file at path: ${r}`);at.appendFileSync(r,`${ct.toCommandValue(t)}${he.EOL}`,{encoding:"utf8"})}E.issueFileCommand=mr;function gr(e,t){let r=`ghadelimiter_${pr.v4()}`,n=ct.toCommandValue(t);if(e.includes(r))throw new Error(`Unexpected input: name should not contain the delimiter "${r}"`);if(n.includes(r))throw new Error(`Unexpected input: value should not contain the delimiter "${r}"`);return`${e}<<${r}${he.EOL}${n}${he.EOL}${r}`}E.prepareKeyValueMessage=gr});var dt=R(N=>{"use strict";Object.defineProperty(N,"__esModule",{value:!0});N.checkBypass=N.getProxyUrl=void 0;function vr(e){let t=e.protocol==="https:";if(ft(e))return;let r=t?process.env.https_proxy||process.env.HTTPS_PROXY:process.env.http_proxy||process.env.HTTP_PROXY;if(r)return new URL(r)}N.getProxyUrl=vr;function ft(e){if(!e.hostname)return!1;let t=process.env.no_proxy||process.env.NO_PROXY||"";if(!t)return!1;let r;e.port?r=Number(e.port):e.protocol==="http:"?r=80:e.protocol==="https:"&&(r=443);let n=[e.hostname.toUpperCase()];typeof r=="number"&&n.push(`${n[0]}:${r}`);for(let i of t.split(",").map(s=>s.trim().toUpperCase()).filter(s=>s))if(n.some(s=>s===i))return!0;return!1}N.checkBypass=ft});var gt=R(j=>{"use strict";var di=require("net"),_r=require("tls"),pe=require("http"),ht=require("https"),yr=require("events"),hi=require("assert"),wr=require("util");j.httpOverHttp=Or;j.httpsOverHttp=Rr;j.httpOverHttps=br;j.httpsOverHttps=Er;function Or(e){var t=new A(e);return t.request=pe.request,t}function Rr(e){var t=new A(e);return t.request=pe.request,t.createSocket=pt,t.defaultPort=443,t}function br(e){var t=new A(e);return t.request=ht.request,t}function Er(e){var t=new A(e);return t.request=ht.request,t.createSocket=pt,t.defaultPort=443,t}function A(e){var t=this;t.options=e||{},t.proxyOptions=t.options.proxy||{},t.maxSockets=t.options.maxSockets||pe.Agent.defaultMaxSockets,t.requests=[],t.sockets=[],t.on("free",function(n,i,s,o){for(var a=mt(i,s,o),u=0,c=t.requests.length;u<c;++u){var l=t.requests[u];if(l.host===a.host&&l.port===a.port){t.requests.splice(u,1),l.request.onSocket(n);return}}n.destroy(),t.removeSocket(n)})}wr.inherits(A,yr.EventEmitter);A.prototype.addRequest=function(t,r,n,i){var s=this,o=me({request:t},s.options,mt(r,n,i));if(s.sockets.length>=this.maxSockets){s.requests.push(o);return}s.createSocket(o,function(a){a.on("free",u),a.on("close",c),a.on("agentRemove",c),t.onSocket(a);function u(){s.emit("free",a,o)}function c(l){s.removeSocket(a),a.removeListener("free",u),a.removeListener("close",c),a.removeListener("agentRemove",c)}})};A.prototype.createSocket=function(t,r){var n=this,i={};n.sockets.push(i);var s=me({},n.proxyOptions,{method:"CONNECT",path:t.host+":"+t.port,agent:!1,headers:{host:t.host+":"+t.port}});t.localAddress&&(s.localAddress=t.localAddress),s.proxyAuth&&(s.headers=s.headers||{},s.headers["Proxy-Authorization"]="Basic "+new Buffer(s.proxyAuth).toString("base64")),C("making CONNECT request");var o=n.request(s);o.useChunkedEncodingByDefault=!1,o.once("response",a),o.once("upgrade",u),o.once("connect",c),o.once("error",l),o.end();function a(d){d.upgrade=!0}function u(d,h,T){process.nextTick(function(){c(d,h,T)})}function c(d,h,T){if(o.removeAllListeners(),h.removeAllListeners(),d.statusCode!==200){C("tunneling socket could not be established, statusCode=%d",d.statusCode),h.destroy();var M=new Error("tunneling socket could not be established, statusCode="+d.statusCode);M.code="ECONNRESET",t.request.emit("error",M),n.removeSocket(i);return}if(T.length>0){C("got illegal response body from proxy"),h.destroy();var M=new Error("got illegal response body from proxy");M.code="ECONNRESET",t.request.emit("error",M),n.removeSocket(i);return}return C("tunneling connection has established"),n.sockets[n.sockets.indexOf(i)]=h,r(h)}function l(d){o.removeAllListeners(),C(`tunneling socket could not be established, cause=%s
`,d.message,d.stack);var h=new Error("tunneling socket could not be established, cause="+d.message);h.code="ECONNRESET",t.request.emit("error",h),n.removeSocket(i)}};A.prototype.removeSocket=function(t){var r=this.sockets.indexOf(t);if(r!==-1){this.sockets.splice(r,1);var n=this.requests.shift();n&&this.createSocket(n,function(i){n.request.onSocket(i)})}};function pt(e,t){var r=this;A.prototype.createSocket.call(r,e,function(n){var i=e.request.getHeader("host"),s=me({},r.options,{socket:n,servername:i?i.replace(/:.*$/,""):e.host}),o=_r.connect(0,s);r.sockets[r.sockets.indexOf(n)]=o,t(o)})}function mt(e,t,r){return typeof e=="string"?{host:e,port:t,localAddress:r}:e}function me(e){for(var t=1,r=arguments.length;t<r;++t){var n=arguments[t];if(typeof n=="object")for(var i=Object.keys(n),s=0,o=i.length;s<o;++s){var a=i[s];n[a]!==void 0&&(e[a]=n[a])}}return e}var C;process.env.NODE_DEBUG&&/\btunnel\b/.test(process.env.NODE_DEBUG)?C=function(){var e=Array.prototype.slice.call(arguments);typeof e[0]=="string"?e[0]="TUNNEL: "+e[0]:e.unshift("TUNNEL:"),console.error.apply(console,e)}:C=function(){};j.debug=C});var _t=R((mi,vt)=>{vt.exports=gt()});var wt=R(m=>{"use strict";var Sr=m&&m.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),Pr=m&&m.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),ne=m&&m.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&Sr(t,e,r);return Pr(t,e),t},g=m&&m.__awaiter||function(e,t,r,n){function i(s){return s instanceof r?s:new r(function(o){o(s)})}return new(r||(r=Promise))(function(s,o){function a(l){try{c(n.next(l))}catch(d){o(d)}}function u(l){try{c(n.throw(l))}catch(d){o(d)}}function c(l){l.done?s(l.value):i(l.value).then(a,u)}c((n=n.apply(e,t||[])).next())})};Object.defineProperty(m,"__esModule",{value:!0});m.HttpClient=m.isHttps=m.HttpClientResponse=m.HttpClientError=m.getProxyUrl=m.MediaTypes=m.Headers=m.HttpCodes=void 0;var X=ne(require("http")),ge=ne(require("https")),yt=ne(dt()),Z=ne(_t()),P;(function(e){e[e.OK=200]="OK",e[e.MultipleChoices=300]="MultipleChoices",e[e.MovedPermanently=301]="MovedPermanently",e[e.ResourceMoved=302]="ResourceMoved",e[e.SeeOther=303]="SeeOther",e[e.NotModified=304]="NotModified",e[e.UseProxy=305]="UseProxy",e[e.SwitchProxy=306]="SwitchProxy",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect",e[e.BadRequest=400]="BadRequest",e[e.Unauthorized=401]="Unauthorized",e[e.PaymentRequired=402]="PaymentRequired",e[e.Forbidden=403]="Forbidden",e[e.NotFound=404]="NotFound",e[e.MethodNotAllowed=405]="MethodNotAllowed",e[e.NotAcceptable=406]="NotAcceptable",e[e.ProxyAuthenticationRequired=407]="ProxyAuthenticationRequired",e[e.RequestTimeout=408]="RequestTimeout",e[e.Conflict=409]="Conflict",e[e.Gone=410]="Gone",e[e.TooManyRequests=429]="TooManyRequests",e[e.InternalServerError=500]="InternalServerError",e[e.NotImplemented=501]="NotImplemented",e[e.BadGateway=502]="BadGateway",e[e.ServiceUnavailable=503]="ServiceUnavailable",e[e.GatewayTimeout=504]="GatewayTimeout"})(P=m.HttpCodes||(m.HttpCodes={}));var y;(function(e){e.Accept="accept",e.ContentType="content-type"})(y=m.Headers||(m.Headers={}));var B;(function(e){e.ApplicationJson="application/json"})(B=m.MediaTypes||(m.MediaTypes={}));function xr(e){let t=yt.getProxyUrl(new URL(e));return t?t.href:""}m.getProxyUrl=xr;var Tr=[P.MovedPermanently,P.ResourceMoved,P.SeeOther,P.TemporaryRedirect,P.PermanentRedirect],Ar=[P.BadGateway,P.ServiceUnavailable,P.GatewayTimeout],qr=["OPTIONS","GET","DELETE","HEAD"],Ur=10,Cr=5,te=class e extends Error{constructor(t,r){super(t),this.name="HttpClientError",this.statusCode=r,Object.setPrototypeOf(this,e.prototype)}};m.HttpClientError=te;var re=class{constructor(t){this.message=t}readBody(){return g(this,void 0,void 0,function*(){return new Promise(t=>g(this,void 0,void 0,function*(){let r=Buffer.alloc(0);this.message.on("data",n=>{r=Buffer.concat([r,n])}),this.message.on("end",()=>{t(r.toString())})}))})}};m.HttpClientResponse=re;function Br(e){return new URL(e).protocol==="https:"}m.isHttps=Br;var ve=class{constructor(t,r,n){this._ignoreSslError=!1,this._allowRedirects=!0,this._allowRedirectDowngrade=!1,this._maxRedirects=50,this._allowRetries=!1,this._maxRetries=1,this._keepAlive=!1,this._disposed=!1,this.userAgent=t,this.handlers=r||[],this.requestOptions=n,n&&(n.ignoreSslError!=null&&(this._ignoreSslError=n.ignoreSslError),this._socketTimeout=n.socketTimeout,n.allowRedirects!=null&&(this._allowRedirects=n.allowRedirects),n.allowRedirectDowngrade!=null&&(this._allowRedirectDowngrade=n.allowRedirectDowngrade),n.maxRedirects!=null&&(this._maxRedirects=Math.max(n.maxRedirects,0)),n.keepAlive!=null&&(this._keepAlive=n.keepAlive),n.allowRetries!=null&&(this._allowRetries=n.allowRetries),n.maxRetries!=null&&(this._maxRetries=n.maxRetries))}options(t,r){return g(this,void 0,void 0,function*(){return this.request("OPTIONS",t,null,r||{})})}get(t,r){return g(this,void 0,void 0,function*(){return this.request("GET",t,null,r||{})})}del(t,r){return g(this,void 0,void 0,function*(){return this.request("DELETE",t,null,r||{})})}post(t,r,n){return g(this,void 0,void 0,function*(){return this.request("POST",t,r,n||{})})}patch(t,r,n){return g(this,void 0,void 0,function*(){return this.request("PATCH",t,r,n||{})})}put(t,r,n){return g(this,void 0,void 0,function*(){return this.request("PUT",t,r,n||{})})}head(t,r){return g(this,void 0,void 0,function*(){return this.request("HEAD",t,null,r||{})})}sendStream(t,r,n,i){return g(this,void 0,void 0,function*(){return this.request(t,r,n,i)})}getJson(t,r={}){return g(this,void 0,void 0,function*(){r[y.Accept]=this._getExistingOrDefaultHeader(r,y.Accept,B.ApplicationJson);let n=yield this.get(t,r);return this._processResponse(n,this.requestOptions)})}postJson(t,r,n={}){return g(this,void 0,void 0,function*(){let i=JSON.stringify(r,null,2);n[y.Accept]=this._getExistingOrDefaultHeader(n,y.Accept,B.ApplicationJson),n[y.ContentType]=this._getExistingOrDefaultHeader(n,y.ContentType,B.ApplicationJson);let s=yield this.post(t,i,n);return this._processResponse(s,this.requestOptions)})}putJson(t,r,n={}){return g(this,void 0,void 0,function*(){let i=JSON.stringify(r,null,2);n[y.Accept]=this._getExistingOrDefaultHeader(n,y.Accept,B.ApplicationJson),n[y.ContentType]=this._getExistingOrDefaultHeader(n,y.ContentType,B.ApplicationJson);let s=yield this.put(t,i,n);return this._processResponse(s,this.requestOptions)})}patchJson(t,r,n={}){return g(this,void 0,void 0,function*(){let i=JSON.stringify(r,null,2);n[y.Accept]=this._getExistingOrDefaultHeader(n,y.Accept,B.ApplicationJson),n[y.ContentType]=this._getExistingOrDefaultHeader(n,y.ContentType,B.ApplicationJson);let s=yield this.patch(t,i,n);return this._processResponse(s,this.requestOptions)})}request(t,r,n,i){return g(this,void 0,void 0,function*(){if(this._disposed)throw new Error("Client has already been disposed.");let s=new URL(r),o=this._prepareRequest(t,s,i),a=this._allowRetries&&qr.includes(t)?this._maxRetries+1:1,u=0,c;do{if(c=yield this.requestRaw(o,n),c&&c.message&&c.message.statusCode===P.Unauthorized){let d;for(let h of this.handlers)if(h.canHandleAuthentication(c)){d=h;break}return d?d.handleAuthentication(this,o,n):c}let l=this._maxRedirects;for(;c.message.statusCode&&Tr.includes(c.message.statusCode)&&this._allowRedirects&&l>0;){let d=c.message.headers.location;if(!d)break;let h=new URL(d);if(s.protocol==="https:"&&s.protocol!==h.protocol&&!this._allowRedirectDowngrade)throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");if(yield c.readBody(),h.hostname!==s.hostname)for(let T in i)T.toLowerCase()==="authorization"&&delete i[T];o=this._prepareRequest(t,h,i),c=yield this.requestRaw(o,n),l--}if(!c.message.statusCode||!Ar.includes(c.message.statusCode))return c;u+=1,u<a&&(yield c.readBody(),yield this._performExponentialBackoff(u))}while(u<a);return c})}dispose(){this._agent&&this._agent.destroy(),this._disposed=!0}requestRaw(t,r){return g(this,void 0,void 0,function*(){return new Promise((n,i)=>{function s(o,a){o?i(o):a?n(a):i(new Error("Unknown error"))}this.requestRawWithCallback(t,r,s)})})}requestRawWithCallback(t,r,n){typeof r=="string"&&(t.options.headers||(t.options.headers={}),t.options.headers["Content-Length"]=Buffer.byteLength(r,"utf8"));let i=!1;function s(u,c){i||(i=!0,n(u,c))}let o=t.httpModule.request(t.options,u=>{let c=new re(u);s(void 0,c)}),a;o.on("socket",u=>{a=u}),o.setTimeout(this._socketTimeout||3*6e4,()=>{a&&a.end(),s(new Error(`Request timeout: ${t.options.path}`))}),o.on("error",function(u){s(u)}),r&&typeof r=="string"&&o.write(r,"utf8"),r&&typeof r!="string"?(r.on("close",function(){o.end()}),r.pipe(o)):o.end()}getAgent(t){let r=new URL(t);return this._getAgent(r)}_prepareRequest(t,r,n){let i={};i.parsedUrl=r;let s=i.parsedUrl.protocol==="https:";i.httpModule=s?ge:X;let o=s?443:80;if(i.options={},i.options.host=i.parsedUrl.hostname,i.options.port=i.parsedUrl.port?parseInt(i.parsedUrl.port):o,i.options.path=(i.parsedUrl.pathname||"")+(i.parsedUrl.search||""),i.options.method=t,i.options.headers=this._mergeHeaders(n),this.userAgent!=null&&(i.options.headers["user-agent"]=this.userAgent),i.options.agent=this._getAgent(i.parsedUrl),this.handlers)for(let a of this.handlers)a.prepareRequest(i.options);return i}_mergeHeaders(t){return this.requestOptions&&this.requestOptions.headers?Object.assign({},ee(this.requestOptions.headers),ee(t||{})):ee(t||{})}_getExistingOrDefaultHeader(t,r,n){let i;return this.requestOptions&&this.requestOptions.headers&&(i=ee(this.requestOptions.headers)[r]),t[r]||i||n}_getAgent(t){let r,n=yt.getProxyUrl(t),i=n&&n.hostname;if(this._keepAlive&&i&&(r=this._proxyAgent),this._keepAlive&&!i&&(r=this._agent),r)return r;let s=t.protocol==="https:",o=100;if(this.requestOptions&&(o=this.requestOptions.maxSockets||X.globalAgent.maxSockets),n&&n.hostname){let a={maxSockets:o,keepAlive:this._keepAlive,proxy:Object.assign(Object.assign({},(n.username||n.password)&&{proxyAuth:`${n.username}:${n.password}`}),{host:n.hostname,port:n.port})},u,c=n.protocol==="https:";s?u=c?Z.httpsOverHttps:Z.httpsOverHttp:u=c?Z.httpOverHttps:Z.httpOverHttp,r=u(a),this._proxyAgent=r}if(this._keepAlive&&!r){let a={keepAlive:this._keepAlive,maxSockets:o};r=s?new ge.Agent(a):new X.Agent(a),this._agent=r}return r||(r=s?ge.globalAgent:X.globalAgent),s&&this._ignoreSslError&&(r.options=Object.assign(r.options||{},{rejectUnauthorized:!1})),r}_performExponentialBackoff(t){return g(this,void 0,void 0,function*(){t=Math.min(Ur,t);let r=Cr*Math.pow(2,t);return new Promise(n=>setTimeout(()=>n(),r))})}_processResponse(t,r){return g(this,void 0,void 0,function*(){return new Promise((n,i)=>g(this,void 0,void 0,function*(){let s=t.message.statusCode||0,o={statusCode:s,result:null,headers:{}};s===P.NotFound&&n(o);function a(l,d){if(typeof d=="string"){let h=new Date(d);if(!isNaN(h.valueOf()))return h}return d}let u,c;try{c=yield t.readBody(),c&&c.length>0&&(r&&r.deserializeDates?u=JSON.parse(c,a):u=JSON.parse(c),o.result=u),o.headers=t.message.headers}catch{}if(s>299){let l;u&&u.message?l=u.message:c&&c.length>0?l=c:l=`Failed request: (${s})`;let d=new te(l,s);d.result=o.result,i(d)}else n(o)}))})}};m.HttpClient=ve;var ee=e=>Object.keys(e).reduce((t,r)=>(t[r.toLowerCase()]=e[r],t),{})});var Ot=R(x=>{"use strict";var Oe=x&&x.__awaiter||function(e,t,r,n){function i(s){return s instanceof r?s:new r(function(o){o(s)})}return new(r||(r=Promise))(function(s,o){function a(l){try{c(n.next(l))}catch(d){o(d)}}function u(l){try{c(n.throw(l))}catch(d){o(d)}}function c(l){l.done?s(l.value):i(l.value).then(a,u)}c((n=n.apply(e,t||[])).next())})};Object.defineProperty(x,"__esModule",{value:!0});x.PersonalAccessTokenCredentialHandler=x.BearerCredentialHandler=x.BasicCredentialHandler=void 0;var _e=class{constructor(t,r){this.username=t,this.password=r}prepareRequest(t){if(!t.headers)throw Error("The request has no headers");t.headers.Authorization=`Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`}canHandleAuthentication(){return!1}handleAuthentication(){return Oe(this,void 0,void 0,function*(){throw new Error("not implemented")})}};x.BasicCredentialHandler=_e;var ye=class{constructor(t){this.token=t}prepareRequest(t){if(!t.headers)throw Error("The request has no headers");t.headers.Authorization=`Bearer ${this.token}`}canHandleAuthentication(){return!1}handleAuthentication(){return Oe(this,void 0,void 0,function*(){throw new Error("not implemented")})}};x.BearerCredentialHandler=ye;var we=class{constructor(t){this.token=t}prepareRequest(t){if(!t.headers)throw Error("The request has no headers");t.headers.Authorization=`Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`}canHandleAuthentication(){return!1}handleAuthentication(){return Oe(this,void 0,void 0,function*(){throw new Error("not implemented")})}};x.PersonalAccessTokenCredentialHandler=we});var Et=R(k=>{"use strict";var Rt=k&&k.__awaiter||function(e,t,r,n){function i(s){return s instanceof r?s:new r(function(o){o(s)})}return new(r||(r=Promise))(function(s,o){function a(l){try{c(n.next(l))}catch(d){o(d)}}function u(l){try{c(n.throw(l))}catch(d){o(d)}}function c(l){l.done?s(l.value):i(l.value).then(a,u)}c((n=n.apply(e,t||[])).next())})};Object.defineProperty(k,"__esModule",{value:!0});k.OidcClient=void 0;var Mr=wt(),$r=Ot(),bt=be(),Re=class e{static createHttpClient(t=!0,r=10){let n={allowRetries:t,maxRetries:r};return new Mr.HttpClient("actions/oidc-client",[new $r.BearerCredentialHandler(e.getRequestToken())],n)}static getRequestToken(){let t=process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;if(!t)throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");return t}static getIDTokenUrl(){let t=process.env.ACTIONS_ID_TOKEN_REQUEST_URL;if(!t)throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");return t}static getCall(t){var r;return Rt(this,void 0,void 0,function*(){let s=(r=(yield e.createHttpClient().getJson(t).catch(o=>{throw new Error(`Failed to get ID Token. 
 
        Error Code : ${o.statusCode}
 
        Error Message: ${o.message}`)})).result)===null||r===void 0?void 0:r.value;if(!s)throw new Error("Response json body do not have ID Token field");return s})}static getIDToken(t){return Rt(this,void 0,void 0,function*(){try{let r=e.getIDTokenUrl();if(t){let i=encodeURIComponent(t);r=`${r}&audience=${i}`}bt.debug(`ID token url is ${r}`);let n=yield e.getCall(r);return bt.setSecret(n),n}catch(r){throw new Error(`Error message: ${r.message}`)}})}};k.OidcClient=Re});var xe=R(w=>{"use strict";var Ee=w&&w.__awaiter||function(e,t,r,n){function i(s){return s instanceof r?s:new r(function(o){o(s)})}return new(r||(r=Promise))(function(s,o){function a(l){try{c(n.next(l))}catch(d){o(d)}}function u(l){try{c(n.throw(l))}catch(d){o(d)}}function c(l){l.done?s(l.value):i(l.value).then(a,u)}c((n=n.apply(e,t||[])).next())})};Object.defineProperty(w,"__esModule",{value:!0});w.summary=w.markdownSummary=w.SUMMARY_DOCS_URL=w.SUMMARY_ENV_VAR=void 0;var Ir=require("os"),Se=require("fs"),{access:Nr,appendFile:jr,writeFile:kr}=Se.promises;w.SUMMARY_ENV_VAR="GITHUB_STEP_SUMMARY";w.SUMMARY_DOCS_URL="https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";var Pe=class{constructor(){this._buffer=""}filePath(){return Ee(this,void 0,void 0,function*(){if(this._filePath)return this._filePath;let t=process.env[w.SUMMARY_ENV_VAR];if(!t)throw new Error(`Unable to find environment variable for $${w.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);try{yield Nr(t,Se.constants.R_OK|Se.constants.W_OK)}catch{throw new Error(`Unable to access summary file: '${t}'. Check if the file has correct read/write permissions.`)}return this._filePath=t,this._filePath})}wrap(t,r,n={}){let i=Object.entries(n).map(([s,o])=>` ${s}="${o}"`).join("");return r?`<${t}${i}>${r}</${t}>`:`<${t}${i}>`}write(t){return Ee(this,void 0,void 0,function*(){let r=!!t?.overwrite,n=yield this.filePath();return yield(r?kr:jr)(n,this._buffer,{encoding:"utf8"}),this.emptyBuffer()})}clear(){return Ee(this,void 0,void 0,function*(){return this.emptyBuffer().write({overwrite:!0})})}stringify(){return this._buffer}isEmptyBuffer(){return this._buffer.length===0}emptyBuffer(){return this._buffer="",this}addRaw(t,r=!1){return this._buffer+=t,r?this.addEOL():this}addEOL(){return this.addRaw(Ir.EOL)}addCodeBlock(t,r){let n=Object.assign({},r&&{lang:r}),i=this.wrap("pre",this.wrap("code",t),n);return this.addRaw(i).addEOL()}addList(t,r=!1){let n=r?"ol":"ul",i=t.map(o=>this.wrap("li",o)).join(""),s=this.wrap(n,i);return this.addRaw(s).addEOL()}addTable(t){let r=t.map(i=>{let s=i.map(o=>{if(typeof o=="string")return this.wrap("td",o);let{header:a,data:u,colspan:c,rowspan:l}=o,d=a?"th":"td",h=Object.assign(Object.assign({},c&&{colspan:c}),l&&{rowspan:l});return this.wrap(d,u,h)}).join("");return this.wrap("tr",s)}).join(""),n=this.wrap("table",r);return this.addRaw(n).addEOL()}addDetails(t,r){let n=this.wrap("details",this.wrap("summary",t)+r);return this.addRaw(n).addEOL()}addImage(t,r,n){let{width:i,height:s}=n||{},o=Object.assign(Object.assign({},i&&{width:i}),s&&{height:s}),a=this.wrap("img",null,Object.assign({src:t,alt:r},o));return this.addRaw(a).addEOL()}addHeading(t,r){let n=`h${r}`,i=["h1","h2","h3","h4","h5","h6"].includes(n)?n:"h1",s=this.wrap(i,t);return this.addRaw(s).addEOL()}addSeparator(){let t=this.wrap("hr",null);return this.addRaw(t).addEOL()}addBreak(){let t=this.wrap("br",null);return this.addRaw(t).addEOL()}addQuote(t,r){let n=Object.assign({},r&&{cite:r}),i=this.wrap("blockquote",t,n);return this.addRaw(i).addEOL()}addLink(t,r){let n=this.wrap("a",t,{href:r});return this.addRaw(n).addEOL()}},St=new Pe;w.markdownSummary=St;w.summary=St});var Pt=R(O=>{"use strict";var Dr=O&&O.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),Lr=O&&O.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),Fr=O&&O.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&Dr(t,e,r);return Lr(t,e),t};Object.defineProperty(O,"__esModule",{value:!0});O.toPlatformPath=O.toWin32Path=O.toPosixPath=void 0;var Gr=Fr(require("path"));function Vr(e){return e.replace(/[\\]/g,"/")}O.toPosixPath=Vr;function Jr(e){return e.replace(/[/]/g,"\\")}O.toWin32Path=Jr;function Hr(e){return e.replace(/[/\\]/g,Gr.sep)}O.toPlatformPath=Hr});var be=R(f=>{"use strict";var Kr=f&&f.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),zr=f&&f.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),xt=f&&f.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&Kr(t,e,r);return zr(t,e),t},Tt=f&&f.__awaiter||function(e,t,r,n){function i(s){return s instanceof r?s:new r(function(o){o(s)})}return new(r||(r=Promise))(function(s,o){function a(l){try{c(n.next(l))}catch(d){o(d)}}function u(l){try{c(n.throw(l))}catch(d){o(d)}}function c(l){l.done?s(l.value):i(l.value).then(a,u)}c((n=n.apply(e,t||[])).next())})};Object.defineProperty(f,"__esModule",{value:!0});f.getIDToken=f.getState=f.saveState=f.group=f.endGroup=f.startGroup=f.info=f.notice=f.warning=f.error=f.debug=f.isDebug=f.setFailed=f.setCommandEcho=f.setOutput=f.getBooleanInput=f.getMultilineInput=f.getInput=f.addPath=f.setSecret=f.exportVariable=f.ExitCode=void 0;var S=Ie(),$=lt(),D=K(),At=xt(require("os")),Yr=xt(require("path")),Wr=Et(),qt;(function(e){e[e.Success=0]="Success",e[e.Failure=1]="Failure"})(qt=f.ExitCode||(f.ExitCode={}));function Qr(e,t){let r=D.toCommandValue(t);if(process.env[e]=r,process.env.GITHUB_ENV||"")return $.issueFileCommand("ENV",$.prepareKeyValueMessage(e,t));S.issueCommand("set-env",{name:e},r)}f.exportVariable=Qr;function Xr(e){S.issueCommand("add-mask",{},e)}f.setSecret=Xr;function Zr(e){process.env.GITHUB_PATH||""?$.issueFileCommand("PATH",e):S.issueCommand("add-path",{},e),process.env.PATH=`${e}${Yr.delimiter}${process.env.PATH}`}f.addPath=Zr;function Te(e,t){let r=process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`]||"";if(t&&t.required&&!r)throw new Error(`Input required and not supplied: ${e}`);return t&&t.trimWhitespace===!1?r:r.trim()}f.getInput=Te;function en(e,t){let r=Te(e,t).split(`
`).filter(n=>n!=="");return t&&t.trimWhitespace===!1?r:r.map(n=>n.trim())}f.getMultilineInput=en;function tn(e,t){let r=["true","True","TRUE"],n=["false","False","FALSE"],i=Te(e,t);if(r.includes(i))return!0;if(n.includes(i))return!1;throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${e}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``)}f.getBooleanInput=tn;function rn(e,t){if(process.env.GITHUB_OUTPUT||"")return $.issueFileCommand("OUTPUT",$.prepareKeyValueMessage(e,t));process.stdout.write(At.EOL),S.issueCommand("set-output",{name:e},D.toCommandValue(t))}f.setOutput=rn;function nn(e){S.issue("echo",e?"on":"off")}f.setCommandEcho=nn;function sn(e){process.exitCode=qt.Failure,Ut(e)}f.setFailed=sn;function on(){return process.env.RUNNER_DEBUG==="1"}f.isDebug=on;function an(e){S.issueCommand("debug",{},e)}f.debug=an;function Ut(e,t={}){S.issueCommand("error",D.toCommandProperties(t),e instanceof Error?e.toString():e)}f.error=Ut;function un(e,t={}){S.issueCommand("warning",D.toCommandProperties(t),e instanceof Error?e.toString():e)}f.warning=un;function cn(e,t={}){S.issueCommand("notice",D.toCommandProperties(t),e instanceof Error?e.toString():e)}f.notice=cn;function ln(e){process.stdout.write(e+At.EOL)}f.info=ln;function Ct(e){S.issue("group",e)}f.startGroup=Ct;function Bt(){S.issue("endgroup")}f.endGroup=Bt;function fn(e,t){return Tt(this,void 0,void 0,function*(){Ct(e);let r;try{r=yield t()}finally{Bt()}return r})}f.group=fn;function dn(e,t){if(process.env.GITHUB_STATE||"")return $.issueFileCommand("STATE",$.prepareKeyValueMessage(e,t));S.issueCommand("save-state",{name:e},D.toCommandValue(t))}f.saveState=dn;function hn(e){return process.env[`STATE_${e}`]||""}f.getState=hn;function pn(e){return Tt(this,void 0,void 0,function*(){return yield Wr.OidcClient.getIDToken(e)})}f.getIDToken=pn;var mn=xe();Object.defineProperty(f,"summary",{enumerable:!0,get:function(){return mn.summary}});var gn=xe();Object.defineProperty(f,"markdownSummary",{enumerable:!0,get:function(){return gn.markdownSummary}});var Ae=Pt();Object.defineProperty(f,"toPosixPath",{enumerable:!0,get:function(){return Ae.toPosixPath}});Object.defineProperty(f,"toWin32Path",{enumerable:!0,get:function(){return Ae.toWin32Path}});Object.defineProperty(f,"toPlatformPath",{enumerable:!0,get:function(){return Ae.toPlatformPath}})});var Ue=require("child_process"),L=class{#e=new Set;#t(t){this.#e.forEach(r=>r(t))}addRemote(t,r){return this.execute("remote","add",t,r)}async execute(t,...r){let n=(0,Ue.spawn)("git",[t].concat(...r)),[i,s]=await Promise.all([new Promise(o=>{n.stderr.on("close",o),n.stderr.on("data",this.#t.bind(this))}),new Promise(o=>{let a=[];n.stdout.on("close",()=>o(Buffer.concat(a).toString())),n.stdout.on("data",a.push.bind(a))})]);return s}fetch(t,r,n){let i=[];Gt(n?.depth)&&i.push(`--depth=${n?.depth}`),delete n?.depth;for(let s in n??{})i.push(`--${Ft(s)}`);return i.push(r),i.push(`+${t}:${t}`),this.execute("fetch",...i)}init(){return this.execute("init")}async messageBodyOf(t){let r=await this.execute("for-each-ref","--format=%(contents)",t),n=r.search(/(?<=\n\s*)Signed\-off\-by\:\s+/g),i=r.search(/(?<=\n\s*)\-{5}BEGIN\ PGP\ SIGNATURE\-{5}\n{2}/g);return n<0?i<0?r:r.slice(0,i):r.slice(0,n)}on(t,r){this.#e.add(r)}},Lt=/(?<=[a-z\d])[A-Z][^A-Z]*/g,Ft=e=>e.replaceAll(Lt,t=>`-${t.toLowerCase()}`),Gt=e=>Number.isInteger(e)&&0<(e??0);var Ce=require("https"),se;(o=>{o.createRelease=async(a,u,c)=>await(0,o.post)({contentType:"application/json",payload:Buffer.from(JSON.stringify(a)),token:c,url:`https://api.github.com/repos/${u}/releases`});let t=(a,u)=>{n(u)&&(a["Content-length"]??=u.payload.byteLength,a["Content-type"]??=u.contentType)},r=(a,u)=>{n(u)&&a.write(u.payload,a.end.bind(a))},n=a=>a.method==="POST";o.post=async a=>{let u=structuredClone(a);return u.method="POST",await(0,o.request)(u)},o.request=a=>new Promise(u=>{let c=new URL(a.url),l={Accept:"application/vnd.github+json",Authorization:`Bearer ${a.token}`,"User-agent":"node:https.request","X-GitHub-Api-Version":"2022-11-28"};t(l,a);let d=(0,Ce.request)({headers:l,host:c.host,method:a.method,path:c.href},h=>{h.on("close",()=>u(JSON.parse(Buffer.concat(T).toString())));let T=new Array;h.on("data",M=>T.push(M))});r(d,a)})})(se||={});var p=H(be()),ie=require("process"),vn=async e=>{let t=ie.env.GITHUB_REF_NAME,[r]=t.match(/\d+(\.\d+)*/)??[t],n={body:(0,p.getInput)("body"),draft:(0,p.getBooleanInput)("draft"),name:(0,p.getInput)("release_name"),prerelease:(0,p.getBooleanInput)("prerelease"),tag_name:(0,p.getInput)("tag_name"),target_commitish:ie.env.GITHUB_SHA};return n.body.length===0&&(n.body=await new L().messageBodyOf(e)),n.name.length===0&&(n.name=`Version ${r}`),n.tag_name.length===0&&(n.tag_name=`v${r}`),n},_n=async()=>{let e=(0,p.getInput)("github-token",{required:!0});e.length===0&&await Promise.reject("$github-token must not be blank.");let t=(0,p.getInput)("ref",{required:!0});t.match(/^refs\/tags\/v[0-9]+(\.[0-9]+)*(\-[0-9A-Za-z]+)*$/g)||await Promise.reject(`$ref '${t}' is not a tag.`);let n=(0,p.getInput)("remote_name",{required:!0}),i=ie.env.GITHUB_REPOSITORY,s=`https://github.com/${i}`,o=new L;o.on("error",u=>(0,p.warning)(u.toString())),(0,p.startGroup)("git init"),(0,p.info)(await o.init()),(0,p.endGroup)(),(0,p.startGroup)(`git remote add ${s} as ${n}`),(0,p.info)(await o.addRemote(n,s)),(0,p.endGroup)(),(0,p.startGroup)(`Fetch ${t} from ${s} as ${n}`),(0,p.info)(await o.fetch(t,n,{depth:1,noAutoGc:!0,progress:!0,prune:!0,verbose:!0})),(0,p.endGroup)();let a=await vn(t);try{let u=await se.createRelease(a,i,e);(0,p.startGroup)("Outputs");let c=JSON.stringify(u);(0,p.info)(c),(0,p.setOutput)("response",c),(0,p.endGroup)(),(0,p.startGroup)("Pretty Outputs"),(0,p.info)(JSON.stringify(u,void 0,2)),(0,p.endGroup)()}catch(u){await Promise.reject(u)}};_n().catch(e=>(0,p.setFailed)(`${e}`));
