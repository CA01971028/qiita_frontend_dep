"use client";

import { useState, useEffect} from "react";
import React from "react";
import UseFetchName from '../_components/hooks/UseFetchName'
function Mypage() {

  const { name, id }= UseFetchName();
  const[cnt,setCnt] = useState<number>(0);
  const[sm, setSm] = useState("");
  useEffect(() => {
    const fetchCnt = async () => {
      try {
        const response = await fetch(`https://qiita-api-dccbbecyhma3dnbe.japaneast-01.azurewebsites.net/mypage?id=${id}&name=${name}`, { // クエリパラメータとしてidとnameを付加
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
          setCnt(data[0]);
          setSm(data[1]);
        }
      } catch (error) {
        console.log("エラーが発生");
        console.log(error)
      }
    };
    fetchCnt();
  }, [id, name]);


  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-8 border border-black/10">
      <div className="p-4 text-center">
        {/* 丸いアイコン（ユーザーアイコン） */}
        <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>

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
          {/* <div>
            <p className="text-lg font-bold">100</p>
            <p className="text-gray-600 text-sm">フォロー</p>
          </div>
          <div>
            <p className="text-lg font-bold">200</p>
            <p className="text-gray-600 text-sm">フォロワー</p>
          </div> */}
        </div>

        {/* プロフィール編集ボタン */}
        <div className="mt-6">
          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
            プロフィールを編集
          </button>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
