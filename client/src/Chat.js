import { useState, useEffect } from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
export default function Chat({socket, userName, room}) {
  const [currentMess, setCurrentMess] = useState('')
  const [listMess, setListMess] = useState([])
  const [focus, setFocus] = useState(false)
  const sendMess = async ()=>{
    if (currentMess !== ''){
        const messData = {
            room: room,
            author: userName,
            message: currentMess,
            time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
        }
        await socket.emit('send_message', messData)
        setListMess((list)=>[...list, messData])
        setCurrentMess('')
    }

  }
  useEffect(()=>{
    socket.on('receive_message', (data)=>{
        setListMess((list)=>[...list, data])
    })
  },[socket])
  return (
    <div className='chat-window'>
        <div className="chat-header">
            <p>Phòng {room}  &#8226;  {userName}</p>
        </div>
        <div className="chat-body">
         <ScrollToBottom className='message-container'>
            {listMess.map((messContent)=>(
                <div className="message" id={userName === messContent.author ? 'you':'other'}>
                    <div>
                        <div className="message-content">
                            <p>{messContent.message}</p>
                        </div>
                        <div className="message-meta">
                            <p>{messContent.time}</p>&ensp;
                            <p>{messContent.author}</p>
                        </div>
                    </div>
                </div>
            ))}
         </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input type="text" value={currentMess} placeholder={!focus ? 'Aa':'Nhập tin nhắn...'}
            onChange={(e)=>setCurrentMess(e.target.value)} 
            onKeyPress={(e)=>{e.key === 'Enter' && sendMess()}}
            onFocus={()=>setFocus(true)}
            onBlur={()=>setFocus(false)}
            />
            <button onClick={sendMess}><span className="material-symbols-outlined">send</span></button>
        </div>
    </div>
  )
}