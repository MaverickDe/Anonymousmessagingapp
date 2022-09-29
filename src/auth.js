
import { useEffect ,useState } from "react";
import { BrowserRouter as Router, Routes, Route ,Link} from "react-router-dom";

let Auth = (prop) => {

    // let[ prop,setprop] = useState(pro)

    // useEffect(() => {

    //     setprop(pro)
        
    // },[pro])



    
  return (
      
      <div style={{ margin: "auto" }}>
    <center>

        {prop.error != "" && <div> {prop.error}</div>}
    </center>
        <h1>Anonymous chat</h1>
        {(prop.login && <h1>LOGIN</h1>) || <h1>SIGNUP</h1>}

        <div style={{ margin: "10px" }}>
          <label style={{ display: "block" }} htmlFor="username">
            username
          </label>
          <input
            style={{
              margin: "10px",
              width: "300px",
              height: "40px",
              borderRadius: "5px",
              outline: "none",
              border: "none",
              color: "black",
            }}
            onChange={(e) => {
              prop.dispatch([
                { type: "username", value: e.currentTarget.value },
              ]);
            }}
            value={prop.cred.username}
            id="username"
            name="username"
            placeholder="enter your username"
          ></input>
        </div>
        <div style={{ margin: "10px" }}>
          <label style={{ display: "block" }} htmlFor="password">
            password
          </label>
          <input
            style={{
              margin: "10px",
              width: "300px",
              height: "40px",
              borderRadius: "5px",
              outline: "none",
              border: "none",
              color: "black",
            }}
                    onChange={(e) => {
                console.log(e.currentTarget.value)
              prop.dispatch([
                { type: "password", value: e.currentTarget.value },
              ]);
            }}
            value={prop.cred.password}
            id="password"
            name="password"
            placeholder="enter password"
          />
        </div>
        {prop.submit && (
          <button
            style={{ margin: "10px" }}
            onClick={() => {
              prop.dispatch([{ type: "submit" }]);
            }}
          >
            submit
          </button>
        )}
        {(prop.login && (
          <div>
            <Link to="/signup" style={{ margin: "10px" }}>
              signup
            </Link>
          </div>
        )) || (
          <div>
            <Link to="/login" style={{ margin: "10px" }}>
              login
            </Link>
          </div>
        )}
      </div>
    );
    
}


export default Auth