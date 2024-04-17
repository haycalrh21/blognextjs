import AdminLayout from "@/components/layout/AdminLayout";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "./modal";
import { useRouter } from "next/router";
import newBlog from "@/services/blog";
import blogServices from "@/services/blog/data";
import { useSession } from "next-auth/react";
import { deleteBlog } from "@/services/blog/services";

export default function AdminBlogLayout({ blogs }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { push } = useRouter();
	const [blogData, setBlogData] = useState([]); 
	const session = useSession();
	


	const handleSubmitModal = async (data) => {
		try {
			const result = await newBlog.bikinBlog(data);
			if (result.status === 200) {
				push("/admin");
			} else {
				console.error("salah isinya");
			}
		} catch (error) {
			console.error("Terjadi kesalahan:", error);
		}
	};

	const handleDelete = async (slug) => {
		try {
			const result = await deleteBlog(slug, session.data?.accessToken);
			if (result) {
				setBlogData((prevBlogs) => prevBlogs.filter((blog) => blog.slug !== slug));
			}
		} catch (error) {
			console.log(error);
		}
	};


	  useEffect(()=>{
		setBlogData(blogs)
	  })
	return (
		<AdminLayout>
			<h1 className=''>Blog Page</h1>
			<button onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Buat Blog</button>
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleSubmitModal}
			/>
			<div className='overflow-x-auto'>
				<div className='min-w-screen'>
					<div className='mt-4'>
						<table className='border-collapse w-full'>
							<thead>
								<tr className='bg-gray-200'>
									<th className='px-1 text-left'>No</th>
									<th className='px-4 py-2 text-left'>Gambar</th>
									<th className='px-4 py-2 text-left'>Judul Blog</th>
									<th className='px-4 py-2 text-left'>Isi Blog</th>
									<th className='px-4 py-2 text-left'>Tipe Blog</th>
									<th className='px-4 py-2 text-left'>Publish</th>
									<th className='px-4 py-2 text-left'>aksi</th>
								</tr>
							</thead>
							<tbody>
								{blogs.map((blog, index) => (
									<tr
										key={index}
										className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
									>
										<td className='px-4 py-2'>{index + 1}</td>
										<td className='px-4 py-2'>
											<Image src={blog.image} width={100} height={100} />
										</td>
										<td className='px-4 py-2'>{blog.judul}</td>
										<td className='px-4 py-2'>{blog.isi}</td>
										<td className='px-4 py-2'>
											{blog.isPremium ? "Premium" : "Free"}
										</td>
										<td className='px-4 py-2'>
											{blog.isPublish ? "Publish" : "Draft"}
										</td>
										<td className='px-4 py-2'>
											<button
												onClick={() => handleDelete(blog.slug)}
												className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
											>
												delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}
