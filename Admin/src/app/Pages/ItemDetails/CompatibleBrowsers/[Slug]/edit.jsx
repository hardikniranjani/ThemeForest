import React from 'react'
import EditForm from '../../../../components/Ui/EditItemDetail.jsx';

function edit() {

    return (
        <>
             <EditForm 
                API_Title="Browser"
                API_URL="browser"
                FormTitle="Browser Form"
                FieldTitle="Browser Name"
                URL="compatible-browsers"
             />
        </>
    )
}

export default edit