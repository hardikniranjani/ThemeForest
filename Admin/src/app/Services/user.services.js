import axios from 'axios';
import BaseUrl from './baseUrl';
const baseUrl = BaseUrl();

export default new (class User_Service {

    decodeToken(tokenData){
        return axios.put(`${baseUrl}/user/decode`,tokenData);
    }

    getAllUserWithoutPagination() {
        return axios.get(`${baseUrl}/user/all`)
    }
    getAllUser({ pageSize, pageNumber }) {
        return axios.get(`${baseUrl}/user/allusers?pageSize=${pageSize}&pageNumber=${pageNumber}`)
    }

    getAnUser(id){
        return axios.get(`${baseUrl}/user/${id}`)
    }

    createUser(data) {
        return axios.post(`${baseUrl}/user/register`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        })
    }

    editUser({ data, id }) {
        return axios.put(`${baseUrl}/user/edit/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        })
    }

    softDeleteUser(id) {
        return axios.put(`${baseUrl}/user/remove/${id}`)
    }

    deleteUser(id){
        return axios.delete(`${baseUrl}/user/delete/${id}`)
    }

})