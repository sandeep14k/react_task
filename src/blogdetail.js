// import { useParams } from "react-router-dom";
// import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import Navbar from "./navbar";
// const Blogdetail = () => {
//     const { id } = useParams();
//     const [user, setUser] = useState(null);
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     useEffect(() => {
//       const targetBlogId = parseInt(id, 10);
    
//       fetch("/home")
//         .then((res) => res.json())
//         .then((jsonData) => {
//           setData(jsonData);
//          console.log(jsonData)
//           // Use filter instead of find to get an array of matching items
//           const filteredUsers = jsonData.filter(user => user.blogEntry.id === targetBlogId);
//           setUser(filteredUsers || []);
    
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//           setLoading(false);
//         });
    
//     }, [id]);
    
    
//     return (
//       <>
//      <Navbar/>
      // <div className="blog_detail">
      //   {user && Array.isArray(user) && user.length > 0 ? (
      //     <div className="detail" key={user[0]._id}>
      //       <h2>Author: {user[0].blogEntry.authorhandle || 'Unknown Author'}</h2>
      //       <p>Blog title: {user[0].blogEntry.title}</p>
    
      //       {user.map((entry, index) => (
      //         entry.comment ? (
      //           <div key={index} className="comment">
      //             <p>Comment ID: {entry.comment.id}</p>
      //             <p>Commentator: {entry.comment.commentatorHandle}</p>
      //             <p>Comment Text: {entry.comment.text}</p>
      //           </div>
      //         ) : null
      //       ))}
      //     </div>
      //   ) : (
      //     <p>User or blog entry not found...</p>
      //   )}
      // </div></>
//     );
    
    
    
// }
// export default Blogdetail;
import React from "react";
import { useParams } from "react-router-dom";
import  { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBSwitch,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function Blogdetail() {
  const { id } = useParams();
      const [user, setUser] = useState(null);
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      useEffect(() => {
        const targetBlogId = parseInt(id, 10);
      
        fetch("/comment")
          .then((res) => res.json())
          .then((jsonData) => {
            setData(jsonData);
           console.log(jsonData)
            // Use filter instead of find to get an array of matching items
            const filteredUsers = jsonData.filter(user => user.blogEntry.id === targetBlogId);
            setUser(filteredUsers || []);
      
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
          });
      
      }, [id]);

  return (
    <>
    <Navbar></Navbar>
    <span className="mar"></span>
    <span className="mar"></span>
    <section style={{ backgroundColor: "#f7f6f6" }}>
    <MDBContainer className="py-5 text-dark" style={{ maxWidth: "1000px" }}>
  <MDBRow className="justify-content-center">
    {/* Card for displaying the user's blog entry details */}
    {user && Array.isArray(user) && user.length > 0 && (
      <MDBCol md="12" lg="10" xl="8" className="mb-3">
        <MDBCard>
          <MDBCardBody>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <MDBTypography tag="h4" className="text-dark mb-0">
                Author: {user[0].blogEntry.authorhandle || 'Unknown Author'}
              </MDBTypography>
            </div>
            <p>Blog title: {user[0].blogEntry.title.replace(/<\/?p>/g, '')}</p>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    )}
   <div className="d-flex justify-content-between align-items-center mb-4">
              <MDBTypography tag="h4" className="text-dark mb-0">
                Comments 
              </MDBTypography>
            </div>
    {/* Cards for displaying comments */}
    {user && Array.isArray(user) && user.length > 0 && (
      user.map((entry, index) => (
        <MDBCol md="12" lg="10" xl="8" key={index} className="mb-3">
          <MDBCard>
            <MDBCardBody>
              <div className="d-flex flex-start">
                <MDBCardImage
                  className="rounded-circle shadow-1-strong me-3"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                  alt="avatar"
                  width="40"
                  height="40"
                />

                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <MDBTypography tag="h6" className="text-primary fw-bold mb-0">
                      {entry.comment && entry.comment.commentatorHandle ? entry.comment.commentatorHandle : 'Unknown Author'}
                      <span className="text-dark ms-2"><br/>
                      {entry.comment && entry.comment.text ? entry.comment.text.replace(/<\/?[^>]+(>|$)/g, "") : 'No comment available'}
                      </span>
                    </MDBTypography>
                    <p className="mb-0">3 days ago</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-row">
                      <MDBIcon
                        far
                        icon="check-circle text-primary"
                        style={{ color: "#aaa" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      ))
    )}

    {/* Display message if user or blog entry not found */}
    {(!user || !Array.isArray(user) || user.length === 0) && (
      <MDBCol md="12" lg="10" xl="8">
        <MDBCard>
          <MDBCardBody>
            <p>User or blog entry not found...</p>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    )}
  </MDBRow>
</MDBContainer>

    </section>
    </>
  );
}