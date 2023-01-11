import React from 'react'
// import AuthorApi from '../../Services/admin.author.services'
import AuthorTable from '../../components/Author/AuthorTable';
function Authors() {
  // useEffect(() => {
  //   const pageSize = 2;
  //   const pageNumber = 0;
  //   AuthorApi.getAllAuthors({pageSize,pageNumber}).then(author =>{
  //     console.log("author",author)
  //   }).catch(err => console.log("error",err))
  // },[])

  return (
    <>
      <div>All Authors</div>
      <AuthorTable />
    </>
  )
}

export default Authors;