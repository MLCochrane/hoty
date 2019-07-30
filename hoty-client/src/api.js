import axios from 'axios';
import io from 'socket.io-client';

export default axios.create({
  baseURL: 'http://localhost:3000/api',
});

export function socketChat() {
  const socket = io('http://127.0.0.1:3002/chats/1');

  return {
    recieve: (cb) => {
      socket.on('chat message', (res) => {
        const id = res.split(' ')[0].trim();
        const msg = res.split(' ')[1].trim();
        cb(id, msg);
      });
    },
    send: (msgVal) => {
      socket.emit('chat message', msgVal);
    },
  };
}
