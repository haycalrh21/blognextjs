import AuthLayout from "@/components/layout/Authlayout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { BsGoogle } from "react-icons/bs";

const FormLogin = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { push, query } = useRouter();
	const[pesanerror,setPesanError]= useState("")
	const callbackUrl = query.callback || "/";

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		const form = event.target;

		try {
			const res = await signIn("credentials", {
				email: form.email.value,
				password: form.password.value,
				callbackUrl: callbackUrl,
				redirect: false,
			});
			setIsLoading(false);


			// setPesanError("kayanya ada yg salah tuh ")

			if (!res?.error) {
				push(callbackUrl);
			} else {
			setPesanError("Kayanya ada yg salah tuh  ")

				console.error("Error during sign in:", res.error);
			}
		} catch (error) {
			console.error("Error during sign in:", error);
		}
	};
useEffect(()=>{
	if(pesanerror){
		setTimeout(() => {
			setPesanError("")
		}, 1000);
	}
})
	return (
		<AuthLayout
			title='Login'
			link='/auth/register'
			linktext='Belum Punya akun?'
		>
			<div className=''>
				<form onSubmit={handleSubmit}>
					<div className='flex flex-col gap-4'>
						<Input
							label='Email'
							name='email'
							type='email'
							placeholder='Email'
						/>
						<Input
							label='Password'
							name='password'
							type='password'
							placeholder='Password'
						/>
						{pesanerror && <p className="text-red-500">{pesanerror}</p>}
						<Button type='submit' variant='primary'>
							{isLoading ? "Logging in..." : "Login"}
						</Button>
						<button
							type='button'
							onClick={() => signIn("google", { callbackUrl, redirect: false })}
							className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center'
						>
							<BsGoogle className='w-5 h-4 mr-3' />
							Google
						</button>
					</div>
				</form>
			</div>
		</AuthLayout>
	);
};

export default FormLogin;
