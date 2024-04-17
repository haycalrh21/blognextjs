import { signUp } from '@/services/auth/services';

export default async function handler(req, res) {
    if (req.method === "POST") {
        await signUp(req.body, (status) => {
            if (status) {
                res.status(200).json({ status: true });
            } else {
                res.status(400).json({ status: false });
            }
        });
    } else {
        res.status(405).json({ status: false, message: "Method not allowed" });
    }
}