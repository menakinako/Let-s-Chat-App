import React from 'react';
import firebase from 'firebase/app';

import {auth} from '../firebase'
import chatapp from '../images/chatting.png';

//import {GoogleOutlined, FacebookOutlined} from '@ant-design/icons';
import google from '../images/google.png';
import facebook from '../images/facebook.png';

const Login = () => {
      return(
          <div id="login-page">
             <div id="login-card">
             <img src={chatapp} style={{width:"100px", height:"100px"}} alt=""/>
                 <h1 style={{color:" #f7869a", fontFamily:"Helvetica"}}>Welcome to Let's Chat </h1>
                 <br></br>
                 <div
                     className="login-button google"
                     onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                 >
                     <img id="google1" src={google} style={{width:"20px", height:"20px"}} alt=""/> Sign In with Google
                      </div>
                <br /> <br />
                <div
                     className="login-button facebook"
                     onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
                 >
                     <img src={facebook} style={{width:"20px", height:"20px"}} alt=""/> Sign In with Facebook
                      </div>
               
             </div>
          </div>
      )
}
export default Login;