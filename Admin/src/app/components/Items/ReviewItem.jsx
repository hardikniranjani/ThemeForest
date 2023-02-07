import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemApi from '../../Services/items.services';
import BaseUrl from '../../Services/baseUrl';
import DetailsFields from './DetailsFields.jsx';
import ActionForm from './ActionForm';

function ViewItem() {
    const { id } = useParams();
    const [authorData, setAuthorData] = useState({});
    const [userData, setUserData] = useState({});
    const [itemData, setItemData] = useState({});
    const [itemDetailsData, setItemDetailsData] = useState({});
    const [compatibleWithData, setCompatibleWithData] = useState([]);
    const [compatible_BrowsersData, setCompatible_BrowsersData] = useState([]);
    const [files_IncludedData, setFiles_IncludedData] = useState([]);
    const [software_VersionData, setSoftware_VersionData] = useState([]);
    const [tagsData, setTagsData] = useState([]);

    useEffect(() => {
        ItemData();
    }, [])

    const ItemData = async () => {
        const res = await ItemApi.getAnItem(id)
        console.log("ItemData", res.data)
        setItemData(res.data);
        setAuthorData(res.data.author)
        setUserData(res.data.author.user)
        setItemDetailsData(res.data.itemDetails)
        setCompatibleWithData(res.data.itemDetails.CompatibleWith)
        setCompatible_BrowsersData(res.data.itemDetails.Compatible_Browsers)
        setFiles_IncludedData(res.data.itemDetails.Files_Included)
        setSoftware_VersionData(res.data.itemDetails.Software_Version)
        setTagsData(res.data.itemDetails.Tags)
    }

    const baseUrl = BaseUrl();
    // ${BaseUrl}/${item.imagePath[0]}
    return (
        <>
            {console.log("itemData", itemData.discription)}
            <div className="row d-flex">
                {/* start of left side div */}
                <div className="row col-8 align-content-start">
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="text-primary">Item</h2>
                                <h4 className="card-title">{itemData.title}</h4>
                                <div className="card" >
                                    <img className="card-img-top" src={`${baseUrl}/${itemData.imagePath}`} alt={itemData.title}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="text-primary">Item details</h2>
                                <p className="d-flex">Documented:<h4 className="ms-2 card-title">{itemDetailsData.IsDocumentation ? "Yes" : "No"}</h4></p>
                                <p className="d-flex">Gutenberg Optimized:<h4 className="ms-2 card-title">{itemDetailsData.Is_Gutenberg_Optimized ? "Yes" : "No"}</h4></p>
                                <p className="d-flex">High Resolution:<h4 className="ms-2 card-title">{itemDetailsData.Is_High_Resolution ? "Yes" : "No"}</h4></p>
                                <p className="d-flex">Widget Ready:<h4 className="ms-2 card-title">{itemDetailsData.Is_Widget_Ready ? "Yes" : "No"}</h4></p>
                                <p className="d-flex">Layout:<h4 className="ms-2 card-title">{itemDetailsData.Layout}</h4></p>
                            </div>
                        </div>
                    </div> */}
                    <div className="col-12 grid-margin ">
                        <div className="card overflow-auto" style={{width: '100%', height: '700px'}}>
                            <div className="card-body">
                                <h2 className="text-primary">Item discription</h2>
                                {/* <h4 className="card-title">Item discription</h4> */}
                                <div className="overflow-auto" dangerouslySetInnerHTML={{ __html: itemData.discription }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End of left side div */}

                {/* ============================================================================================================================================================================ */}

                {/* start of Right side div */}
                <div className="row col-4 align-content-start">
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="text-primary">Portfolio </h4>
                                {/* <h4 className="card-title">Author</h4> */}
                                <img className="card-img-top"
                                    style={{ width: "5rem", border: "1px solid gray", borderRadius: "50%" }}
                                    src={`${baseUrl}/${authorData.imagePath}`} alt={authorData.name}>
                                </img>
                                <p className="d-flex m-0">Author Name:<h4 className="ms-2 card-title">{authorData.name}</h4></p>
                                <p className="d-flex m-0">UserName: <h5 className="ms-2 card-title">{authorData.username}</h5></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body p-4">
                                <h4 className="text-primary">Item Details</h4>
                                <p className="col">
                                    <span className="d-flex">Documented:<h6 className="ms-2 card-title">{itemDetailsData.IsDocumentation ? "Yes" : "No"}</h6></span>
                                    <span className="d-flex">Gutenberg Optimized:<h6 className="ms-2 card-title">{itemDetailsData.Is_Gutenberg_Optimized ? "Yes" : "No"}</h6></span>
                                    <span className="d-flex">High Resolution:<h6 className="ms-2 card-title">{itemDetailsData.Is_High_Resolution ? "Yes" : "No"}</h6></span>
                                    <span className="d-flex">Widget Ready:<h6 className="ms-2 card-title">{itemDetailsData.Is_Widget_Ready ? "Yes" : "No"}</h6></span>
                                    <span className="d-flex">Layout:<h6 className="ms-2 card-title">{itemDetailsData.Layout}</h6></span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <DetailsFields fieldName="Compatible Plugins" data={compatibleWithData} />
                    <DetailsFields fieldName="Compatible Browsers" data={compatible_BrowsersData} />
                    <DetailsFields fieldName="Files Included" data={files_IncludedData} />
                    <DetailsFields fieldName="Software Version" data={software_VersionData} />
                    <DetailsFields fieldName="Tags" data={tagsData} />
                    {/* <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">User</h4>
                                <img className="card-img-top"
                                    style={{ width: "5rem", border: "1px solid gray", borderRadius: "50%" }}
                                    src={`${baseUrl}/${authorData.imagePath}`} alt={authorData.name}>
                                </img>
                                <p className="d-flex">User Name:<h4 className="ms-2 card-title">{userData.name}</h4></p>
                                <p className="d-flex">Email: <h5 className="ms-2 card-title">{userData.email}</h5></p>
                            </div>
                        </div>
                    </div> */}


                </div>
                {/* end of rigth side div */}
            </div>
            {/* Admin Action Form */}
            <ActionForm />
        </>
    )
}

export default ViewItem