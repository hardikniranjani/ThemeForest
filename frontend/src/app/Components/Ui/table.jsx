import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';
function Table({ Title, columns, data, url }) {
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  return (
    <>
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between">
            <h3 className="card-title">{Title}</h3>
            {/* <h4 className="btn btn-outline-success">{Title}</h4> */}
            <Link to={`/item-detail/${url}/add`} type="button" className="btn btn-outline-success btn-fw mb-4">Add {Title}</Link>
            </div>
            <div className="table-responsive">
              <Box
                sx={{
                  height: 400,
                  width: '100%',
                }}
              >
                {/* <Typography
                  variant="h3"
                  component="h3"
                  sx={{ textAlign: 'center', mt: 3, mb: 3 }}
                >
                  {Title}
                </Typography> */}
                {/* <DataGrid rows={data} columns={columns} /> */}
                <DataGrid
                  checkboxSelection
                  columns={columns}
                  rows={data}
                  getRowId={(row) => row._id}
                  rowsPerPageOptions={[5, 10, 20]}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  getRowSpacing={(params) => ({
                    top: params.isFirstVisible ? 0 : 5,
                    bottom: params.isLastVisible ? 0 : 5,
                  })}
                  sx={{
                    [`& .${gridClasses.row}`]: {
                      bgcolor: (theme) =>
                        theme.palette.mode === 'light' ? grey[200] : grey[900],
                    },
                  }}
                  onCellEditCommit={(params) => setRowId(params.id)}
                />
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Table