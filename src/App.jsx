
import React from "react";

function Card({title, children, onClick}) {
  return (
    <div
      onClick={onClick}
      style={{
        border:"1px solid #ddd",
        borderRadius:"14px",
        padding:"20px",
        margin:"10px",
        cursor:onClick?"pointer":"default",
        boxShadow:"0 6px 14px rgba(0,0,0,0.08)",
        flex:"1"
      }}
    >
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  )
}

export default function App(){

  const alertMsg = (msg) => {
    alert(msg)
  }

  return(
    <div style={{
      fontFamily:"Arial",
      padding:"40px",
      maxWidth:"1000px",
      margin:"auto"
    }}>

      <div style={{
        background:"#0f172a",
        color:"white",
        padding:"30px",
        borderRadius:"18px",
        marginBottom:"25px"
      }}>
        <p style={{margin:0,opacity:0.8}}>ICT619</p>
        <h1 style={{margin:"6px 0"}}>Tutorial 2</h1>
        <p style={{margin:0}}>Informed Search & Heuristics – Interactive Study Guide</p>
      </div>

      <div style={{display:"flex",gap:"20px",flexWrap:"wrap"}}>

        <Card
          title="Breadth First Search"
          onClick={()=>alertMsg("BFS explores nodes level by level")}
        >
          Explores nodes level by level and guarantees the shortest path.
        </Card>

        <Card
          title="Depth First Search"
          onClick={()=>alertMsg("DFS explores deep then backtracks")}
        >
          Explores one path deeply before backtracking.
        </Card>

        <Card
          title="Uniform Cost Search"
          onClick={()=>alertMsg("UCS expands lowest cost path")}
        >
          Expands the least-cost path first.
        </Card>

      </div>

      <div style={{
        marginTop:"30px",
        background:"#f3f4f6",
        padding:"20px",
        borderRadius:"12px"
      }}>
        <h3>Deployment Notes</h3>
        <p>This site is built with React + Vite and deployed on Vercel.</p>
      </div>

    </div>
  )
}
