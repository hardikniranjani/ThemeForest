import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh,faList } from '@fortawesome/free-solid-svg-icons'

function ItemCount() {
    return (
        <div className="row">
            <div className="col-lg-12 col-md-12">   
                <div className="_filt_tag786">
                    <div className="_tag782">
                        <div className="_tag780">32 Items found</div>
                    </div>
                    <div className="_tag785">
                        <div className="__g72juy">
                            <a
                                href="https://themezhub.net/live-pecozo/pecozo/search-product.html"
                                className="_ujh_tyr"
                            >
                                {/* <i className="ti-layout-grid2" /> */}
                                <FontAwesomeIcon icon={faTh} />
                            </a>
                            <a
                                href="https://themezhub.net/live-pecozo/pecozo/list-search-product.html"
                                className="_ujh_tyr active"
                            >
                                {/* <i className="ti-view-list" /> */}
                                <FontAwesomeIcon icon={faList} />
                            </a>
                        </div>
                        <div className="_g78juy">
                            <select className="form-control">
                                <option>Best Match</option>
                                <option>Best Sellers</option>
                                <option>Recent Items</option>
                                <option>Featured Items</option>
                                <option>Trending Items</option>
                                <option>Best Rated</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ItemCount