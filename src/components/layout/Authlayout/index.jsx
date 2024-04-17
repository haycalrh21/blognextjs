import Link from "next/link";

const AuthLayout = ({ children, title, link, linktext }) => {
	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div className='w-full max-w-md p-6 rounded-lg shadow-md bg-white'>
				{title && <h1 className='text-3xl pb-5 text-center'>{title}</h1>}
				<div className='flex flex-col gap-4'>{children}</div>
				{linktext && (
					<p className='mt-3 text-center'>
						<Link href={link} className='text-blue-500'>
							{linktext}
						</Link>
					</p>
				)}
			</div>
		</div>
	);
};

export default AuthLayout;
