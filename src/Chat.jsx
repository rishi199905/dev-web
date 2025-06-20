import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {createSocketCon} from './utils/socket'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from './utils/constants';
const Chat = () => {
    const { id }  = useParams();
    const [messages, setMsgs ] = useState([])
    const [newMsg, setNewMsg] = useState("")
    const user = useSelector(store => store.user)
    const userId = user?._id

    const fetchChat = async () => {
        let chatMsgs = await axios.get(BASE_URL + "/chat/" + id, {
            withCredentials: true
        });

        chatMsgs = chatMsgs?.data?.messages.map((msg, ind) => {
            return { firstName: msg?.sender?.firstName, text: msg.text}
        });
        setMsgs(chatMsgs)
    }
    useEffect(() => {
        fetchChat();
    }, [])
    useEffect(() => {
        const socket = createSocketCon();
        socket.emit("joinChat", {userId, id})

        socket.on("msgRecieved", ({firstName, newMsg})=> {
            setMsgs(prev => [...prev, {firstName, text: newMsg}])
        })

        return () => {
            socket.disconnect()
        }
    }, [userId, id])

    const sendMessage = () => {
        const socket = createSocketCon();
        socket.emit("sendMessage", {
            firstName: user.firstName,
            userId,
            id, 
            newMsg
        });
        setNewMsg("")
    }
  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
             className={'chat ' + (user.firstName === msg.firstName ? "chat-end" : "chat-start")}
            >
              <div className="chat-header">
                {msg.firstName}
                {/* <time className="text-xs opacity-50"> 2 hours ago</time> */}
              </div>
              <div className="chat-bubble">{msg.text}</div>
              {/* <div className="chat-footer opacity-50">Seen</div> */}
            </div>
          );
        })}
        
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input type='text'
            value={newMsg}
             onKeyDown={(e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        }}
            onChange={(e) => setNewMsg(e.target.value)}
          className="flex-1 border border-gray-500 rounded p-2"
        ></input>
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat