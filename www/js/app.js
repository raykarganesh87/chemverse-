const $=s=>document.querySelector(s);
const view=$("#view");
let tab="home";

function render(){
  document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab));
  ({home:home,table:ptable,tools:tools,quiz:quiz,about:about}[tab])();
}
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>{tab=b.dataset.tab;$("#search").value="";if(tab!=="quiz")qset=null;render();});

/* ---------- HOME / TOPICS ---------- */
let lvl="All",curBranch=null;
function home(branch){
  curBranch=branch||null;
  let h="";
  if(!curBranch){
    h+=`<div class="card"><h3>Welcome to ChemVerse</h3><p class="muted">${TOPICS.length} topics • ${QUIZ.length} quiz questions • School to Master's. Choose a branch.</p></div><div class="grid">`;
    BRANCHES.forEach(b=>{
      const n=TOPICS.filter(t=>t.branch===b.id).length;
      h+=`<div class="card" data-b="${b.id}"><h3>${b.icon}</h3><b>${b.name}</b><div class="muted">${n} topics</div></div>`;
    });
    h+=`</div>`;
  } else {
    const br=BRANCHES.find(b=>b.id===curBranch);
    h+=`<button class="btn" id="back">← Back</button><h2>${br.icon} ${br.name}</h2><div>`;
    ["All","School","Undergraduate","Masters"].forEach(l=>{h+=`<button class="btn lv${l===lvl?"":" off"}" data-l="${l}">${l}</button> `;});
    h+=`</div><div style="margin-top:10px">`;
    const list=TOPICS.filter(t=>t.branch===curBranch&&(lvl==="All"||t.level===lvl));
    list.forEach(t=>{h+=topicCard(t);});
    if(!list.length)h+=`<p class="muted">No topics at this level yet.</p>`;
    h+=`</div>`;
  }
  view.innerHTML=h;
  view.querySelectorAll("[data-b]").forEach(c=>c.onclick=()=>home(c.dataset.b));
  view.querySelectorAll("[data-l]").forEach(c=>c.onclick=()=>{lvl=c.dataset.l;home(curBranch);});
  const back=$("#back");if(back)back.onclick=()=>home();
}
function topicCard(t){return `<div class="card"><span class="chip">${t.level}</span><h3>${t.title}</h3><div>${t.body}</div></div>`;}

/* ---------- PERIODIC TABLE ---------- */
function ptable(){
  let h=`<div class="scroll"><div class="ptable">`;
  const grid={};
  ELEMENTS.forEach(e=>{grid[e[5]+"-"+e[4]]=e;});
  for(let p=1;p<=9;p++){
    for(let g=1;g<=18;g++){
      const e=grid[p+"-"+g];
      if(p===8||p===9){ // f-block rows shown after a gap
        if(g<3||g>17){h+=`<div></div>`;continue;}
      }
      h+=e?`<div class="el" style="background:${CAT_COLORS[e[6]]}" data-z="${e[2]}">${e[0]}<small>${e[2]}</small></div>`:`<div></div>`;
    }
  }
  h+=`</div></div><div id="eldetail" class="card" style="margin-top:10px"><span class="muted">Tap an element</span></div>`;
  view.innerHTML=h;
  view.querySelectorAll(".el").forEach(el=>el.onclick=()=>showEl(+el.dataset.z));
}
function showEl(z){
  const e=ELEMENTS.find(x=>x[2]===z);
  $("#eldetail").innerHTML=`<h3>${e[1]} (${e[0]})</h3>
  <div>Atomic number: <b>${e[2]}</b></div><div>Atomic mass: <b>${e[3]}</b></div>
  <div>Group: <b>${e[4]>=3&&e[5]>=8?"f-block":e[4]}</b> · Period: <b>${e[5]>=8?e[5]-2:e[5]}</b></div>
  <div>Category: <b>${e[6]}</b></div>`;
}

/* ---------- TOOLS ---------- */
function tools(){
  view.innerHTML=`
  <div class="card"><h3>🧪 Molar Mass</h3>
   <input class="f" id="mm" placeholder="e.g. Ca(OH)2 or CuSO4.5H2O"><button class="btn" id="mmb">Calculate</button><div class="result" id="mmr"></div></div>

  <div class="card"><h3>⚖️ Equation Balancer</h3>
   <input class="f" id="eq" placeholder="Fe + O2 -> Fe2O3"><button class="btn" id="eqb">Balance</button><div class="result" id="eqr"></div></div>

  <div class="card"><h3>💧 pH Calculator</h3>
   <select class="f" id="phtype"><option value="sa">Strong acid</option><option value="sb">Strong base</option><option value="wa">Weak acid (needs Ka)</option><option value="bf">Buffer (Henderson–Hasselbalch)</option></select>
   <input class="f" id="ph1" type="number" step="any" placeholder="Concentration (M) / pKa">
   <input class="f" id="ph2" type="number" step="any" placeholder="Ka / [base] (M)">
   <input class="f" id="ph3" type="number" step="any" placeholder="[acid] (M) (buffer only)">
   <button class="btn" id="phb">Calculate</button><div class="result" id="phr"></div></div>

  <div class="card"><h3>🎈 Ideal Gas (PV = nRT)</h3>
   <p class="muted">Leave one field empty. P in atm, V in L, n in mol, T in K.</p>
   <input class="f" id="gp" type="number" step="any" placeholder="P (atm)">
   <input class="f" id="gv" type="number" step="any" placeholder="V (L)">
   <input class="f" id="gn" type="number" step="any" placeholder="n (mol)">
   <input class="f" id="gt" type="number" step="any" placeholder="T (K)">
   <button class="btn" id="gb">Solve</button><div class="result" id="gr"></div></div>

  <div class="card"><h3>🧫 Dilution (M₁V₁ = M₂V₂)</h3>
   <input class="f" id="d1" type="number" step="any" placeholder="M₁ (initial molarity)">
   <input class="f" id="d2" type="number" step="any" placeholder="V₁ (initial volume)">
   <input class="f" id="d3" type="number" step="any" placeholder="M₂ (final molarity)">
   <button class="btn" id="db">Find V₂</button><div class="result" id="dr"></div></div>`;

  $("#mmb").onclick=()=>{try{const r=molarMass($("#mm").value);$("#mmr").innerHTML=r.rows.join("<br>")+`<br>Molar mass = ${r.total.toFixed(3)} g/mol`;}catch(e){$("#mmr").textContent=e.message;}};
  $("#eqb").onclick=()=>{try{$("#eqr").textContent=balance($("#eq").value);}catch(e){$("#eqr").textContent=e.message;}};
  $("#phb").onclick=()=>{
    const t=$("#phtype").value,a=+$("#ph1").value,b=+$("#ph2").value,c=+$("#ph3").value;let r;
    if(t==="sa")r=phStrongAcid(a);else if(t==="sb")r=phStrongBase(a);
    else if(t==="wa")r=phWeakAcid(a,b);else r=phBuffer(a,b,c);
    $("#phr").textContent=isFinite(r)?"pH = "+r.toFixed(2):"Check your inputs";
  };
  $("#gb").onclick=()=>{
    const f=["gp","gv","gn","gt"].map(i=>$("#"+i).value);const [p,v,n,t]=f.map(x=>x===""?null:+x);
    const empty=f.filter(x=>x==="").length;
    if(empty!==1){$("#gr").textContent="Leave exactly one field empty";return;}
    let r;
    if(p===null)r="P = "+(n*R*t/v).toFixed(4)+" atm";
    else if(v===null)r="V = "+(n*R*t/p).toFixed(4)+" L";
    else if(n===null)r="n = "+(p*v/(R*t)).toFixed(4)+" mol";
    else r="T = "+(p*v/(n*R)).toFixed(2)+" K";
    $("#gr").textContent=r;
  };
  $("#db").onclick=()=>{const r=dilutionV2(+$("#d1").value,+$("#d2").value,+$("#d3").value);$("#dr").textContent=isFinite(r)?"V₂ = "+r.toFixed(4)+" (same unit as V₁)":"Check your inputs";};
}

/* ---------- QUIZ ---------- */
let qi=0,score=0,qset=null;
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function quiz(){
  if(!qset){
    let h=`<div class="card"><h3>Choose a quiz</h3><p class="muted">10 random questions from the chosen branch.</p>
    <button class="opt" data-qb="all">🎲 All branches (${QUIZ.length} questions)</button>`;
    BRANCHES.forEach(b=>{const n=QUIZ.filter(q=>q.b===b.id).length;if(n)h+=`<button class="opt" data-qb="${b.id}">${b.icon} ${b.name} (${n})</button>`;});
    view.innerHTML=h+`</div>`;
    view.querySelectorAll("[data-qb]").forEach(b=>b.onclick=()=>{
      const id=b.dataset.qb;const pool=id==="all"?QUIZ:QUIZ.filter(q=>q.b===id);
      qset=shuffle(pool).slice(0,10);qi=0;score=0;quiz();});
    return;
  }
  if(qi>=qset.length){
    view.innerHTML=`<div class="card"><h3>Quiz complete 🎉</h3><p>Score: <b>${score} / ${qset.length}</b></p><button class="btn" id="rs">New quiz</button></div>`;
    $("#rs").onclick=()=>{qset=null;quiz();};return;
  }
  const q=qset[qi];
  view.innerHTML=`<div class="card"><div class="muted">Question ${qi+1} of ${qset.length}</div><h3>${q.q}</h3>
   ${q.o.map((o,i)=>`<button class="opt" data-i="${i}">${o}</button>`).join("")}</div>`;
  view.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{
    const i=+b.dataset.i;
    view.querySelectorAll(".opt").forEach(x=>{x.disabled=true;});
    view.querySelectorAll(".opt")[q.a].classList.add("ok");
    if(i===q.a)score++;else b.classList.add("bad");
    setTimeout(()=>{qi++;quiz();},1100);
  });
}

/* ---------- ABOUT ---------- */
function about(){
  view.innerHTML=`<div class="card" style="text-align:center">
   <div style="font-size:3rem">⚗️</div><h2>ChemVerse</h2>
   <p class="muted">Composite Chemistry Tool — School to Master's level</p>
   <p>Created by<br><b style="font-size:1.2rem">Mr. Ganesh Raykar</b></p>
   <p class="muted">Version 1.0.0</p></div>
   <div class="card"><h3>Branches covered</h3><p>General, Organic, Inorganic, Physical, Analytical, Medicinal &amp; Bio, Environmental, Industrial &amp; Polymer.</p></div>`;
}

/* ---------- SEARCH ---------- */
$("#search").addEventListener("input",e=>{
  const q=e.target.value.trim().toLowerCase();
  if(!q){render();return;}
  const els=ELEMENTS.filter(x=>x[1].toLowerCase().includes(q)||x[0].toLowerCase()===q).slice(0,8);
  const tps=TOPICS.filter(t=>(t.title+" "+t.body).toLowerCase().includes(q));
  let h=`<h3>Search results</h3>`;
  els.forEach(x=>{h+=`<div class="card"><b>${x[1]} (${x[0]})</b> — Z=${x[2]}, mass ${x[3]}</div>`;});
  tps.forEach(t=>{h+=topicCard(t);});
  if(!els.length&&!tps.length)h+=`<p class="muted">No results.</p>`;
  view.innerHTML=h;
});

render();
