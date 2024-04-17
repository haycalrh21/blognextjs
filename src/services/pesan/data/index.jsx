import instance from "@/lib/axios/instance";

export const messageServices = {
	getAll: (token) =>
		instance.get("/api/message", {
			headers: {
				Authorization: `bearer ${token}`,
			},
		}),
};

export default messageServices;
