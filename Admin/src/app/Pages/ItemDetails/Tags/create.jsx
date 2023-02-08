import React from 'react';
import Form from '../../../components/Ui/ItemDetailsForm.jsx';

function create() {
  return (
    <>
      <Form
        API_Title="Tag"
        API_URL="tag"
        FormTitle="Tag Form"
        FieldTitle="Tag Name"
        URL="tags"
      />
    </>
  )
}

export default create