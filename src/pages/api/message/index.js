import { retrieveData } from "@/lib/firebase/services";

export default async function handler(req, res) {
	if (req.method === "GET") {
		//ambil data dari collection(table firebase)
		const pesan = await retrieveData("pesans");

		//mapping dan memfilter password users
		const data = pesan.map((pesan) => {
			// delete pesan.email;
			return pesan;
		});

		res
			.status(200)
			.json({ statusCode: 200, status: true, message: "success", data });
	}
}
