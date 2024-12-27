"use client";
import React, { useEffect, useState } from "react";
import { FaReact, FaJs, FaGlobe, FaUser } from "react-icons/fa"; // アイコンをインポート
import Link from "next/link"; 
import UseFetchName from "../_components/hooks/UseFetchName";

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

type BookMarks = {
  data: [number, number, string][]; 
  exit: boolean;
}

const HomePage = () => {
  const { id } = UseFetchName();
  const [cards, setCards] = useState<CardData[]>([]);
  const [time,setTime] = useState<CardData[]>([]);
  const [rank,setRank] = useState<[]>([]);
  const [book,setBook] = useState<BookMarks>();
  const [bookCheck,setBookCheck] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const path: string = 'https://qiita-api-dccbbecyhma3dnbe.japaneast-01.azurewebsites.net/order/trend';
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
      } catch (err) {
        setError('err.message');
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const path: string = 'https://qiita-api-dccbbecyhma3dnbe.japaneast-01.azurewebsites.net/order/time';
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

        setTime(formattedData);
      } catch (err) {
        setError('err.message');
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() =>{
    const path:string = 'https://qiita-api-dccbbecyhma3dnbe.japaneast-01.azurewebsites.net/user_ranking';
    const fetchData = async () =>{
      try{
        const res = await fetch(path,{
          method:"GET",
        });
        if(!res.ok){
          throw new Error('ネットワークの応答が正常ではありません');
        }
        const data = await res.json();
        setRank(data)
      }catch(err){
        console.log("サーバーサイドでエラーが発生しています")
        console.log(err)
      }
    }
    fetchData()
  },[])

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const res = await fetch(`https://qiita-api-dccbbecyhma3dnbe.japaneast-01.azurewebsites.net/book_get?userid=${id}`,{
          method:"GET",
        });
        if(!res.ok){
          throw new Error('ネットワークの応答が正常ではありません')
        }
        const data = await res.json();
        setBook(data)
      }catch(err){
        console.log("サーバーサイドでエラーが発生しています")
      }
    }
    fetchData()
  },[id])

  if (loading) 
    return (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
          </div>
  );
  if (error) return <div>エラー: {error}</div>;

  const handleClick = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>, card: CardData) => {
    e.preventDefault();
    await postData(card);
    setBook((prev) => {
      const updatedData: [number, number, string][] = prev?.data 
        ? [...prev.data, [0, card.id, ""]]
        : [[0, card.id, ""]];
      return prev ? { ...prev, data: updatedData } : { data: updatedData, exit: false };
    });
  };
  
  const bookClickDel = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>, card: CardData) => {
    e.preventDefault();
    await delData(card);

    setBook((prev) => {
      if (!prev) return prev;
  
      const updatedData = prev.data.filter(([_, cardId]) => cardId !== card.id);
      return { ...prev, data: updatedData };
    });
  };

  const delData = async (card: CardData) => {
    try {
      const res = await fetch(`https://qiita-api-dccbbecyhma3dnbe.japaneast-01.azurewebsites.net/book_del?userid=${id}&cardid=${card.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) {
        throw new Error("投稿件数がうまく読み取れません");
      }
    } catch (error) {
      console.error("エラーが発生", error);
    }
  };
  
  const postData = async (card: CardData) => {
    try {
      const res = await fetch("https://qiita-api-dccbbecyhma3dnbe.japaneast-01.azurewebsites.net/book_post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: id,
          cardid: card.id,
        }),
      });
  
      if (!res.ok) {
        throw new Error("投稿件数がうまく読み取れません");
      }
    } catch (error) {
      console.error("エラーが発生", error);
    }
  };

  // 左サイドバーのコンテンツ
  const LeftSidebar = () => {
    return (
      <div className="w-full sm:w-1/4 p-4 border-b sm:border-r sm:border-b-0 border-gray-300 order-2 sm:order-none">
        <h2 className="font-bold text-lg">フォロー中のタグ</h2>
        <ul className="mt-2">
          {/* タグのリンク一覧 */}
          <Link href="/tags/react">
            <li className="flex items-center hover:underline">
              <FaReact className="mr-2 text-blue-500" /> React
            </li>
          </Link>
          <Link href="/tags/javascript">
            <li className="flex items-center hover:underline">
              <FaJs className="mr-2 text-yellow-500" /> JavaScript
            </li>
          </Link>
          <Link href="/">
            <li className="flex items-center hover:underline">
              <FaGlobe className="mr-2 text-green-500" /> WebDev
            </li>
          </Link>
        </ul>
        {/* ユーザーランキングセクション */}
        <h2 className="font-bold text-lg mt-6">ユーザーランキング</h2>
        <ul className="mt-2">
          {rank.map((data,index)=>(
            <li key={index} className="flex items-center hover:underline">
            <FaUser className="mr-2 text-gray-500" /> {data["user"]}
            {/* <p className="text-2xl inline-block px-28 w-full text-right">{data[1]}</p> */}

          </li>
          ))}
          
        </ul>
      </div>
    );
  };

  // メインコンテンツのコンポーネント
  const MainContent = () => {
    return (
      <div className="w-full sm:w-1/2 p-4 border-b sm:border-r sm:border-b-0 border-gray-300 order-1 sm:order-none">
        <h2 className="font-bold text-lg">トレンドの記事</h2>
        {/* 横向きスクロールが可能な記事リスト */}
        <div className="mt-2 overflow-x-auto">
          <div className="flex space-x-4">
            {cards.map((card,index) =>(
              <Link key={index} href={`/card?id=${card.id}`}>
                <div className="min-w-[300px] items-center bg-white shadow-md rounded-lg overflow-hidden border border-black/10 p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    {/* 丸いアイコン */}
                    <p className="text-gray-600 font-bold ml-2">@{card.user}</p>
                    {/* ユーザーID */}
                  </div>
                  <div className="flex justify-between text-gray-500 text-sm mb-4">
                    <p>{card.date}</p> {/* 記事の日付 */}
                  </div>
                  <div className="flex flex-row">
                    <h2 className="text-xl mx-auto font-semibold mb-2 hover:underline">
                      {card.title}
                    </h2>
                    {id && (book?.data && book.data.some(([_, cardid]) => cardid === card.id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 ml-auto mr-2" onClick={(e) => bookClickDel(e, card)}>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 ml-auto mr-2" onClick={(e) => handleClick(e, card)}>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                  ))}
                  </div>
                  <div className="flex flex-wrap space-x-2 mb-4">
                  {card.tags.map((tag,index) =>(
                        <span key={index} className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                        {tag}
                      </span>
                      ))}
                  </div>
                  <div className="flex flex-row">
                      <div className="h-1 mt-[-10px] text-2xl text-red-600">❤ </div>
                      <div className="h-1 mt-[-10px] text-2xl ml-2">{card.score}</div>
                    </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* おすすめの記事一覧 */}
        <h2 className="font-bold text-lg mt-6">おすすめの記事</h2>
        <div className="mt-2">
          {/* 親コンテナにflex-colを追加 */}
          <div className="flex flex-col space-y-4">
            {time.map((card,index)=>(
              <Link key={index} href={`/card?id=${card.id}`}>
                  <div className="w-full items-center bg-white shadow-md rounded-lg overflow-hidden border border-black/10 p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <p className="text-gray-600 font-bold ml-2">@{card.user}</p>
                    </div>
                    <div className="flex justify-between text-gray-500 text-sm mb-4">
                      <p>{card.date}</p>
                    </div>
                    <div className="flex flex-row">
                      <h2 className="text-xl font-semibold mb-2 hover:underline">
                        {card.title}
                      </h2>
                      {book?.data && book.data.some(([_, id]) => id === card.id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 ml-auto mr-2" onClick={(e) => bookClickDel(e, card)}>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 ml-auto mr-2" onClick={(e) => handleClick(e, card)}>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                    )}
                    </div>
                    <div className="flex flex-wrap space-x-2 mb-4">
                      {card.tags.map((data,index)=>(
                        <span key={index} className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                        {data}
                      </span>
                      ))}
                    </div>
                    <div className="flex flex-row">
                      <div className="h-1 mt-[-10px] text-2xl text-red-600">❤ </div>
                      <div className="h-1 mt-[-10px] text-2xl ml-2">{card.score}</div>
                    </div>
                  </div>
              </Link>
              
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 右サイドバーのコンテンツ
  const RightSidebar = () => {
    return (
      <div className="w-full sm:w-1/4 p-4 order-3 sm:order-none">
        <h2 className="font-bold text-lg">その他</h2>
        <ul className="mt-2">
          {cards.slice(0, 3).map((data,index)=>(
            <li key={index}>{data.title}</li>
          ))}
        </ul>
        {/* コラムセクション */}
        <h2 className="font-bold text-lg mt-6">コラム</h2>
        <ul className="mt-2">
          <li>おすすめ記事1</li>
          <li>おすすめ記事2</li>
          <li>おすすめ記事3</li>
        </ul>
      </div>
    );
  };

  return (
    // レスポンシブデザインで左サイドバー、メインコンテンツ、右サイドバーを配置
    <div className="flex flex-col sm:flex-row">
      <LeftSidebar /> {/* 左サイドバー */}
      <MainContent /> {/* メインコンテンツ */}
      <RightSidebar /> {/* 右サイドバー */}
    </div>
  );
};

export default HomePage;
