import React, { useState } from 'react';

import { Form } from 'react-bootstrap';
import AdminApi from '../../Services/admin.services';
import { Offline, Online } from "react-detect-offline";

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [AdminData, setAdminData] = useState({
    name: '',
    email: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const LoginData = {
      email: email,
      password: password
    }
    await AdminApi.adminLogin(LoginData).then((res) => {
      setAdminData({
        name: res.data.UserData.name,
        email: res.data.UserData.email
      })
      sessionStorage.setItem('token', res.data.token);
      window.location.reload(false);
    }).catch((err) => {
      const ErrorMessage = err.response;
      if (ErrorMessage) {
        setError(ErrorMessage.data.message);
      } else {
        setError("Please Connect to internet");
      }
    })
  }
  return (
    <>
      <Offline>You're offline right now. Check your connection.</Offline>
      <Online>        
        <div>        
          <div className="d-flex align-items-center auth px-0">        
            <div className="row w-100 mx-0">        
              <div className="col-lg-4 mx-auto">        
                <div className="auth-form-light text-left py-5 px-4 px-sm-5">        
                  <div className="brand-logo">        
                    <img src={require("../../../assets/images/logo.svg")} alt="logo" />        
                  </div>        
                  <h4>Hello Admin! let's get started</h4>        
                  <h6 className="font-weight-light">Sign in to continue.</h6>        
                  <h6 style={{ color: 'red' }}>{error && error}</h6>        
                  <Form className="pt-3" onSubmit={(e) => handleSubmit(e)}>        
                    <Form.Group className="d-flex search-field">        
                      <Form.Control type="email" placeholder="Email" size="lg" value={email} onChange={(e) => setEmail(e.target.value)} className="h-auto" />
                    </Form.Group>
                    <Form.Group className="d-flex search-field">
                      <Form.Control type="password" placeholder="Password" size="lg" value={password} onChange={(e) => setPassword(e.target.value)} className="h-auto" />
                    </Form.Group>
                    <div className="mt-3">
                      <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Online>
    </>
  )
}


export default LoginComponent
