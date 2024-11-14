'use client';

import { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Link from "next/link";

function Post() {

  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [previewContent, setPreviewContent] = useState('');

  // Markdownを処理する
  useEffect(() => {
    const renderContent = async () => {
      if (content) {
        // markedが非同期ならawaitを使用
        const htmlContent = await marked(content); 
        const sanitizedContent = DOMPurify.sanitize(htmlContent);
        setPreviewContent(sanitizedContent);
      }
    };

    renderContent();
  }, [content]);
  const btnpush = async () => {
    // データを整形
    const postData = {
      name: title,
      detail: content,
      tag: tags.split(" "),  // スペース区切りのタグを配列に変換
      userid: 1 // ユーザーIDを指定（動的に設定する場合は適宜修正）
    };
  
    try {
      // POSTリクエストを送信
      const response = await fetch('http://localhost:5000/card/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(`投稿成功: ${result.name}`);
        setTitle("");
        setTags("");
        setContent("");
      } else {
        alert("投稿に失敗しました。");
      }
    } catch (error) {
      console.error("エラー:", error);
      alert("エラーが発生しました。");
    }
  };
  
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

          {/* 戻るボタンと投稿ボタンを横並びに */}
          <div className='flex items-center gap-2'>
            <Link href="/">
              <button className='bg-red-300 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center'>
                戻る
              </button>
            </Link>
            <button onClick={btnpush} className='bg-green-500 hover:bg-green-700 text-white px-3 py-2 rounded flex items-center'>
              投稿!!
            </button>
          </div>
        </div>
      </header>

      <main className='p-8'>
        <div className='container mx-auto space-y-6'>
          {/* タイトル入力欄 */}
          <div>
            <label className='block text-lg font-semibold mb-2'>タイトル</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full p-2 border rounded-md'
              placeholder='タイトルを入力してください'
            />
          </div>

          {/* タグ入力欄 */}
          <div>
            <label className='block text-lg font-semibold mb-2'>タグ</label>
            <input
              type='text'
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className='w-full p-2 border rounded-md'
              placeholder='タグを入力してください (スペース区切り)'
            />
          </div>

          {/* 内容とプレビューを横並びに */}
          <div className='flex space-x-4'>
            {/* 内容入力欄 */}
            <div className='w-1/2'>
              <label className='block text-lg font-semibold mb-2'>内容</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className='w-full h-64 p-2 border rounded-md'
                placeholder='Markdown記法で内容を入力してください'
              ></textarea>
            </div>

            {/* プレビューエリア */}
            <div className='w-1/2'>
              <h2 className='text-lg font-bold mb-2'>プレビュー</h2>
              <div className='bg-white p-4 border rounded-md h-64 overflow-auto'>
                <div
                  className='prose'
                  dangerouslySetInnerHTML={{
                    __html: previewContent, // サニタイズされたHTMLを設定
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Post;
