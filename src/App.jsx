import React, { useState } from "react";
import {
  Menu, X, Trophy, Gamepad2, Users,
  Medal, Flame, Shield, ArrowRight,
  LogIn, UserPlus
} from "lucide-react";

import {
  auth, firebaseReady, googleProvider
} from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";

const games = [
  { name: "BGMI", icon: "🎯", type: "BATTLE ROYALE" },
  { name: "FREE FIRE MAX", icon: "🔥", type: "BATTLE ROYALE" },
  { name: "VALORANT", icon: "⚡", type: "TACTICAL FPS" },
  { name: "COD MOBILE", icon: "💥", type: "ACTION FPS" }
];

const tournaments = [
  { name: "NAYA INDIA BGMI CUP", game: "BGMI", prize: "₹10,000", status: "UPCOMING" },
  { name: "FREE FIRE BATTLE", game: "FREE FIRE MAX", prize: "₹5,000", status: "LIVE" },
  { name: "VALORANT CHAMPIONS", game: "VALORANT", prize: "₹15,000", status: "UPCOMING" }
];

export default function App() {
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(auth?.currentUser || null);

  React.useEffect(() => {
    if (!auth) return;
    return auth.onAuthStateChanged(setUser);
  }, []);

  const login = async () => {
    if (!firebaseReady) {
      setMessage("Firebase setup abhi complete nahi hua hai.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      if (register) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setModal(false);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    if (!firebaseReady) {
      setMessage("Pehle Firebase configure karo.");
      return;
    }

    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      setModal(false);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const nav = [
    ["HOME", "#home"],
    ["GAMES", "#games"],
    ["TOURNAMENTS", "#tournaments"],
    ["LEADERBOARD", "#leaderboard"],
    ["ABOUT", "#about"]
  ];

  return (
    <div className="app" id="home">

      <header className="navbar">
        <a href="#home" className="brand">
          NAYA INDIA <span>ESPORTS</span>
        </a>

        <nav className={menu ? "nav-links active" : "nav-links"}>
          {nav.map(([name, link]) => (
            <a key={name} href={link} onClick={() => setMenu(false)}>
              {name}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          {user ? (
            <button className="login-btn" onClick={() => signOut(auth)}>
              LOGOUT
            </button>
          ) : (
            <button className="login-btn" onClick={() => setModal(true)}>
              LOGIN
            </button>
          )}

          <button className="menu-btn" onClick={() => setMenu(!menu)}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="tag">
              <Flame size={15} /> INDIA'S ESPORTS DESTINATION
            </div>

            <h1>
              PLAY HARD.
              <br />
              <span>WIN BIG.</span>
            </h1>

            <p>
              India ke gamers ke liye ek naya platform.
              Apni team banao, tournaments khelo
              aur champions bano.
            </p>

            <div className="hero-buttons">
              <a href="#tournaments" className="primary-btn">
                EXPLORE TOURNAMENTS <ArrowRight size={17} />
              </a>
              <button className="outline-btn" onClick={() => setModal(true)}>
                JOIN NOW
              </button>
            </div>

            <div className="stats">
              <div><b>05+</b><small>GAMES</small></div>
              <div><b>24/7</b><small>ESPORTS</small></div>
              <div><b>INDIA</b><small>COMMUNITY</small></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-emblem">NI<span>⚡</span></div>
            <div className="emblem-text">NEXT GENERATION ESPORTS</div>
          </div>
        </section>

        <section className="section" id="games">
          <div className="section-heading">
            <div><small>CHOOSE YOUR BATTLE</small><h2>POPULAR GAMES</h2></div>
            <Gamepad2 size={30} />
          </div>

          <div className="game-grid">
            {games.map(game => (
              <article className="game-card" key={game.name}>
                <div className="game-icon">{game.icon}</div>
                <small>{game.type}</small>
                <h3>{game.name}</h3>
                <a href="#tournaments">EXPLORE <ArrowRight size={14}/></a>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="tournaments">
          <div className="section-heading">
            <div><small>COMPETE AND CONQUER</small><h2>FEATURED TOURNAMENTS</h2></div>
            <Trophy size={30} />
          </div>

          <div className="tournament-list">
            {tournaments.map(t => (
              <article className="tournament-card" key={t.name}>
                <div className="trophy-icon"><Trophy /></div>
                <div className="t-info">
                  <small>{t.game}</small>
                  <h3>{t.name}</h3>
                  <p>Prize Pool: <b>{t.prize}</b></p>
                </div>
                <div className="t-action">
                  <span className={t.status === "LIVE" ? "live" : "upcoming"}>
                    {t.status}
                  </span>
                  <button onClick={() => setModal(true)}>VIEW DETAILS</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section feature-section" id="leaderboard">
          <div className="section-heading">
            <div><small>THE BEST OF THE BEST</small><h2>COMPETE. RANK. WIN.</h2></div>
            <Medal size={30}/>
          </div>

          <div className="feature-grid">
            <article><Trophy/><h3>Leaderboard</h3><p>Top players aur teams ki rankings.</p></article>
            <article><Users/><h3>Team System</h3><p>Apni team banao aur players invite karo.</p></article>
            <article><Shield/><h3>Fair Play</h3><p>Transparent tournament management.</p></article>
          </div>
        </section>

        <section className="community" id="about">
          <h2>YOUR GAME. YOUR GLORY.</h2>
          <p>Join NAYA INDIA ESPORTS and make your mark.</p>
          <button className="primary-btn" onClick={() => setModal(true)}>
            JOIN THE COMMUNITY <ArrowRight size={17}/>
          </button>
        </section>
      </main>

      <footer>
        <h3>NAYA INDIA <span>ESPORTS</span></h3>
        <p>COMPETE • CONNECT • CONQUER</p>
        <small>© 2026 NAYA INDIA ESPORTS. All rights reserved.</small>
      </footer>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="auth-modal" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setModal(false)}>
              <X/>
            </button>

            <h2>{register ? "CREATE ACCOUNT" : "WELCOME BACK"}</h2>
            <p>NAYA INDIA ESPORTS</p>

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password (minimum 6 characters)"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button className="primary-btn full" disabled={loading} onClick={login}>
              {loading ? "PLEASE WAIT..." : register ? "REGISTER" : "LOGIN"}
            </button>

            <button className="google-btn" disabled={loading} onClick={googleLogin}>
              Continue with Google
            </button>

            {message && <p className="error">{message}</p>}

            <button className="switch" onClick={() => {
              setRegister(!register);
              setMessage("");
            }}>
              {register ? "Already have an account? Login" : "New user? Create account"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
              }
