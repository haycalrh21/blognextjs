import instance from "@/lib/axios/instance";

export const blogServices = {
	getAll: () => {
		return new Promise((resolve, reject) => {
			setTimeout(async () => {
				try {
					const response = await instance.get("/api/blogs");
					resolve(response);
				} catch (error) {
					reject(error);
				}
			}, 1000); // Delay 3 detik
		});/*  */
	},
	getBySlug: (slug) => instance.get(`/api/blogs/${slug}`),
	getById: (id) => instance.get(`/api/blogs/${id}`),
	deleteBlog:  (slug, token) => {
      
             instance.delete(`/api/blogs/${slug}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

    }
	
};

export default blogServices;
