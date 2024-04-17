// AdminLayout.jsx
import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminLayout({ children, showTitle }) {
	const [open, setIsOpen] = useState(false);

	return (
		<div className='flex'>
			<div
				className={`relative ${
					open ? "w-72" : "w-20"
				} duration-300 p-5 pt-8 bg-red-500 h-screen`}
			>
				<p
					className={`absolute cursor-pointer p-3 top-9 right-0 w-3 border-2 border-black ${
						!open && "rotate-180"
					}`}
					onClick={() => setIsOpen(!open)}
				>
					&gt;
				</p>
				<div className='flex flex-col'>
					<Link
						href={"/admin"}
						className={`text-white origin-left font-medium text-xl duration-200 ${
							!open && "scale-0"
						}`}
					>
						AdminDashboard
					</Link>
					<ul
						className={`text-white origin-left mt-4 font-medium text-xl duration-200 ${
							!open && "scale-0"
						}`}
					>
						<li>
							<Link
								href={"/admin/user"}
								className='text-white origin-left  duration-200'
							>
								User
							</Link>
						</li>
						<li>
							<Link
								href={"/admin/blog"}
								className='text-white origin-left  duration-200'
							>
								Blog
							</Link>
						</li>
						<li>
							<Link
								href={"/admin/pesan"}
								className='text-white origin-left  duration-200'
							>
								Pesan
							</Link>
						</li>
					</ul>
				</div>
				<button
					onClick={() => signOut()}
					className={`text-white font-medium text-xl mb-4 absolute bottom-0 ${
						!open && "scale-0"
					}`}
				>
					Logout
				</button>
			</div>
			<div className='p-10  w-full'>
				{showTitle && <h1>Admin Dashboard</h1>}
				{children}
			</div>
		</div>
	);
}
