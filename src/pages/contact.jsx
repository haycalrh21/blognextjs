import { useEffect, useRef, useState } from "react";
import newMessage from "@/services/pesan";
import { useRouter } from "next/router";

export default function Contact() {
	const { push } = useRouter();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		pesan: "",
	});
	const formRef = useRef(null);
	const [berhasil, setBerhasil] = useState(false);
	const[pesanerror,setPesanError]= useState("")

	const [loading, setLoading] = useState(false); // Awalnya diatur ke false

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true); // Set loading ke true saat mengirim data
		try {
			const result = await newMessage.bikinPesan(formData);
			if (result.status === 200) {
				// Reset formulir menggunakan formRef
				formRef.current.reset();
				// Perbarui state formData setelah formulir direset
				setFormData({
					name: "",
					email: "",
					pesan: "",
				});
				setBerhasil(true);
				setPesanError(""); // Set pesan error menjadi kosong
	
				
				
			} else {
			
	
				console.log("coba lagi deh ");
			}
		} catch (error) {
			console.log("terjadi kesalahan", error);
			setPesanError("Terjadi kesalahan saat mengirim pesan");
		} finally {
			setLoading(false); // Set loading kembali ke false setelah pengiriman selesai
		}
	};
	
	useEffect(()=>{
		setTimeout(() => {
			setPesanError("");
			setBerhasil(false);
		},3000)
	})

	return (
		<div className='flex flex-col items-center justify-between p-20'>
			<h1 className='text-3xl font-bold mb-4 text-black'>Contact Me</h1>

			<div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 m-0'>
				
				<div className='lg:col-span-1 sm:col-span-2'>
					<form onSubmit={handleSubmit} ref={formRef}>
						<div className='bg-black shadow-md rounded-lg p-6'>
			<h2 className='text-3xl font-bold mb-4 text-white'>Fitur ini berfungsi.</h2>
						
							<div className='mb-4'>
								<label
									htmlFor='name'
									className='block text-lg font-bold text-white'
								>
									Nama:
								</label>
								<input
									type='text'
									id='name'
									name='name'
									value={formData.name}
									onChange={handleChange}
									className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg'
									required
								/>
							</div>
							<div className='mb-4'>
								<label
									htmlFor='email'
									className='block text-lg font-bold text-white'
								>
									Email:
								</label>
								<input
									type='email'
									id='email'
									name='email'
									value={formData.email}
									onChange={handleChange}
									className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg'
									required
								/>
							</div>
							<div className='mb-4'>
								<label
									htmlFor='pesan'
									className='block text-lg font-bold text-white'
								>
									Pesan:
								</label>
								<textarea
									id='pesan'
									name='pesan'
									value={formData.pesan}
									onChange={handleChange}
									rows='4'
									className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg'
									required
								></textarea>
							</div>
							<button
								type='submit'
								disabled={loading} // Tombol dinonaktifkan saat loading
								className={`bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded ${
									loading ? "cursor-not-allowed" : ""
								}`} // Kursor diubah saat loading
							>
								{loading ? "Loading..." : "Submit"}{" "}
							</button>
							{pesanerror && <p className='text-white'>Pesan tidak terkirim</p>}

							{berhasil && <p className='text-white'>berhasil terkirim</p>}
						</div>
					</form>
				</div>

				<div className='lg:col-span-1 sm:col-span-1'>
					<div className='bg-black shadow-md rounded-lg p-6'>
						<h1 className='text-2xl font-bold mb-4 text-white'>Support ?</h1>
						<img
							src='/qr.png'
							alt='qrcode'
							width={300}
							height={300}
							className='m-0'
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
