import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import {  useState} from "react";
import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
  MDBSpinner
}
from 'mdb-react-ui-kit';


function App() {
  
const [email, setEmail] = useState("");
const [password, setPass] = useState("");
const [loading, setLoading] = useState(false); // New state for loading
const [user_name, setUserN] = useState("");




 const handleUsernameChange = (event) => {
  setUserN(event.target.value);
 
};

const handlePasswordChange = (event) => {
  setPass(event.target.value);
  
};

const handleEmailChange= (event) => {
  setEmail(event.target.value);
  
};

 const RegisterFun =async (e)=>{
  e.preventDefault();
  setLoading(true)
  const HOST = import.meta.env.VITE_HOST
  const newData = {
    email:email,
    password:password,
    userName:user_name
  }
  console.log(newData)
   axios.post(`${HOST}/user/signup`,newData).then(() =>{
    window.alert("User Added")
    window.location='/'
    
}).catch(err =>{
    window.alert(err.response.data.message );
    setLoading(false)
  })
}
  return (
    <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput onChange={handleUsernameChange} name='user_name' label='Your Name' id='form1' type='text' className='w-100'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput onChange={handleEmailChange} name='email' label='Your Email' id='form2' type='email'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput onChange={handlePasswordChange} name='password' label='Password' id='form3' type='password'/>
              </div>

              

              <MDBBtn className='mb-4' size='lg' onClick={RegisterFun}>Register</MDBBtn>
              <a href='/'><u>Already have an account?</u></a>
              {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px", // Adjust the height as needed
              fontSize: "20px",
              fontWeight: "bold",
            }}>
            <MDBSpinner role="status">
              <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
          </div>
        )}
              

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default App;