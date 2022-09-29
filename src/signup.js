// import { useReducer } from "react";
import Auth from "./auth";
import React, { useReducer } from "react";
import { hostname } from "./variable";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
let timeout1;
let timeout2;
let timeout3;
let timeout4;

let Login = () => {
  const navigate = useNavigate();

  let initialobj = {
    error: "",
    cred: { username: "", password: "" },
    submit: false,
  };

  let reducer = (state, act) => {
    let state_ = { ...state };

    act.forEach((action) => {
      switch (action.type) {
        case "password":
          state_.cred.password = action.value.trim();

          break;
        case "username":
          state_.cred.username = action.value.trim();
          state_.submit = false;
          clearTimeout(timeout1);
          timeout1 = setTimeout(async () => {
            let check = await fetch(`${hostname}/check`, {
              mode: "cors",
              method: "POST",
              body:JSON.stringify( { value: action.value.trim() }),
              credentials: "include",
              headers: {
                "Content-Type":"application/json"
              }
            });
            check.json().then((e) => {
              console.log(e, "SCsccs");
              if (e.check) {
                displayerror("This username already exist");
              } else {
                displayerror(false);
              }
            });
          }, 2000);
          break;
        case "error":
          state_.error = action.value;
          break;
        case "submitbtn":
          state_.submit = true;
          break;
        case "submit":
          setTimeout(() => {
            
            submit_(state_.cred);
          },2000)
          break;
      }
    });

    return state_;
  };

  let [obj, dispatch] = useReducer(reducer, initialobj);
  let submit_ = async (obj) => {

    if (obj.password == "" || obj.username == "") {
      return
    }
    console.log(obj)
    let submitt = await fetch(`${hostname}/signup`, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({ ...obj }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    submitt.json().then((e) => {
      console.log(e, "SCsccs");
      if (e.yeauth) {
        document.cookie = `yeauth=${e.yeauth}`;

        navigate("/dashboard");
      }
    });
  };
  let displayerror = (err) => {
    clearTimeout(timeout4);
    if (err) {
      dispatch([{ type: "error", value: err }]);
      timeout4 = setTimeout(() => {
        dispatch([{ type: "error", value: "" }]);
      }, 2000);
    } else {
      dispatch([{ type: "submitbtn" }]);
    }
  };
  return <Auth {...{ ...obj, dispatch, login: false }} />;
};

export default Login;
