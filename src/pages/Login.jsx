import { useState, useEffect } from "react";
import { auth, db } from "../components/FirebaseConfig";
import Swal from "sweetalert2";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { serverTimestamp, setDoc, doc, collection } from "firebase/firestore";

const Login = () => {
  useEffect(() => {
    document.title = "Login | Event Scheduler";
    document.description = "Login To Event Scheduler";
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSigningUp(true);
    try {
      // Auth
      await createUserWithEmailAndPassword(auth, email, password);
      //   DB
      const newUserRef = doc(collection(db, "Users"));
      const data = {
        EmailId: email,
        RegisteredAt: serverTimestamp(),
      };
      await setDoc(newUserRef, data);

      Swal.fire(
        "Signed Up Successfully!",
        `Welcome ${email} To Event Scheduler!`,
        "success"
      );
      window.location.replace("/Home");
    } catch (e) {
      Swal.fire("Sign Up Failed!", `${e.message}`, "error");
    } finally {
      setEmail("");
      setPassword("");
      setIsSigningUp(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire(
        "Signed In Successfully!",
        `Welcome ${email} To Event Scheduler!`,
        "success"
      );
      window.location.replace("/Home");
    } catch (e) {
      Swal.fire("Sign In Failed!", `${e.message}`, "error");
    } finally {
      setEmail("");
      setPassword("");
      setIsSigningUp(false);
    }
  };

  return (
    <div>
      <h1>Login/Register</h1>
      <center>
        <form className="login-form">
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="abc@example.com"
              aria-describedby="emailHelp"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll Never Share Your Email With Anyone Else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <input
              type="password"
              minLength={8}
              className="form-control"
              placeholder="abc@defg"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-warning fw-bold"
            onClick={handleRegister}
            disabled={isSigningUp}
          >
            {isSigningUp ? "Registering..." : "Register"}
          </button>
          &nbsp;
          <button
            type="submit"
            className="btn btn-success fw-bold"
            onClick={handleLogin}
            disabled={isSigningIn}
          >
            {isSigningIn ? "Logging In..." : "Login"}
          </button>
        </form>
      </center>
    </div>
  );
};

export default Login;
