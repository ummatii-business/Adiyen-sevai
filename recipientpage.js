import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function RecipientPage() {
  const [donations,setDonations]=useState([]);
  const [filter,setFilter]=useState("");
  const [userLocation,setUserLocation]=useState({lat:0,lng:0});
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY" });

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(pos=>{
      setUserLocation({lat: pos.coords.latitude, lng: pos.coords.longitude});
    });

    const q = query(collection(db,"donations"), orderBy("timestamp","desc"));
    const unsubscribe = onSnapshot(q, snapshot=>{
      const data = snapshot.docs.map(doc=>({id:doc.id, ...doc.data()}));
      const sorted = data.map(d=>{
        const distance = getDistance(userLocation.lat,userLocation.lng,d.location.lat,d.location.lng);
        return {...d, distance};
      }).sort((a,b)=>a.distance - b.distance);
      setDonations(sorted);
    });
    return ()=>unsubscribe();
  },[userLocation]);

  const getDistance=(lat1,lon1,lat2,lon2)=>{
    const R = 6371; 
    const dLat = (lat2-lat1)*Math.PI/180;
    const dLon = (lon2-lon1)*Math.PI/180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
    const c = 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    return R*c;
  }

  const filteredDonations = filter ? donations.filter(d=>d.foodType===filter) : donations;

  return (
    <div style={{minHeight:"100vh", background:"#f0f4f8", padding:"20px"}}>
      <h2 style={{textAlign:"center", marginBottom:"15px", color:"#0d47a1"}}>Available Donations</h2>
      <div style={{textAlign:"center", marginBottom:"20px"}}>
        <label>Filter Food Type: </label>
        <select value={filter} onChange={e=>setFilter(e.target.value)} style={{padding:"8px", borderRadius:"8px"}}>
          <option value="">All</option>
          <option value="Cooked">Cooked</option>
          <option value="Snacks">Snacks</option>
          <option value="Fruits">Fruits</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
        {filteredDonations.map(d => (
          <div key={d.id} style={{
            border:"1px solid #ccc", padding:"15px", margin:"10px", 
            borderRadius:"16px", width:"220px", background:"#fff",
            boxShadow:"0 8px 20px rgba(0,0,0,0.1)", transition:"transform 0.2s",
          }} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
             onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
            <h4 style={{color:"#1976d2"}}>{d.foodType}</h4>
            <p>Quantity: {d.quantity}</p>
            <p>Donor: {d.donorName}</p>
            <p>Distance: {d.distance.toFixed(2)} km</p>
          </div>
        ))}
      </div>

      {isLoaded && (
        <GoogleMap mapContainerStyle={{width:"100%", height:"400px", marginTop:"20px"}} center={userLocation} zoom={12}>
          {filteredDonations.map(d => (
            <Marker key={d.id} position={{lat:d.location.lat,lng:d.location.lng}} />
          ))}
        </GoogleMap>
      )}
    </div>
  );
}
