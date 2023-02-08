import React from 'react';
import Form from '../../../components/Ui/ItemDetailsForm.jsx';

function create() {
  return (
    <>
      <Form
        API_Title="Software Version"
        API_URL="softwareversion"
        FormTitle="Software Version Form"
        FieldTitle="Software Version Name"
        URL="software-version"
      />
    </>
  )
}

export default create