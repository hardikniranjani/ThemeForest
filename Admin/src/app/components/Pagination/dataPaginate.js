import React, { useState, lazy } from 'react';
import ReactPaginate from 'react-paginate';
import './dataPaginate.css'
const ProductTable = lazy(() => import('../products/productTable'));
const ProductCategoryTable = lazy(() => import('../products/productCategoryTable'));
const CustomerTable = lazy(() => import('../customers/customersTable'));
const FaqTable = lazy(() => import('../faq/faqTable'));

function Items({ PageType, currentItems }) {

    if (PageType === 'Product') {
        return <ProductTable currentItems={currentItems} />
    }
    else if (PageType === 'Customer') {
        return <CustomerTable currentItems={currentItems} />
    } else if (PageType === 'ProductCategory') {
        return <ProductCategoryTable currentItems={currentItems} />
    }
    else if (PageType === 'Faq'){
        return <FaqTable currentItems={currentItems} />
    }
    else {
        return ;
    }
}

function DataPaginate({ Data, PageType }) {

    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = Data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(Data.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % Data.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
    return (
        <>
            <Items PageType={PageType} currentItems={currentItems} />
            {pageCount > 1 ? <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="active"
            /> : <></>}
        </>
    );
}


export default DataPaginate;