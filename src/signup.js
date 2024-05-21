import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import './signup.css'
import { Link } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Codeforce,setCodeforce]=useState('');
  const [username,setUsername]=useState('');
  const [errormsg, setErrormsg] = useState('');

  const token=Cookies.get("token")
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
        'token': token, 
      }
    };
  
    fetch("/checklogin", requestOptions) // Pass the requestOptions object as the second argument
      .then((res) => res.json())
      .then((jsonData) => {
        console.log(jsonData); 
        console.log(jsonData.islogin)
        if (jsonData.islogin=="true") {
          navigate('/home')
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // setLoading(false);
      });
  }, []);

  const handleSignup = async (e) => {
    setErrormsg("");
    e.preventDefault();

    try {
      const response = await fetch('/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: email, Password: password,User_name:username,Codeforce_handle:Codeforce}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const userData = await response.json();
      console.log(userData);
      Cookies.set('token',userData.token,{expires:1})
      Cookies.set('refreshtoken',userData.refreshtoken,{expires:1})
      navigate('/home');
      
    } catch (error) {
      console.error(error.message);
      setErrormsg(error.message);
    
    }
  };
  return (
    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">Logo</span>
              </div>
              <form onSubmit={handleSignup}>
              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Create a new account</h5>
               <MDBInput wrapperClass='mb-4' label='Codeforce handle' id='formControlLg' type='text' size="lg"  value={Codeforce} onChange={(e) => setCodeforce(e.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='User name' id='formControlLg' type='text' size="lg"  value={username} onChange={(e) => setUsername(e.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"  value={password} onChange={(e) => setPassword(e.target.value)}/>
      
              <MDBBtn className="mb-4 px-5" color='dark' size='lg' type='submit' >sign up</MDBBtn>
              <p className="msg">{errormsg}</p>
              </form>
              <p className="mb-5 pb-lg-2" style={{color: 'black'}}>I have an account <Link to={'/'}>Login</Link></p>

              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default SignUp;