
import axios from 'axios';

const margaretApi = axios.create({
    baseURL: '/api'
});


export default margaretApi;