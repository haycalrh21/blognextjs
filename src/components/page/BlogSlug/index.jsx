import React, { useState, useEffect } from "react";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { unified } from "unified";
import { useSession } from "next-auth/react";
import newComment from "@/services/blog/comment";
import { addKomen } from "@/services/blog/services";
import axios from "axios";
import { useRouter } from "next/router";

const BlogSlug = ({ slug }) => {
  const [isiHTML, setIsiHTML] = useState(null);

  const session = useSession();
  const router = useRouter()

  const [berhasil, setBerhasil] = useState(false);
  const [pesanerror, setPesanError] = useState("");
  const [user,setUser] = useState("")

  const [loading, setLoading] = useState(false); 

  const[komen,setKomen] = useState([])
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
   
  comment:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
	const getKomen = async () => {
	  try {
		const response = await axios.get("/api/comment");
		if (response.data && response.data.data) {
		  // Filter komentar berdasarkan blogId yang sesuai
		  const filteredComments = response.data.data.filter(comment => comment.blogId === slug.id);
		  setKomen(filteredComments);
		//   console.log(filteredComments);
		}
	  } catch (error) {
		console.error("Error fetching comments:", error);
	  }
	};
  
	getKomen();
  }, [slug]);
  
  const handleSubmit = async (e) => {
	e.preventDefault();
	setLoading(true);
	try {
	  const commentData = {
		...formData,
		user: user,
		blogId: slug.id
	  };
	  const response = await addKomen(commentData);
	  if (response.data) {
		setComments([...comments, response.data]); // Menambahkan komentar baru ke dalam state comments
		setFormData({ comment: "" });
		setPesanError("");
		setBerhasil(true);
	  } else {
		setPesanError("Komentar sudah ada.");
	  }
	  setLoading(false);
	} catch (error) {
	  setPesanError("Terjadi kesalahan saat menambahkan komentar.");
	  setLoading(false);
	}
  };
  useEffect(() => {
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
  }, [slug]);

  useEffect(() => {
	if (session.data) {
	  setUser(session.data?.user.fullname || '');
	}	
  }, [session.data, komen]); // Tambahkan komen ke dalam dependency array
  

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
			
		  <div className="w-full">
			<hr className="my-4"/>
  <h1 className="text-black text-xl font-semibold mb-4">Komentar</h1>
  {komen.length > 0 ? (
    <ul className="w-full">
      {/* Lakukan mapping data komentar ke dalam elemen-elemen JSX */}
      {komen.map((comment) => (
        <li key={comment.id} className="w-full border-b border-gray-200 py-4">
          {/* Tampilkan data komentar sesuai kebutuhan */}
          <p className="text-black font-medium mb-2"> {comment.user}</p>
          <p className="text-black">{comment.comment}</p>
         
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-black">Tidak ada komentar.</p>
  )}
</div>


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
                <button className="bg-red-500 rounded-md px-4 py-2 mt-4 hover:bg-red-600 text-white">
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      );
    }
  };

  return <div className="p-8 rounded-lg">{renderPremiumContent()}</div>;
};

export default BlogSlug;
