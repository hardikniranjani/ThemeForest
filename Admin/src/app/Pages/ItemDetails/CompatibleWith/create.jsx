import React from 'react';
import Form from '../../../components/Ui/ItemDetailsForm.jsx';

function create() {
  return (
    <>
      <Form
        API_Title="Plugin"
        API_URL="plugin"
        FormTitle="Plugin Form"
        FieldTitle="Plugin Name"
        URL="compatible-with"
      />
    </>
  )
}

export default create