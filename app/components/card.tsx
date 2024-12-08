"use client";

import {useState } from "react";
import { handleClick } from "../utils/handleclick";
import Image from "next/image"

type card ={
  id: number,
  title: string,
  description: string,
  tags: string[],  
  score: number,
  date: string,
  categoryId: number,
  user: string
}

export default function Card(props:card) {
  const {title, tags, score, date ,user} = props; // プロパティを受け取る
  const [liked, setLiked] = useState(false);
  
  return (
    <>
      {/*カードの大枠を定義 */}
        <div className="h-72 sm:w-96 sm:h-auto md:w-96 my-2 mx-auto rounded-md border border-gray-400 bg-teal-100">
          <div className="inline-block align-top p-2">
              <Image src="/共食いタコ.png" width={50} height={50} alt="Avatar" className="object-cover rounded-full"/>
          </div>
          <div className="inline-block align-top p-2 items-center pt-4">
              <p className="text-gray-900 leading-none">{user}</p>
              <p className="text-gray-600">{date}</p>
          </div>

          <div className="px-6 pb-2 mb-2 mt-5 text-4xl text-center text-gray-900 font-bold">{title}</div>
          <div className="px-11 pt-4  ">
                {tags.map((tag, index) => (
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
    </>
    
  );
}
