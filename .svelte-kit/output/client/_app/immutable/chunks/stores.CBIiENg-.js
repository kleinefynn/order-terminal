import{w as m}from"./index.B7dWTU1O.js";let t={};const{subscribe:s,set:u,update:a}=m(t),b=e=>{let n=t[e.name];a(r=>(n===void 0?r[e.name]={name:e.name,price:e.price,amount:1}:r[e.name].amount+=1,r))},d=(e,n)=>{let r=t[e.name];if(r===void 0)return;const o=Number(n)<0?0:Number(n);a(c=>(r.amount=o,c))},l=e=>{a(n=>(delete n[e],n))},p=()=>{t={},u(t)},i={subscribe:s,addItem:b,change:d,remove:l,reset:p};export{i as w};
