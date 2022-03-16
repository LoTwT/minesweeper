var ie=Object.defineProperty,le=Object.defineProperties;var ue=Object.getOwnPropertyDescriptors;var T=Object.getOwnPropertySymbols;var ce=Object.prototype.hasOwnProperty,de=Object.prototype.propertyIsEnumerable;var F=(a,s,o)=>s in a?ie(a,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):a[s]=o,x=(a,s)=>{for(var o in s||(s={}))ce.call(s,o)&&F(a,o,s[o]);if(T)for(var o of T(s))de.call(s,o)&&F(a,o,s[o]);return a},b=(a,s)=>le(a,ue(s));import{d as $,w as fe,o as f,c as v,a as j,u as me,b as z,r as _,e as h,F as k,t as C,f as ve,n as pe,g as P,h as ge,i as L,j as _e,k as he,l as u,m as V,p as I,q,s as R,v as ye,x as xe,y as be,z as ke,A as Ce}from"./vendor.d374f593.js";const $e=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function o(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerpolicy&&(c.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?c.credentials="include":n.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(n){if(n.ep)return;n.ep=!0;const c=o(n);fetch(n.href,c)}};$e();const Ee="modulepreload",H={},we="/minesweeper/",W=function(s,o){return!o||o.length===0?s():Promise.all(o.map(r=>{if(r=`${we}${r}`,r in H)return;H[r]=!0;const n=r.endsWith(".css"),c=n?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${c}`))return;const d=document.createElement("link");if(d.rel=n?"stylesheet":Ee,n||(d.as="script",d.crossOrigin=""),d.href=r,document.head.appendChild(d),n)return new Promise((E,w)=>{d.addEventListener("load",E),d.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>s())},Me=$({props:{passed:{type:Boolean}},setup(a){const s=a;function o(){const r={colors:["#5D8C7B","#F2D091","#F2A679","#D9695F","#8C4646"],shapes:["square"],ticks:500};j(b(x({},r),{particleCount:80,spread:100,origin:{y:0}})),setTimeout(()=>{j(b(x({},r),{particleCount:50,angle:60,spread:80,origin:{x:0}}))},250),setTimeout(()=>{j(b(x({},r),{particleCount:50,angle:120,spread:80,origin:{x:1}}))},400)}return fe(()=>s.passed,r=>{r&&setTimeout(o,300)},{flush:"post"}),(r,n)=>(f(),v("div"))}}),U=me(),De=z(U),G=_(!1),Ae=z(G),je={key:0,"i-mdi-flag":"","text-red":""},Le={key:0,"i-mdi-mine":""},Re={key:1,"font-bold":""},Ge=$({props:{block:null},setup(a){const s=["text-transparent","text-blue-500","text-green-500","text-yellow-500","text-orange-500","text-red-500","text-purple-500","text-pink-500","text-teal-500"],o=r=>r.flagged?"bg-gray-500/20":r.revealed?r.mine?"text-red":s[r.adjacentMines]:"bg-gray-500/20 hover:bg-gray/40";return(r,n)=>(f(),v("button",{m:"0.5",flex:"~","justify-center":"","items-center":"","min-w-8":"","min-h-8":"",border:"1 gray-400/30",class:pe(o(a.block))},[a.block.flagged?(f(),v("div",je)):a.block.revealed||h(G)?(f(),v(k,{key:1},[a.block.mine?(f(),v("div",Le)):(f(),v("div",Re,C(a.block.adjacentMines),1))],64)):ve("",!0)],2))}}),Ne=u("div",null,"Minesweeper",-1),Oe={"pt-3":"",flex:"~ gap-1","justify-center":"","items-center":""},Se={"mt-5":"",flex:"~ gap-10","justify-center":""},Be={"font-mono":"","text-2xl":"",flex:"~ gap-1","items-center":""},Te=u("div",{"i-carbon-timer":""},null,-1),Fe={"font-mono":"","text-2xl":"",flex:"~ gap-1","items-center":""},Pe=u("div",{"i-mdi-mine":""},null,-1),Ve={flex:"~ gap-1","justify-center":"","items-center":""},Ie=$({setup(a){var S;let s=_(12),o=_(12),r=_(30),n=_();const c=P(()=>n.value.board.flat()),d=ge(()=>{n.value.duration+=1},1e3,{immediate:((S=n.value)==null?void 0:S.status)==="play"}),E=L(d,"isActive"),w=L(d,"pause"),Y=L(d,"resume"),Z=P(()=>n.value.mineGenerated?c.value.reduce((t,e)=>t+(e.mine?1:0)-(e.flagged?1:0),0):r.value),M=t=>{D(...{easy:[9,9,10],medium:[16,16,40],hard:[30,16,99]}[t])},D=(t=o.value,e=s.value,p=r.value)=>{o.value=t,s.value=e,r.value=p,n.value={duration:0,mineGenerated:!1,status:"play",board:Array.from({length:e},(m,l)=>Array.from({length:t},(i,g)=>({x:g,y:l,adjacentMines:0,revealed:!1,flagged:!1,mine:!1})))}},J=(t,e)=>Math.random()*(e-t)+t,N=(t,e)=>Math.round(J(t,e)),Q=(t,e)=>{const p=()=>{const m=N(0,o.value-1),l=N(0,s.value-1),i=t[l][m];return Math.abs(e.x-i.x)<=1&&Math.abs(e.y-i.y)<=1||i.mine?!1:(i.mine=!0,!0)};Array.from({length:r.value},()=>null).forEach(()=>{for(;!p(););}),ee(t)},X=[[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1],[0,1]],ee=t=>{t.forEach((e,p)=>{e.forEach((m,l)=>{m.mine||A(m).forEach(i=>{i.mine&&(m.adjacentMines+=1)})})})},te=t=>{if(n.value.status==="play"){if(E.value||Y.value(),n.value.mineGenerated||(Q(n.value.board,t),n.value.mineGenerated=!0),t.revealed=!0,t.mine){y("lost");return}O(t)}},O=t=>{t.adjacentMines||A(t).forEach(e=>{e.revealed||(e.revealed=!0,O(e))})},A=t=>X.map(([e,p])=>{const m=t.x+e,l=t.y+p;if(!(m<0||m>=o.value||l<0||l>=s.value))return n.value.board[l][m]}).filter(Boolean),ne=t=>{n.value.status==="play"&&(t.revealed||(t.flagged=!t.flagged))},re=()=>{if(!n.value.mineGenerated)return;const t=n.value.board.flat();t.every(e=>e.revealed||e.flagged||e.mine)&&(t.some(e=>e.flagged&&!e.mine)?y("lost"):y("won"))},oe=()=>{n.value.board.flat().forEach(t=>{t.mine&&(t.revealed=!0)})},se=t=>{const e=A(t),p=e.reduce((i,g)=>i+(g.flagged?1:0),0);p===t.adjacentMines&&e.forEach(i=>{i.revealed=!0,i.mine&&!i.flagged&&y("lost")});const m=e.reduce((i,g)=>i+(!g.revealed&&!g.flagged?1:0),0),l=t.adjacentMines-p;m===l&&e.forEach(i=>{!i.revealed&&!i.flagged&&(i.flagged=!0)})},y=t=>{n.value.status=t,w.value(),t==="lost"&&(setTimeout(()=>{alert("lost")},10),oe())};return D(),_e(re),he("minesweeper",n),(t,e)=>{const p=Ge,m=Me;return f(),v(k,null,[Ne,u("div",Oe,[u("button",{btn:"",onClick:e[0]||(e[0]=l=>D())},"NEW GAME"),u("button",{btn:"",onClick:e[1]||(e[1]=l=>M("easy"))},"EASY"),u("button",{btn:"",onClick:e[2]||(e[2]=l=>M("medium"))},"MEDIUM"),u("button",{btn:"",onClick:e[3]||(e[3]=l=>M("hard"))},"HARD")]),u("div",Se,[u("div",Be,[Te,V(" "+C(n.value.duration),1)]),u("div",Fe,[Pe,V(" "+C(Z.value),1)])]),u("div",{p5:"",onContextmenu:e[4]||(e[4]=q(()=>{},["prevent"])),"w-full":"","overflow-auto":""},[(f(!0),v(k,null,I(n.value.board,(l,i)=>(f(),v("div",{key:i,flex:"~","justify-center":"","items-center":"","w-max":"",ma:""},[(f(!0),v(k,null,I(l,(g,ae)=>(f(),ye(p,{key:ae,block:g,onClick:B=>te(g),onContextmenu:q(B=>ne(g),["prevent"]),onDblclick:B=>se(g)},null,8,["block","onClick","onContextmenu","onDblclick"]))),128))]))),128))],32),u("div",Ve,[u("button",{btn:"",onClick:e[5]||(e[5]=l=>h(Ae)())},C(h(G)?"DEV":"NORMAL"),1)]),R(m,{passed:n.value.status==="won"},null,8,["passed"])],64)}}}),qe=[{name:"all",path:"/:all(.*)*",component:()=>W(()=>import("./_...all_.3df0aaff.js"),["assets/_...all_.3df0aaff.js","assets/_...all_.5b579b93.css","assets/vendor.d374f593.js"]),props:!0},{name:"index",path:"/",component:Ie,props:!0},{name:"hi-name",path:"/hi/:name",component:()=>W(()=>import("./_name_.eec43cb8.js"),["assets/_name_.eec43cb8.js","assets/_name_.eddacc31.css","assets/vendor.d374f593.js"]),props:!0}],He={"text-xl":"","mt-6":"","inline-flex":"","gap-2":""},We={key:0,"i-carbon-moon":""},ze={key:1,"i-carbon-sun":""},Ue=u("a",{class:"icon-btn","i-carbon-logo-github":"",rel:"noreferrer",href:"https://github.com/antfu/vitesse-lite",target:"_blank",title:"GitHub"},null,-1),Ke=$({setup(a){return(s,o)=>(f(),v("nav",He,[u("button",{class:"icon-btn !outline-none",onClick:o[0]||(o[0]=r=>h(De)())},[h(U)?(f(),v("div",We)):(f(),v("div",ze))]),Ue]))}});var Ye=(a,s)=>{const o=a.__vccOpts||a;for(const[r,n]of s)o[r]=n;return o};const Ze={},Je={"font-sans":"",p:"y-10",text:"center gray-700 dark:gray-200"};function Qe(a,s){const o=xe("router-view"),r=Ke;return f(),v("main",Je,[R(o),R(r)])}var Xe=Ye(Ze,[["render",Qe]]);const K=be(Xe),et=ke({history:Ce("/minesweeper/"),routes:qe});K.use(et);K.mount("#app");export{Ye as _};