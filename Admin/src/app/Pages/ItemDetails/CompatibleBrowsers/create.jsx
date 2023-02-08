import React from 'react';
import Form from '../../../components/Ui/ItemDetailsForm.jsx';

function create() {
  return (
    <>
      <Form
        API_Title="Browser"
        API_URL="browser"
        FormTitle="Browser Form"
        FieldTitle="Browser Name"
        URL="compatible-browsers"
      />
    </>
  )
}

export default create