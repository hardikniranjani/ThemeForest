import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import UserApi from '../Services/user.services';

class Sidebar extends Component {

  state = {
  };

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/apps', state: 'appsMenuOpen' },
      { path: '/users', state: 'customerPagesMenuOpen' },
      { path: '/authors', state: 'authorPagesMenuOpen' },
      { path: '/products', state: 'productPagesMenuOpen' },
      { path: '/faq', state: 'faqPagesMenuOpen' },
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true })
      }
    }));

  }
  render() {
    const Admin = JSON.parse(sessionStorage.getItem('TokenData'));
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
              {(Admin) && <div className="nav-profile-text">
                <span className="font-weight-bold mb-2"><Trans>{Admin.name}</Trans></span>
                <span className="text-secondary text-small"><Trans>{Admin.email}</Trans></span>
              </div>}
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </Link>
          </li>

          {/* SideBar start */}
          {/* Dashboard */}
          <li className={this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-title"><Trans>Dashboard</Trans></span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>

          {/* User */}
          <li className={this.isPathActive('/users') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.customerPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('customerPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Users</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-account-multiple-outline menu-icon"></i>
            </div>
            <Collapse in={this.state.customerPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/users/list') ? 'nav-link active' : 'nav-link'} to="/users/list"><Trans>All users</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/users/adduser') ? 'nav-link active' : 'nav-link'} to="/users/adduser"><Trans>Add user</Trans></Link></li>
                {/* <li className="nav-item"> <Link className={this.isPathActive('/users/typography') ? 'nav-link active' : 'nav-link'} to="/basic-ui/typography"><Trans>Typography</Trans></Link></li> */}
              </ul>
            </Collapse>
          </li>
          {/* End User */}

          {/* Author */}
          <li className={this.isPathActive('/authors') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.authorPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('authorPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Author</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-account-multiple-outline menu-icon"></i>
            </div>
            <Collapse in={this.state.authorPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/authors/list') ? 'nav-link active' : 'nav-link'} to="/authors/list"><Trans>All authors</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/authors/addauthor') ? 'nav-link active' : 'nav-link'} to="/authors/addauthor"><Trans>Add author</Trans></Link></li>
                {/* <li className="nav-item"> <Link className={this.isPathActive('/Author/typography') ? 'nav-link active' : 'nav-link'} to="/basic-ui/typography"><Trans>Typography</Trans></Link></li> */}
              </ul>
            </Collapse>
          </li>
          {/* End Author */}

          {/* Products */}
          {/* <li className={this.isPathActive('/products') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.productPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('productPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Products</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-cart-outline menu-icon"></i>

            </div>
            <Collapse in={this.state.productPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/products/list') ? 'nav-link active' : 'nav-link'} to="/products/list"><Trans>Products List</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/products/addproduct') ? 'nav-link active' : 'nav-link'} to="/products/addproduct"><Trans>Add Product</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/products/category') ? 'nav-link active' : 'nav-link'} to="/products/category"><Trans>Category List</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/products/addcategory') ? 'nav-link active' : 'nav-link'} to="/products/addcategory"><Trans>Add Category</Trans></Link></li>
              </ul>
            </Collapse>
          </li> */}
          {/* End Products */}

          {/* Faq */}
          {/* <li className={this.isPathActive('/faq') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.faqPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('faqPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>FAQs</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-account-multiple-outline menu-icon"></i>
            </div>
            <Collapse in={this.state.faqPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/faq/list') ? 'nav-link active' : 'nav-link'} to="/faq/list"><Trans>FAQs List</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/faq/add') ? 'nav-link active' : 'nav-link'} to="/faq/add"><Trans>Add FAQs</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/faq/typography') ? 'nav-link active' : 'nav-link'} to="/basic-ui/typography"><Trans>Typography</Trans></Link></li>
              </ul>
            </Collapse>
          </li> */}

          {/* End Faq */}
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    const Token = sessionStorage.getItem('token');
    const token = {
      data: Token
    }
    UserApi.decodeToken(token).then((res) => {
      const TokenData = {
        name:res.data.user.name, 
        email: res.data.user.email
      }
    sessionStorage.setItem("TokenData", JSON.stringify(TokenData));
    }).catch((err) => {
      console.log("Error", err)
    })

    this.onRouteChanged();
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
  }

}

export default withRouter(Sidebar);