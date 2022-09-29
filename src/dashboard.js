import { useEffect, useState } from "react";
import { hostname } from "./variable"
import { Link ,  useNavigate,} from "react-router-dom";

let Dashboard = () => {
   const navigate = useNavigate();
    console.log(new Date())
let [user,setUser] =useState({username:"",message:[]})
  useEffect(() => {
   let v = async () => {
      let check = await fetch(`${hostname}/auth/messages`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
     check.json().then((e) => {
       if (e && !e.hasOwnProperty("authenticate")) {
         console.log(e)
          
         setUser(e)
       } else {
         navigate("/login")
        }
             
      });
    
    }
    v()
  },[])

    return (
      <div style={{ margin: "10px", width: "100%", height: "100%" }}>
        <h1>
          welcome <span>{user.username}</span>

        </h1>

        <button onClick={() => {
          document.cookie = `yeauth = vbn;expires=expires=Sat, 20 Jan 1980 12:00:00 UTC`; 
          
          navigate("/login")


          
        }}>log out</button>

        <p>🔗
        <Link
          to={`/message/${user.username
            .trim()
            .replaceAll(" ", "%")}`}
        >
          <span>{`${window.location.host}/message/${user.username
            .trim()
            .replaceAll(" ", "%")}`}</span>
          </Link>
          </p>

        <p>Share your profile link to get messages from your friends</p>

        <div>
          <h3>Messages</h3>
          <div>
            {(user.message == "" && (
              <center>
                <i>
                  <h3>No messages</h3>
                </i>
              </center>
            )) ||
              user.message.map((e, index) => {
                return (
                  <p
                    key={index}
                    style={{
                      backgroundColor: "purple",
                      padding: "20px",
                      borderRadius: "7px",
                    }}
                  >
                    {e}
                  </p>
                );
              })}
          </div>
        </div>
      </div>
    );
}

export default Dashboard