import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthorApi from '../../../Services/admin.author.services';
import CreateOrEditForm from '../../../components/Author/CreateOrEditForm.jsx';

function EditUser() {
  const { id } = useParams();
  const [authorData, setAuthorData] = useState({
    id:'',
    image: '',
    name: '',
    gender: '',
    email: '',
    password: '',
    username:'',
    user:'',
    status: '',
  })
  
  useEffect(() => {
    AuthorApi.getAnAuthor(id).then((user) => {
      console.log("User",user.data);
      const InisialData = user.data;

      setAuthorData({
        id:InisialData._id,
        image: InisialData.imagePath,
        name: InisialData.name,
        gender: InisialData.gender,
        email: InisialData.email,
        password: InisialData.password,
        username:InisialData.username,
        user:InisialData.user,
        status: InisialData.isActive,
      })

    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <>
      {/* <div>EditUser</div> */}
      <CreateOrEditForm InisialData={authorData} />
    </>
  )
}

export default EditUser;