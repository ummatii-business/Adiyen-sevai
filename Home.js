import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight:"100vh", display:"flex", flexDirection:"column", 
      justifyContent:"center", alignItems:"center", background:"#f0f4f8"
    }}>
      <h1 style={{fontSize:"3rem", color:"#0d47a1", marginBottom:"40px"}}>Adiyen Sevai</h1>
      <div style={{display:"flex", gap:"20px"}}>
        <button onClick={()=>navigate("/donor")} style={btnStyle}>I Share Food</button>
        <button onClick={()=>navigate("/recipient")} style={btnStyle}>I Need Food</button>
        <button onClick={()=>navigate("/login")} style={btnStyleSecondary}>Login / Sign Up</button>
      </div>
    </div>
  );
}

const btnStyle = {
  padding:"15px 25px", fontSize:"1.1rem", borderRadius:"12px", 
  border:"none", background:"#1976d2", color:"#fff", cursor:"pointer",
  boxShadow:"0 5px 15px rgba(25,118,210,0.4)", transition:"all 0.3s"
};

const btnStyleSecondary = {
  ...btnStyle, background:"#e0e0e0", color:"#333"
};
