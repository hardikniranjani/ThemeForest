import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee,faHeart,faShoppingCart } from '@fortawesome/free-solid-svg-icons'

function ItemSearchCard() {
    return (
        <>
            <div className="_list_iju76">
                <img
                    className="trending_item"
                    alt="Trending"
                    src="./Pecozo - Search Products_files/trending-new.svg"
                />
                <div className="_iju76_01">
                    <div className="_iju76_thumb">
                        <a href="https://themezhub.net/live-pecozo/pecozo/item-detail.html">
                            <img
                                src="./Pecozo - Search Products_files/preview-1.jpg"
                                className="img-fluid"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="_iju76_caption">
                        <h4 className="_kj76">
                            <a href="https://themezhub.net/live-pecozo/pecozo/item-detail.html">
                                Reveal - Online Business Listing &amp; Directory WP Theme
                            </a>
                        </h4>
                        <div className="item_info_bmc">
                            <i> by </i>
                            <a
                                className="author_bmv"
                                href="https://themezhub.net/live-pecozo/pecozo/list-search-product.html#"
                            >
                                EcoThemes
                            </a>
                            <span> in </span>
                            <a
                                className="cate_mnb"
                                href="https://themezhub.net/live-pecozo/pecozo/list-search-product.html#"
                            >
                                Agency
                            </a>
                        </div>
                        <div className="uhtro">
                            <ul>
                                <li>Beautiful Home Page</li>
                                <li>Advance Search</li>
                                <li>10+ Home Pages</li>
                            </ul>
                        </div>
                        <div className="item_list_links">
                            <a
                                href="https://themezhub.net/live-pecozo/pecozo/item-detail.html"
                                className="link link_prview"
                            >
                                Preview
                            </a>
                            <a
                                href="https://themezhub.net/live-pecozo/pecozo/item-detail.html"
                                className="link link_cart"
                            >
                                {/* <i className="fa fa-shopping-cart" /> */}
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </a>
                            <a
                                href="https://themezhub.net/live-pecozo/pecozo/item-detail.html"
                                className="link link_save"
                            >
                                {/* <i className="fa fa-heart" /> */}
                                <FontAwesomeIcon icon={faHeart} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="_iju76_02">
                    <div className="_lo9orw">
                        <sup>$</sup>39
                    </div>
                    <div className="_8xc_pi">712 Sales</div>
                    <div className="_j56ty1q">
                        <div className="_iju7_reviw">
                            <i className="fa fa-star filled" />
                            <i className="fa fa-star filled" />
                            <i className="fa fa-star filled" />
                            <i className="fa fa-star filled" />
                            <i className="fa fa-star" />
                            <span>(102)</span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ItemSearchCard