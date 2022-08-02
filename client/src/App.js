import './App.css';
import io from 'socket.io-client'
import { useState } from 'react'
import Chat from './Chat'
const socket = io.connect(process.env.REACT_APP_API_URL)
function App() {
  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)
  const joinRoom = ()=> {
    if(userName !== '' && room !== ''){
      socket.emit('join_room', room)
      setShowChat(true)
    }
  }
  const exitRoom = () => {
    setShowChat(false)
  }
  return (
    <div className="App">
      {showChat === false ? 
      <div className='joinChatContainer'>
        <h3>Tham gia phòng chat!</h3>
        <input type='text' placeholder='Tên của bạn...' onChange={(e)=>setUserName(e.target.value)}/>
        <input type='text' placeholder='Mã phòng...' onChange={(e)=>setRoom(e.target.value)} onKeyPress={(e)=>{e.key === 'Enter' && joinRoom()}}/> 
        <button onClick={joinRoom}>Vào phòng</button>
      </div>
      :
      <Chat socket={socket} userName={userName} room={room} exitRoom={exitRoom}></Chat>
      }
      </div>

  );
}

export default App;
