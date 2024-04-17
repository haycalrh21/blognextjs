import { retrieveData } from "@/lib/firebase/services";

export default async function handler(req, res) {
	if (req.method === "GET") {
		
		const comments = await retrieveData("comments");

		//mapping
		const data = comments.map((comment) => {
			return comment;
		});

		res
			.status(200)
			.json({ statusCode: 200, status: true, message: "success", data });
	}
}
