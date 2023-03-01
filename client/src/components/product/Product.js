import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Product.css';
import { addCartItems } from "../../actions/cartActions";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const Product = ({ product }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    return (
        <div className='product-info'>
            <div className='container'>
                <div className='product-main-img-container'>
                    <img className='product-main-img'
                        src={product.images[0].image} alt='gta-v' />
                </div>
                <div className='product-name ' onClick={() => navigate(`/product/${product._id}`)}>
                    {product.name}
                </div>
                <div className="ratings mt-auto">
                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                    </div>
                    <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                </div>
                <div className='product-pricing'>
                    <div>${product.price}</div>
                </div>
                <button className='product-btn-addToCart'
                    type="button" id="cart_btn" onClick={() => {
                        dispatch(addCartItems(product._id, quantity))
                        toast('Cart item added', {
                            type: 'success',
                            position: toast.POSITION.BOTTOM_CENTER,
                        })
                    }}
                    disabled={product.stock === 0 ? true : false}
                >Add To Cart</button>
                <button className='product-btn-veiwDetails' onClick={() => navigate(`/product/${product._id}`)}>View Details</button>
            </div>
        </div>
    )
}

export default Product;