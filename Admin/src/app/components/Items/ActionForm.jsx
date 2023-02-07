import React from 'react'
import { Form } from 'react-bootstrap';

function ActionForm() {
    return (
        <>
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-primary">Action</h2>
                        <Form.Group className="row">
                            {/* <label className="col-sm-3 col-form-label">Status</label> */}
                            <div className="col-sm-4">
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="ExampleRadio4" id="membershipRadios1" defaultChecked /> Approve
                                        <i className="input-helper"></i>
                                    </label>
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="ExampleRadio4" id="membershipRadios2" /> Reject
                                        <i className="input-helper"></i>
                                    </label>
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="exampleTextarea1">Remark</label>
                            <textarea className="form-control" id="exampleTextarea1" rows="4"></textarea>
                        </Form.Group>
                        <button type="button" className="btn btn-outline-success btn-fw">Submit</button>
                        <button type="button" className="btn btn-outline-danger btn-fw">Cancle</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActionForm