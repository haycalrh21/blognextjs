import instance from "@/lib/axios/instance";

const authServices = {
    registerAccount: (userData) => instance.post('/api/user/register', userData),
    // login :(data:any)=> instance.post('/auth/login', data
};

export default authServices;