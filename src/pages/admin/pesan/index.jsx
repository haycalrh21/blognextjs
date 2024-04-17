import AdminPesanLayout from "@/components/page/admin/pesan";

import messageServices from "@/services/pesan/data";

import React, { useEffect, useState } from "react";

export default function AdminPesanPage() {
	const [pesan, setPesan] = useState([]);
	useEffect(() => {
		const getAll = async () => {
			const { data } = await messageServices.getAll();
			setPesan(data.data);
		};
		getAll();
	}, []);

	return <AdminPesanLayout pesan={pesan} />;
}
