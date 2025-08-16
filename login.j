import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [isSignup,setIsSignup]=useState(false);

  const handleAuth = ()=>{
    if(isSignup){
      createUserWithEmailAndPassword(auth,email,password)
      .catch(err=>alert(err.message));
    } else {
      signInWithEmailAndPassword(auth,email,password)
      .catch(err=>alert(err.message));
    }
  }

  return (
    <div style={{
      minHeight:"100vh", display:"flex", justifyContent:"center", 
      alignItems:"center", background:"#f3f6fb", flexDirection:"column"
    }}>
      <div style={{
        background:"#fff", padding:"40px", borderRadius:"16px", boxShadow:"0 10px 30px rgba(0,0,0,0.1)",
        minWidth:"300px"
      }}>
        <h2 style={{textAlign:"center", marginBottom:"30px"}}>{isSignup ? "Sign Up" : "Login"}</h2>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
          style={inputStyle} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}
          style={inputStyle} />
        <button onClick={handleAuth} style={btnStyle}>{isSignup ? "Sign Up" : "Login"}</button>
        <p onClick={()=>setIsSignup(!isSignup)} style={{textAlign:"center", marginTop:"15px", cursor:"pointer", color:"#1976d2"}}>
          {isSignup ? "Already have an account? Login" : "Don't have account? Sign Up"}
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width:"100%", padding:"12px", marginBottom:"15px", borderRadius:"8px", border:"1px solid #ccc", fontSize:"1rem"
};

const btnStyle = {
  width:"100%", padding:"12px", borderRadius:"8px", border:"none", background:"#1976d2", color:"#fff", fontSize:"1rem", cursor:"pointer"
};
