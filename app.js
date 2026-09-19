const KEY="cvc_natok_data";
const cats=["সব নাটক","বাংলা","হিন্দি","কোরিয়ান","তামিল","ইংরেজি"];
let selected="সব নাটক";
function getData(){try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch(e){return[]}}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function render(){
  const all=getData(), q=(document.getElementById("search").value||"").toLowerCase();
  document.getElementById("categories").innerHTML=cats.map(c=>`<button class="${c===selected?"active":""}" onclick="selected='${c}';render()">${c}</button>`).join("");
  const list=all.filter(x=>(selected==="সব নাটক"||x.category===selected)&&(!q||(x.title||"").toLowerCase().includes(q)));
  document.getElementById("grid").innerHTML=list.map(x=>`<a class="card" href="${esc(x.url)}" target="_blank" rel="noopener"><img class="thumb" src="${esc(x.image)}" alt="${esc(x.title)}"><div class="title">${esc(x.title)}</div><p class="meta">👁 View • ${esc(x.category)}</p></a>`).join("");
  document.getElementById("empty").style.display=list.length?"none":"block";
}
render();