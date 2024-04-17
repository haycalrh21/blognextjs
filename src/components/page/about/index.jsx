import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

import Loading from "@/pages/loading";

const AboutPage = () => {
	const [data, setData] = useState(null);
	const [repo, setRepoData] = useState([]);

	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://api.github.com/users/haycalrh21"
				);
				const repoResponse = await axios.get(
					"https://api.github.com/users/haycalrh21/repos"
				);
				setData(response.data);
				setRepoData(repoResponse.data);
				setTimeout(() => {
					setLoaded(true);
				}, 1000);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 m-0'>
			{/* Bio Card */}
			{!loaded ? (
				<Loading />
			) : (
				<>
				<div className='lg:col-span-1 sm:col-span-4'>
						<div className='bg-black shadow-md rounded-lg p-6'>
							<h1 className='text-2xl font-bold mb-4 text-white'>Tentang Website ini </h1>
							<div className='flex items-center mb-4'>
								<p className="text-white">
									Website ini di buat menggunakan Next.js dan dengan database firebase.
								</p>
							</div>
						</div>
					</div>
					<div className='lg:col-span-1 sm:col-span-4'>
						<div className='bg-black shadow-md rounded-lg p-6'>
							<h1 className='text-2xl font-bold mb-4 text-white'>Bio</h1>
							<div className='flex items-center mb-4'>
								<div className='w-16 h-16 rounded-full overflow-hidden mr-4'>
									<Image
										src={data.avatar_url}
										width={64}
										height={64}
										alt='Avatar'
									/>
								</div>
								<div>
									<h2 className='text-xl font-bold text-white'>{data?.name}</h2>
									<p className='text-white'>{data?.bio}</p>
								</div>
							</div>
						</div>
					</div>

					<div className='lg:col-span-1 sm:col-span-4'>
						<div className='bg-black shadow-md rounded-lg p-6'>
							<h1 className='text-2xl font-bold mb-4 text-white'>CV</h1>
							<div className='flex items-center mb-4'>
								<a href='/cv.pdf' download className='text-white'>
									<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
										Download
									</button>
								</a>
							</div>
						</div>
					</div>

					{/* Repositories Card */}
					<div className='lg:col-span-1 sm:col-span-2 overflow-x-auto'>
						<div className='bg-black shadow-md rounded-lg p-6'>
							<h1 className='text-2xl font-bold mb-4 text-white'>
								Repositories:
							</h1>
							<ul>
								{repo.map((item) => (
									<li key={item.id} className='text-white mb-2 overflow-hidden'>
										<a
											href={item.html_url}
											target='_blank'
											rel='noopener noreferrer'
											className='truncate'
										>
											{item.full_name}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default AboutPage;
