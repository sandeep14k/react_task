import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login =()=>{
    const [username,setUsername]=useState("");
    const navigate = useNavigate();
    const handlesubmit=()=>{
        navigate('/home', { state: {username} });
    };
    return(
        <div className="div-form">
            <h2>Login Form</h2>
        <form  className="login" onSubmit={handlesubmit}>
            <label htmlFor="">Enter yourn name</label>
            <input type="text" className="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
            <label htmlFor="">Enter password</label>
            <input type="password" className="password" />
            <input type="submit" className="submit" />
        </form>
        </div>
    );
}
export default Login;