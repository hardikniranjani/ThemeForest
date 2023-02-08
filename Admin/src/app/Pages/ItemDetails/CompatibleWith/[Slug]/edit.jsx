import React from 'react'
import EditForm from '../../../../components/Ui/EditItemDetail.jsx';

function edit() {

    return (
        <>
            <EditForm
                API_Title="Plugin"
                API_URL="plugin"
                FormTitle="Plugin Form"
                FieldTitle="Plugin Name"
                URL="compatible-with"
            />
        </>
    )
}

export default edit