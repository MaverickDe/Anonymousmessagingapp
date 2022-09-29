import React   from "react";
import ReactDOM  from "react-dom/client";
import {BrowserRouter as Router , Routes,Route} from "react-router-dom"
import "./index.css";
// import './App.css';
import Login from "./login"
import Signup from "./signup"
import Dashboard from "./dashboard"
import Sendmsg from "./sendmsg"



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div
    className="body"
    style={{
      backgroundColor: " rgb(80, 2, 2)",
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <div className="con">

      <Router>
        <Routes>
          <Route exact path="/" element={< Login  />}/>
          <Route exact path="/login" element={< Login  />}/>
          <Route exact path="/signup" element={<Signup   />}/>
          <Route exact path="/dashboard" element={<Dashboard   />}/>
          <Route exact path="/message/:user" element={<Sendmsg   />}/>
            
             
          
        
         
        </Routes>
      </Router>

      <footer
        style={{
          zIndex: "200",
          position: "absolute",
          bottom: "0px",
          height: "50px",
        }}
      >
        all right reserved
      </footer>
    </div>
  </div>
);


