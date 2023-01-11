import React from 'react'

function Account() {
  const AdminName = JSON.parse(sessionStorage.getItem('TokenData'));
  return (
    <>
      <h3>Account</h3>
      AdminName: {AdminName.name} <br/>
      AdminEmail: {AdminName.email}
      
    </>
  )
}

export default Account