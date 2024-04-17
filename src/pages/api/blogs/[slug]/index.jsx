import jwt from "jsonwebtoken";
import { deleteData, retrieveData, retrieveDataById } from "@/lib/firebase/services";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { slug } = req.query;
console.log(slug)
        if (!slug || typeof slug !== "string") {
            return res.status(400).json({
                statusCode: 400,
                status: false,
                message: "Invalid or missing slug",
            });
        }

        try {
            const blogs = await retrieveData("blogs");
            const filteredBlog = blogs.find((blog) => blog.slug === slug);

            if (!filteredBlog) {
                return res.status(404).json({
                    statusCode: 404,
                    status: false,
                    message: "Blog not found",
                });
            }

            return res.status(200).json({
                statusCode: 200,
                status: true,
                message: "Success",
                data: filteredBlog,
            });
        } catch (error) {
            console.error("Error retrieving blogs:", error);
            return res.status(500).json({
                statusCode: 500,
                status: false,
                message: "Internal Server Error",
            });
        }
    }else  if (req.method === "DELETE") {
        const { slug } = req.query;
        const token = req.headers.authorization?.split(" ")[1] || "";

        try {
            const decodedToken = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
            if (decodedToken.role !== "admin") {
                return res.status(403).json({ statusCode: 403, status: false, message: "Unauthorized" });
            }

            await deleteData("blogs", slug);


            return res.status(200).json({
                statusCode: 200,
                status: true,
                message: "Success",
                
            });
        } catch (error) {
            console.error("Error deleting blog:", error);
            return res.status(500).json({
                statusCode: 500,
                status: false,
                message: "Internal Server Error",
            });
        }
    } else {
        return res.status(405).json({
            statusCode: 405,
            status: false,
            message: "Method Not Allowed",
        });
    }
}    