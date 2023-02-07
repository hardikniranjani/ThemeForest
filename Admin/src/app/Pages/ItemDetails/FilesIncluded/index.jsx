import React, { useEffect, useState, useRef } from 'react';
import ItemDetailApi from '../../../Services/item.details.services';
import Table from '../../../components/Ui/table.jsx';
import { Link } from 'react-router-dom';
import {
  DataGridPro,
  GridActionsCellItem,
} from "@mui/x-data-grid-pro";

function FilesIncluded(props) {
  const [data, setData] = useState([]);
  const URL = 'files-included';
  
  const tutorialsRef = useRef();
  tutorialsRef.current = data;
  useEffect(() => {
    ItemDetailApi.getAllFiles().then((item) => {
      setData(item.data)
    })
  }, [])
  const openTutorial = (rowIndex) => {
    const id = tutorialsRef.current[rowIndex].id;

    props.history.push("/users/" + id);
  };
  const deleteTutorial = (rowIndex) => {
    const id = tutorialsRef.current[rowIndex]._id;

    // AuthorApi.softDeleteAuthor(id).then((response) => {
    //     // props.history.push("/tutorials");
    //     // console.log("delete", response);
    //     window.location.reload();
    // })
    //     .catch((e) => {
    //         console.log(e);
    //     });
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 350
    },
    {
      field: "isActive",
      headerName: "Status",
      renderCell: (props) => (
        <>
          {
            props.row.isActive == true ?
              <label className="badge badge-gradient-success">Active</label>
              :
              <label className="badge badge-gradient-danger">Inactive</label>
          }
        </>
      ),
      width: 200
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 250,
      getActions: (props) => [
        <Link to={`/item-detail/${URL}/edit/${props.id}`}>
          <GridActionsCellItem icon={<i className="mdi mdi-lead-pencil action mr-2"></i>} label="Edit" />
        </Link>,
        <span onClick={() => deleteTutorial(props.row.id)}>
          <GridActionsCellItem icon={<i className="mdi mdi-delete action"></i>} label="Edit" />
        </span>
      ]
    },

  ];
  return (
    <>
      <>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <Table Title="Files Included" columns={columns} data={data} url={URL} />
          </div>
        </div>
      </>
    </>
  )
}

export default FilesIncluded