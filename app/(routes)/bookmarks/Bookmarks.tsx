"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import UseFetchName from "@/app/_components/hooks/UseFetchName";

type ApiResponse = {
  data: CardData[];
  exit: boolean;
};

type CardData = [
  number,  // cardid
  string,  // name
  string,  // detail
  string, // tags
  number,  // heart
  string,  // date
  string   // user
];

const Bookmarks = () => {
  const { id } = UseFetchName();
  const [cards, setCards] = useState<ApiResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://qiita-api-dccbbecyhma3dnbe.japaneast-01.azurewebsites.net/book_card?userid=${id}`,
          {
            method: "GET",
          }
        );
        if (!res.ok) {
          throw new Error("ネットワークの応答が正常ではありません");
        }
        const data: ApiResponse = await res.json();

        setCards(data);
      } catch (err) {
        console.error(err);

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("予期しないエラーが発生しました");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );

  if (error) return <div>エラー: {error}</div>;

  return (
    <div>
      <div className="text-4xl pl-5 pt-5 font-bold">ブックマーク</div>
      <div className="mt-8 ml-auto md:ml-12">
        <div className="flex flex-wrap">
          {!loading && cards?.data && cards.data.length > 0 ? (
            cards.data.map((card, index) => (
              <div
                key={index}
                className="w-full sm:max-w-[600px] sm:min-h-[300px] items-center bg-white shadow-md rounded-lg overflow-hidden border border-black/10 ml-5 mb-5"
              >
                <Link href={`/card?id=${card[0]}`}>
                  <div className="mb-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-full mb-4 shadow-lg flex items-center justify-center overflow-hidden animate-spin-slow border border-slate-300">
                      <Image
                        src="/shati.jpg"
                        width={500}
                        height={500}
                        alt="pc_img"
                        className="object-cover rounded-full"
                      />
                    </div>
                    <p className="text-gray-600 font-bold ml-2">@{card[6]}</p>
                  </div>
                  <div className="flex justify-between text-gray-500 text-md mb-4">
                    <p>{card[5]}</p> {/* 記事の日付 */}
                  </div>
                  <h2 className="text-4xl font-semibold mb-2 hover:underline">{card[1]}</h2>
                  <div className="flex flex-wrap space-x-2 mb-4">
                    {Array.isArray(JSON.parse(card[3])) &&
                      JSON.parse(card[3]).map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 mt-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div>データがありません</div> // または他の適切な処理
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
