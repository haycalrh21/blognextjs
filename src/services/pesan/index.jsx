import instance from "@/lib/axios/instance";

export const newMessage = {
	bikinPesan: (data) => instance.post("/api/message/register", data),
};

export default newMessage;
