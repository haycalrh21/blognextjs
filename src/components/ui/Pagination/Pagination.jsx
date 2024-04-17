import { useRouter } from "next/router";
import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const router = useRouter();
    const { pathname, query } = router;
    const pageNumbers = [];

    // Hitung jumlah halaman berdasarkan total data dan data per halaman
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        const currentPage = pageNumber === 1 ? null : { page: pageNumber }; 
        router.push({
            pathname: pathname,
            query: currentPage
        });
        paginate(pageNumber);
    };

    return (
        <div className='join'>
            {/* Tampilkan tombol pagination untuk setiap halaman */}
            {pageNumbers.map((number) => (
                <input
                    key={number}
                    className='join-item btn btn-square'
                    type='radio'
                    name='options'
                    aria-label={number}
                    checked={query.page ? parseInt(query.page) === number : number === 1} // Tambahkan properti checked untuk menandai halaman yang sedang aktif
                    onClick={() => handlePageChange(number)}
                />
            ))}
        </div>
    );
};

export default Pagination;
