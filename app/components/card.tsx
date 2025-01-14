"use client";

import { useState } from "react";
import { handleClick } from "../utils/handleclick";
import Link from "next/link";

type CardData = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  score: number;
  date: string;
  categoryId: number;
  user: string;
};

export default function Card(props: CardData) {
  const [liked, setLiked] = useState(false);

  return (
    <div>
      {/* 画像部分 */}
      <div className="inline-block align-top p-2 pb-0  flex ">
        <img
          className="w-8 h-8 bg-gray-300/50 rounded-full"
          src="共食いタコ.png"
          alt="Avatar"
        />
        <div>
          <div className="ml-4 text-gray-400">{props.user}</div>
          <p className="ml-4 text-gray-600 text-xs ">{props.date}</p>
        </div>
      </div>
      <Link key={props.id} href={`/card?id=${props.id}`}>
        <div className=" ml-16 text-lg text-left text-gray-900 font-bold hover:text-sky-700 ">
          {props.title}
        </div>
      </Link>

      <div className="ml-14">
        {props.tags.map((tag: string, index: number) => (
          <span
            key={index}
            className=" inline-block bg-blue-200 text-blue-700 rounded-full px-1  text-xs   mr-2   border-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <button onClick={() => handleClick(liked, setLiked)} className="ml-14">
        <span
          className={` i-heroicons-solid-heart w-4 h-4  text-red-500 `}
        ></span>
        {props.score}
      </button>
    </div>
  );
}
