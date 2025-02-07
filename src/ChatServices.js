import {io} from 'socket.io-client';

const SOCKET_URL = 'https://sooprs.com:3002';
let socket = null; 

// Initializing socket connection
const initializeSocket = async (user_id, gorder_id) => {
  return new Promise((resolve, reject) => {
    try {
      if (socket) {
        console.warn('Socket already initialized!');
        return resolve(socket);
      }

      console.log('Initializing socket...', user_id, gorder_id);

      socket = io(SOCKET_URL, {
        transports: ['websocket'],
      });

      socket.on('connect', () => {
        console.log('Socket connected ✅', user_id, gorder_id);
        socket.emit('connectUser', {user_id});
        socket.emit('joinRoom', {user_id, gorder_id});
        resolve(socket);
      });

      socket.on('connect_error', error => {
        console.error('Socket connection error', error.message);
        reject(error);
      });

      socket.on('disconnect', reason => {
        console.warn('Socket disconnected ⚠️', reason);
      });

      socket.on('error', data => {
        console.error('Socket error 🔥', data);
      });
    } catch (error) {
      console.error('Socket initialization failed 🚨', error);
      reject(error);
    }
  });
};

// Emit event to server
const emit = (event, data = {}) => {
  if (socket?.connected) {
    socket.emit(event, data);
    console.log('Event emitted:', event, data);
  } else {
    console.warn('Cannot emit, socket not connected!');
  }
};

// Listen for events from server
const on = (event, cb) => {
  if (socket) {
    console.log('Listening to:', event);
    socket.on(event, cb);
  } else {
    console.warn('Cannot listen, socket not initialized!');
  }
};

// Remove a specific event listener
const removeListener = listenerName => {
  if (socket) {
    socket.removeListener(listenerName);
    console.log(`Listener removed: ${listenerName}`);
  } else {
    console.warn('Cannot remove listener, socket not initialized!');
  }
};

// Disconnect socket when needed
const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('Socket disconnected manually');
  }
};

export default {initializeSocket, emit, on, removeListener, disconnectSocket};
