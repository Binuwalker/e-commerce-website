import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import '../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Image } from 'react-bootstrap';
import { logout } from '../../actions/userActions';

const TopNav = () => {

  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logout);
  }

  return (
    <Navbar className='nav-bg fixed-top' expand="lg">
      <Container>
        <Link to={'/'}>
          <img width="150px" src="/img/curiosity-logo.jpg" alt='logoError' />
        </Link>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto nav-links">
            <div className="col-12 col-md-6 mt-2 mt-md-0">
              <Search />
            </div>
            {isAuthenticated ? (
              <Dropdown className='d-inline'>
                <Dropdown.Toggle variant='default pe-5' id='dropdown-basic'>
                  <figure className='avatar avatar-nav'>
                    <Image width={50} src={user.avatar ?? './img/curiosity-logo.jpg'} />
                  </figure>
                  <span>{user.name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => { navigate('/myprofile') }} className='text-danger'>Profile</Dropdown.Item>
                  <Dropdown.Item onClick={logoutHandler} className='text-danger'>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link to="/login" className="btn" id="login_btn">Login</Link>
            )}


            <Link to={'/cart'}><span id="cart" className="ms-3">Cart</span></Link>
            <span className="ml-1" id="cart_count">{cartItems.length}</span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  )
}

export default TopNav;