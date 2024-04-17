import React, { useState, useEffect } from "react";
import Link from "next/link";
import blogServices from "@/services/blog/data";
import Pagination from "@/components/ui/Pagination/Pagination";
import { useMediaQuery } from 'react-responsive';
const BlogCards = () => {
	const [loaded, setLoaded] = useState(false);
	const [blogs, setBlogs] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 8;

	
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await blogServices.getAll();
				// Mengonversi created_at ke dalam bentuk tanggal
				const sortedBlogs = response.data.data.sort((a, b) => {
					const dateA = new Date(a.created_at.seconds * 1000); // Mengalikan dengan 1000 untuk mengubah detik menjadi milidetik
					const dateB = new Date(b.created_at.seconds * 1000);
					return dateB - dateA; // Mengurutkan dari yang terbaru ke yang terlama
				});

				setBlogs(sortedBlogs);
				setTimeout(() => {
					setLoaded(true);
				}, 1000);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();

		return () => {
			setBlogs([]);
			setLoaded(false);
		};
	}, []);
	const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });
	// Ambil indeks awal dan akhir untuk data yang ditampilkan pada halaman saat ini
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

	// Fungsi untuk mengubah halaman saat pengguna mengklik tombol pagination
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className='relative'>
			<div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 m-4 w-full' style={{ alignContent: 'flex-start', justifyContent: 'flex-start', gridAutoFlow: 'dense' }}>

				{!loaded ? (
					<>
						{currentPosts.map((blog) => (
							<div
								key={blog.id}
								className='rounded-lg border border-black bg-white shadow-sm'
							>
								<div className={`skeleton ${isLargeScreen ? 'w-100' : 'w-45'} h-64 bg-gray-200`}></div>

								<div className='p-4 sm:p-2'>
									<div className='skeleton h-6 w-4/5 mb-4 bg-gray-200'></div>
									<div className='skeleton h-4 bg-gray-200'></div>
									<div className='skeleton h-4 mt-2 bg-gray-200'></div>
									<div className='skeleton h-4 mt-2 bg-gray-200'></div>
								</div>
							</div>
						))}
					</>
				) : (
					currentPosts.map((blog) => (
						<div key={blog.id} className='rounded-lg  border-4  border-black bg-white shadow-sm '>
								<div className={`skeleton ${isLargeScreen ? 'w-100' : 'w-45'} h-64 `}>

								<img
									alt={blog.judul}
									src={blog.image}
									className={`h-64 object-center`}
								/>
								</div>
							
								<div className='p-4 sm:p-6'>
									
										<h3 className='text-lg font-medium text-gray-900'>
											{blog.judul}
										</h3>
									
									<Link
										href={`/blogs/${blog.slug}`}
										className='group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600'
									>
										Lanjutkan Membaca
										<span
											aria-hidden='true'
											className='block transition-all group-hover:ms-0.5 rtl:rotate-180'
										>
											&rarr;
										</span>
									</Link>
								</div>

						</div>
					))
				)}
			</div>
			<div className='flex justify-center mt-4'>
				<Pagination
					postsPerPage={postsPerPage}
					totalPosts={blogs.length}
					paginate={paginate}
				/>
			</div>
		</div>
	);
};

export default BlogCards;
