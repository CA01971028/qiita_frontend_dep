"use client";

import { useState, useEffect} from "react";
import React from "react";
import UseFetchName from '../_components/hooks/UseFetchName'
import Image from "next/image"
import Mycard from "./Mycard";

type CardData = {
id: number;
title: string;
description: string;
tags: string[];
score: number;
date: string;
categoryId: number;
user:string;
};
function Mypage() {

  const { name, id }= UseFetchName();
  const[cnt,setCnt] = useState<number>(0);
  const[sm, setSm] = useState("");
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCnt = async () => {
      try {
        const response = await fetch(`http://localhost:5000/mypage?id=${id}&name=${name}`, { // クエリパラメータとしてidとnameを付加
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          console.log('投稿件数がうまく読み取れません');
          return;
        }

        const data = await response.json();
        if (data.error) {
          console.log(data.error);
        } else {
          setCnt(data.sum);
          setSm(data.total_heart);
        }
      } catch (error) {
        console.log("エラーが発生");
        console.log(error)
      }
    };
    fetchCnt();
  }, [id, name]);

  useEffect(() => {
    const path: string = 'http://localhost:5000/order/time';
    const fetchData = async () => {
      try {
          const res = await fetch(path, {
            method: 'GET',
          });
          if (!res.ok) {
            throw new Error('ネットワークの応答が正常ではありません');
          }
          const data = await res.json();

          // データを整形
          const formattedData:CardData[] = data.map((item:string[]) => ({
            id: item[0],
            title: item[1],
            description: item[2],
            tags: JSON.parse(item[3]), 
            score: item[4],
            date: item[5],
            categoryId: item[6],
            user:item[7]
          }));

          setCards(formattedData);
        } catch{
          setError('err.message');
        } finally {
          setLoading(false);
        }
    };

      fetchData();
    }, []);
    if (loading) 
      return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
            </div>
    );
    if (error) return <div>エラー: {error}</div>;

  return (
    <>
      <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-8 border border-black/10">
        <div className="p-4 text-center">
          {/* 丸いアイコン（ユーザーアイコン） */}
          <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 shadow-lg flex items-center justify-center overflow-hidden  animate-spin-slow border border-slate-300">
              <Image
                src="/jugo2.jpg"
                width={500}
                height={500}
                alt="pc_img"
                className="object-cover rounded-full"
              />
            </div>

          {/* ID - 太字に変更 */}
          <p className="text-gray-600 font-bold">@{name}</p>

          {/* 線を引く */}
          <hr className="my-4" />

          {/* 投稿数、フォロー数、フォロワー数 - フォローを中央に配置 */}
          <div className="flex justify-center text-center space-x-12">
            {/* フォローを中央に、等間隔に並べる */}
            <div>
              <p className="text-lg font-bold">{cnt}</p>
              <p className="text-gray-600 text-sm">投稿数</p>
            </div>
            <div>
              <p className="text-lg font-bold">{sm}</p>
              <p className="text-gray-600 text-sm">合計いいね数</p>
            </div>
          </div>

          {/* プロフィール編集ボタン */}
          <div className="mt-6">
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
              プロフィールを編集
            </button>
          </div>
        </div>
      </div>
      <Mycard data={cards} name={name} />
    </>
    
  );
}

export default Mypage;
