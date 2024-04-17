import AdminBlogLayout from '@/components/page/admin/blog'
import blogServices from '@/services/blog/data'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react'

export default function AdminBlogPage() {
  const { data: session, status,token } = useSession();
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (status === 'authenticated') {
          const token = session?.accessToken;
          const result = await blogServices.getAll();
          setBlogs(result.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [session, status,token])

  return (
    <AdminBlogLayout blogs={blogs} />
  )
}
