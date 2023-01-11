import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserApi from '../../../Services/user.services';
import CreateOrEditForm from '../../../components/User/CreateOrEditForm.jsx';

function EditUser() {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    id:'',
    imagePath: '',
    name: '',
    gender: '',
    email: '',
    password: '',
    status:'',
  })
  useEffect(() => {
    UserApi.getAnUser(id).then((user) => {
      const InisialData = user.data[0];

      setUserData({
        id:InisialData._id,
        imagePath: InisialData.imagePath,
        name: InisialData.name,
        gender: InisialData.gender,
        email: InisialData.email,
        password: InisialData.password,
        status: InisialData.isActive,
      })
      
    }).catch((err) => {
      console.log(err)
    })
    
  }, [])

  return (
    <>
      <CreateOrEditForm InisialData={userData} />
    </>
  )
}

export default EditUser;