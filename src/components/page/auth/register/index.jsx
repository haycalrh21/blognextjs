import AuthLayout from "@/components/layout/Authlayout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

import authServices from "@/services/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";

const FormRegister = () => {
	const { push } = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = event.target;
		const data = {
			fullname: form.fullname.value,
			email: form.email.value,
			
			password: form.password.value,
		};
		if(data.password.length<1){
			setErrorMessage("Passwordnya harus lebih dari 6 ya gan ");
			return;
		}
		try {
			setIsLoading(true);
			const result = await authServices.registerAccount(data);
			setIsLoading(false);

			if (result.status === 200) {
				form.reset();
				push("/auth/login");
			} else {
				setErrorMessage("Registration failed");
			}
		} catch (error) {
			
			setErrorMessage("Terjadi kesalahan saat mendaftar");
			setIsLoading(false);
		}
	};

	useEffect(()=>{
		setTimeout(() => {
			setErrorMessage('')
		}, 1000);
	},[errorMessage])
	return (
		<AuthLayout
			title='Register'
			link='/auth/login'
			linktext='sudah punya akun?'
		>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<Input
					label='Fullname'
					name='fullname'
					type='text'
					placeholder='Fullname'
				/>
				<Input label='Email' name='email' type='email' placeholder='Email' />
	
				<Input
					label='Password'
					name='password'
					type='password'
					placeholder='Password'
				/>
				<Button
					type='submit'
					variant='primary'
					disabled={isLoading}
					className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center'
				>
					{isLoading ? "Loading..." : "Register"}
				</Button>
				{errorMessage && <p className='text-red-500'>{errorMessage}</p>}
			</form>
		</AuthLayout>
	);
};

export default FormRegister;
