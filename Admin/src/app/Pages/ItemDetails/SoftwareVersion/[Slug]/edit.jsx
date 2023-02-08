import React from 'react'
import EditForm from '../../../../components/Ui/EditItemDetail.jsx';

function edit() {

    return (
        <>
            <EditForm
                API_Title="Software Version"
                API_URL="softwareversion"
                FormTitle="Software Version Form"
                FieldTitle="Software Version Name"
                URL="software-version"
            />
        </>
    )
}

export default edit