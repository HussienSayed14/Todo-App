import React from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import './Login.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useRef, useState,useEffect } from "react";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    
  
    const handlePasswordChange = (event) => {
      setPass(event.target.value);
      
    };
    
    const handleEmailChange= (event) => {
      setEmail(event.target.value);
      
    };
    


    const LoginFun = (e)=>{
        e.preventDefault();
        const newData = {
          email:email,
          password:password,
          
        }
        axios.post('http://localhost:3000/user/signIn',newData).then((response) =>{
          const token = response.data.access_token
          localStorage.setItem("Token",token)
          const decoded = jwt_decode(token);
          localStorage.setItem("id",decoded.sub)
          localStorage.setItem("email",decoded.email)
          localStorage.setItem("username",decoded.username)
          window.location='/homePage'
 }).catch(err =>{
          window.alert(err.response.data.message ) ;
        })
    }
  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          <div className="d-flex flex-row align-items-center justify-content-center">

            <p className="lead fw-normal mb-0 me-3">Sign in with</p>

            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>

            <MDBBtn floating size='md' tag='a'  className='me-2'>
              <MDBIcon fab icon='twitter' />
            </MDBBtn>

            <MDBBtn floating size='md' tag='a'  className='me-2'>
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>

          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          <MDBInput onChange={handleEmailChange} name='email' wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
          <MDBInput onChange={handlePasswordChange} name='password' wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/>

         

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn onClick={LoginFun} className="mb-0 px-5" size='lg'>Login</MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
          </div>

        </MDBCol>

      </MDBRow>

      

    </MDBContainer>
  );
}

export default Login;