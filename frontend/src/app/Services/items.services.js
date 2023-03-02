import axios from 'axios';
import BaseUrl from './baseUrl';
const baseUrl = BaseUrl();

export default new(class Item_Service{
        getAllItems(){
            return axios.get(`${baseUrl}/item/all`);
        }
        getAnItem(id){
            return axios.get(`${baseUrl}/item/${id}`)
        }
        
})

