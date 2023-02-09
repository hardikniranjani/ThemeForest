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
  getAllCompatibleWith() {
    return axios.get(`${CompatibleWithURL}`)
  }

  getAnPlugin(id) {
    return axios.get(`${CompatibleWithURL}/${id}`)
  }

  editPlugin({id,data}) {
    return axios.put(`${CompatibleWithURL}/${id}`,data)
  }

  addPlugin(data) {
    return axios.post(`${CompatibleWithURL}`,data)
  }

  deletePlugin(id) {
    return axios.delete(`${CompatibleWithURL}/${id}`)
  }

  // ////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////

  // Compatible Browsers 
  getAllBrowser() {
    return axios.get(`${CompatableBrowserURL}`)
  }

  getAnBrowser(id) {
    return axios.get(`${CompatableBrowserURL}/${id}`)
  }

  editBrowser({id,data}) {
    return axios.put(`${CompatableBrowserURL}/${id}`,data)
  }

  addBrowser(data) {
    return axios.post(`${CompatableBrowserURL}`,data)
  }

  deleteBrowser(id) {
    return axios.delete(`${CompatableBrowserURL}/${id}`)
  }

  // ////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////


  // Files Includes
  getAllFiles() {
    return axios.get(`${FileURL}`)
  }

  getAnFiles(id) {
    return axios.get(`${FileURL}/${id}`)
  }

  editFiles({id,data}) {
    return axios.put(`${FileURL}/${id}`,data)
  }
  addFiles(data) {
    return axios.post(`${FileURL}`,data)
  }
  deleteFiles(id) {
    return axios.delete(`${FileURL}/${id}`)
  }

  // ////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////


  // Software Version
  getAllSoftwareVersions() {
    return axios.get(`${SoftwareURL}`)
  }

  getAnSoftwareVersions(id) {
    return axios.get(`${SoftwareURL}/${id}`)
  }

  editSoftwareVersions({id,data}) {
    return axios.put(`${SoftwareURL}/${id}`,data)
  }

  addSoftwareVersions(data) {
    return axios.post(`${SoftwareURL}`,data)
  }

  deleteSoftwareVersions(id) {
    return axios.delete(`${SoftwareURL}/${id}`)
  }

  // ////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////

  // Tags
  getAllTags() {
    return axios.get(`${TagURL}`)
  }

  getAnTags(id) {
    return axios.get(`${TagURL}/${id}`)
  }

  editTags({id,data}) {
    return axios.put(`${TagURL}/${id}`,data)
  }

  addTags(data) {
    return axios.post(`${TagURL}`,data)
  }

  deleteTags(id) {
    return axios.delete(`${TagURL}/${id}`)
  }

  // ////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
})