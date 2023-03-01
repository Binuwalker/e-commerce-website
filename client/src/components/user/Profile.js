import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
    const {user} = useSelector(state => state.authState);



    return (


        <Row className="justify-content-around mt-5 user-info mb-5">
            <Col xs={12} md={3}>
                <figure className="avatar avatar-profile">
                    <img className="rounded-circle img-fluid" src={user.avatar ?? './images/default_avatar.jpg'} alt=""></img>
                </figure>
                <Link to="/myprofile/update" id="edit_profile" className="btn btn-primary my-5" style={{ display: "block", width: "100%" }}>
                    Edit Profile
                </Link>
            </Col>
            <Col xs={12} md={3}>
                <h4>Full Name</h4>
                <p>{user.name}</p>
                <h4>E-mail</h4>
                <p>{user.email}</p>
                <h4>Joined</h4>
                <p>{String(user.createdAt).substring(0,10)}</p>
                <Link to="/orders" className="btn btn-danger mt-5" style={{ display: "block", width: "100%" }}>
                    My Orders
                </Link>
                <Link to='/myprofile/update/password' className="btn btn-primary mt-3" style={{ display: "block", width: "100%" }}>
                    Change Password
                </Link>

            </Col>
        </Row>
    )
}