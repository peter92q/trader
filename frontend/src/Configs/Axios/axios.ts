import axios, { AxiosResponse } from 'axios';
import { store } from '../Redux/store';

 
axios.defaults.baseURL = "http://localhost:5223/api";

const responseBody = (response: AxiosResponse) => response.data;

//--authentication--//
axios.interceptors.request.use(config =>{
    const token = store.getState().account.user?.Token; 
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})
//----------------//

 
const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    delete:(url: string) => axios.delete(url).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody)
}
  
const agent = {
    requests
}

export default agent;