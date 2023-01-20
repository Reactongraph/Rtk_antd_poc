import React from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './components/post';
import Table from './components/table';

function App() {
  return (
    <div className="App">
      <header  style={{ padding: "50px" }}>
        <Post />
        <Table />
      </header>
    </div>
  );
}

export default App;
