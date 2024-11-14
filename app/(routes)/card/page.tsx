"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; 
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

// CardData型の定義
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

// コメント用の型を定義
type Comment = {
  id: number;
  userId: string;
  text: string;
  timestamp: string;
};

function Page() {
  const searchParams = useSearchParams(); // URLパラメータを取得
  const [cards, setCards] = useState<CardData | null>(null); // 初期値をnullに変更
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([ // コメントの型を指定
    {
      id: 1,
      userId: "@user1",
      text: "とても役に立ちました！",
      timestamp: "2024/10/28",
    },
    {
      id: 2,
      userId: "@user2",
      text: "もっと詳しく知りたいです。",
      timestamp: "2024/10/28",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const [previewContent, setPreviewContent] = useState('');

  // クエリパラメータからidを取得
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) {
      setError("IDが指定されていません");
      setLoading(false);
      return;
    }

    const path: string = `http://localhost:5000/card/detail?id=${id}`;
    const fetchData = async () => {
      try {
        const res = await fetch(path, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          throw new Error("ネットワークの応答が正常ではありません");
        }
        const data = await res.json();
        const formattedData: CardData = {
          id: data[0],
          title: data[1],
          description: data[2],
          tags: JSON.parse(data[3]),  // タグを文字列から配列に変換
          score: data[4],
          date: data[5],
          categoryId: data[6],
          user: data[7]
        };

        setCards(formattedData);
      } catch (error) {
        setError("エラー");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // markdown処理
  useEffect(() => {
    const processMarkdown = async () => {
      if (cards?.description) {
        try {
          // markedがPromiseを返す場合に備えてawaitを使って解決
          const htmlContent = await marked(cards.description); // markedがPromiseを返す場合、awaitで待機
          const sanitizedContent = DOMPurify.sanitize(htmlContent); // サニタイズ処理
          setPreviewContent(sanitizedContent); // サニタイズ後のHTMLをセット
        } catch (error) {
          console.error("Markdownの処理中にエラーが発生しました:", error);
          setPreviewContent(''); // エラーが発生した場合は空文字をセット
        }
      } else {
        setPreviewContent(''); // descriptionがない場合は空文字を設定
      }
    };
  
    processMarkdown(); // 非同期処理を実行
  }, [cards?.description]);
  

  const handleNewCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleNewCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          userId: "@newUser",
          text: newComment.trim(),
          timestamp: new Date().toLocaleDateString(),
        },
      ]);
      setNewComment("");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  if (error) return <div className="text-5xl text-center">このカードは削除されました</div>;

  return (
    <div className="min-h-screen">
      <Header />

      <div className="flex flex-col items-center relative">
        {/* 記事カード */}
        <div className="max-w-4xl w-full items-center bg-white shadow-md rounded-lg overflow-hidden mt-8 border border-black/10 p-6">
          <div className="flex items-center mb-4">
            {/* 丸いアイコン */}
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            {/* ID */}
            <p className="text-gray-600 font-bold ml-2">@{cards?.user}</p>
          </div>

          <h2 className="text-4xl md:text-6xl font-semibold  mb-2">{cards?.title}</h2>

          {/* タグ */}
          <div className="flex flex-wrap space-x-2 mb-4">
            {cards?.tags.map((data, index) => (
              <span key={index} className="bg-blue-200 text-blue-700 text-lg font-semibold px-2 py-1 rounded-full">
                {data}
              </span>
            ))}
          </div>

          <div className="flex justify-between text-gray-500 text-sm mb-4">
            <p>投稿日: {cards?.date}</p>
          </div>

          <div
            className="prose"
            dangerouslySetInnerHTML={{
              __html: previewContent, // サニタイズ済みのHTMLを設定
            }}
          />
        </div>

        {/* コメントカード */}
        <div className="max-w-4xl w-full mt-8 p-6 items-center bg-white shadow-md rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">コメント</h3>

          {/* コメント一覧 */}
          <div className="space-y-4 mb-4">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded shadow">
                  {/* アイコン、ID、投稿日時を横並びに配置 */}
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <p className="font-bold text-gray-700">{comment.userId}</p>
                    <p className="text-xs text-gray-500">{comment.timestamp}</p>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">コメントがありません</p>
            )}
          </div>

          {/* 新しいコメント入力エリア */}
          <div className="mt-4">
            <input
              type="text"
              value={newComment}
              onChange={handleNewCommentChange}
              placeholder="コメントを書く..."
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button
              onClick={handleNewCommentSubmit}
              className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              投稿
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Page;
