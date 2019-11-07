import React from 'react';
import LoginYeti from './LoginYeti';
import yeti from './yeti'
import './Login.scss';


function App() {
  return (
    <LoginYeti animal={yeti} />
  );
}

export default App;
