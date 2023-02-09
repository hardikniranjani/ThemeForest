import React, { Component, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
// import ItemDetailApi from '../../Services/item.details.services';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from '../../Services/baseUrl';

function ItemDetailsForm({ InitialDate, FormTitle, FieldTitle, URL, API_Title, API_URL }) {
    let navigate = useHistory();
    let baseUrl = BaseUrl();
    const Field_Title = FieldTitle || 'Name';
    const Main_Title = FormTitle || 'Form';

    const AddURL = `${baseUrl}/${API_URL}`;

    if (InitialDate) {
        var EditURL = `${baseUrl}/${API_URL}/edit/${InitialDate.id}`;
        var RemoveURL = `${baseUrl}/${API_URL}/remove/${InitialDate.id}`;
        var ActiveURL = `${baseUrl}/${API_URL}/active/${InitialDate.id}`;
    }

    console.log("InitialDate", InitialDate)

    const [data, setData] = useState({
        name: '',
        status: ''
    })
    const [status, setStatus] = useState({
        isActive: true
    })
    const [error, setError] = useState('');

    useEffect(() => {
        if (InitialDate) {
            setData({
                name: InitialDate.name,
                status: InitialDate.status
            })
        }
    }, [InitialDate])

    const HandleChange = (e) => {
        setData({
            [e.target.name]: e.target.value
        })
    }

    const HandleSubmit = async (event) => {
        event.preventDefault();
        if (InitialDate) {
            await axios.put(`${EditURL}`, data).then((res) => {
                console.log("User Data", res);
                alert("updated succefully!")
                navigate.push(`/item-detail/${URL}`)
            }).catch((err) => {
                console.log(err)
                setError(err.response.data.Message)
            })
        } else {
            await axios.post(`${AddURL}`, data).then((res) => {
                console.log("User Data", res);
                alert("added succefully!")
                navigate.push(`/item-detail/${URL}`)
            }).catch((err) => {
                console.log(err)
                setError(err.response.data.Message)
            })
        }
    }
    const HandleRemoveUpdate = async () => {
        if (InitialDate.status) {
            const confirmBox = window.confirm(
                `Are you sure you want to Inactive this ${API_Title}?`
            )
            if (confirmBox === true) {
                await axios.put(`${RemoveURL}`).then(() => {
                    alert("Inactive succefully!")
                    window.location.reload(true)
                }).catch((err) => {
                    console.log("err", err)
                    alert("Please, try again")
                })
            }
        } else {
            const confirmBox = window.confirm(
                `Are you sure you want to Active this ${API_Title}?`
            )
            if (confirmBox === true) {
                await axios.put(`${ActiveURL}`, status).then(() => {
                    alert("Active succefully!")
                    window.location.reload(true)
                }).catch((err) => {
                    console.log("err", err)
                    alert("Please, try again")
                })
            }
        }

    }

    // const HandleDelete = async () => {
    //     const confirmBox = window.confirm(
    //         `Are you sure you want to delete this ${FormTitle}?`
    //     )
    //     if (confirmBox === true) {
    //         await axios.delete(`${DeleteURL}`).then(() => {
    //             navigate.push(`/item-detail/${URL}`)
    //         }).catch((err) => {
    //             console.log("err", err)
    //             navigate.push(`/item-detail/${URL}`)
    //         })
    //     }
    // }

    return (
        <>
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-3">
                            <h4 className="card-title">{Main_Title}</h4>
                            {InitialDate ?
                                <>
                                    {InitialDate.status ?
                                        <>
                                            <p className="card-description text-success"> This {API_Title} is Active </p>
                                        </>
                                        :
                                        <>
                                            <p className="card-description text-danger"> This {API_Title} is currently Inactive</p>
                                        </>
                                    }
                                </>
                                :
                                <></>}
                        </div>
                        <form className="forms-sample"  >
                            <Form.Group>
                                <label htmlFor="exampleInputName1">Name</label>
                                <Form.Control type="text" className="form-control" name="name" onChange={(e) => HandleChange(e)} value={data.name} placeholder={`${Field_Title}`} />
                            </Form.Group>

                            {InitialDate ?
                                <button type="submit" onClick={(e) => HandleSubmit(e)} className="btn btn-gradient-primary mr-2">Edit</button>
                                :
                                <button type="submit" onClick={(e) => HandleSubmit(e)} className="btn btn-gradient-primary mr-2">Add</button>
                            }
                            <button onClick={() => window.location.reload()} className="btn btn-light">Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
            {InitialDate ?
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Action</h4>
                            <div className="d-flex justify-content-between">

                                {InitialDate.status ?
                                    <button type="button" onClick={() => HandleRemoveUpdate()} className="btn btn-outline-danger btn-fw">Inactive {API_Title}</button>
                                    :
                                    <button type="button" onClick={() => HandleRemoveUpdate()} className="btn btn-outline-success btn-fw">Active {API_Title}</button>

                                }
                            </div>
                        </div>
                    </div>
                </div>
                :
                <>
                </>
            }

        </>
    )
}

export default ItemDetailsForm