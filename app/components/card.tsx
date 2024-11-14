'use client';

import { useState } from "react";
import { handleClick } from "../utils/handleclick";
import Image from "next/image"; // Imageコンポーネントをインポート

export default function Card(props) {
  const { title, tags, score, date, user } = props; // プロパティを受け取る
  const [liked, setLiked] = useState(false);

  return (
    <>
      {/*カードの大枠を定義 */}
      <div className="h-72 sm:w-96 sm:h-auto md:w-96 my-2 mx-auto rounded-md border border-gray-400 bg-teal-100">
        <div className="inline-block align-top p-2">
          {/* Imageコンポーネントを使用 */}
          <Image 
            className="w-16 h-16 rounded-full" 
            src="/path/to/image/共食いタコ.png" // 画像のパスを指定（publicディレクトリに配置した画像）
            alt="Avatar"
            width={64}  // 幅
            height={64} // 高さ
          />
        </div>
        <div className="inline-block align-top p-2 items-center">
          <p className="text-gray-900 leading-none">{user}</p>
          <p className="text-gray-600">{date}</p>
        </div>

        <div className="px-6 pb-2 mb-2 mt-5 text-4xl text-center text-gray-900 font-bold">{title}</div>
        <div className="px-11 pt-4">
          {tags.map((tag, index) => (
            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 border border-gray-400">
              {tag}
            </span>
          ))}
          <p className="">
            <button onClick={() => handleClick(liked, setLiked)}>
              <span className={`i-heroicons-solid-heart w-10 h-10 mt-3 text-red-500`}></span>
              {score}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
