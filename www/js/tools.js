// ---- Molar mass parser ----
function parseFormula(f){
  const stack=[{}];let i=0;
  while(i<f.length){
    const c=f[i];
    if(c==="("||c==="["){stack.push({});i++;}
    else if(c===")"||c==="]"){
      i++;let n="";while(/\d/.test(f[i]||"")){n+=f[i++];}
      const m=n?+n:1;const top=stack.pop();
      for(const k in top){stack[stack.length-1][k]=(stack[stack.length-1][k]||0)+top[k]*m;}
    } else if(/[A-Z]/.test(c)){
      let s=c;i++;while(/[a-z]/.test(f[i]||"")){s+=f[i++];}
      let n="";while(/\d/.test(f[i]||"")){n+=f[i++];}
      stack[stack.length-1][s]=(stack[stack.length-1][s]||0)+(n?+n:1);
    } else if(c==="·"||c==="."){ // hydrates e.g. CuSO4.5H2O
      i++;let n="";while(/\d/.test(f[i]||"")){n+=f[i++];}
      const m=n?+n:1;
      const rest=parseFormula(f.slice(i));
      for(const k in rest){stack[0][k]=(stack[0][k]||0)+rest[k]*m;}
      i=f.length;
    } else i++;
  }
  return stack[0];
}
function molarMass(f){
  const parts=parseFormula(f.trim());let total=0;const rows=[];
  for(const s in parts){
    const el=ELEMENTS.find(e=>e[0]===s);
    if(!el)throw new Error("Unknown element: "+s);
    total+=el[3]*parts[s];rows.push(`${s}×${parts[s]} = ${(el[3]*parts[s]).toFixed(3)}`);
  }
  return {total,rows};
}
// ---- pH ----
const phStrongAcid=c=>-Math.log10(c);
const phStrongBase=c=>14+Math.log10(c);
const phWeakAcid=(c,ka)=>{const h=(-ka+Math.sqrt(ka*ka+4*ka*c))/2;return -Math.log10(h);};
const phBuffer=(pka,base,acid)=>pka+Math.log10(base/acid);
// ---- Gas law (PV = nRT, R = 0.082057 L·atm/mol·K) ----
const R=0.082057;
// ---- Dilution ----
const dilutionV2=(m1,v1,m2)=>m1*v1/m2;
// ---- Equation balancer (Gaussian elimination on rationals via fractions-as-floats) ----
function balance(eq){
  const [l,r]=eq.split("->").map(s=>s.trim());
  if(!r)throw new Error("Use format: H2 + O2 -> H2O");
  const L=l.split("+").map(s=>s.trim()),Rr=r.split("+").map(s=>s.trim());
  const all=[...L,...Rr];const elems=[...new Set(all.flatMap(c=>Object.keys(parseFormula(c))))];
  const rows=elems.map(e=>all.map((c,i)=>(parseFormula(c)[e]||0)*(i<L.length?1:-1)));
  const n=all.length;const M=rows.map(r=>r.slice());
  let rank=0;const piv=[];
  for(let c=0;c<n&&rank<M.length;c++){
    let p=rank;for(let i=rank;i<M.length;i++)if(Math.abs(M[i][c])>Math.abs(M[p][c]))p=i;
    if(Math.abs(M[p][c])<1e-9)continue;
    [M[rank],M[p]]=[M[p],M[rank]];
    const d=M[rank][c];M[rank]=M[rank].map(x=>x/d);
    for(let i=0;i<M.length;i++)if(i!==rank){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[rank][j]);}
    piv.push(c);rank++;
  }
  const free=[...Array(n).keys()].filter(c=>!piv.includes(c));
  if(free.length!==1)throw new Error("Cannot balance uniquely");
  const sol=Array(n).fill(0);sol[free[0]]=1;
  piv.forEach((c,i)=>{sol[c]=-M[i][free[0]];});
  let k=1;while(k<1000&&!sol.every(x=>Math.abs(x*k-Math.round(x*k))<1e-6))k++;
  const co=sol.map(x=>Math.round(x*k));
  if(co.some(x=>x<=0))throw new Error("Cannot balance");
  const fmt=(arr,off)=>arr.map((c,i)=>(co[off+i]>1?co[off+i]:"")+c).join(" + ");
  return fmt(L,0)+" → "+fmt(Rr,L.length);
}
