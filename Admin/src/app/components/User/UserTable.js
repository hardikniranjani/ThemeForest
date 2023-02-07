import React, { useState, useEffect, useMemo, useRef, Fragment } from "react";
import Pagination from "@material-ui/lab/Pagination";
import UserApi from "../../Services/user.services";
import { useTable } from "react-table";
import { Link } from 'react-router-dom'

const PaginationTable = (props) => {
    const [tutorials, setTutorials] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const tutorialsRef = useRef();

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(3);

    const pageSizes = [3, 6, 9];

    tutorialsRef.current = tutorials;

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const getRequestParams = (searchTitle, page, pageSize) => {
        let params = {};

        if (searchTitle) {
            params["title"] = searchTitle;
        }

        if (page) {
            params["page"] = page - 1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    };

    const retrieveTutorials = () => {
        const params = getRequestParams(searchTitle, page, pageSize);

        UserApi.getAllUser({ pageSize: params.size, pageNumber: params.page }).then(users => {
            var PageCount = Math.ceil(((users.data.TotalUsers) / (params.size)))
            setTutorials(users.data.Result);
            setCount(PageCount);
            console.log("All Users",users.data.Result)
        }).catch(err => console.log("error", err))
    };

    useEffect(retrieveTutorials, [page, pageSize]);

    const refreshList = () => {
        retrieveTutorials();
    };

    const removeAllTutorials = () => {
        UserApi.removeAll()
            .then((response) => {
                console.log(response.data);
                refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        setPage(1);
        retrieveTutorials();
    };

    const openTutorial = (rowIndex) => {
        const id = tutorialsRef.current[rowIndex].id;

        props.history.push("/users/" + id);
    };

    const deleteTutorial = (rowIndex) => {
        const id = tutorialsRef.current[rowIndex]._id;

        UserApi.softDeleteUser(id).then((response) => {
            // props.history.push("/tutorials");
            // console.log("delete", response);
            window.location.reload();
        })
            .catch((e) => {
                console.log(e);
            });
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };

    const columns = useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Status",
                accessor: "isActive",
                Cell: (props) => {
                    return props.value ? `${[<Fragment><label className="badge badge-gradient-success">Active</label></Fragment>]}` : `${<label className="badge badge-gradient-danger">Inactive</label>}`;
                },
            },
            // text={["This is ", <strong>not</strong>,  "working."]} 
            {
                Header: "Actions",
                accessor: "actions",
                Cell: (props) => {
                    const rowIdx = props.row.id;
                    return (
                        <div>
                            <span onClick={() => openTutorial(rowIdx)}>
                            </span>
                            <Link to={`/users/edituser/${tutorialsRef.current[rowIdx]._id}`}>
                                <i className="mdi mdi-lead-pencil action mr-2">Edit</i>
                            </Link>
                            {/* <i className="fas fa-edit"></i> */}
                            <span onClick={() => deleteTutorial(rowIdx)} style={{ cursor: "pointer" }}>
                                <i className="mdi mdi-delete action">Remove</i>
                            </span>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: tutorials,
    });

    return (
        <div className="list row">
            {/* <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div> */}

            <div className="col-md-12 list">
                <div className="mt-3">
                    {"Items per Page: "}
                    <select onChange={handlePageSizeChange} value={pageSize}>
                        {pageSizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>

                    <Pagination
                        className="my-3"
                        count={count}
                        page={page}
                        siblingCount={1}
                        boundaryCount={1}
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePageChange}
                    />
                </div>
                <div className="row">
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">All Users</h4>
                                <div className="table-responsive">
                                    <table
                                        className="table table-striped table-bordered"
                                        {...getTableProps()}
                                    >
                                        <thead>
                                            {headerGroups.map((headerGroup) => (
                                                <>

                                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                                        {headerGroup.headers.map((column) => (
                                                            <>
                                                                {/* { console.log("cell.render(Cell)",column)} */}
                                                                <th {...column.getHeaderProps()}>
                                                                    {column.render("Header")}
                                                                </th>
                                                            </>
                                                        ))}
                                                    </tr>
                                                </>
                                            ))}
                                        </thead>
                                        <tbody {...getTableBodyProps()}>
                                            {rows.map((row, i) => {
                                                prepareRow(row);
                                                return (
                                                    <tr {...row.getRowProps()}>
                                                        {row.cells.map((cell, i) => {
                                                            { cell.column.Header == 'Status' && console.log(`cell.render(Cell)_${i}`, cell.value) }

                                                            return (
                                                                <>
                                                                    {cell.column.Header == 'Status' ?
                                                                        <>
                                                                            {cell.value === true ?
                                                                                <td {...cell.getCellProps()}>
                                                                                    <label className="badge badge-gradient-success">Active</label>
                                                                                </td>
                                                                                :
                                                                                <>
                                                                                    <td {...cell.getCellProps()}>
                                                                                        <label className="badge badge-gradient-danger">Inactive</label>
                                                                                    </td>
                                                                                </>}
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                                                        </>
                                                                    }
                                                                </>
                                                            );
                                                        })}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="col-md-8">
                <button className="btn btn-sm btn-danger" onClick={removeAllTutorials}>
                    Remove All
                </button>
            </div> */}
        </div>
    );
};

export default PaginationTable;
