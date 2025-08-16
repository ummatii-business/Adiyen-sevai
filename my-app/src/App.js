import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import DonorForm from "./pages/DonorForm";
import RecipientPage from "./pages/RecipientPage";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <header className="container">
        <div className="card" style={{padding:"16px 20px"}}>
          <div className="row" style={{justifyContent:"space-between", alignItems:"center"}}>
            <div style={{display:"flex", alignItems:"center", gap:10}}>
              <span className="pill">Adiyen Sevai</span>
              <strong>Food Help Network</strong>
            </div>
            <nav className="nav">
              <Link className="link" to="/">Home</Link>
              <Link className="link" to="/donor">Share Food</Link>
              <Link className="link" to="/recipient">Need Food</Link>
              <Link className="link" to="/login">Login</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donor" element={<DonorForm />} />
          <Route path="/recipient" element={<RecipientPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <footer className="container">
        <div className="center" style={{padding:20, color:"#64748b"}}>
          Built with ❤️ for community service.
        </div>
      </footer>
    </Router>
  );
}
