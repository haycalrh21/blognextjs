import { retrieveData, updataData } from "@/lib/firebase/services";

export default async function handler(req, res) {
	if (req.method === "GET") {
		//ambil data dari collection(table firebase)
		const blogs = await retrieveData("blogs");

		//mapping
		const data = blogs.map((blog) => {
			return blog;
		});

		res
			.status(200)
			.json({ statusCode: 200, status: true, message: "success", data });
	}
}
