// Add new topics here (or split into JSON files later).
// level: School | Undergraduate | Masters
const BRANCHES = [
 {id:"general",name:"General / Basic",icon:"📘"},
 {id:"organic",name:"Organic",icon:"🧬"},
 {id:"inorganic",name:"Inorganic",icon:"💎"},
 {id:"physical",name:"Physical",icon:"⚡"},
 {id:"analytical",name:"Analytical",icon:"📊"},
 {id:"medicinal",name:"Medicinal & Bio",icon:"💊"},
 {id:"environmental",name:"Environmental",icon:"🌍"},
 {id:"industrial",name:"Industrial & Polymer",icon:"🏭"}
];
const TOPICS = [
 {branch:"general",level:"School",title:"Atomic Structure",body:"Atoms consist of protons, neutrons (nucleus) and electrons (shells). Atomic number Z = protons; mass number A = protons + neutrons. Electron configuration follows Aufbau, Pauli exclusion and Hund's rule."},
 {branch:"general",level:"School",title:"Mole Concept",body:"1 mole = 6.022×10²³ entities (Avogadro number). Moles = mass / molar mass. Molarity = moles of solute / litres of solution."},
 {branch:"general",level:"School",title:"Chemical Bonding",body:"Ionic (electron transfer), covalent (sharing), metallic (electron sea). VSEPR theory predicts molecular geometry from electron-pair repulsion."},
 {branch:"organic",level:"Undergraduate",title:"Functional Groups",body:"Alcohol (-OH), aldehyde (-CHO), ketone (C=O), carboxylic acid (-COOH), ester (-COOR), amine (-NH₂), amide (-CONH₂), alkene (C=C), alkyne (C≡C), halide (-X)."},
 {branch:"organic",level:"Undergraduate",title:"SN1 vs SN2",body:"SN2: one step, backward attack, inversion, favoured by primary substrates and strong nucleophiles; rate = k[R-X][Nu]. SN1: two steps via carbocation, racemisation, favoured by tertiary substrates; rate = k[R-X]."},
 {branch:"organic",level:"Masters",title:"Retrosynthesis",body:"Work backwards from the target molecule by disconnecting bonds into synthons and identifying real reagents (synthetic equivalents). Use functional group interconversion (FGI) to simplify."},
 {branch:"inorganic",level:"Undergraduate",title:"Crystal Field Theory",body:"d-orbitals split in a ligand field. Octahedral: t2g (lower) and eg (higher), splitting Δo. Strong-field ligands give low-spin complexes; weak-field give high-spin."},
 {branch:"inorganic",level:"Masters",title:"Organometallic 18-electron Rule",body:"Stable organometallic complexes tend to have 18 valence electrons (metal d electrons + ligand donated electrons). Common in metal carbonyls, e.g. Ni(CO)₄, Fe(CO)₅."},
 {branch:"physical",level:"Undergraduate",title:"Laws of Thermodynamics",body:"1st: ΔU = q + w. 2nd: entropy of the universe increases for spontaneous processes. Gibbs energy: ΔG = ΔH − TΔS; spontaneous when ΔG < 0."},
 {branch:"physical",level:"Undergraduate",title:"Chemical Kinetics",body:"Rate law: rate = k[A]^m[B]^n. First-order half-life t½ = 0.693/k. Arrhenius: k = A·e^(−Ea/RT)."},
 {branch:"physical",level:"Masters",title:"Schrödinger Equation",body:"Ĥψ = Eψ. Particle in a box: Eₙ = n²h²/(8mL²). Hydrogen atom energy: Eₙ = −13.6 eV / n²."},
 {branch:"analytical",level:"Undergraduate",title:"Titration Basics",body:"At the equivalence point: n₁M₁V₁ = n₂M₂V₂ (adjusted for stoichiometry). Indicators: phenolphthalein (pH 8.2–10), methyl orange (3.1–4.4)."},
 {branch:"analytical",level:"Masters",title:"Spectroscopy Overview",body:"UV-Vis: electronic transitions (Beer–Lambert A = εcl). IR: bond vibrations (C=O ~1700 cm⁻¹). NMR: nuclear spin environments (chemical shift, coupling). MS: mass-to-charge ratio and fragmentation."},
 {branch:"medicinal",level:"Undergraduate",title:"Pharmacokinetics (ADME)",body:"Absorption, Distribution, Metabolism, Excretion. Bioavailability F = AUC(oral)/AUC(IV). Half-life t½ = 0.693·Vd/CL."},
 {branch:"medicinal",level:"Masters",title:"Structure–Activity Relationship",body:"SAR studies how structural changes affect biological activity. QSAR builds quantitative models using descriptors such as logP, polar surface area and electronic parameters. Lipinski's rule of five guides oral drug-likeness."},
 {branch:"environmental",level:"Undergraduate",title:"Ozone Depletion",body:"CFCs release Cl• in the stratosphere under UV: Cl• + O₃ → ClO• + O₂; ClO• + O → Cl• + O₂. One chlorine atom can destroy many ozone molecules (catalytic chain)."},
 {branch:"environmental",level:"Undergraduate",title:"Water Quality Parameters",body:"pH, dissolved oxygen (DO), BOD, COD, TDS, hardness. BOD measures oxygen consumed by microbes decomposing organic matter over 5 days at 20 °C."},
 {branch:"industrial",level:"Undergraduate",title:"Polymerisation",body:"Addition polymers (polyethylene, PVC) form via chain-growth of alkenes. Condensation polymers (nylon, polyester) form with loss of small molecules such as water."}
];
const QUIZ = [
 {q:"What is the SI unit of amount of substance?",o:["Gram","Mole","Litre","Kelvin"],a:1},
 {q:"Which hybridisation does carbon show in ethene (C₂H₄)?",o:["sp","sp²","sp³","dsp²"],a:1},
 {q:"A solution with pH 3 has what [H⁺]?",o:["10⁻³ M","10³ M","10⁻¹¹ M","3 M"],a:0},
 {q:"Which rule gives the order of filling of orbitals?",o:["Hund's rule","Pauli principle","Aufbau principle","Le Chatelier"],a:2},
 {q:"Which ligand type typically produces low-spin octahedral complexes?",o:["Weak-field","Strong-field","Neutral solvent","Halide only"],a:1},
 {q:"ΔG < 0 indicates a process that is:",o:["Non-spontaneous","At equilibrium","Spontaneous","Endothermic only"],a:2},
 {q:"Which technique measures nuclear spin environments?",o:["IR","UV-Vis","NMR","XRD"],a:2},
 {q:"BOD is measured over how many days (standard test)?",o:["1","3","5","10"],a:2}
];

// helpers used by the content-*.js files
const T=(branch,level,title,body)=>TOPICS.push({branch,level,title,body});
const Q=(b,q,o,a)=>QUIZ.push({b,q,o,a});
