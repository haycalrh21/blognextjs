import { retrieveData, updataData } from "@/lib/firebase/services";
import { useSession } from "next-auth/react";
import jwt from "jsonwebtoken";


export default async function handler(req, res) {
	if (req.method === "GET") {
		if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
			return res.status(401).json({ statusCode: 401, status: false, message: "Unauthorized: Missing token" });
		}
	
		const token = req.headers.authorization.split(" ")[1];
		try {
			const decodedToken = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
			if (decodedToken.role !== "admin") {
				return res.status(403).json({ statusCode: 403, status: false, message: "Unauthorized: Insufficient privileges" });
			}
	
			// Ambil data dari collection (tabel Firebase)
			const users = await retrieveData("users");
	
			// Mapping dan memfilter password users
			const data = users.map((user) => {
				delete user.password;
				delete user.phone;
				return user;
			});
	
			res.status(200).json({ statusCode: 200, status: true, message: "success", data });
		} catch (error) {
			console.log(error);
			return res.status(403).json({ statusCode: 403, status: false, message: "Unauthorized: Invalid token" });
		}
	}
	 else if (req.method === "PUT") {
		const { id, data } = req.body;
		await updataData("users", id, data, (result) => {
			if (result) {
				res
					.status(200)
					.json({ statusCode: 200, status: true, message: "success" });
			} else {
				res
					.status(400)
					.json({ statusCode: 400, status: false, message: "failed" });
			}
		});
	}
}
