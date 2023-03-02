import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <div class="header header-light">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <nav id="navigation" class="navigation navigation-landscape">
                                <div class="nav-header">
                                    <a class="nav-brand" href="https://themezhub.net/live-pecozo/pecozo/index.html#">
                                        <img src="https://themezhub.net/live-pecozo/pecozo/assets/img/logo.png" class="logo" alt="" />
                                    </a>
                                    <div class="nav-toggle"></div>
                                </div>
                                <div class="nav-menus-wrapper" style={{ transitionProperty: "none" }}><span class="nav-menus-wrapper-close-button">✕</span>
                                    <ul class="nav-menu">

                                        <li class="active"><a href="https://themezhub.net/live-pecozo/pecozo/index.html#">Home</a>
                                            <ul class="nav-dropdown nav-submenu" style={{ right: "auto" }}>
                                                <li><a href="https://themezhub.net/live-pecozo/pecozo/index.html" class="active">Home Style 1</a></li>
                                                <li><a href="https://themezhub.net/live-pecozo/pecozo/home-2.html">Home Style 2</a></li>
                                                <li><a href="https://themezhub.net/live-pecozo/pecozo/home-3.html">Home Style 3</a></li>
                                                <li><a href="https://themezhub.net/live-pecozo/pecozo/home-4.html">Home Style 4</a></li>
                                                <li><a href="https://themezhub.net/live-pecozo/pecozo/home-5.html">Home Style 5</a></li>
                                                <li><a href="https://themezhub.net/live-pecozo/pecozo/home-6.html">Home Style 6</a></li>
                                                <li><a href="https://themezhub.net/live-pecozo/pecozo/home-7.html">Home Style 7</a></li>
                                            </ul>
                                        </li>

                                        <li class=""><a href="https://themezhub.net/live-pecozo/pecozo/index.html#">Explore</a>
                                            <ul class="nav-dropdown nav-submenu" style={{ right: "auto", display: "none" }}>
                                                <li><a href="https://themezhub.net/live-pecozo/pecozo/index.html#">Search Product<span class="submenu-indicator"></span><span class="submenu-indicator"><span class="submenu-indicator-chevron"></span></span></a>
                                                    <ul class="nav-dropdown nav-submenu">
                                                        <li>
                                                            {/* <a href="https://themezhub.net/live-pecozo/pecozo/search-product.html"> */}
                                                            <Link to='/search-items'>Search Product By Grid</Link>
                                                            {/* </a> */}
                                                        </li>
                                                        <li>
                                                            {/* <a href="https://themezhub.net/live-pecozo/pecozo/list-search-product.html"> */}
                                                            <Link to='/search-items'>Search Product By List</Link>
                                                            {/* </a> */}
                                                        </li>
                                                        <li>
                                                            {/* <a href="https://themezhub.net/live-pecozo/pecozo/search-product-full.html"> */}
                                                            <Link to='/search-items'>Search Product 3 Column</Link>
                                                            {/* </a> */}
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li><a href="https://themezhub.net/live-pecozo/pecozo/index.html#">Product Detail<span class="submenu-indicator"></span><span class="submenu-indicator"><span class="submenu-indicator-chevron"></span></span></a>
                                                    <ul class="nav-dropdown nav-submenu">
                                                        <li><a href="https://themezhub.net/live-pecozo/pecozo/item-detail.html">Item Detail 1</a></li>
                                                        <li><a href="https://themezhub.net/live-pecozo/pecozo/item-detail-2.html">Item Detail 2</a></li>
                                                        <li><a href="https://themezhub.net/live-pecozo/pecozo/item-detail-3.html">Item Detail 3</a></li>
                                                        <li><a href="https://themezhub.net/live-pecozo/pecozo/photo-detail.html">Photo Detail</a></li>
                                                        <li><a href="https://themezhub.net/live-pecozo/pecozo/video-detail.html">Video Detail</a></li>
                                                        <li><a href="https://themezhub.net/live-pecozo/pecozo/font-detail.html">Font Detail</a></li>
                                                        <li><a href="https://themezhub.net/live-pecozo/pecozo/premium-stock-detail.html">Premium Detail</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="https://themezhub.net/live-pecozo/pecozo/index.html#">User Admin<span class="submenu-indicator"></span><span class="submenu-indicator"><span class="submenu-indicator-chevron"></span></span></a>
                                                    <ul class="nav-dropdown nav-submenu">
                                                        <li><a href="https://themezhub.net/live-pecozo/pecozo/add-to-cart.html">Add To Cart</a></li>
                                                        <li><a href="https://themezhub.net/live-pecozo/pecozo/billing.html">Billing</a></li>
                                                        <li><a href="https://themezhub.net/live-pecozo/pecozo/confirmation.html">Confirmation</a></li>
                                                        <li><a href="https://themezhub.net/live-pecozo/pecozo/dashboard.html">Dashboard</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>

                                        <li class=""><a href="https://themezhub.net/live-pecozo/pecozo/index.html#">Pages</a>
                                            <ul class="nav-dropdown nav-submenu" style={{ right: "auto", display: "none" }}>
                                                <li><a href="https://themezhub.net/live-pecozo/pecozo/about.html">About Us</a></li>
                                                <li><a href="https://themezhub.net/live-pecozo/pecozo/blog.html">Blogs Page</a></li>
                                                <li><a href="https://themezhub.net/live-pecozo/pecozo/blog-detail.html">Blog Detail</a></li>
                                                <li><a href="https://themezhub.net/live-pecozo/pecozo/pricing.html">Pricing</a></li>
                                                <li><a href="https://themezhub.net/live-pecozo/pecozo/faq.html">FAQ's</a></li>
                                                <li><a href="https://themezhub.net/live-pecozo/pecozo/signup.html">Signup</a></li>
                                                <li><a href="https://themezhub.net/live-pecozo/pecozo/login.html">LogIn</a></li>
                                            </ul>
                                        </li>

                                        <li><a href="https://themezhub.net/live-pecozo/pecozo/contact.html">Contacts</a></li>

                                    </ul>

                                    <ul class="nav-menu nav-menu-social align-to-right">

                                        <li>
                                            <a href="javascript:void(0);" onclick="openRightMenu()" class="urip_list_cart">
                                                <i class="fa fa-shopping-cart"></i><span class="urip_product_count">4</span>
                                            </a>
                                        </li>
                                        <li class="add-listing green-bg">
                                            <a href="https://themezhub.net/live-pecozo/pecozo/index.html#" data-toggle="modal" data-target="#login">
                                                <i class="fa fa-user-o" aria-hidden="true"></i>  Sign in
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header