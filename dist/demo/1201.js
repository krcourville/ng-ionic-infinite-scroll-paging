"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[1201],{1201:(x,h,E)=>{E.r(h),E.d(h,{startTapClick:()=>M});var u=E(3756);const M=o=>{let e,p,r,s=10*-m,a=0;const P=o.getBoolean("animated",!0)&&o.getBoolean("rippleEffect",!0),f=new WeakMap,A=t=>{s=(0,u.u)(t),v(t)},D=()=>{clearTimeout(r),r=void 0,e&&(g(!1),e=void 0)},R=t=>{e||w(b(t),t)},v=t=>{w(void 0,t)},w=(t,n)=>{if(t&&t===e)return;clearTimeout(r),r=void 0;const{x:d,y:i}=(0,u.p)(n);if(e){if(f.has(e))throw new Error("internal error");e.classList.contains(l)||C(e,d,i),g(!0)}if(t){const I=f.get(t);I&&(clearTimeout(I),f.delete(t));const W=T(t)?0:y;t.classList.remove(l),r=setTimeout(()=>{C(t,d,i),r=void 0},W)}e=t},C=(t,n,d)=>{a=Date.now(),t.classList.add(l);const i=P&&k(t);i&&i.addRipple&&(S(),p=i.addRipple(n,d))},S=()=>{void 0!==p&&(p.then(t=>t()),p=void 0)},g=t=>{S();const n=e;if(!n)return;const d=L-Date.now()+a;if(t&&d>0&&!T(n)){const i=setTimeout(()=>{n.classList.remove(l),f.delete(n)},L);f.set(n,i)}else n.classList.remove(l)},c=document;c.addEventListener("ionGestureCaptured",D),c.addEventListener("touchstart",t=>{s=(0,u.u)(t),R(t)},!0),c.addEventListener("touchcancel",A,!0),c.addEventListener("touchend",A,!0),c.addEventListener("pointercancel",D,!0),c.addEventListener("mousedown",t=>{const n=(0,u.u)(t)-m;s<n&&R(t)},!0),c.addEventListener("mouseup",t=>{const n=(0,u.u)(t)-m;s<n&&v(t)},!0),c.addEventListener("contextmenu",t=>{v(t)},!0)},b=o=>{if(!o.composedPath)return o.target.closest(".ion-activatable");{const s=o.composedPath();for(let a=0;a<s.length-2;a++){const e=s[a];if(!(e instanceof ShadowRoot)&&e.classList.contains("ion-activatable"))return e}}},T=o=>o.classList.contains("ion-activatable-instant"),k=o=>{if(o.shadowRoot){const s=o.shadowRoot.querySelector("ion-ripple-effect");if(s)return s}return o.querySelector("ion-ripple-effect")},l="ion-activated",y=200,L=200,m=2500}}]);