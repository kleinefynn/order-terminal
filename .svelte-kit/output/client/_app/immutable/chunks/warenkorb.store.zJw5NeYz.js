import{w as i}from"./index.B7dWTU1O.js";import{p as n}from"./ProductService.kyZpH7-y.js";let d=[{name:"Einzelkarte",price:3},{name:"Superlangertext und bin unkreativ",description:"ermäßigt",price:2},{name:"Gruppenkarte",price:3}];const p=[{name:"Flaschenöffner",price:2.99},{name:"Superlangertext und bin unkreativ",description:"ermäßigt",price:2.5},{name:"Schneekugel",price:3},{name:"Superlangertext und bin unkreativ",price:3}],{subscribe:m,set:l,update:s}=i([]),b=async e=>{try{await n.deleteProductById(e),s(t=>(delete t.filter(r=>r.id===e)[0],t))}catch(t){console.error(t)}},f=async e=>{try{let r={id:await n.addProduct(e),...e};s(c=>[...c,r])}catch(t){console.error(t)}};n.isInitCompleted.subscribe({complete:async()=>{await w()}});async function w(){let e=await n.getProducts();if(e.length==0){for(const t of d)await n.addProduct(t);for(const t of p)await n.addProduct(t);e=await n.getProducts()}l(e)}const _={subscribe:m,add:f,remove:b};let a={};const{subscribe:g,set:v,update:o}=i(a),h=e=>{let t=a[e.name];o(r=>(t===void 0?r[e.name]={name:e.name,price:e.price,amount:1}:r[e.name].amount+=1,r))},y=(e,t)=>{let r=a[e.name];if(r===void 0)return;const c=Number(t)<0?0:Number(t);o(u=>(r.amount=c,u))},k=e=>{o(t=>(delete t[e],t))},P=()=>{a={},v(a)},$={subscribe:g,addItem:h,change:y,remove:k,reset:P};export{_ as p,$ as w};
