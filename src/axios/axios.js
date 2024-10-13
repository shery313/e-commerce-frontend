import axios from 'axios';


const apiInstance=axios.create({
    baseURL:'https://vivify-backend-2e2a6dca838b.herokuapp.com/api/v1/',
    // baseURL:'http://127.0.0.1:8000/api/v1/',
    timeout:50000,
    headers:{
        'Content-Type':'application/json',
        Accept:'application/json',
    }
})

export default apiInstance;