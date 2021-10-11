import React, { useState } from 'react';
import "./Login.css"
import { getAuth, createUserWithEmailAndPassword , sendEmailVerification,} from "firebase/auth";
import initializeFirebase from '../../Firebase/Firebase.init';
initializeFirebase();
const Reg = () => {
  const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState ({})
 
   
const emailHanddle = (e)=>{
  setEmail(e.target.value);
}
const passwordHanddle = (e)=>{
   
  if (e.target.value.length < 6) {
    console.error("password must need to be at least 6 characters");
    return;
  } else {
    setPassword(e.target.value);
  }
  }

  const handdleReg = (e) =>{
    e.preventDefault();
     createUserWithEmailAndPassword(auth, email, password)
     .then((result) => {
      console.log(result.user);
         verifyEmail(email);
         
     })
     .catch((error)=>{
         console.log(error.massge)
     })
  }   
  
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      // ...
    });
  };

  return (
        <div>
       
          <div className="login-box d-flex align-items-center justify-content-center">
            <div className="login">
              <div className="login-box">
                <h2 className="text-info">Pease Register</h2>
                <form  onSubmit={handdleReg}>
                  <input onChange={emailHanddle}
                    
                    className="input-felid"
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    required
                  />
                  <br /> <br/>
                  <input
                    onChange={passwordHanddle}
                    className="input-felid"
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                  />
                  <input
                    className="mt-3 w-50 btn btn-success m-auto"
                    type="submit"
                    value="Register"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    };
    

export default Reg;