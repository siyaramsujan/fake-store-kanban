import axios from "axios";

const BASE_URL = import.meta.env.VITE_FAKE_STORE_API_URL;

export const fsClient = axios.create({
    baseURL: BASE_URL, 
    timeout: 10 * 1000,
    headers: {
         "Content-Type": "application/json"   
    }
});


