import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { MDBNavbar, MDBContainer, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavbarLink, MDBIcon } from 'mdb-react-ui-kit';
import Cookies from 'js-cookie';

function Navbar() {
  const [openNavSecond, setOpenNavSecond] = useState(false);

  const handellogout=()=>{
    
        Cookies.remove('token')

  }

  return (
    <MDBNavbar expand='lg' light bgColor='light' fixed='top'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>Guest</MDBNavbarBrand>
        <MDBNavbarToggler
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNavSecond(!openNavSecond)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar isOpen={openNavSecond} onClick={() => setOpenNavSecond(!openNavSecond)}>
          <MDBNavbarNav>
            <Link to='/home' className='nav-link'>
              Home
            </Link>
            <Link to='/sub' className='nav-link'> 
              My Subscribed Blogs
            </Link>
            <Link to='/' className='nav-link' onClick={handellogout}> 
              Logout
            </Link>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navbar;
