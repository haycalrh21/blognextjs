import instance from "@/lib/axios/instance";


export const newBlog = {
    bikinBlog: (data) => instance.post('/api/blogs/register', data),
   
}



export default newBlog;