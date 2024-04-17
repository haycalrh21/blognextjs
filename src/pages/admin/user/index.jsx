import AdminUserLayout from '@/components/page/admin/user';
import userServices from '@/services/auth/user';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export default function AdminUserPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      if (status === 'authenticated') {
        const token = session?.accessToken;
        const result = await userServices.getAll(status, token);
        setUsers(result.data.data);
     

      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
  
    const fetchData = async () => {
      try {
        if (status === 'authenticated') {
          const token = session?.accessToken;
          const result = await userServices.getAll(status, token);
          setUsers(result.data.data);
       
  
        }
        fetchData();
      } catch (error) {
        console.log(error);
      }
    };

  }, []);

  return <AdminUserLayout data={{ users:users,fetchData:fetchData }} />;
}
