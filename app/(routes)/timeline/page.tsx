"use client"; 
import Card from "@/app/components/card";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import React, { useEffect, useState } from "react";
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

export default function Timeline() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        const formattedData = data.map((item) => ({
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
      } catch (err) {
        setError('err.message');
        console.log(err)
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
  );
}
