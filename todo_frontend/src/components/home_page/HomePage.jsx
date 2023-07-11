import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './HomePage.css'
import React, { useEffect, useState } from "react";
import {
    MDBBtn,
    MDBCard,
  MDBCardBody,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
  MDBSpinner
} from "mdb-react-ui-kit";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


const token = localStorage.getItem('Token')
export default function App() {
  const [active, setActive] = useState("tab1");
  const [allPosts, setAllPost] = useState([]);
  const [PostText,setPost] = useState("")
  const [loading, setLoading] = useState(false); // New state for loading
 
  const id = localStorage.getItem('id')



function setLoader(){
  setLoading(true)
}


const handelPostChange = (event) => {
  setPost(event.target.value);
  
};




const createPost = (e)=>{
    e.preventDefault();
    
    const headers = { 'Authorization': 'Bearer '+token };
    const newData = {
      postText:PostText
      
    }
    const HOST = import.meta.env.VITE_HOST
    axios.post(`${HOST}/post/createPost/${id}`,newData,{headers}).then((response) =>{
      console.log(response)
      window.location.reload()
}).catch(err =>{
      console.log(err.response.data.message ) ;
    })
}

  const isChecked =(status) =>{
    if(status === 'Done'){
        return true

    }else{ return false}
  }

  const handleClick = (value) => {
    if (value === active) {
      return;
    }

    setActive(value);
  };
  
 


 

 useEffect(()=>{
   const HOST = import.meta.env.VITE_HOST
   const headers = { 'Authorization': 'Bearer '+token };
   setLoading(true)
    axios.get(`${HOST}/post/getPosts/${id}`,{headers}).then((response) =>{
        console.log(response.data)
        setLoading(false)
        setAllPost(response.data)
    }).catch(err =>{
      setLoading(false)
      window.alert(err.response.data.message)
    })
      

 },[] )


 
 const isDone =(res) =>{
    if(res.status === 'Done'){
        return <s>{res.postText}</s>


    }else{ return res.postText}
  }

  

  
  function changeState(val)  {
      const idd = val.id
      const HOST = import.meta.env.VITE_HOST
      if(val.status === "onGoing"){
       
    
    axios.patch(`${HOST}/post/markAsDone/${idd}`).then((response) =>{
      console.log(response)
      window.location.reload()
}).catch(err =>{
      window.alert(err.response.data.message )
      
     
    })

    }else{
      const headers = { 'Authorization': 'Bearer '+token };
        axios.patch(`${HOST}/post/removeDone/${idd}`).then((response) =>{
            console.log(response)
            window.location.reload()
      }).catch(err =>{
            window.alert(err.response.data.message )
           
           
          })

    }
   

    
  };

  
 
 
  const deletePost =(postId)=>  {
    const HOST = import.meta.env.VITE_HOST
    const headers = { 'Authorization': 'Bearer '+token };
    axios.delete(`${HOST}/post/deletePost/${postId}`,{headers}).then((response) =>{
      console.log(response)
      window.location.reload()
}).catch(err =>{
      window.alert(err.response.data.message )
      
     
    })


     };

  
  const Logout = () => {
    localStorage.clear()
    window.location='/'
  };
  
  



  

  return (
    
    <section className="gradient-custom vh-100">
       <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="">TODO-List</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={Logout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol xl="10">
            <MDBCard>
              <MDBCardBody className="p-5">
                <div className="d-flex justify-content-center align-items-center mb-4">
                  <MDBInput
                    type="text"
                    name="postText"
                    id="form1"
                    label="New task..."
                    wrapperClass="flex-fill"
                    onChange={handelPostChange}
                  />
                  <MDBBtn type="submit" color="info" className="ms-2" onClick={createPost}>
                    Add Post
                  </MDBBtn>
                </div>
                
                <MDBTabs className="mb-4 pb-2">
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleClick("tab1")}
                      active={active === "tab1"}
                    >
                      All
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleClick("tab2")}
                      active={active === "tab2"}
                    >
                      Active
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleClick("tab3")}
                      active={active === "tab3"}
                    >
                      Completed
                    </MDBTabsLink>
                  </MDBTabsItem>
                </MDBTabs>
                {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "2.5rem", // Adjust the height as needed
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: '1.5rem'
            }}>
            <MDBSpinner role="status">
              <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
          </div>
        )}
                <MDBTabsContent>
                  <MDBTabsPane show={active === "tab1"}>
                    <MDBListGroup className="mb-0">
                        {
                            allPosts.map((value,key)=>{
                              const postId = value.id
                                return <MDBListGroupItem
                                className=" d-flex align-items-center border-0 mb-2 rounded justify-content-between"
                                style={{ backgroundColor: "#f4f6f7"}}
                              >
                                {" "}
                                <div className='d-flex align-items-center border-0 mb-2 rounded '>
                                <MDBCheckbox
                                    name="flexCheck"
                                    value=""
                                    id="flexCheck"
                                    className="me-3"
                                    checked={isChecked(value.status)}
                                    onClick={()=>{
                                      changeState(value)
                                    }}
                                    
                                    
                                    
                        />
                        {isDone(value)}
                        </div>
                      
                        <FontAwesomeIcon onClick={()=>{
                          deletePost(postId)
                        }} className='trashIcon' icon={faTrash} style={{color: "#d20f0f",}} />

                                </MDBListGroupItem>
                                

                            })
                        }


                     
                    </MDBListGroup>
                  </MDBTabsPane>
                  <MDBTabsPane show={active === "tab2"}>
                    <MDBListGroup className="mb-0">
                    {
                            allPosts.map((value,key)=>{
                                if(value.status === "Done") {return null} 
                                else{
                                return <MDBListGroupItem
                                className=" d-flex align-items-center border-0 mb-2 rounded"
                                style={{ backgroundColor: "#f4f6f7" }}
                              >
                                {" "}
                                <MDBCheckbox
                                    name="flexCheck"
                                    value=""
                                    id="flexCheck"
                                    className="me-3"
                                    checked={isChecked(value.status)}
                                    onClick={()=>{
                                        changeState(value)
                                        }}
                                    
                                    
                                    
                        />
                        {value.postText}


                                </MDBListGroupItem>
                                }

                            })
                        }
                      
                     
                    </MDBListGroup>
                  </MDBTabsPane>
                  <MDBTabsPane show={active === "tab3"}>
                    <MDBListGroup className="mb-0">

                    {
                            allPosts.map((value,key)=>{
                                if(value.status !== "Done") {return null} 
                                else{
                                return <MDBListGroupItem
                                className=" d-flex align-items-center border-0 mb-2 rounded"
                                style={{ backgroundColor: "#f4f6f7" }}
                              >
                                {" "}
                                <MDBCheckbox
                                    name="flexCheck"
                                    value=""
                                    id="flexCheck"
                                    className="me-3"
                                    checked={isChecked(value.status)}
                                    onClick={()=>{
                                        changeState(value)
                                        }}
                                    
                                    
                        />
                        <s>{value.postText}</s>


                                </MDBListGroupItem>
                                }

                            })
                        }
                      
                     
                     
                    </MDBListGroup>
                  </MDBTabsPane>
                </MDBTabsContent>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}