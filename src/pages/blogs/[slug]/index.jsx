import { useRouter } from 'next/router';

import blogServices from "@/services/blog/data";
import { useEffect, useState } from "react";
import BlogSlug from '@/components/page/BlogSlug';

const SlugBlog = () => {
    const [slug, setSlug] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { slug: slugFromQuery } = router.query; // Mengambil slug dari URL
                if (slugFromQuery) {
                    const slugString = Array.isArray(slugFromQuery) ? slugFromQuery[0] : slugFromQuery;
                    const { data } = await blogServices.getBySlug(slugString);
                    setSlug(data.data);
                }
            } catch (error) {
                console.error('Error fetching blog by slug:', error);
            }
        };

        fetchData();
    }, [router.query]); // Merekam perubahan pada router.query

    return (
        <>{slug && <BlogSlug slug={slug} />}</> // Menampilkan BlogSlug hanya jika slug tersedia
    );
};

export default SlugBlog;
