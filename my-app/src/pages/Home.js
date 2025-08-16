import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="card">
      <h1 className="title">🍲 Adiyen Sevai</h1>
      <p className="subtitle">
        Share surplus food with people nearby. Real-time, map-based, and simple.
      </p>

      <div className="grid grid-3">
        <div className="card">
          <h3>I'm a Donor</h3>
          <p>Post available food with one click. Location auto-fills.</p>
          <button className="btn btn-primary" onClick={() => navigate("/donor")}>
            Share Food
          </button>
        </div>
        <div className="card">
          <h3>I Need Food</h3>
          <p>See live nearby donations on a map and sorted by distance.</p>
          <button className="btn btn-primary" onClick={() => navigate("/recipient")}>
            Find Food
          </button>
        </div>
        <div className="card">
          <h3>Login / Sign Up</h3>
          <p>Create an account to build trust and track donations.</p>
          <button className="btn btn-ghost" onClick={() => navigate("/login")}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
