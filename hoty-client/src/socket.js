import io from 'socket.io-client';

export default function socketChat() {
  const socket = io('http://127.0.0.1:3002/chats/1');

  return {
    receive: (cb) => {
      socket.on('chat message', (res) => {
        const id = res.split(' ')[0].trim();
        const msg = res.split(' ')[1].trim();
        cb(id, msg);
      });
    },
    send: (msgVal) => {
      socket.emit('chat message', msgVal);
    },
    disconnect: () => {
      socket.close();
    },
  };
}
