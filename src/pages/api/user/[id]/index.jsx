import { deleteData, retrieveDataById } from "@/lib/firebase/services";
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
	
			if (req.query.id) {
				const userId = req.query.id;
				const user = await retrieveDataById("users", userId);
	
				if (user) {
					delete user.password;
					delete user.phone;
					delete user.role;
	
					return res.status(200).json({
						statusCode: 200,
						status: true,
						message: "Success",
						data: user,
					});
				} else {
					return res.status(404).json({ statusCode: 404, status: false, message: "User not found" });
				}
			}
		} catch (error) {
			console.log(error);
			return res.status(403).json({ statusCode: 403, status: false, message: "Unauthorized: Invalid token" });
		}
	}
	 else if (req.method === "DELETE") {
		const userId = req.query.id;
		const token = req.headers.authorization?.split(" ")[1] || "";

		try {
			const decodedToken = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
			if (decodedToken.role !== "admin") {
				return res.status(403).json({ statusCode: 403, status: false, message: "Unauthorized" });
			}

			await deleteData("users", userId);
			res.status(200).json({
				statusCode: 200,
				status: true,
				message: "success",
				data: null,
			});
		} catch (error) {
			console.error("Error deleting user:", error);
			res.status(500).json({ statusCode: 500, status: false, message: "Internal server error" });
		}
	} else {
		res.status(405).json({ statusCode: 405, status: false, message: "Method Not Allowed" });
	}
}
