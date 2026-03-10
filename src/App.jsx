
import React from "react";

function Card({title, children, onClick}){
  return (
    <div
      onClick={onClick}
      style={{
        border:"1px solid #ddd",
        borderRadius:"12px",
        padding:"20px",
        margin:"10px",
        cursor:onClick?"pointer":"default",
        boxShadow:"0 2px 8px rgba(0,0,0,0.08)"
      }}
    >
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  )
}

export default function App(){
  return (
    <div style={{fontFamily:"Arial",padding:"40px",maxWidth:"900px",margin:"auto"}}>
      <h1>ICT619 Tutorial 2</h1>
      <p>Interactive examples for AI search algorithms.</p>

      <div style={{display:"flex",flexWrap:"wrap"}}>
        <Card title="Breadth First Search" onClick={()=>alert("BFS explanation")}>
          Click to view BFS
        </Card>

        <Card title="Depth First Search" onClick={()=>alert("DFS explanation")}>
          Click to view DFS
        </Card>

        <Card title="Uniform Cost Search">
          UCS code included in project
        </Card>
      </div>
    </div>
  )
}
