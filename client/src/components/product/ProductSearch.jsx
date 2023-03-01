import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProducts } from '../../actions/productsAction';
import "../styles/Home.css";
import Loader from '../layouts/Loader';
import MetaData from '../layouts/MetaData';
import Product from './Product';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router-dom';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import 'rc-slider/assets/index.css';

const ProductSearch = () => {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState)
    const [currentPage, setCurrentPage] = useState(1)
    const { keyword } = useParams()
    const categories = [
        'Action',
        'Arcade',
        'Editors-Choice',
        "Fantasy",
        'Fighting',
        'Mystery',
        'Puzzle',
        'Racing',
        'Role-Play',
        'Sci-Fi',
        'Shooting',
        'Simulation',
        'Stratergy',
        'Survival',
        'Treasure',
        'War'
    ]
    const [price, setPrice] = useState([1, 100])
    const [priceChanged, setPriceChanged] = useState(price)
    const [category, setCategory] = useState(null);
    const [rating, setRating] = useState(0);

    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo)

    }

    useEffect(() => {
        if (error) {
            return toast.error(error, {
                position: toast.POSITION.TOP_CENTER
            })
        }
        dispatch(getProducts(keyword, priceChanged, category, rating, currentPage))
    }, [error, dispatch, keyword, priceChanged, category, rating, currentPage])

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <MetaData title={'Play Games'} />
                    <div className='home'>
                        <div className='container'>
                            <div className='products'>
                                <div className='products-filter'>
                                    {/* Price Filter */}
                                    <div className='px-5 filter' onMouseUp={() => setPriceChanged(price)}>
                                        <Slider
                                            range={true}
                                            marks={
                                                {
                                                    1: "$1",
                                                    100: "$100"
                                                }
                                            }
                                            min={1}
                                            max={100}
                                            defaultValue={price}
                                            onChange={(price) => {
                                                setPrice(price)
                                            }}
                                            handleRender={
                                                renderProps => {
                                                    return (
                                                        <Tooltip overlay={`$${renderProps.props['aria-valuenow']}`} >
                                                            <div {...renderProps.props}></div>
                                                        </Tooltip>
                                                    )
                                                }
                                            }
                                        />
                                    </div>
                                    <hr style={{ position: 'relative', top: 40 }} />
                                    {/* Category Filter */}
                                    <div className='mt-5'>
                                        <h3 className='mb-3'>Categories</h3>
                                        <ul className='pl-0'>
                                            {categories.map(category =>
                                                <li
                                                    style={{
                                                        cursor: 'pointer',
                                                        listStyleType: 'none'
                                                    }}
                                                    key={category}
                                                    onClick={() => {
                                                        setCategory(category)
                                                    }}
                                                >
                                                    {category}
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    <hr style={{ position: 'relative', top: 0 }} />
                                    {/* Ratings Filter */}
                                    <div className="mt-5">
                                    <h4 className="mb-3">Ratings</h4>
                                    <ul className="pl-0">
                                        {[5, 4, 3, 2, 1].map(star =>
                                             <li
                                             style={{
                                                 cursor:"pointer",
                                                 listStyleType: "none"
                                             }}
                                             key={star}
                                             onClick={()=>{
                                                setRating(star)
                                             }}
                                             >
                                               <div className="rating-outer">
                                                    <div 
                                                    className="rating-inner"
                                                    style={{
                                                        width: `${star * 20}%`
                                                    }}
                                                    > 

                                                    </div>
                                               </div>
                                             </li>
                                            
                                            )}
                                           
                                       </ul>
                                </div>
                                </div>

                                <div className='products-container'>

                                    {products && products.map(product => (
                                        <Product key={product._id} product={product} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        {productsCount > 0 && productsCount > resPerPage ?
                            <div className='d-flex justify-content-center mt-5'>
                                <Pagination
                                    activePage={currentPage}
                                    onChange={setCurrentPageNo}
                                    totalItemsCount={productsCount}
                                    itemsCountPerPage={resPerPage}
                                    nextPageText={'Next'}
                                    firstPageText={'First'}
                                    lastPageText={'Last'}
                                    itemClass={'page-item'}
                                    linkClass={'page-link'}
                                />
                            </div> : null}

                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductSearch;