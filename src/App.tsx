import React from 'react';
import { SocketProvider } from 'src/socket/SocketProvider';

function App() {
  return (
    <SocketProvider>
      <div>App</div>
    </SocketProvider>
  );
}

export default App;
