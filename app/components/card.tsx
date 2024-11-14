"use client";

import { useEffect, useState } from "react";
import { handleClick } from "../utils/handleclick";
export default function Card(props:any) {
  const { card_id, title, description, tags, score, date ,user} = props; // プロパティを受け取る
  const [liked, setLiked] = useState(false);
 
  return (
    <>
      {/*カードの大枠を定義 */}
        <div className="h-72 sm:w-96 sm:h-auto md:w-96 my-2 mx-auto rounded-md border border-gray-400 bg-teal-100">
          <div className="inline-block align-top p-2">
              <img className="w-16 h-16 rounded-full" src="共食いタコ.png" alt="Avatar" />
          </div>
          <div className="inline-block align-top p-2 items-center">
              <p className="text-gray-900 leading-none">{user}</p>
              <p className="text-gray-600">{date}</p>
          </div>

          <div className="px-6 pb-2 mb-2 mt-5 text-4xl text-center text-gray-900 font-bold">{title}</div>
          <div className="px-11 pt-4  ">
                {tags.map((tag:any, index:any) => (
                  <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 border border-gray-400">{tag}</span>
                ))}
                <p className="">
                  <button onClick={() => handleClick(liked, setLiked)}>
                    <span className={`i-heroicons-solid-heart w-10 h-10 mt-3 text-red-500`}></span>
                    {score}
                  </button>
                </p>
            </div>
        </div>
      





      {/* <div className="max-w-sm w-full lg:max-w-full lg:flex my-8 "> */}
        {/* <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title={title}></div> */}
        {/* カードの大枠と背景の指定 */}
        {/* <div className="border border-gray-400 p-4 flex flex-col justify-between leading-normal bg-teal-100">
          <div className="mb-2">
            <div className="flex items-center">
              <img className="w-10 h-10 rounded-full mr-4" src="共食いタコ.png" alt="Avatar"/>
              <div className="text-sm">
                <p className="text-gray-900 leading-none">ユーザー名</p> 
                <p className="text-gray-600">{date}</p>
              </div>
            </div>
            <div className="px-6 pt-4 pb-2 text-gray-900 font-bold text-xl mb-2">
              {title}
            </div>
            <div className="px-6 pt-4 ">
              {tags.map((tag:any, index:any) => (
                <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag}</span>
              ))}
              <p className="">
                <button onClick={() => handleClick(liked, setLiked)}>
                  <span className={`i-heroicons-solid-heart w-10 h-10 ${liked ? "" : "text-red-500"}`}></span>
                  {liked ? `${score}` : `${score + 1}`}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </>
    
  );
}
