import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room, image }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [images, setImages] = useState(null);

  const sendMessage = async () => {
    
    if (currentMessage !== "" ) {
      const messageData = {
        image: images,
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      console.log(images,"sdasdas")
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
     setMessageList((list) => [...list, data]);
    });
  }, [socket]);
 
  console.log("messageList",currentMessage)
  console.log("messageList",messageList)
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Simple Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          
          {messageList.map((messageContent, i) => {
            return (
              <div
                className="message"
                key={i}
                id={username === messageContent.author ? "you" : "other"}
              
              >
                <div>
                  
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                  
                  {messageContent.image ? <img src={messageContent.image.name} accept="image/*" style={{ width:"40px", height: "40px" }} id="siofu_input"/>:""}
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <input type="file" onChange={(event) => {
            setImages(event.target.files[0]) ;
          }}/>
      <div className="chat-footer">
      
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value) ;
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <div className="image-upload">
          <label htmlFor="file-input">
            <img src="https://i.stack.imgur.com/dy62M.png" style={{ width: "20px", cursor: "pointer", padding: "10px 10px"}}/>
          </label>
          <input id="file-input" type="file" onChange="preview()"/>
        </div>
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}
<script src="/siofu/client.js"></script>
export default Chat;
