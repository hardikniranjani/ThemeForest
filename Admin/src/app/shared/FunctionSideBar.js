
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import UserApi from '../Services/user.services';

function Sidebar() {
    const [admin, setAdmin] = useState({
        name:'', 
        email:''
    });

    function toggleMenuState(menuState) {
        if (state[menuState]) {
            setState({ [menuState]: false });
        } else if (Object.keys(state).length === 0) {
            setState({ [menuState]: true });
        } else {
            Object.keys(state).forEach(i => {
                setState({ [i]: false });
            });
            setState({ [menuState]: true });
        }
    }

    function onRouteChanged() {
        document.querySelector('#sidebar').classList.remove('active');
        Object.keys(state).forEach(i => {
            setState({ [i]: false });
        });

        const dropdownPaths = [
            { path: '/apps', state: 'appsMenuOpen' },
            { path: '/users', state: 'customerPagesMenuOpen' },
            { path: '/authors', state: 'authorPagesMenuOpen' },
            { path: '/products', state: 'productPagesMenuOpen' },
            { path: '/faq', state: 'faqPagesMenuOpen' },
        ];

        dropdownPaths.forEach((obj => {
            if (isPathActive(obj.path)) {
                setState({ [obj.state]: true })
            }
        }));

    }
    function isPathActive(path) {
        return props.location.pathname.startsWith(path);
    }

    useEffect(() => {
        if (props.location !== prevProps.location) {
            onRouteChanged();
        }
        const Token = sessionStorage.getItem('token');
        const token = {
            data: Token
        }
        console.log("token", token)
        UserApi.decodeToken(token).then((res) => {
            console.log("ResToken", res);
            setAdmin({ 
                name: res.data.user.name,
                email: res.data.user.email
            })
            console.log("AdminName", state.AdminName)
        }).catch((err) => {
            console.log("Error", err)
        })

        onRouteChanged();
        // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
        const body = document.querySelector('body');
        document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

            el.addEventListener('mouseover', function () {
                if (body.classList.contains('sidebar-icon-only')) {
                    el.classList.add('hover-open');
                }
            });
            el.addEventListener('mouseout', function () {
                if (body.classList.contains('sidebar-icon-only')) {
                    el.classList.remove('hover-open');
                }
            });
        });
    }, [])






    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                {/* Profile Photo */}
                <li className="nav-item nav-profile">
                    <Link to="/account" className="nav-link">
                        <div className="nav-profile-image">
                            <img src={require("../../assets/images/faces/face1.jpg")} alt="profile" />
                            <span className="login-status online"></span> {/* change to offline or busy as needed */}
                        </div>
                        {(admin && state.AdminEmail) && <div className="nav-profile-text">
                            <span className="font-weight-bold mb-2"><Trans>{admin.name}</Trans></span>
                            <span className="text-secondary text-small"><Trans>{admin.email}</Trans></span>
                        </div>}
                        <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                    </Link>
                </li>

                {/* SideBar start */}
                {/* Dashboard */}
                <li className={isPathActive('/dashboard') ? 'nav-item active' : 'nav-item'}>
                    <Link className="nav-link" to="/dashboard">
                        <span className="menu-title"><Trans>Dashboard</Trans></span>
                        <i className="mdi mdi-home menu-icon"></i>
                    </Link>
                </li>

                {/* User */}
                <li className={isPathActive('/users') ? 'nav-item active' : 'nav-item'}>
                    <div className={state.customerPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('customerPagesMenuOpen')} data-toggle="collapse">
                        <span className="menu-title"><Trans>Users</Trans></span>
                        <i className="menu-arrow"></i>
                        <i className="mdi mdi-account-multiple-outline menu-icon"></i>
                    </div>
                    <Collapse in={state.customerPagesMenuOpen}>
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <Link className={isPathActive('/users/list') ? 'nav-link active' : 'nav-link'} to="/users/list"><Trans>All users</Trans></Link></li>
                            <li className="nav-item"> <Link className={isPathActive('/users/adduser') ? 'nav-link active' : 'nav-link'} to="/users/adduser"><Trans>Add user</Trans></Link></li>
                            {/* <li className="nav-item"> <Link className={isPathActive('/users/typography') ? 'nav-link active' : 'nav-link'} to="/basic-ui/typography"><Trans>Typography</Trans></Link></li> */}
                        </ul>
                    </Collapse>
                </li>
                {/* End User */}

                {/* Author */}
                <li className={isPathActive('/author') ? 'nav-item active' : 'nav-item'}>
                    <div className={state.authorPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('authorPagesMenuOpen')} data-toggle="collapse">
                        <span className="menu-title"><Trans>Author</Trans></span>
                        <i className="menu-arrow"></i>
                        <i className="mdi mdi-account-multiple-outline menu-icon"></i>
                    </div>
                    <Collapse in={state.authorPagesMenuOpen}>
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <Link className={isPathActive('/Author/list') ? 'nav-link active' : 'nav-link'} to="/Author/list"><Trans>All authors</Trans></Link></li>
                            <li className="nav-item"> <Link className={isPathActive('/Author/adduser') ? 'nav-link active' : 'nav-link'} to="/Author/adduser"><Trans>Add author</Trans></Link></li>
                            {/* <li className="nav-item"> <Link className={isPathActive('/Author/typography') ? 'nav-link active' : 'nav-link'} to="/basic-ui/typography"><Trans>Typography</Trans></Link></li> */}
                        </ul>
                    </Collapse>
                </li>
                {/* End Author */}

                {/* Products */}
                {/* <li className={isPathActive('/products') ? 'nav-item active' : 'nav-item'}>
            <div className={state.productPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('productPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Products</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-cart-outline menu-icon"></i>

            </div>
            <Collapse in={state.productPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/products/list') ? 'nav-link active' : 'nav-link'} to="/products/list"><Trans>Products List</Trans></Link></li>
                <li className="nav-item"> <Link className={isPathActive('/products/addproduct') ? 'nav-link active' : 'nav-link'} to="/products/addproduct"><Trans>Add Product</Trans></Link></li>
                <li className="nav-item"> <Link className={isPathActive('/products/category') ? 'nav-link active' : 'nav-link'} to="/products/category"><Trans>Category List</Trans></Link></li>
                <li className="nav-item"> <Link className={isPathActive('/products/addcategory') ? 'nav-link active' : 'nav-link'} to="/products/addcategory"><Trans>Add Category</Trans></Link></li>
              </ul>
            </Collapse>
          </li> */}
                {/* End Products */}

                {/* Faq */}
                {/* <li className={isPathActive('/faq') ? 'nav-item active' : 'nav-item'}>
            <div className={state.faqPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('faqPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>FAQs</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-account-multiple-outline menu-icon"></i>
            </div>
            <Collapse in={state.faqPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/faq/list') ? 'nav-link active' : 'nav-link'} to="/faq/list"><Trans>FAQs List</Trans></Link></li>
                <li className="nav-item"> <Link className={isPathActive('/faq/add') ? 'nav-link active' : 'nav-link'} to="/faq/add"><Trans>Add FAQs</Trans></Link></li>
                <li className="nav-item"> <Link className={isPathActive('/faq/typography') ? 'nav-link active' : 'nav-link'} to="/basic-ui/typography"><Trans>Typography</Trans></Link></li>
              </ul>
            </Collapse>
          </li> */}

                {/* End Faq */}
            </ul>
        </nav>
    );




}

export default withRouter(Sidebar);