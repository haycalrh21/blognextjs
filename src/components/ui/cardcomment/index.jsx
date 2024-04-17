import React, { useState, useEffect } from "react";

const CardComment = ({ komenState }) => {
  const [data, setData] = useState([]);

  useEffect(
    () => {
      // Mengurutkan komenState berdasarkan createdAt (dari yang terbaru ke yang terlama)
      const sortedData = [...komenState].sort((a, b) => {
        return b.createdAt.seconds - a.createdAt.seconds;
      });
      setData(sortedData);
    },
    [komenState]
  );

  return (
    <div>
      <div className="w-full">
        <hr className="my-4" />
        <h1 className="text-black text-xl font-semibold mb-4">Komentar</h1>
        {data.length > 0
          ? <ul className="w-full">
              {data.map(comment =>
                <li
                  key={comment.id}
                  className="w-full border-b border-gray-200 py-4"
                >
                  <p className="text-black font-medium mb-2">
                    {comment.user}
                  </p>
                  <p className="text-black">
                    {comment.comment}
                  </p>
                </li>
              )}
            </ul>
          : <p className="text-black">Tidak ada komentar.</p>}
      </div>
    </div>
  );
};

export default CardComment;
