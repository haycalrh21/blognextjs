// Di BlogSlug
import React, { useState, useEffect } from "react";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { unified } from "unified";
import { useSession } from "next-auth/react";
import { addKomen } from "@/services/blog/services";
import { useRouter } from "next/router";
import CardComment from "@/components/ui/cardcomment";
import axios from "axios";

const BlogSlug = ({ slug }) => {
  const [isiHTML, setIsiHTML] = useState(null);
  const session = useSession();
  const router = useRouter();
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    comment: "",
  });
  const [komenState, setKomenState] = useState([]); // Ubah nama state menjadi "komenState"


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const commentData = {
        ...formData,
        user: user,
        blogId: slug.id,
      };
      const response = await addKomen(commentData);
      if (response.data) {
        setLoading(false);
        setFormData({ comment: "" });

        // Memperbarui state komenState dengan komentar yang baru ditambahkan
  
      } else {
        // Tangani kesalahan jika respons tidak mengandung data yang diharapkan
      }
    } catch (error) {
      // Tangani kesalahan dari penambahan komentar
    } finally {
      setLoading(false);
    }
  };

  const updateKomenState = async () => {
    try {
      const response = await axios.get("/api/comment");
      if (response.data && response.data.data) {
        const filteredComments = response.data.data.filter(
          comment => comment.blogId === slug.id
        );
        setKomenState(filteredComments);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(
    () => {
   
      if (session.data) {
        setUser(session.data?.user.fullname || "");
      };
      const convertMarkdownToHtml = async () => {
        if (!slug) return;

        const { isi } = slug;
        const processedContent = await unified()
          .use(remarkParse)
          .use(remarkHtml)
          .process(isi);
        const htmlString = processedContent.toString();
        setIsiHTML(htmlString);
      };

      convertMarkdownToHtml();

      updateKomenState()
        const intervalId = setInterval(updateKomenState, 5000); // Panggil updateKomenState setiap 5 detik
  return () => clearInterval(intervalId); 
    },
    [session.data, slug]
  );

  if (!slug) {
    return <div>Loading...</div>;
  }



  const { judul, isPremium, isPublish, image, author } = slug;

  const renderPremiumContent = () => {
    if (isPremium && isPublish) {
      return (
        <div>
          <p className="text-white">
            Konten ini hanya tersedia untuk pelanggan premium. Silakan klik
            tombol di bawah ini untuk melihat konten:
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Bayar untuk melihat
          </button>
        </div>
      );
    } else if (!isPublish) {
      return <p>Konten ini tidak tersedia.</p>;
    } else {
      return (
        <div>
          <div>
            <h1 className="text-black text-3xl font-bold mb-4 mb-4">{judul}</h1>
            <p className="">Penulis: {author}</p>
            <div className="flex justify-center items-center mt-4">
              <div className="artboard artboard-horizontal phone-6">
                {image && (
                  <img
                    src={image}
                    alt="Blog Image"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>
            {isiHTML && (
              <div
                className="text-black prose prose-slate mt-10"
                dangerouslySetInnerHTML={{ __html: isiHTML }}
              />
            )}
          </div>
         
          <div>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <label>Comment</label>
              <input
                type="text"
                name="comment"
                id="comment"
                value={formData.comment}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              {!session || session.status === "unauthenticated" ? (
                <p className="text-red-500">Silahkan login terlebih dahulu</p>
              ) : (
                <>

                  <button className="bg-red-500 rounded-md px-4 py-2 mt-4 hover:bg-red-600 text-white">{loading ? "loading" : "Submit"}

                  </button>
                </>

              )}
            </form>
          </div>
          <div>
            <CardComment komenState={komenState} />

          </div>
        </div>
      );
    }
  };

  return <div className="p-8 rounded-lg">{renderPremiumContent()}</div>;
};

export default BlogSlug;
