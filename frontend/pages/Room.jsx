import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { useState } from "react";

function Room() {
  const location = useLocation();
  console.log(location);
  const [userMessages, setUserMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [inbox, setInbox] = useState([]);

  const socketRef = useRef();

  const { room, name } = location.state;

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");
    socketRef.current.on("connect", () => {
      console.log("Connected to the server. Socket ID:", socketRef.current.id);
    });

    socketRef.current.emit("joinedRoom", { name: name, room });

    socketRef.current.on("userJoined", (message) => {
      console.log(message);
      setUserMessages((prev) => {
        return [...prev, message];
      });
    });

    socketRef.current.on("userLeft", (message) => {
      setUserMessages((prev) => {
        return [...prev, message];
      });
    });

    socketRef.current.on("getNewMessage", (msg) => {
      console.log(msg);
      setInbox((prev) => {
        return [...prev, msg];
      });
    });

    return () => {
      socketRef.current.disconnect();
      console.log("Disconnected from server");
    };
  }, [name, room]);

  function sendMessage(e) {
    e.preventDefault();
    const message = {
      name,
      room,
      text: newMessage,
    };
    socketRef.current.emit("newMessage", message);
    setNewMessage("");
  }

  const msgStyle = {
    user: {
      textAlign: "end",
    },
    sender: {},
  };

  return (
    <div>
      <div>
        <h2>Notifikacije</h2>
        <div>
          {userMessages.map((user, idx) => {
            return <p key={idx}>{user}</p>;
          })}
        </div>
      </div>
      <h1>
        Welcome to {room}, {name}
      </h1>

      <div>
        <h3>FORMA ZA SLANJE PORUKA</h3>
        <form>
          <input
            value={newMessage}
            type="text"
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage}>SEND</button>
        </form>
      </div>
      <div>
        <h3>PORUKe:</h3>
        <div>
          {inbox.map((msg, idx) => {
            return (
              <div
                style={
                  msg.sender === name ? msgStyle["user"] : msgStyle["sender"]
                }
                key={idx}
              >
                <h2>{msg.sender}</h2>
                <p>{msg.body}</p>
                <p>{msg.date}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Room;
