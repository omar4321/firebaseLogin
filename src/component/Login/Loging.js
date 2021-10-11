
import React, { useState } from 'react';
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome"
import {
  faGoogle,
  faGithub,
  faKey,
  faLigh,
 
} from "@fortawesome/free-brands-svg-icons"

import "./Login.css"
import { GoogleAuthProvider,getAuth ,signInWithPopup ,  GithubAuthProvider ,signInWithEmailAndPassword ,sendPasswordResetEmail, } from "firebase/auth";
import initializeFirebase from '../../Firebase/Firebase.init';
initializeFirebase();
const GoogleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();


const Loging = () => {
   
    const auth = getAuth();
    const [user, setUser] = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    // google
    
        const handdleGoogleSingIn = () => {
            signInWithPopup(auth, GoogleProvider)
            .then((result) => {
             
               console.log(result.user);

          
              })
              .catch ((error)=>{
                console.log(error.massage)
              })
             
        };

        const handleEmailChange = (e) => {
          setEmail(e.target.value);
        };
          
            const handlePasswordChange = (e) => {
              if (e.target.value.length < 6) {
                console.error("password must need to be at leaset 6 characters");
                return;
              } else {
                setPassword(e.target.value);
              }
            };

            const handleLogin = (e) => {
              e.preventDefault();
              signInWithEmailAndPassword(auth, email, password)
                .then((result) => {
                  const { email, name, PhotoURL } = result.user;
                  const userInfo = {
                    name: name,
                    email: email,
                    photo: PhotoURL,
                  };
                  setUser(userInfo);
                  setError("");
                })
                .catch((error) => {
                  setError(error.message);
                });
            };

            const hanleResetPassword = () => {
              sendPasswordResetEmail(auth, email)
                .then(() => {})
                .catch((err) => {
                  console.log(err.message);
                });
            };
               
               //    Github

            const handdleGithub = () =>{
              signInWithPopup(auth, GithubProvider)
              .then((result)=> {
                  const {email,displayName, photoURL} = result.user;
                  const userInfo = {
                    name: displayName,
                    email : email,
                    photo: photoURL,
                }
                setUser(userInfo);
                   setUser(userInfo);
    
              })
              .catch((err) => setError(err.message));
          };  
    return (
        <div>
                  <h2>{user.email}</h2>
                <div className="login-box d-flex align-items-center justify-content-center">
               <div className="login">
                 <div className="login-box">
                  <h2 className="text-info">Pease Login</h2>
                    <p className="text-danger"></p>
                   <form onSubmit={handleLogin } >
                     <input
                       onChange={handleEmailChange}
                        className="input-felid"
                        type="email"
                        name="email"
                        placeholder="Enter your Email"

                   
                      />
                         
                      <br /> <br/>
                      <input
                        onChange={handlePasswordChange}
                        className="input-felid"
                        type="password"
                        name="password"
                        placeholder="Enter your Password"
                      />
                      <br/>
                      <input
                        className="mt-3 w-50 btn btn-success m-auto"
                        type="submit"
                        value="Login"
                      />
                    </form>
                    <br/>
                  </div>
                  <button  onClick={handdleGoogleSingIn}  className="me-2" >
                  <FontAwesomeIcon icon={faGoogle} /> Login with Google
                  </button>
                  <button onClick={handdleGithub} className="me-2" >
                  <FontAwesomeIcon icon={faGithub}  /> Login with Github
                  </button>
        
                  <button className="mt-2" onClick={hanleResetPassword} >
            
                  <FontAwesomeIcon   /> Reset Password
                  </button>
                </div>
              </div>
            </div>
    );

};

export default Loging;