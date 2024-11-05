import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { auth } from "./firebase";
import { db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [item, setItem] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      alert("Success: Akun Berhasil Terdaftar");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Berhasil Login");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleAddItem = async () => {
    try {
      if (item) {
        await addDoc(collection(db, "items"), { name: item });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div>
        <h1>Firebase SaveData</h1>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignup}>Sign Up</button>
        <button onClick={handleLogin}>Login</button>

        <h2>Add Item</h2>

        <input
          type="text"
          placeholder="Add item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button onClick={handleAddItem}>Tambah</button>
      </div>
    </>
  );
}

export default App;
