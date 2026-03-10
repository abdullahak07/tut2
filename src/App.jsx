import { useState } from "react";

// ─── STYLES ──────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Nunito',sans-serif;background:#f7f8fc}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes pop{0%{transform:scale(.92)}60%{transform:scale(1.04)}100%{transform:scale(1)}}
.fadein{animation:fadeIn .3s ease both}
.pop{animation:pop .25s ease both}
button,select{font-family:'Nunito',sans-serif}
`;

// ─── UI HELPERS ───────────────────────────────────────────────
function Card({ children, style = {} }) {
  return <div style={{ background:"#fff", borderRadius:16, padding:"18px 20px", boxShadow:"0 2px 12px rgba(0,0,0,.06)", ...style }}>{children}</div>;
}
function Chip({ children, color="#3b82f6" }) {
  return <span style={{ background:color+"18", color, border:`1.5px solid ${color}40`, borderRadius:30, padding:"2px 12px", fontSize:12, fontWeight:700, whiteSpace:"nowrap" }}>{children}</span>;
}
function Btn({ children, onClick, color="#3b82f6", outline=false, disabled=false }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding:"8px 20px", borderRadius:10, border:`2px solid ${color}`,
      background:outline?"transparent":color, color:outline?color:"#fff",
      fontWeight:700, fontSize:13, cursor:disabled?"not-allowed":"pointer",
      opacity:disabled?.4:1, transition:"all .15s",
    }}>{children}</button>
  );
}
function Hint({ children }) {
  return (
    <div style={{ background:"#fffbeb", border:"1.5px solid #fde68a", borderRadius:10, padding:"10px 14px", marginTop:10, fontSize:13, color:"#92400e", lineHeight:1.7 }}>
      💡 <strong>Hint:</strong> {children}
    </div>
  );
}
function SampleAnswer({ children }) {
  return (
    <div style={{ background:"#f0fdf4", border:"1.5px solid #86efac", borderRadius:10, padding:"10px 14px", marginTop:10, fontSize:13, color:"#15803d", lineHeight:1.7 }}>
      📝 <strong>Sample direction:</strong> {children}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 1 — TRUE OR FALSE
// ══════════════════════════════════════════════════════════════
const TF_QUESTIONS = [
  {
    id: 1,
    statement: "DFS is guaranteed to return a shortest solution.",
    answer: false,
    emoji: "🔽",
    hint: "DFS follows one path as far as it can go. Does it compare ALL possible routes before picking one?",
    sample: "Think about DFS in a maze — it might find a very long winding path to the exit, not the shortest one. So the answer is... FALSE. DFS does NOT guarantee shortest path.",
    analogy: "DFS is like someone who takes the first road they see and keeps going — they might reach the destination, but not necessarily the fastest way.",
  },
  {
    id: 2,
    statement: "BFS is guaranteed to return a shortest solution.",
    answer: true,
    emoji: "📋",
    hint: "BFS explores all nodes at distance 1 first, then distance 2... What does that mean about the first path it finds?",
    sample: "Because BFS expands layer by layer, the first time it reaches the goal it MUST be via the shortest path. Answer: TRUE — but only when all step costs are equal (cost = 1).",
    analogy: "BFS is like water: it reaches nearby places before far ones. So when it first reaches the goal, it took the shortest possible route.",
  },
  {
    id: 3,
    statement: "Greedy search is guaranteed to return an optimal solution.",
    answer: false,
    emoji: "🤑",
    hint: "Greedy search always picks the node that LOOKS closest to the goal. Can looking closest always mean it IS the best overall path?",
    sample: "Greedy can get 'tricked' by a heuristic that looks good locally but leads somewhere bad. Example: a shortcut road that looks close but is actually a dead end. Answer: FALSE.",
    analogy: "Greedy is like always turning towards where you can see the destination — but sometimes a mountain is in the way and you need to go around it first!",
  },
  {
    id: 4,
    statement: "A* graph search with an admissible heuristic is guaranteed to return an optimal solution.",
    answer: true,
    emoji: "⭐",
    hint: "A* uses f(n) = g(n) + h(n). If h(n) never OVERestimates the true cost, what does that guarantee about the solution it finds?",
    sample: "With an admissible heuristic, A* never gives up on a path too early. It always finds the cheapest path. Answer: TRUE — this is one of A*'s most important properties.",
    analogy: "A* is like a GPS with perfect traffic data — it considers both how far you've come AND an accurate estimate of how far remains, so it never takes a worse route.",
  },
  {
    id: 5,
    statement: "A* graph search is guaranteed to expand no more nodes than depth-first graph search.",
    answer: false,
    emoji: "🌲",
    hint: "A* is more informed than DFS, but does being 'smarter' always mean expanding fewer nodes? Think about worst cases.",
    sample: "A* can expand MANY nodes if the heuristic is weak or the graph is huge. DFS can get lucky and stumble onto the goal quickly via one path. Answer: FALSE — no such guarantee exists.",
    analogy: "A* is usually smarter but not always faster in terms of nodes expanded. DFS could find the goal on its very first dive down!",
  },
];

function TFTab() {
  const [revealed, setRevealed] = useState({});
  const [chosen, setChosen]     = useState({});

  const choose = (id, val) => {
    if (chosen[id] !== undefined) return;
    setChosen(p => ({ ...p, [id]: val }));
  };
  const reveal = id => setRevealed(p => ({ ...p, [id]: true }));
  const reset  = () => { setChosen({}); setRevealed({}); };

  const score = Object.entries(chosen).filter(([id, v]) => TF_QUESTIONS[+id-1].answer === v).length;

  return (
    <div className="fadein">
      <div style={{ background:"linear-gradient(135deg,#dbeafe,#ede9fe)", borderRadius:18, padding:"18px 24px", marginBottom:20 }}>
        <div style={{ fontWeight:800, fontSize:15, color:"#1e40af", marginBottom:5 }}>🎯 Q1 — True or False?</div>
        <div style={{ fontSize:14, color:"#334155", lineHeight:1.7 }}>
          These are <strong>classic exam questions</strong> about search algorithms. Pick your answer, then reveal the explanation and a sample direction to help you write your own answer.
        </div>
      </div>

      {Object.keys(chosen).length === 5 && (
        <div className="pop" style={{ background:"#f0fdf4", border:"2px solid #86efac", borderRadius:14, padding:"12px 20px", marginBottom:18, display:"flex", alignItems:"center", gap:14 }}>
          <span style={{ fontSize:28 }}>{score === 5 ? "🏆" : score >= 3 ? "😊" : "🤔"}</span>
          <div>
            <div style={{ fontWeight:800, fontSize:15, color:"#15803d" }}>You got {score}/5 correct!</div>
            <div style={{ fontSize:13, color:"#166534" }}>{score===5?"Perfect score — you're ready for the tutorial!":score>=3?"Good understanding! Review the ones you missed.":"Read the hints carefully and try again."}</div>
          </div>
          <Btn onClick={reset} outline color="#16a34a" >↺ Try Again</Btn>
        </div>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {TF_QUESTIONS.map(q => {
          const picked  = chosen[q.id];
          const correct = picked === q.answer;
          const showed  = revealed[q.id];
          const hasPicked = picked !== undefined;
          return (
            <Card key={q.id} style={{ border:`2px solid ${!hasPicked?"#e2e8f0":correct?"#86efac":"#fca5a5"}`, transition:"all .2s" }}>
              <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:12 }}>
                <span style={{ fontSize:26, flexShrink:0 }}>{q.emoji}</span>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", gap:8, marginBottom:6 }}>
                    <Chip color="#6366f1">Statement {q.id}</Chip>
                    {hasPicked && <Chip color={correct?"#16a34a":"#dc2626"}>{correct?"✅ Correct!":"❌ Not quite"}</Chip>}
                  </div>
                  <div style={{ fontSize:14, fontWeight:700, color:"#1e293b", lineHeight:1.6 }}>{q.statement}</div>
                </div>
              </div>

              {/* Answer buttons */}
              <div style={{ display:"flex", gap:10, marginBottom: hasPicked ? 10 : 0 }}>
                {[true, false].map(val => (
                  <button key={String(val)} onClick={() => choose(q.id, val)}
                    style={{
                      padding:"8px 28px", borderRadius:10, fontWeight:800, fontSize:14, cursor: hasPicked ? "default":"pointer",
                      border:`2px solid ${!hasPicked?"#e2e8f0":picked===val?(correct?"#16a34a":"#dc2626"):"#e2e8f0"}`,
                      background: !hasPicked ? "#f8fafc" : picked===val?(correct?"#dcfce7":"#fee2e2"):"#f8fafc",
                      color: !hasPicked ? "#64748b" : picked===val?(correct?"#15803d":"#b91c1c"):"#94a3b8",
                      transition:"all .2s",
                    }}>
                    {val ? "✅ TRUE" : "❌ FALSE"}
                  </button>
                ))}
                {hasPicked && !showed && (
                  <Btn onClick={() => reveal(q.id)} outline color="#6366f1">Show explanation</Btn>
                )}
              </div>

              {showed && (
                <div className="fadein">
                  <div style={{ background:"#f1f5f9", borderRadius:10, padding:"10px 14px", fontSize:13, color:"#475569", lineHeight:1.7, marginBottom:6 }}>
                    🎭 <strong>Analogy:</strong> {q.analogy}
                  </div>
                  <Hint>{q.hint}</Hint>
                  <SampleAnswer>{q.sample}</SampleAnswer>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 2 — ADMISSIBILITY
// ══════════════════════════════════════════════════════════════
// Graph: S --6--> G, S --2--> B, B --3--> G
// Actual costs: h*(S)=5 (via B: 2+3), h*(B)=3, h*(G)=0
// Admissible: h(n) <= h*(n) for all n

const HEURISTICS = [
  { id:"I",   hS:4, hB:1, hG:0 },
  { id:"II",  hS:6, hB:3, hG:0 },
  { id:"III", hS:4, hB:3, hG:0 },
  { id:"IV",  hS:5, hB:2, hG:0 },
];

// True costs (optimal): h*(S)=5, h*(B)=3, h*(G)=0
const TRUE_COSTS = { S:5, B:3, G:0 };

function checkAdmissible(h) {
  const checks = [
    { node:"S", hVal:h.hS, trueCost:5, ok: h.hS <= 5 },
    { node:"B", hVal:h.hB, trueCost:3, ok: h.hB <= 3 },
    { node:"G", hVal:h.hG, trueCost:0, ok: h.hG <= 0 },
  ];
  return checks;
}

function AdmissibilityTab() {
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const h = selected ? HEURISTICS.find(x => x.id === selected) : null;
  const checks = h ? checkAdmissible(h) : null;
  const admissible = checks ? checks.every(c => c.ok) : null;

  return (
    <div className="fadein">
      <div style={{ background:"linear-gradient(135deg,#fdf4ff,#ede9fe)", borderRadius:18, padding:"18px 24px", marginBottom:20 }}>
        <div style={{ fontWeight:800, fontSize:15, color:"#6d28d9", marginBottom:5 }}>🔍 Q2 — Is this heuristic admissible?</div>
        <div style={{ fontSize:14, color:"#334155", lineHeight:1.7 }}>
          A heuristic is <strong>admissible</strong> if it <em>never overestimates</em> the true cost to the goal.
          Think of it like a GPS that might underestimate your travel time — that's fine! But it must never say "5 minutes" when it's really 3 minutes away.
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
        {/* Graph */}
        <Card>
          <div style={{ fontWeight:800, fontSize:14, color:"#1e293b", marginBottom:14 }}>🗺️ The Search Graph</div>
          <svg viewBox="0 0 340 240" width="100%">
            {/* Edges */}
            <line x1="60" y1="120" x2="270" y2="120" stroke="#94a3b8" strokeWidth="2.5"/>
            <text x="165" y="108" textAnchor="middle" fontFamily="Nunito" fontSize="15" fontWeight="800" fill="#3b82f6">6</text>
            <line x1="60" y1="120" x2="130" y2="200" stroke="#94a3b8" strokeWidth="2.5"/>
            <text x="78" y="178" textAnchor="middle" fontFamily="Nunito" fontSize="15" fontWeight="800" fill="#3b82f6">2</text>
            <line x1="130" y1="200" x2="270" y2="120" stroke="#94a3b8" strokeWidth="2.5"/>
            <text x="218" y="185" textAnchor="middle" fontFamily="Nunito" fontSize="15" fontWeight="800" fill="#3b82f6">3</text>
            {/* Arrowhead S->G */}
            <polygon points="270,120 254,113 254,127" fill="#94a3b8"/>
            {/* Arrowhead B->G */}
            <polygon points="270,120 254,116 261,130" fill="#94a3b8"/>
            {/* Nodes */}
            {[["S",60,120,"#8b5cf6","START"],["B",130,200,"#f59e0b",""],["G",270,120,"#22c55e","GOAL"]].map(([id,cx,cy,col,sub])=>(
              <g key={id}>
                <circle cx={cx} cy={cy} r={26} fill={col+"18"} stroke={col} strokeWidth="2.5"/>
                <text x={cx} y={cy+6} textAnchor="middle" fontFamily="Nunito" fontSize="16" fontWeight="900" fill={col}>{id}</text>
                {sub && <text x={cx} y={cy-32} textAnchor="middle" fontFamily="Nunito" fontSize="10" fontWeight="700" fill={col}>{sub}</text>}
              </g>
            ))}
          </svg>

          {/* True costs */}
          <div style={{ background:"#f8fafc", borderRadius:10, padding:"10px 14px", marginTop:6 }}>
            <div style={{ fontWeight:800, fontSize:12, color:"#475569", marginBottom:6 }}>True optimal costs h*(n):</div>
            <div style={{ display:"flex", gap:10 }}>
              {[["S","5","Best path: S→B→G = 2+3","#8b5cf6"],["B","3","Direct: B→G = 3","#f59e0b"],["G","0","Already at goal","#22c55e"]].map(([n,c,exp,col])=>(
                <div key={n} style={{ flex:1, background:col+"10", border:`1.5px solid ${col}40`, borderRadius:8, padding:"7px 10px" }}>
                  <div style={{ fontWeight:800, fontSize:16, color:col }}>h*({n}) = {c}</div>
                  <div style={{ fontSize:11, color:"#64748b", marginTop:2 }}>{exp}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Heuristic selector */}
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <Card>
            <div style={{ fontWeight:800, fontSize:14, color:"#1e293b", marginBottom:12 }}>Select a heuristic to check:</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
              {HEURISTICS.map(hh => (
                <button key={hh.id} onClick={() => { setSelected(hh.id); setShowHint(false); }}
                  style={{
                    padding:"10px 14px", borderRadius:12, border:`2px solid ${selected===hh.id?"#6366f1":"#e2e8f0"}`,
                    background:selected===hh.id?"#ede9fe":"#f8fafc",
                    cursor:"pointer", textAlign:"left", transition:"all .2s",
                  }}>
                  <div style={{ fontWeight:800, fontSize:14, color: selected===hh.id?"#4f46e5":"#1e293b" }}>Heuristic {hh.id}</div>
                  <div style={{ fontSize:12, color:"#64748b", marginTop:3 }}>h(S)={hh.hS}  h(B)={hh.hB}  h(G)={hh.hG}</div>
                </button>
              ))}
            </div>
          </Card>

          {h && checks && (
            <Card className="fadein" style={{ border:`2px solid ${admissible?"#86efac":"#fca5a5"}` }}>
              <div style={{ fontWeight:800, fontSize:14, color:"#1e293b", marginBottom:12 }}>
                Checking Heuristic {h.id}:
              </div>
              {checks.map(({ node, hVal, trueCost, ok }) => (
                <div key={node} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10, padding:"10px 14px",
                  background:ok?"#f0fdf4":"#fff1f2", borderRadius:10, border:`1.5px solid ${ok?"#86efac":"#fca5a5"}` }}>
                  <span style={{ fontSize:20 }}>{ok?"✅":"❌"}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:13 }}>Node {node}:</div>
                    <div style={{ fontSize:12, color:"#64748b" }}>h({node}) = {hVal} &nbsp;{ok?"≤":">"}&nbsp; h*({node}) = {trueCost}</div>
                  </div>
                  <Chip color={ok?"#16a34a":"#dc2626"}>{ok?"OK":"VIOLATED"}</Chip>
                </div>
              ))}
              <div style={{
                marginTop:10, padding:"10px 14px", borderRadius:10, fontWeight:800, fontSize:14, textAlign:"center",
                background:admissible?"#f0fdf4":"#fff1f2",
                color:admissible?"#15803d":"#b91c1c",
                border:`2px solid ${admissible?"#86efac":"#fca5a5"}`,
              }}>
                {admissible ? "✅ ADMISSIBLE — never overestimates!" : "❌ NOT ADMISSIBLE — overestimates at least one node!"}
              </div>
              <button onClick={() => setShowHint(p=>!p)} style={{ marginTop:10, background:"none", border:"none", color:"#6366f1", fontWeight:700, fontSize:13, cursor:"pointer" }}>
                {showHint ? "Hide sample answer ▲" : "Show sample answer ▼"}
              </button>
              {showHint && (
                <SampleAnswer>
                  {admissible
                    ? `Heuristic ${h.id} is admissible because for every node, h(n) ≤ h*(n). It never overestimates the true cost to reach the goal.`
                    : `Heuristic ${h.id} is NOT admissible because ${checks.filter(c=>!c.ok).map(c=>`h(${c.node})=${c.hVal} > h*(${c.node})=${c.trueCost}`).join(" and ")}. It overestimates the true cost.`
                  }
                </SampleAnswer>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 3 — COMBINING HEURISTICS
// ══════════════════════════════════════════════════════════════
const COMBINATIONS = [
  {
    label: "a) max(h, i, j)",
    formula: "Take the LARGEST of the three values",
    admissible: true,
    icon: "⬆️",
    color: "#16a34a",
    light: "#f0fdf4",
    border: "#86efac",
    explanation: "If h, i, j all ≤ h*(n), then max of them is also ≤ h*(n). The maximum of values that don't overestimate still won't overestimate!",
    hint: "Can the biggest of three 'safe' estimates still be safe? Yes — because each one individually is already ≤ h*.",
    sample: "max(h,i,j) ≤ h*(n) because each h,i,j ≤ h*(n). Admissible ✅. Also a BETTER heuristic because it's closer to h*!",
  },
  {
    label: "b) min(h, i, j)",
    formula: "Take the SMALLEST of the three values",
    admissible: true,
    icon: "⬇️",
    color: "#16a34a",
    light: "#f0fdf4",
    border: "#86efac",
    explanation: "The minimum is even smaller than each individual value, so if each is ≤ h*(n), the minimum definitely is too.",
    hint: "If each estimate is already safe (not too big), can taking the smallest one become unsafe? No — it just gets more conservative.",
    sample: "min(h,i,j) ≤ h(n) ≤ h*(n). Admissible ✅. But it's a weaker heuristic — further from h*.",
  },
  {
    label: "c) max(h, i+j)",
    formula: "Compare h vs the SUM of i and j, take max",
    admissible: false,
    icon: "⚠️",
    color: "#dc2626",
    light: "#fff1f2",
    border: "#fca5a5",
    explanation: "i + j can easily exceed h*(n)! Even if i ≤ h* and j ≤ h*, their sum could be 2×h*, which is a big overestimate.",
    hint: "What happens when you ADD two things that are each close to h*? They might sum to MORE than h*.",
    sample: "NOT admissible ❌. i(n)+j(n) could be > h*(n). E.g. if h*=5, i=4, j=4 → i+j=8 > 5.",
  },
  {
    label: "d) h + i + j",
    formula: "ADD all three heuristics together",
    admissible: false,
    icon: "❌",
    color: "#dc2626",
    light: "#fff1f2",
    border: "#fca5a5",
    explanation: "Summing three values each close to h* will usually produce a value much larger than h*. This overestimates badly.",
    hint: "If each heuristic is say 4 and h*=5, then h+i+j = 12 which is way bigger than 5. Does this overestimate?",
    sample: "NOT admissible ❌. Each alone ≤ h*(n), but sum of three could easily be 3×h*(n). Overestimates!",
  },
  {
    label: "e) h × i × j",
    formula: "MULTIPLY all three heuristics",
    admissible: false,
    icon: "❌",
    color: "#dc2626",
    light: "#fff1f2",
    border: "#fca5a5",
    explanation: "Multiplying values near h* makes the result grow very fast. It will almost certainly overestimate.",
    hint: "If h=4, i=4, j=4, h*=5, then 4×4×4=64. Is 64 ≤ 5? Not at all!",
    sample: "NOT admissible ❌. The product h×i×j can far exceed h*(n). Example: h=4,i=4,j=4 vs h*=5 → 64 ≫ 5.",
  },
  {
    label: "f) h/3 + i/3 + j/3",
    formula: "AVERAGE of the three heuristics",
    admissible: true,
    icon: "✅",
    color: "#16a34a",
    light: "#f0fdf4",
    border: "#86efac",
    explanation: "This is the same as (h+i+j)/3. The average of values each ≤ h* is also ≤ h*. A smaller value never overestimates.",
    hint: "The average of three numbers that are each ≤ h* — can the average be > h*? Think about what average means...",
    sample: "Admissible ✅. Since h,i,j ≤ h*(n), their average (h+i+j)/3 ≤ h*(n). Safe but weaker than max.",
  },
];

function CombineTab() {
  const [open, setOpen] = useState(null);
  return (
    <div className="fadein">
      <div style={{ background:"linear-gradient(135deg,#f0fdf4,#dcfce7)", borderRadius:18, padding:"18px 24px", marginBottom:20 }}>
        <div style={{ fontWeight:800, fontSize:15, color:"#166534", marginBottom:5 }}>🧮 Q3 — Combining Admissible Heuristics</div>
        <div style={{ fontSize:14, color:"#334155", lineHeight:1.7 }}>
          Given that h(s), i(s), j(s) are all admissible, which combinations stay admissible?
          Key rule: <strong>h(n) ≤ h*(n)</strong> must hold after the combination. Click each card to explore!
        </div>
      </div>

      {/* Quick legend */}
      <div style={{ display:"flex", gap:10, marginBottom:16, flexWrap:"wrap" }}>
        <Chip color="#16a34a">✅ Admissible — safe to use with A*</Chip>
        <Chip color="#dc2626">❌ Not admissible — may overestimate</Chip>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
        {COMBINATIONS.map((c, i) => (
          <Card key={i} onClick={() => setOpen(open===i?null:i)}
            style={{ cursor:"pointer", border:`2px solid ${open===i?c.color:"#e2e8f0"}`, background:open===i?c.light:"#fff", transition:"all .2s" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
              <span style={{ fontSize:22 }}>{c.icon}</span>
              <span style={{ fontWeight:800, fontSize:13, color:c.color }}>{c.label}</span>
              <span style={{ marginLeft:"auto", color:"#cbd5e1" }}>{open===i?"▲":"▼"}</span>
            </div>
            <div style={{ fontSize:12, color:"#64748b", marginBottom:6 }}>{c.formula}</div>
            <Chip color={c.color}>{c.admissible?"✅ Admissible":"❌ Not admissible"}</Chip>
            {open===i && (
              <div className="fadein" style={{ marginTop:10 }}>
                <div style={{ background:"#f1f5f9", borderRadius:8, padding:"9px 12px", fontSize:13, color:"#334155", lineHeight:1.7, marginBottom:8 }}>
                  🎭 {c.explanation}
                </div>
                <Hint>{c.hint}</Hint>
                <SampleAnswer>{c.sample}</SampleAnswer>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Summary table */}
      <Card style={{ marginTop:16, background:"#f8fafc" }}>
        <div style={{ fontWeight:800, fontSize:14, color:"#1e293b", marginBottom:12 }}>📊 Summary Table</div>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead>
            <tr style={{ borderBottom:"2px solid #e2e8f0" }}>
              {["Combination","Admissible?","Why (in brief)"].map(h=><th key={h} style={{ padding:"8px 12px", textAlign:"left", color:"#64748b", fontWeight:700 }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {COMBINATIONS.map((c, i) => (
              <tr key={i} style={{ borderBottom:"1px solid #f1f5f9", background: i%2===0?"#fff":"#f8fafc" }}>
                <td style={{ padding:"8px 12px", fontWeight:700, color:"#1e293b" }}>{c.label}</td>
                <td style={{ padding:"8px 12px" }}><Chip color={c.admissible?"#16a34a":"#dc2626"}>{c.admissible?"✅ Yes":"❌ No"}</Chip></td>
                <td style={{ padding:"8px 12px", color:"#475569" }}>{c.admissible?"Stays ≤ h*(n)":"Can exceed h*(n)"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 4 — A* EXPLAINED
// ══════════════════════════════════════════════════════════════
// Simple A* walkthrough on the same S-B-G graph
const ASTAR_STEPS = [
  { frontier:[{n:"S",g:0,h:5,f:5}], visited:[], current:null, msg:"Start! Add S to frontier. f(S) = g(S)+h(S) = 0+5 = 5." },
  { frontier:[{n:"G",g:6,h:0,f:6},{n:"B",g:2,h:3,f:5}], visited:["S"], current:"S", msg:"Expand S (lowest f=5). Find neighbours: G (g=6, h=0, f=6) and B (g=2, h=3, f=5)." },
  { frontier:[{n:"G",g:6,h:0,f:6},{n:"G via B",g:5,h:0,f:5}], visited:["S","B"], current:"B", msg:"Expand B (lowest f=5). B→G costs 3, so g(G via B)=2+3=5, f=5+0=5. Better than current path to G!" },
  { frontier:[], visited:["S","B","G"], current:"G", msg:"🎉 Expand G (f=5). GOAL FOUND! Optimal path: S→B→G with total cost 5." },
];

function AStarTab() {
  const [step, setStep] = useState(0);
  const cur = ASTAR_STEPS[step];

  return (
    <div className="fadein">
      <div style={{ background:"linear-gradient(135deg,#fef9c3,#fef3c7)", borderRadius:18, padding:"18px 24px", marginBottom:20 }}>
        <div style={{ fontWeight:800, fontSize:15, color:"#92400e", marginBottom:5 }}>⭐ Q4 — A* Search Algorithm</div>
        <div style={{ fontSize:14, color:"#334155", lineHeight:1.7 }}>
          A* uses <strong>f(n) = g(n) + h(n)</strong> to decide which node to expand next.
          <br/><strong>g(n)</strong> = actual cost from start to n &nbsp;|&nbsp; <strong>h(n)</strong> = estimated cost from n to goal
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
        {/* Step through */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Card>
            <div style={{ fontWeight:800, fontSize:14, color:"#1e293b", marginBottom:14 }}>⭐ A* on S→B→G Graph (using Heuristic IV)</div>
            <svg viewBox="0 0 340 220" width="100%">
              <line x1="60" y1="110" x2="270" y2="110" stroke="#e2e8f0" strokeWidth="2.5"/>
              <text x="165" y="99" textAnchor="middle" fontFamily="Nunito" fontSize="15" fontWeight="800" fill="#3b82f6">6</text>
              <line x1="60" y1="110" x2="130" y2="185" stroke="#e2e8f0" strokeWidth="2.5"/>
              <text x="78" y="163" textAnchor="middle" fontFamily="Nunito" fontSize="15" fontWeight="800" fill="#3b82f6">2</text>
              <line x1="130" y1="185" x2="270" y2="110" stroke={step>=2?"#22c55e":"#e2e8f0"} strokeWidth={step>=2?4:2.5}/>
              <text x="218" y="170" textAnchor="middle" fontFamily="Nunito" fontSize="15" fontWeight="800" fill="#3b82f6">3</text>
              {[["S",60,110,"#8b5cf6",step>=1],["B",130,185,"#f59e0b",step>=2],["G",270,110,"#22c55e",step>=3]].map(([id,cx,cy,col,visited])=>(
                <g key={id}>
                  <circle cx={cx} cy={cy} r={25} fill={visited?col+"40":col+"14"} stroke={col} strokeWidth={cur.current===id?4:2}/>
                  <text x={cx} y={cy+6} textAnchor="middle" fontFamily="Nunito" fontSize="16" fontWeight="900" fill={col}>{id}</text>
                  {cur.current===id && <circle cx={cx} cy={cy} r={32} fill="none" stroke={col} strokeWidth="2" strokeDasharray="4 3"/>}
                </g>
              ))}
            </svg>

            {/* Step message */}
            <div style={{ background:"#fffbeb", border:"1.5px solid #fde68a", borderRadius:10, padding:"10px 14px", fontSize:13, color:"#92400e", fontWeight:600, lineHeight:1.6 }}>
              Step {step+1}: {cur.msg}
            </div>

            {/* Navigation */}
            <div style={{ display:"flex", gap:10, marginTop:12, alignItems:"center" }}>
              <Btn onClick={() => setStep(s=>Math.max(0,s-1))} disabled={step===0} outline color="#6366f1">◀ Back</Btn>
              <Btn onClick={() => setStep(s=>Math.min(ASTAR_STEPS.length-1,s+1))} disabled={step===ASTAR_STEPS.length-1} color="#6366f1">Next ▶</Btn>
              <Btn onClick={() => setStep(0)} outline color="#64748b">↺</Btn>
              <span style={{ fontSize:12, color:"#94a3b8", marginLeft:4 }}>{step+1} / {ASTAR_STEPS.length}</span>
            </div>
          </Card>

          <Card style={{ background:"#f8fafc" }}>
            <div style={{ fontWeight:800, fontSize:13, color:"#1e293b", marginBottom:10 }}>📋 Frontier (priority queue by f)</div>
            {cur.frontier.length===0
              ? <div style={{ fontSize:13, color:"#94a3b8" }}>Empty — all done!</div>
              : cur.frontier.map((item, i) => (
                <div key={i} style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8, padding:"8px 12px",
                  background:"#fff", borderRadius:10, border:`1.5px solid ${i===0?"#6366f1":"#e2e8f0"}` }}>
                  {i===0 && <span style={{ fontSize:11, color:"#6366f1", fontWeight:800, marginRight:2 }}>NEXT→</span>}
                  <span style={{ fontWeight:800, fontSize:14 }}>{item.n}</span>
                  <div style={{ marginLeft:"auto", display:"flex", gap:6 }}>
                    <Chip color="#3b82f6">g={item.g}</Chip>
                    <Chip color="#8b5cf6">h={item.h}</Chip>
                    <Chip color="#f59e0b">f={item.f}</Chip>
                  </div>
                </div>
              ))
            }
          </Card>
        </div>

        {/* Concept explanation */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Card style={{ borderLeft:"5px solid #f59e0b" }}>
            <div style={{ fontWeight:800, fontSize:14, color:"#92400e", marginBottom:10 }}>🧠 How A* Works</div>
            {[
              ["g(n)", "#3b82f6", "The ACTUAL cost to reach node n from the start. We know this exactly — we've already travelled it."],
              ["h(n)", "#8b5cf6", "An ESTIMATE of the remaining cost from n to the goal. This is our heuristic — must not overestimate!"],
              ["f(n)", "#f59e0b", "f(n) = g(n) + h(n). This is our priority. Always expand the node with the SMALLEST f value next."],
            ].map(([label, color, desc])=>(
              <div key={label} style={{ display:"flex", gap:10, marginBottom:10, padding:"10px 12px", background:color+"10", borderRadius:10, border:`1.5px solid ${color}30` }}>
                <span style={{ fontSize:20, fontWeight:900, color, fontFamily:"Nunito", minWidth:42 }}>{label}</span>
                <div style={{ fontSize:13, color:"#334155", lineHeight:1.6 }}>{desc}</div>
              </div>
            ))}
          </Card>

          <Card style={{ background:"#fffbeb", border:"2px solid #fde68a" }}>
            <div style={{ fontWeight:800, color:"#92400e", fontSize:13, marginBottom:8 }}>💡 Why does A* find the optimal path?</div>
            <div style={{ fontSize:13, color:"#78350f", lineHeight:1.8 }}>
              Because h(n) never overestimates (admissible), A* never "gives up" on a promising path too early.
              When it finally expands the goal, it's guaranteed to have found it via the cheapest route.
            </div>
          </Card>

          <Card style={{ borderLeft:"5px solid #22c55e" }}>
            <div style={{ fontWeight:800, fontSize:13, color:"#15803d", marginBottom:8 }}>📝 For Q4 — Implementation hints</div>
            <div style={{ fontSize:13, color:"#334155", lineHeight:1.8 }}>
              In the A* 8-puzzle code, you need to:<br/>
              1. Define a <strong>heuristic function</strong> (e.g. Manhattan distance)<br/>
              2. Use a <strong>priority queue</strong> ordered by f = g + h<br/>
              3. Track <strong>visited states</strong> to avoid cycles<br/>
              4. Return the <strong>path</strong> when goal is reached
            </div>
            <SampleAnswer>
              Manhattan distance for 8-puzzle: for each tile, count how many rows + columns away it is from its goal position. Sum all tiles. This never overestimates → admissible!
            </SampleAnswer>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════════════════
const TABS = [
  { icon:"✅", label:"Q1 – True or False" },
  { icon:"🔍", label:"Q2 – Admissibility" },
  { icon:"🧮", label:"Q3 – Combining Heuristics" },
  { icon:"⭐", label:"Q4 – A* Algorithm" },
];

export default function App() {
  const [tab, setTab] = useState(0);
  return (
    <div style={{ minHeight:"100vh", background:"#f7f8fc" }}>
      <style>{CSS}</style>
      <div style={{ background:"#fff", borderBottom:"2px solid #f1f5f9", padding:"13px 28px",
        display:"flex", alignItems:"center", gap:14, position:"sticky", top:0, zIndex:50, boxShadow:"0 2px 8px rgba(0,0,0,.04)" }}>
        <div>
          <div style={{ fontWeight:900, fontSize:18, color:"#1e293b" }}>ICT619 — Tutorial 2</div>
          <div style={{ fontSize:12, color:"#94a3b8", fontWeight:600 }}>Informed Search & Heuristics · Interactive Study Guide</div>
        </div>
        <div style={{ marginLeft:"auto", display:"flex", gap:7, flexWrap:"wrap" }}>
          {TABS.map((t, i) => (
            <button key={i} onClick={() => setTab(i)} style={{
              padding:"7px 15px", borderRadius:10, fontWeight:700, fontSize:12.5, cursor:"pointer", transition:"all .2s",
              border:tab===i?"2px solid #6366f1":"2px solid #e2e8f0",
              background:tab===i?"#ede9fe":"#fff", color:tab===i?"#4f46e5":"#64748b",
            }}>{t.icon} {t.label}</button>
          ))}
        </div>
      </div>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"22px 26px" }} key={tab}>
        {tab===0 && <TFTab/>}
        {tab===1 && <AdmissibilityTab/>}
        {tab===2 && <CombineTab/>}
        {tab===3 && <AStarTab/>}
      </div>
    </div>
  );
}
