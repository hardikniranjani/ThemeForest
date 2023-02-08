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

  editBrowser(id) {
    return axios.put(`${CompatableBrowserURL}/${id}`)
  }

  addBrowser() {
    return axios.post(`${CompatableBrowserURL}`)
  }

  deleteBrowser() {
    return axios.delete(`${CompatableBrowserURL}`)
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

  editFiles(id) {
    return axios.put(`${FileURL}/${id}`)
  }
  addFiles() {
    return axios.post(`${FileURL}`)
  }
  deleteFiles() {
    return axios.delete(`${FileURL}`)
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

  editSoftwareVersions(id) {
    return axios.put(`${SoftwareURL}/${id}`)
  }

  addSoftwareVersions() {
    return axios.post(`${SoftwareURL}`)
  }

  deleteSoftwareVersions() {
    return axios.delete(`${SoftwareURL}`)
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

  editTags(id) {
    return axios.put(`${TagURL}/${id}`)
  }

  addTags() {
    return axios.post(`${TagURL}`)
  }

  deleteTags() {
    return axios.delete(`${TagURL}`)
  }

  // ////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
})