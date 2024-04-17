import { uploadFile } from "@/lib/firebase/services";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Modal = (props) => {

	const session = useSession()
	console.log(session)
	const { isOpen, onClose, onSubmit, blogId } = props;
	const [judul, setJudul] = useState("");
	const [isi, setIsi] = useState("");
	const [author, setAuthor] = useState("");
	const [isPublish, setIsPublish] = useState(false);
	const [isPremium, setIsPremium] = useState(false);
	const [image, setImage] = useState(null);

	const handleChangeJudul = (event) => {
		setJudul(event.target.value);
	};

	const handleChangeIsi = (event) => {
		setIsi(event.target.value);
	};

	const handleChangeAuthor =(event)=>{
		setAuthor(event.target.value)
	}

	const handleChangePublish = (event) => {
		setIsPublish(event.target.checked);
	};

	const handleChangePremium = (event) => {
		setIsPremium(event.target.checked);
	};

	const handleChangeImage = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const selectedFile = event.target.files[0];
			setImage(selectedFile);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!image) {
			console.error("No image selected");
			return;
		}

		try {
			const downloadURL = await uploadFile(image, blogId); // Menggunakan blogId dalam pemanggilan fungsi uploadFile
			onSubmit({ judul, isi,author, isPublish, isPremium, image: downloadURL });
		} catch (error) {
			console.error("Error uploading image:", error);
		}
	};
    useEffect(() => {
        if (session.data) {
            setAuthor(session.data.user?.fullname || ""); // Mengatur nilai author saat komponen dimuat
        }
    }, [session.data]);
	return (
		<>
			{isOpen && (
				<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>
					<div className='bg-white p-6 rounded-lg shadow-lg'>
						<form onSubmit={handleSubmit} className='max-w-lg mx-auto'>
						<div className='mb-4'>
								<label htmlFor='author' className='block text-gray-700'>
									Author:
								</label>
								<input
									type='text'
									name='author'
									id='author'
									value={author}
									onChange={handleChangeAuthor}
									className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
								/>
							</div>
							<div className='mb-4'>
								<label htmlFor='judul' className='block text-gray-700'>
									Judul:
								</label>
								<input
									type='text'
									name='judul'
									id='judul'
									value={judul}
									onChange={handleChangeJudul}
									className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
								/>
							</div>
							<div className='mb-4'>
								<label htmlFor='isi' className='block text-gray-700'>
									Isi:
								</label>
								<textarea
									name='isi'
									id='isi'
									value={isi}
									onChange={handleChangeIsi}
									className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
									rows={5}
								></textarea>
							</div>
							<div className='mb-4'>
								<label htmlFor='image' className='block text-gray-700'>
									Image:
								</label>
								<input
									type='file'
									accept='image/*'
									name='image'
									id='image'
									onChange={handleChangeImage}
									className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
								/>
							</div>
							<div className='mb-4'>
								<label className='inline-flex items-center'>
									<input
										type='checkbox'
										name='isPublish'
										checked={isPublish}
										onChange={handleChangePublish}
										className='form-checkbox h-5 w-5 text-blue-600'
									/>
									<span className='ml-2 text-gray-700'>Dipublikasikan</span>
								</label>
							</div>
							<div className='mb-4'>
								<label className='inline-flex items-center'>
									<input
										type='checkbox'
										name='isPremium'
										checked={isPremium}
										onChange={handleChangePremium}
										className='form-checkbox h-5 w-5 text-blue-600'
									/>
									<span className='ml-2 text-gray-700'>Premium</span>
								</label>
							</div>
							<div className='flex justify-end'>
								<button
									onClick={onClose}
									className='mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none'
								>
									Cancel
								</button>
								<button
									type='submit'
									className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none'
								>
									Tambah Blog
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
