import { useState } from "react";
import swal from "sweetalert";
import { auth } from "./firebase";
import { db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [item, setItem] = useState("");

  // function untuk menghandle action signup, dikemas dalam variabel!

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      swal({
        title: "Success",
        text: "Successfully Created Account",
        icon: "success",
      });
    } catch (error) {
      swal({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  // sama, tapi untuk handle login!
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      swal({
        title: "Success",
        text: "Successfully Logged In",
        icon: "success",
      });
    } catch (error) {
      swal({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  // Disini saya juga mebggunakan swal (sweet alert) untuk menunjuukkan popup alert, karena default alert terlalu monoton

  // Sama juga, function untuk handle event, tapi khusus untuk add data.
  const handleAddItem = async () => {
    try {
      if (item) {
        // line dibawah ini akan merefer firestore mana yang dituju dan apa data yang ingin direcord.
        await addDoc(collection(db, "items"), { name: item });
        swal({
          title: "Success",
          text: "Successfully Added Item",
          icon: "success",
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <h1 className="text-4xl font-bold text-blue-600 mb-5">
        Firebase SaveData
      </h1>
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border rounded-md outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border rounded-md outline-none focus:border-blue-500"
        />
        <div className="flex justify-between space-x-2">
          <button
            onClick={handleSignup}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign Up
          </button>
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Login
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-8 text-gray-700">Add Item</h2>
      <div className="flex flex-col space-y-4 w-full max-w-md mt-4">
        <input
          type="text"
          placeholder="Add item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="px-4 py-2 border rounded-md outline-none focus:border-blue-500"
        />
        <button
          onClick={handleAddItem}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Tambah
        </button>

        {/* Nah Disini adalah frontend dari aplikasi, bisa dilihat, saya gunakan tailwind. */}
      </div>
    </div>
  );
}

export default App;
