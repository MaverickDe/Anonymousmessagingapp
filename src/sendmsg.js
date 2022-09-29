import { useState } from "react";
import { Link } from "react-router-dom";
import {hostname} from "./variable"

let Sendmsg = () => {


  

  let [msg,setmsg] =useState("")
  let [err,seterr] =useState("")
    
  return <div>
    <center>
      <p>{err}</p>
      </center>
    
        <h1>Anonymous message</h1>
  <h2>Drop a message</h2>

    <div style={{ margin: "10px" }}>
      <label style={{ display: "block" }} htmlFor="message">
        username
      </label>
      <textarea
        style={{
          margin: "0px ,10px",
          width: "300px",
          height: "100px",
          borderRadius: "5px",
          outline: "none",
            border: "none",
          }}
          value={msg}
          onChange={(e) => {
            setmsg(e.currentTarget.value)
          }}
        id="message"
        name="message"
        placeholder="enter your message"
      ></textarea>
    </div>
      <button onClick={async (e) => {
        if (msg != "") {
             let check = await fetch(`${hostname}${window.location.pathname}`, {
              mode: "cors",
              method: "POST",
              body:JSON.stringify( { message:msg.trim() }),
              credentials: "include",
              headers: {
                "Content-Type":"application/json"
              }
            });
            check.json().then((e) => {
            
              if (e.success) {
                seterr("success")
              } else {
                seterr("a problem occured")
                
              }
              setTimeout(() => {
                seterr("")
                
              },2000)
            });
        }
        }}>send</button>
        <div style={{margin:"5px"}}>

        <Link to={"/login"}>
        <button>create your own anoymous room</button>
        </Link>
        </div>
  
</div>;
}

export default Sendmsg