import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function DonorForm() {
  const [food,setFood]=useState("");
  const [quantity,setQuantity]=useState("");
  const [location,setLocation]=useState({lat:0,lng:0});
  const navigate = useNavigate();

  const handleSubmit = async ()=>{
    if(food && quantity){
      await addDoc(collection(db,"donations"),{
        donorName: auth.currentUser?.email || "Anonymous",
        foodType: food,
        quantity,
        location,
        timestamp: serverTimestamp()
      });
      alert("Donation Added! Appears automatically.");
      navigate("/recipient");
    }
  }

  const getLocation = ()=>{
    navigator.geolocation.getCurrentPosition(pos=>{
      setLocation({lat: pos.coords.latitude, lng: pos.coords.longitude});
    });
  }

  return (
    <div style={{minHeight:"100vh", background:"#f0f4f8", display:"flex", justifyContent:"center", alignItems:"center"}}>
      <div style={{background:"#fff", padding:"40px", borderRadius:"16px", boxShadow:"0 10px 30px rgba(0,0,0,0.1)", minWidth:"350px"}}>
        <h2 style={{textAlign:"center", marginBottom:"25px"}}>Share Food</h2>
        <select value={food} onChange={e=>setFood(e.target.value)} style={inputStyle}>
          <option value="">Select Food Type</option>
          <option value="Cooked">Cooked</option>
          <option value="Snacks">Snacks</option>
          <option value="Fruits">Fruits</option>
          <option value="Others">Others</option>
        </select>
        <input placeholder="Quantity" value={quantity} onChange={e=>setQuantity(e.target.value)} style={inputStyle} />
        <button onClick={getLocation} style={btnStyleSecondary}>Get My Location</button>
        <button onClick={handleSubmit} style={btnStylePrimary}>Submit Donation</button>
      </div>
    </div>
  );
}

const inputStyle = {
  width:"100%", padding:"12px", marginBottom:"15px", borderRadius:"8px", border:"1px solid #ccc", fontSize:"1rem"
};
const btnStylePrimary = {
  width:"100%", padding:"12px", borderRadius:"8px", border:"none", background:"#1976d2", color:"#fff", fontSize:"1rem", cursor:"pointer", marginTop:"10px"
};
const btnStyleSecondary = {
  width:"100%", padding:"12px", borderRadius:"8px", border:"1px solid #1976d2", background:"#fff", color:"#1976d2", fontSize:"1rem", cursor:"pointer", marginBottom:"10px"
};
