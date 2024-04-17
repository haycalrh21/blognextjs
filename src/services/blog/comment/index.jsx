import instance from "@/lib/axios/instance";


export const newComment = {
    bikinComment: (data) => instance.post('/api/comment/register', data),
   
}



export default newComment;