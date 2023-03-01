import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProducts } from "../../actions/productActions";
import "../styles/Product.css";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Product from "../product/Product";
import { toast } from 'react-toastify';
import Pagination from "react-js-pagination";

export default function Home() {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState)
    const [currentPage, setCurrentPage] = useState(1);

    const setCurrentPageNo = (pageNo) => {

        setCurrentPage(pageNo)
    }


    useEffect(() => {
        if (error) {
            return toast.success(error, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        dispatch(getProducts(null, null, null, null, currentPage))
    }, [error, dispatch, currentPage])
    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={'Buy Best Groceries'} />
                    <div className='home'>
                        <div className='container'>
                            <div className='products'>
                                {products && products.map(product => (
                                    <Product key={product._id} product={product} />
                                ))}
                            </div>
                            {productsCount > 0 && productsCount > resPerPage ?
                                <div className='d-flex justify-content-center mt-10'>
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
                </Fragment>
            }
        </Fragment>
    )
}