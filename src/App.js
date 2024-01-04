import React, { useState, useRef } from "react";
import "./styles/App.css";
import { Auth } from "./components/Auth";
import { Chat } from "./components/Chat";
import Cookies from "universal-cookie";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

const cookie = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookie.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookie.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div>
        <h1>loged out</h1>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <div>
      <h1>hey {auth.currentUser.displayName}</h1>
      <div className="sign-out">
        <button onClick={signUserOut}> SIGN OUT</button>
      </div>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <label> Enter Room Name:</label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
