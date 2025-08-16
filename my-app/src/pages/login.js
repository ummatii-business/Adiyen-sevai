import React, { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created! You are now logged in.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="title">{isSignup ? "Create Account" : "Welcome back"}</h2>
      <p className="subtitle">
        {isSignup ? "Join the community" : "Enter your credentials"}
      </p>

      <form className="grid grid-2" onSubmit={handleAuth}>
        <div className="card">
          <label>Email</label>
          <input
            className="input"
            type="email"
            placeholder="name@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <label style={{marginTop:8}}>Password</label>
          <input
            className="input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={isSignup ? "new-password" : "current-password"}
          />
          <button className="btn btn-primary" type="submit" disabled={loading} style={{marginTop:12}}>
            {loading ? "Please wait…" : isSignup ? "Sign Up" : "Login"}
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            style={{marginTop:8}}
          >
            {isSignup ? "Have an account? Login" : "Create a new account"}
          </button>
        </div>

        <div className="card">
          <h4>Why login?</h4>
          <ul style={{marginTop:8, lineHeight:1.7}}>
            <li>✔️ Build trust with ratings later</li>
            <li>✔️ Track your donations/claims</li>
            <li>✔️ Prevent spam & abuse</li>
          </ul>
        </div>
      </form>
    </div>
  );
}
