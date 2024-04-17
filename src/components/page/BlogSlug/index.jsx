import React, { useState, useEffect } from "react";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { unified } from "unified";

const BlogSlug = ({ slug }) => {
	const [isiHTML, setIsiHTML] = useState(null);

	useEffect(() => {
		const convertMarkdownToHtml = async () => {
			if (!slug) return;

			const { isi } = slug;
			const processedContent = await unified()
				.use(remarkParse)
				.use(remarkHtml)
				.process(isi);
			const htmlString = processedContent.toString();
			setIsiHTML(htmlString);
		};

		convertMarkdownToHtml();
	}, [slug]);

	if (!slug) {
		return <div>Loading...</div>;
	}

	const { judul, isPremium, isPublish, image } = slug;

	// Fungsi untuk menampilkan tombol pembayaran jika konten premium
	const renderPremiumContent = () => {
		if (isPremium && isPublish) {
			return (
				<div>
					<p className='text-white'>
						Konten ini hanya tersedia untuk pelanggan premium. Silakan klik
						tombol di bawah ini untuk melihat konten:
					</p>
					<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
						Bayar untuk melihat
					</button>
				</div>
			);
		} else if (!isPublish) {
			return <p>Konten ini tidak tersedia.</p>;
		} else {
			return (
				<div>
					<h1 className='text-black text-3xl font-bold mb-4 mb-4'>{judul}</h1>
					<div className='flex justify-center items-center mt-4'>
						<div className='artboard artboard-horizontal phone-6'>
							{image && (
								<img
								src={image}
								alt='Blog Image'
								className='w-full h-full object-contain'
							/>
							
							)}
						</div>
					</div>
					{/* Tampilkan konten HTML hasil konversi Markdown jika sudah tersedia */}
					{isiHTML && (
						<div
							className='text-black prose prose-slate mt-10'
							dangerouslySetInnerHTML={{ __html: isiHTML }}
						/>
					)}
					{/* Menampilkan gambar jika URL gambar tersedia */}
				</div>
			);
		}
	};

	return <div className='p-8 rounded-lg'>{renderPremiumContent()}</div>;
};

export default BlogSlug;
