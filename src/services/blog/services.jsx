import {
  addData,
  deleteData,
  retrieveDataByField
} from "@/lib/firebase/services";

export async function addBlog(blogData, callback) {
  const data = await retrieveDataByField("blogs", "judul", blogData.judul);

  if (data.length > 0) {
    callback(false);
  } else {
    const author = blogData.author;
    const created_at = new Date();
    const slug = blogData.judul.replace(/\s+/g, "-").toLowerCase();
    const updated_at = new Date();

    // Konversi nilai boolean ke string yang lebih mudah dibaca
    const is_Publish = blogData.is_Publish ? "true" : "false";

    const blogObject = {
      ...blogData,
      created_at,
      author,
      slug,
      updated_at,
      is_Publish
    };

    addData("blogs", blogObject, () => {
      callback(true);
    });
  }
}
export async function deleteBlog(slug) {
  try {
    // Check if blog exists
    const blogData = await retrieveDataByField("blogs", "slug", slug);

    if (!blogData || blogData.length === 0) {
      throw new Error("Blog not found");
    }

    // Delete blog data
    await deleteData("blogs", blogData[0].id);

    return true; // Indicate successful deletion
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
}

export async function addKomen(commentData,callback) {

	  // Retrieve comment data by its comment text
	  const data = await retrieveDataByField("comments", "comment", commentData.comment);
	  if (data.length > 0) {
		callback (false);
	  } else {
		// Construct comment object
		const commentObject = {
			user: commentData.user,
			blogId:commentData.blogId,
		  comment: commentData.comment,
		  createdAt: new Date()
		};
		// Add comment data to the database
		await addData("comments", commentObject);
		callback (true);
	  }
	
  }