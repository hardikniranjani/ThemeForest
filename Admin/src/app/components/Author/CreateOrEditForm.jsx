import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import AuthorApi from '../../Services/admin.author.services';
import UserApi from '../../Services/user.services';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';

function CreateOrEditForm({ InisialData }) {
    let navigate = useHistory();
    const [error, setError] = useState('');
    const [data, setData] = useState({
        image: '',
        name: '',
        gender: 'male',
        email: '',
        password: '',
        username: '',
        user: '',
        status: '',
    })
    const [userData, setUserData] = useState([])
    useEffect(() => {
        if (InisialData) {
            setData({
                image: InisialData.imagePath,
                name: InisialData.name,
                gender: InisialData.gender,
                email: InisialData.email,
                password: InisialData.password,
                username: InisialData.username,
                user: InisialData.user,
                status: InisialData.status,
            })
        }

        UserApi.getAllUserWithoutPagination().then((users) => {
            console.log("users", users.data)
            setUserData(users.data)
        }).catch((err) => {
            console.log("user err", err)
        })
    }, [InisialData])

    console.log("data.user.name", data.user.name)
    const HandleChange = (e) => {
        if (e.target.name === 'image') {
            setData({
                ...data,
                [e.target.name]: e.target.files[0]
            })
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
    }

    const HandleSubmit = async (event) => {
        event.preventDefault();
        console.log("user data", data)
        if (InisialData) {
            await AuthorApi.editAuthor({ data: data, id: InisialData.id }).then((res) => {
                console.log("User Data", res);
                alert("updated succefully!")
            }).catch((err) => {
                console.log(err)
                setError(err.response.data.Message)
            })
        } else {
            await AuthorApi.createAuthor(data).then((res) => {
                console.log("User Data", res);
                alert("added succefully!")
            }).catch((err) => {
                console.log(err)
                setError(err.response.data.Message)
            })
        }
    }

    if (InisialData) {
        if (data.status == false) {
            var AuthorStatus = 'Active';
            var AuthorHeaderStatus = 'Inactive';
        } else {
            var AuthorStatus = 'Inactive';
            var AuthorHeaderStatus = 'Active';
        }
    }
    const HandleUpdateUser = async () => {
        const authorStatus = {
            isActive: !data.status
        }

        await AuthorApi.editAuthor({ data: authorStatus, id: InisialData.id }).then((response) => {
            alert("Update user status: " + response.data.isActive)
            // console.log("response update user status", response)
            window.location.reload()

        }).catch((err) => {
            console.log("err", err)
        })
    }

    const HandleDeleteUser = async () => {
        const confirmBox = window.confirm(
            "Are you sure you want to delete this user?"
        )
        if (confirmBox === true) {
            await AuthorApi.deleteAuthor(InisialData.id).then((res) => {
                navigate.push('/users/list')
            }).catch((err) => {
                console.log("err", err)
                navigate.push('/users/list')
            })
        }


    }
    const [userArr, setuserArry] = useState([{value:"", lable:"", id:""}]);
    useEffect(()=>{
        userData.map((user, i) =>{
            console.log(`user${i}`,{value:user.name, lable:user.name, id:user._id})
            setuserArry({value:user.name, lable:user.name, id:user._id})
        })
    },[])

console.log("userArr",userArr)
    return (
        <>
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="d-inline-flex">
                            {InisialData && <h4 className="card-title">Update Author</h4>}
                            {!InisialData && <h4 className="card-title">Create Author</h4>}
                            <p className="card-description" style={{ color: 'red' }}> {error && error} </p>
                            {/* <p className="card-description"> Basic form elements </p> */}
                            <div></div>
                            {InisialData && <div className="top-0 start-0">

                                {AuthorHeaderStatus == 'Inactive' ?
                                    <p className="card-description" style={{ color: 'red' }}> This author is {AuthorHeaderStatus} </p>
                                    :
                                    <p className="card-description" style={{ color: 'green' }}> This author is {AuthorHeaderStatus} </p>
                                }
                            </div>}
                        </div>
                        <form className="forms-sample" onSubmit={(e) => HandleSubmit(e)} >
                            <Form.Group>
                                <label htmlFor="exampleInputName1">Name<span style={{ color: 'red' }}>*</span></label>
                                <Form.Control type="text" className="form-control" id="exampleInputName1" name="name" value={data.name} placeholder="Name" onChange={(e) => HandleChange(e)} required />
                            </Form.Group>
                            <Form.Group>
                                <label htmlFor="exampleInputEmail3">Username<span style={{ color: 'red' }}>*</span></label>
                                <Form.Control type="text" className="form-control" id="exampleInputEmail3" name="username" value={data.username} onChange={(e) => HandleChange(e)} placeholder="Username" required />
                            </Form.Group>
                            <Form.Group>
                                <label htmlFor="exampleInputPassword4">Password<span style={{ color: 'red' }}>*</span></label>
                                <Form.Control type="password" className="form-control" id="exampleInputPassword4" name="password" value={data.password} onChange={(e) => HandleChange(e)} placeholder="Password" required />
                            </Form.Group>
                            <Form.Group>
                                <label htmlFor="exampleSelectGender">User{!InisialData && <span style={{ color: 'red' }}>*</span>}</label>
                                <select className="form-control" placeholder="select" id="exampleSelectGender" name="user" onChange={(e) => HandleChange(e)} >
                                    {/* <option >Select User</option> */}
                                    {InisialData ?
                                        <option>{data.user.name} </option>
                                        :
                                        <>
                                            <option>Select User</option>
                                            {userData.map((user, i) => (
                                                <option key={i} value={user._id}>{user.name}</option>
                                            ))}
                                            
                                        </>
                                    }
                                </select>
                                <Select options={userArr} />
                            </Form.Group>
                            <Form.Group>
                                <label htmlFor="exampleSelectGender">Gender</label>
                                <select className="form-control" placeholder="select" id="exampleSelectGender" name="gender" value={data.gender} onChange={(e) => HandleChange(e)} >
                                    <option >Male</option>
                                    <option>Female</option>
                                </select>
                            </Form.Group>
                            <Form.Group>
                                <label>File upload</label>
                                <div className="custom-file">
                                    <Form.Control type="file" name="image" onChange={(e) => HandleChange(e)} className="form-control visibility-hidden" id="customFileLang" lang="es" />
                                    <label className="custom-file-label" htmlFor="customFileLang">Upload image</label>
                                </div>
                            </Form.Group>
                            <button type="submit" className="btn btn-gradient-primary mr-2">Submit</button>
                            <button className="btn btn-light">Cancel</button>
                        </form>
                    </div>
                    {InisialData && (
                        <>
                            <button type="submit" className="btn btn-gradient-primary mr-2" onClick={() => HandleUpdateUser()}>{AuthorStatus} this Author</button>
                            <button className="btn btn-light" onClick={() => HandleDeleteUser()}>Delete Author</button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default CreateOrEditForm