import { useEffect, useReducer, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "../styles/Chat.css";
import { ImageUpload } from "./Image";

export const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createTime")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createTime: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room, // in js dont need todo room:room , room is enough
    });

    setNewMessage("");
  };

  return (
    <div className="chat-page">
      <h1>welcome to room {room.toUpperCase()}</h1>
      <div className="screen">
        <ImageUpload />
      </div>
      <div className="chat-app">
        <div className="messages">
          {messages.map((message) => (
            <div className="message">
              <span className="user">{message.user}: </span>
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="new-massage-form">
          <input
            className="new-massage-input"
            placeholder="type massage"
            onChange={(event) => setNewMessage(event.target.value)}
            value={newMessage}
          />
          <button type="submit" className="sent-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
