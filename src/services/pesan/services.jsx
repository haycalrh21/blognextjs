import { addData, retrieveDataByField } from "@/lib/firebase/services";

export async function addPesan(pesanData, callback) {
	const data = await retrieveDataByField("pesans", "pesan", pesanData.pesan);
if(pesanData.pesan.length <5){
	callback(false);

}

console.log(pesanData.pesan)
	if (data.length > 0) {
		callback(false);
	} else {
		const created_at = new Date();

		const updated_at = new Date();

		
		const messageObject = {
			...pesanData,
			created_at,

			updated_at,
		};

		addData("pesans", messageObject, () => {
			callback(true);
		});
	}
}
