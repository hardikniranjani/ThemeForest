import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import UserApi from '../../Services/user.services';
import { useHistory } from 'react-router-dom'

function CreateOrEditForm({ InisialData }) {
    console.log(InisialData)
    let navigate = useHistory();
    const [error, setError] = useState('');
    const [data, setData] = useState({
        image: "",
        name: "",
        gender: "male",
        email: "",
        password: "",
        status: '',

    })
    useEffect(() => {
        if (InisialData) {
            setData({
                image: InisialData.imagePath,
                name: InisialData.name,
                gender: InisialData.gender,
                email: InisialData.email,
                password: InisialData.password,
                status: InisialData.status,
            })
        }
    }, [InisialData])

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

        if (InisialData) {
            await UserApi.editUser({ data: data, id: InisialData.id }).then((res) => {

                alert("Updated succefully!")
            }).catch((err) => {
                console.log(err)
                setError(err.response.data.Message)
            })
        } else {
            await UserApi.createUser(data).then((res) => {
                alert("added succefully!");
                navigate.push('/users/list')
            }).catch((err) => {
                console.log(err)
                setError(err.response.data.Message)
            })
        }
    }
    if (InisialData) {
        if (data.status == false) {
            var UserStatus = 'Active';
            var UserHeaderStatus = 'Inactive';
        } else {
            var UserStatus = 'Inactive';
            var UserHeaderStatus = 'Active';
        }
    }
    const HandleUpdateUser = async () => {
        const userStatus = {
            isActive: !data.status
        }
        await UserApi.editUser({ data: userStatus, id: InisialData.id }).then((response) => {
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
            await UserApi.deleteUser(InisialData.id).then((res) => {
                navigate.push('/users/list')
            }).catch((err) => {
                console.log("err", err)
                navigate.push('/users/list')
            })
        }


    }

    if (InisialData) {
        var UserTitle = 'Update User';
    } else {
        var UserTitle = 'Create User';
    }
    return (
        <>
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h4 className="card-title">{UserTitle}</h4>
                                <p className="card-description" style={{ color: 'red' }}> {error && error} </p>
                            </div>
                            <div>
                                {InisialData && <div className="top-0 start-0">
                                    {UserHeaderStatus == 'Inactive' ?
                                        <p className="card-description" style={{ color: 'red' }}> This user is {UserHeaderStatus} </p>
                                        :
                                        <p className="card-description" style={{ color: 'green' }}> This user is {UserHeaderStatus} </p>
                                    }</div>
                                }
                            </div>
                        </div>
                        <form className="forms-sample" onSubmit={(e) => HandleSubmit(e)} >
                            <Form.Group>
                                <label htmlFor="exampleInputName1">Name<span style={{ color: 'red' }}>*</span></label>
                                <Form.Control type="text" className="form-control" id="exampleInputName1" name="name" value={data.name} placeholder="Name" onChange={(e) => HandleChange(e)} required />
                            </Form.Group>
                            <Form.Group>
                                <label htmlFor="exampleInputEmail3">Email address<span style={{ color: 'red' }}>*</span></label>
                                <Form.Control type="email" className="form-control" id="exampleInputEmail3" name="email" value={data.email} onChange={(e) => HandleChange(e)} placeholder="Email" required />
                            </Form.Group>
                            <Form.Group>
                                <label htmlFor="exampleInputPassword4">Password<span style={{ color: 'red' }}>*</span></label>
                                <Form.Control type="password" className="form-control" id="exampleInputPassword4" name="password" value={data.password} onChange={(e) => HandleChange(e)} placeholder="Password" required />
                            </Form.Group>
                            <Form.Group>
                                <label htmlFor="exampleSelectGender">Gender</label>
                                <select className="form-control" placeholder="select" id="exampleSelectGender" name="gender" value={data.gender} onChange={(e) => HandleChange(e)} >
                                    <option >Male</option>
                                    <option>Female</option>
                                </select>
                            </Form.Group>
                            <Form.Group>
                                <label>File upload<span style={{ color: 'red' }}>*</span></label>
                                <div className="custom-file">
                                    <Form.Control type="file" name="image" onChange={(e) => HandleChange(e)} className="form-control visibility-hidden" id="customFileLang" lang="es" />
                                    <label className="custom-file-label" htmlFor="customFileLang">Upload image</label>
                                </div>
                            </Form.Group>
                            <button type="submit" className="btn btn-gradient-primary mr-2">Submit</button>
                            <button className="btn btn-light">Cancel</button>
                        </form>
                    </div>
                    {/* {InisialData && (
                        <>
                            <button type="submit" className="btn btn-gradient-primary mr-2" onClick={() => HandleUpdateUser()}>{UserStatus} this User</button>
                            <button className="btn btn-light" onClick={() => HandleDeleteUser()}>Delete User</button>
                        </>
                    )} */}
                </div>
            </div>
            {InisialData &&
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Action</h4>
                            <div className="d-flex justify-content-between">
                                {InisialData.status ?
                                    <button type="button" onClick={() => HandleUpdateUser()} className="btn btn-outline-danger btn-fw">Inactive this User</button>
                                    :
                                    <button type="button" onClick={() => HandleUpdateUser()} className="btn btn-outline-success btn-fw">Active this User</button>

                                }
                                {/* <button type="submit" className="btn btn-gradient-primary mr-2" onClick={() => HandleUpdateUser()}>{UserStatus} this User</button> */}
                                {/* <button className="btn btn-light" onClick={() => HandleDeleteUser()}>Delete User</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default CreateOrEditForm