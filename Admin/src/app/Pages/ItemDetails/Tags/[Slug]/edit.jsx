import React from 'react'
import EditForm from '../../../../components/Ui/EditItemDetail.jsx';

function edit() {

    return (
        <>
            <EditForm
                API_Title="Tag"
                API_URL="tag"
                FormTitle="Tag Form"
                FieldTitle="Tag Name"
                URL="tags"
            />
        </>
    )
}

export default edit