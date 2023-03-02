import React, { useEffect, useState } from 'react';
import Form from './ItemDetailsForm.jsx';
// import ItemDetailApi from '../../Services/item.details.services';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import BaseUrl from '../../Services/baseUrl';

function EditItemDetail({ API_Title, FormTitle, FieldTitle, URL,API_URL }) {

    const { id } = useParams();
    let baseUrl = BaseUrl();

    const [error, setError] = useState();
    const [data, setData] = useState({
        id:'',
        name: '',
        status: ''
    })
    

    useEffect(() => {
        axios.get(`${baseUrl}/${API_URL}/${id}`).then((res) => {
            console.log("User Data", res);
            setData({
                id:res.data[0]._id,
                name: res.data[0].name,
                status: res.data[0].isActive
            })
        }).catch((err) => {
            console.log(err)
            // setError(err.response.data.Message)
        })
    }, [])
    return (
        <>
            <Form
                InitialDate={data}
                FormTitle={FormTitle}
                FieldTitle={FieldTitle}
                URL={URL}
                API_Title={API_Title}
                API_URL={API_URL}
            />
        </>
    )
}

export default EditItemDetail