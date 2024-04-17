import instance from "@/lib/axios/instance";

export const userServices = {
    getAll: (status, token) => {
        if (status === 'authenticated') {
            return instance.get('/api/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } else {
            // Tangani kasus ketika status tidak terotentikasi
            throw new Error("User is not authenticated");
        }
    },
    getId: (id) => instance.get(`/api/user/${id}`),
    deleteData: (id, token) =>
        instance.delete(`/api/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
};

export default userServices;
