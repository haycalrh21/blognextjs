import BlogSlug from "../components/BlogSlug";

function MyPage() {
	// Contoh data slug
	const slugData = {
		judul: "Judul Blog",
		isi: "Konten **Markdown**",
		isPremium: false,
		isPublish: true,
		image: "https://example.com/image.jpg",
	};

	return (
		<div>
			<BlogSlug slug={slugData} />
		</div>
	);
}

export default MyPage;
