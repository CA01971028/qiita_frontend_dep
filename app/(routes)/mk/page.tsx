'use client';

import { useEffect, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Link from "next/link";

function page() {
  const [previewContent, setPreviewContent] = useState('');

  // テスト用のMarkdownデータ
  const [testMarkdown,setTestMarkdown] = useState('')

  // Markdownを処理しサニタイズする
  useEffect(() => {
    if(testMarkdown)
    {
        const htmlContent = marked(testMarkdown);
        const sanitizedContent = DOMPurify.sanitize(htmlContent);
        setPreviewContent(sanitizedContent);
    }
    },[testMarkdown])
    

  useEffect(() =>{
    const path: string = 'http://localhost:5000/mk';
    const fetchData = async () =>{
        try {
            const res = await fetch(path,{
                method:"GET",
                headers:{
                    'Content-Type': 'application/json',
                },
            });
            if(!res.ok){
                throw new Error('ネットワークの応答が正常ではありません');
            }
            const data = await res.json();
            console.log(data)
            setTestMarkdown(data[0])
        }catch (error){
            console.log(error)
        }
    }
    fetchData()
  },[])
  return (
    <div>
      <header className='border-b border-gray-300'>
        {/* 上部ヘッダー */}
        <div className='flex justify-between items-center p-4 bg-blue-400'>
          <Link href="/">
            <div className='text-2xl bg-white w-20 h-10 rounded-full font-bold flex items-center justify-center'>
              ITM
            </div>
          </Link>
          <div className='flex items-center gap-2'>
            <Link href="/">
              <button className='bg-red-300 text-white px-2 py-1 rounded flex items-center'>
                戻る
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className='p-8'>
        <div className='container mx-auto'>
          {/* プレビューエリア */}
          <div className='bg-white p-4 border rounded-md h-auto overflow-auto'>
            <h2 className='text-lg font-bold mb-2'>プレビュー</h2>
            <div
              className='prose'
              dangerouslySetInnerHTML={{
                __html: previewContent, // サニタイズ済みのHTMLを設定
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
