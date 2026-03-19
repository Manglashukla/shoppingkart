import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register, clearErrors } from "../actions/userActions";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginSignUp.css";

const LoginSignUp = () => {
  const disp = useDispatch();
  const nav = useNavigate();
  const loc = useLocation();
  const { error: err, isAuthenticated: auth, user } = useSelector((s) => s.user);
  const [isL, setL] = useState(true);
  const [em, setEm] = useState("");
  const [pw, setPw] = useState("");
  const [u, setU] = useState({ name: "", email: "", password: "", role: "user" });
  const { name: n, email: e, password: p, role: r } = u;

  const onL = (ev) => {
    ev.preventDefault();
    disp(login(em, pw));
  };

  const onR = (ev) => {
    ev.preventDefault();
    disp(register({ name: n, email: e, password: p, role: r }));
  };

  const ch = (ev) => setU({ ...u, [ev.target.name]: ev.target.value });

  useEffect(() => {
    if (err) {
      alert(err);
      disp(clearErrors());
    }
    if (auth) {
      const redir = loc.search ? loc.search.split("=")[1] : (user && user.role === "admin" ? "/dashboard" : "/profile");
      nav(redir);
    }
  }, [disp, err, auth, nav, loc.search, user]);

  return (
    <div className="loginSignUpContainer">
      <div className="loginSignUpBox">
        <div className="loginSignUpToggle">
          <p onClick={() => setL(true)} className={isL ? "activeTab" : ""}>LOGIN</p>
          <p onClick={() => setL(false)} className={!isL ? "activeTab" : ""}>REGISTER</p>
        </div>
        {isL ? (
          <form className="loginForm" onSubmit={onL}>
            <div className="loginEmail">
              <input type="email" placeholder="Email" required value={em} onChange={(v) => setEm(v.target.value)} />
            </div>
            <div className="loginPassword">
              <input type="password" placeholder="Password" required value={pw} onChange={(v) => setPw(v.target.value)} />
            </div>
            <input type="submit" value="Login" className="loginBtn" />
          </form>
        ) : (
          <form className="signUpForm" onSubmit={onR}>
            <div className="signUpName">
              <input type="text" placeholder="Name" required name="name" value={n} onChange={ch} />
            </div>
            <div className="signUpEmail">
              <input type="email" placeholder="Email" required name="email" value={e} onChange={ch} />
            </div>
            <div className="signUpPassword">
              <input type="password" placeholder="Password" required name="password" value={p} onChange={ch} />
            </div>
            <div className="signUpRole">
              <select name="role" value={r} onChange={ch} className="roleSelect">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <input type="submit" value="Register" className="signUpBtn" />
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;
