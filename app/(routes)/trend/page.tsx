"use client";
import Card from "@/app/components/card";
import Header from "@/app/components/Header";
import React, { useEffect, useState } from "react";
import Footer from '../../components/Footer'

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

export default function Trend() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const path: string = 'http://localhost:5000/order/trend';
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
        const formattedData: CardData[] = data.map((item: string[]) => ({
          id: Number(item[0]),           // idをnumberに変換
          title: item[1],
          description: item[2],
          tags: JSON.parse(item[3]),     // JSON文字列を配列に変換
          score: Number(item[4]),        // scoreをnumberに変換
          date: item[5],
          categoryId: Number(item[6]),   // categoryIdをnumberに変換
          user: item[7]
        }));

        setCards(formattedData);
      } catch (err) {
        console.log(err)
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
      <Header />
      <div className="flex flex-col md:flex-wrap md:flex-row">
        {cards.map((card) => (
          <div key={card.id} className="w-full md:w-1/2">
            <Card {...card} />
          </div>
        ))}
      </div>
      <Footer/>
    </>
  )
}
