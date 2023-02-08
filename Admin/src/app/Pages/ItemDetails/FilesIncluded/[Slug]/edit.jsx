import React from 'react'
import EditForm from '../../../../components/Ui/EditItemDetail.jsx';

function edit() {

    return (
        <>
            <EditForm
                API_Title="File"
                API_URL="file"
                FormTitle="Included File Form"
                FieldTitle="File Name"
                URL="files-included"
            />
        </>
    )
}

export default edit