import {
	addData,
	deleteData,
	retrieveDataByField,
} from "@/lib/firebase/services";
import bcrypt from "bcrypt";

export async function signUp(userData, callback) {
	const data = await retrieveDataByField("users", "email", userData.email);

	if (data.length > 0) {
		callback(true);
	} else {
		if (!userData.role) {
			userData.role = "user";
		}
	
		userData.password = await bcrypt.hash(userData.password, 1);
		userData.created_at = new Date();
		userData.updated_at = new Date();
		addData("users", userData, () => {
			callback(true);
		});
	}
}

export async function signIn(email) {
	const data = await retrieveDataByField("users", "email", email);

	if (data) {
		return data[0];
	} else {
		return null;
	}
}

export async function loginWithGoogle(data, callback) {
	const user = await retrieveDataByField("users", "email", data.email);

	if (user.length > 0) {
		callback(user[0]);
	} else {
		data.role = "user";
		data.created_at = new Date();
		data.updated_at = new Date();
		data.password = "";
		await addData("users", data, (result) => {
			if (result) {
				callback(data);
			}
		});
	}
}

export async function deleteUser(userId) {
	try {
		// Check if user exists
		const userData = await retrieveDataByField("users", userId);
		console.log(userData);
		if (!userData) {
			throw new Error("User not found");
		}

		// Delete user data
		const deleteResult = await deleteData("users", userId);

		if (deleteResult) {
			return true; // Indicate successful deletion
		} else {
			throw new Error("Failed to delete user data");
		}
	} catch (error) {
		console.error("Error deleting user:", error);
		throw error;
	}
}
