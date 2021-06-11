import axios from "axios";
import { useState } from "react";
import { Redirect, Link } from 'react-router-dom';

const SignIn = () => {
const [email, setEmail] = useState("");
const[password, setPassword] = useState("");
const[token, setToken] = useState(null);
const[redirect, setRedirect] = useState(localStorage.getItem('user') ? true : false,);

const handleEmail = (e) => {
     const email = e.target.value;
     setEmail(email);
}

const handlePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
}

const handleSubmit = () =>{
    if(!(email=== "" || password === ""))
   
    {
            axios.post("http://localhost:5000/api/signIn/",{
                email:email,
                password:password
            })
            .then((res)=>{
                setToken({token:res.data.token})

                const result = {
                    token:res.data.token,
                    time:new Date().getTime()
                }

                localStorage.setItem('user', JSON.stringify(result));
               setRedirect(true);
                 window.location.reload();
            }).catch(err=>{
                     console.log(err);
            });

           
          
    }
    else{
        alert("Please Enter Valid Details");
    }
 
}

    return( 
        <div>
            {redirect?(
                <div>
                    <Redirect to="/"/>
                </div>
            ):(
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                    <h4 className="text-center">Sign In </h4>
                           <form className="text-center border py-2">
                               <input type="email" placeholder="email" className="mb-2" name="email" onChange={handleEmail}required /><br/>
                               <input  type="password" placeholder="password" name="password"  onChange={handlePassword} required/><br/>
                               <button className="btn-info border my-2 p-1" onClick={handleSubmit} type="button">Submit</button>
                               <Link to="#" className="px-2" type="button">Forgot Password?</Link>
                           </form>
                    </div>
                </div>
                
            </div>
            )}
             
        </div>
             
    )
}

export default SignIn;
