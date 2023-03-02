import axios from 'axios';
import BaseUrl from './baseUrl';
const baseUrl = BaseUrl();

export default new(class Admin_Service{
        adminLogin(data){
            return axios.post(`${baseUrl}/admin/login`,data);
        }
})