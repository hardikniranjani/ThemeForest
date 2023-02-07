import axios from "axios";
import BaseUrl from "./baseUrl";
const baseUrl = BaseUrl();

const CompatableBrowserURL = `${baseUrl}/browser`
const CompatibleWithURL = `${baseUrl}/plugin`;
const FileURL = `${baseUrl}/file`;
const SoftwareURL = `${baseUrl}/softwareversion`;
const TagURL = `${baseUrl}/tag`;

export default new (class item_details_service {

  // Compatible with plugin
      getAllCompatibleWith(){
       return axios.get(`${CompatibleWithURL}`)
      }


  // ////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////

  // Compatible Browsers 
      getAllBrowser(){
       return axios.get(`${CompatableBrowserURL}`)
      }


  // ////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////


  // Files Includes
      getAllFiles(){
       return axios.get(`${FileURL}`)
      }


  // ////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////


  // Software Version
  getAllSoftwareVersions() {
    return axios.get(`${SoftwareURL}`)
  }

  // ////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////

  // Tags
  getAllTags() {
    return axios.get(`${TagURL}`)
  }

  // ////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
})