import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Search from './Search';
import { Dropdown, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import '../styles/Product.css';
import { BsCart } from 'react-icons/bs'
import '../styles/Layout.css';

export default function Header() {
    const { isAuthenticated, user } = useSelector(state => state.authState);
    const { items: cartItems } = useSelector(state => state.cartState)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout);
    }
    return (

        <Navbar className='nav-bg  nav-top' expand="lg">
            <Container>
                <Link to={'/'}>
                    <img width="150px" src="/img/curiosity-logo.jpg" alt='logoError' />
                </Link>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto ">
                        <div>
                            <Search />
                        </div>
                        {isAuthenticated ? (
                            <div className='nav-dropdown-container'>
                                <div className='nav-dropdown-img-container'>
                                    <figure className=' avatar-nav nav-avatar'>
                                        <Image width={50} src={user.avatar ?? './img/curiosity-logo.jpg'} alt={user.name} className='nav-avatar-img' />
                                    </figure>
                                </div>
                                <div className='nav-dropdown-links-container'>
                                    <NavDropdown id="basic-nav-dropdown" className='nav-dropdown-links'>
                                        {user.role === 'admin' && <NavDropdown.Item onClick={() => { navigate('admin/dashboard') }} className='text-warning'>Dashboard</NavDropdown.Item>}
                                        <NavDropdown.Item onClick={() => { navigate('/myprofile') }} className=''>My Profile</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { navigate('/orders') }} className=''>Orders</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={logoutHandler} className='text-danger'>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="btn" id="login_btn">Login</Link>
                        )}
                        <Link to={'/cart'}><BsCart className='nav-cart' /></Link>
                        <div className='nav-cartCount '>{cartItems.length}</div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >

    )
}