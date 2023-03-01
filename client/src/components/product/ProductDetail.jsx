import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createReview, getProduct } from "../../actions/productActions";
import Loader from "../layouts/Loader";
import { Carousel, Container } from "react-bootstrap";
import MetaData from "../layouts/MetaData";
import { addCartItems } from "../../actions/cartActions";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify"
import { clearError, clearProduct, clearReviewSubmitted } from "../../slices/productSlice";
import ProductReview from "./ProductReview";

export default function ProductDetail() {
    const { loading, product = {}, isReviewSubmitted, error } = useSelector((state) => state.productState);
    const { user } = useSelector(state => state.authState)
    const dispatch = useDispatch();
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1);
    const [show, setShow] = useState(false);

    console.log(setQuantity);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("")

    const reviewHandler = () => {
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('comment', comment);
        formData.append('productId', id);
        dispatch(createReview(formData))
    }

    useEffect(() => {
        if (isReviewSubmitted) {
            handleClose()
            toast('Review Submitted Successfully', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearReviewSubmitted())
            })
        }
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            })
            return
        }
        if (!product._id || isReviewSubmitted) {
            dispatch(getProduct(id))
        }
        return () => {
            dispatch(clearProduct())
        }
    }, [dispatch, id, isReviewSubmitted, error])
    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="product-detail-container">

                        <div className="product-detail-img-container" id="product_image">
                            <Container>
                                <Carousel pause="hover">
                                    {product.images && product.images.map(image =>

                                        <Carousel.Item key={image._id}>
                                            <img className="product-detail-img" src={image.image} alt={product.name} height="500" width="500"></img>
                                        </Carousel.Item>
                                    )}
                                </Carousel>
                            </Container>
                        </div>
                        <div className="product-detail-info-container">
                            <Container>
                                <div className="product-name-container">
                                    <h4>{product.name}</h4>
                                    <p className="product-detail-id" id="product_id">Product #{product._id}</p>
                                </div>
                                <div className="product-ratings-container">
                                    <div className="rating-outer">
                                        <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                                    </div>
                                    <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                                </div>

                                <p id="product_price">${product.price}</p>
                                <button type="button" id="cart_btn" onClick={() => {
                                    dispatch(addCartItems(product._id, quantity))
                                    toast('Cart item added', {
                                        type: 'success',
                                        position: toast.POSITION.BOTTOM_CENTER,
                                    })
                                }}
                                    disabled={product.stock === 0 ? true : false}
                                    className="product-detail-addToCart-btn"
                                >
                                    Add to Cart
                                </button>

                                <hr />

                                <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'}>{product.stock > 0 ? 'In Stock' : 'Out Of Stock'}</span></p>

                                <hr />

                                <h4 className="mt-2">Description:</h4>
                                <p className="product-detail-description">{product.description}</p>
                                <hr />
                                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                                {user ?
                                    <button onClick={handleShow} id="review_btn" type="button" className="product-detail-submitReview-btn" data-toggle="modal" data-target="#ratingModal">
                                        Submit Your Review
                                    </button> :
                                    <div className="alert alert-danger mt-"> Login to post review</div>}

                                {/* Reviews */}
                                <div className="product-detail-reviews">
                                    <div className="rating w-50">
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Submit Review</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>

                                                <ul className="stars" >
                                                    {
                                                        [1, 2, 3, 4, 5].map(star => (
                                                            <li value={star} onClick={() => setRating(star)}
                                                                className={`star ${star <= rating ? 'orange' : ''}`}
                                                                onMouseOver={(e) => e.target.classList.add('yellow')}
                                                                onMouseOut={(e) => e.target.classList.remove('yellow')}><i className="fa fa-star"></i></li>
                                                        ))
                                                    }

                                                </ul>

                                                <textarea onChange={(e) => setComment(e.target.value)} name="review" id="review" className="form-control mt-3">

                                                </textarea>
                                                <button disabled={loading} onClick={reviewHandler} aria-label="Close" className="btn btn-success my-3 float-right review-btn px-4 text-white">Submit</button>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                </div>
                            </Container>
                        </div>

                    </div>
                    <div className="product-reviews">
                        {product.reviews && product.reviews.length > 0 ?
                            <ProductReview reviews={product.reviews} /> : null
                        }
                    </div>
                </Fragment>}
        </Fragment >
    )
}