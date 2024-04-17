import AdminLayout from "@/components/layout/AdminLayout";
import { useSession } from "next-auth/react";

export default function AdminPesanLayout({ pesan }) {
	const session = useSession();

	return (
		<AdminLayout>
			<h1>User Page</h1>

			<div className='overflow-x-auto'>
				<div className='min-w-screen'>
					<div className='mt-4'>
						<table className='border-collapse w-full'>
							<thead>
								<tr className='bg-gray-200'>
									<th className='px-1 text-left'>No</th>
									<th className='px-4 py-2 text-left'>Name</th>
									<th className='px-4 py-2 text-left'>Email</th>
									<th className='px-4 py-2 text-left'>Pesan</th>

									<th className='px-4 py-2 text-left'>aksi</th>
								</tr>
							</thead>
							<tbody>
								{pesan.map((item, index) => (
									<tr
										key={index}
										className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
									>
										<td className='px-4 py-2'>{index + 1}</td>
										<td className='px-4 py-2'>{item.name}</td>

										<td className='px-4 py-2'>{item.email}</td>

										<td className='px-4 py-2'>{item.pesan}</td>
										<td className='px-4 py-2'>
											<button
												onClick={() => handleDelete(item.id)}
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
