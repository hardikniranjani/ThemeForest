import React from 'react'

function DetailsFields({ fieldName, data }) {
    return (
        <>
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body p-4">
                    <h4 className="text-primary">{fieldName}</h4>
                        {data.map((item) => {
                            return (
                                <p className="p-0 m-0">
                                    {item.name}
                                </p>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailsFields