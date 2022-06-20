import React from 'react';
import './App.css';
import Routers from './routers';
import {Flip, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
            <ToastContainer
      theme={"dark"}
      transition={Flip}
       autoClose={5000}
      />
      <Routers />
    </div>
  );
}

export default App;
