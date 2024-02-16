import React from 'react';
import './App.css';
import { file } from './interface';
import config from './config.json';
import ParseJSON from './components/ParseJSON';
function App() {
  const c:file = config;
  return (
    <div>
      <ParseJSON config = {c} />
    </div>
  );
}

export default App;
