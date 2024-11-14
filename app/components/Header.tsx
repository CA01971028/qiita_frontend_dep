"use client";

import { FaBell, FaPlus, FaUser } from "react-icons/fa";
import { MdOutlineSearch } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import UseFetchName from '../_components/hooks/UseFetchName';
import Logout from '../_components/hooks/Logout';

const Header = () => {
  const pathname = usePathname();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // 通知パネルの状態
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 検索バーの状態
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ユーザーメニューの状態
  const { name } = UseFetchName();
  const notificationRef = useRef(null); // 通知パネルの参照
  const menuRef = useRef(null); // メニューパネルの参照

  // メニュー外クリックでメニューを閉じる処理
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // 通知パネル外クリックで通知を閉じる処理
  useEffect(() => {
    const handleClickOutsideNotification = (e) => {
      if (isNotificationOpen && notificationRef.current && !notificationRef.current.contains(e.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideNotification);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideNotification);
    };
  }, [isNotificationOpen]);

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }


  return (
    <header className="border-b border-gray-300">
      <div className="flex justify-between items-center p-4 bg-blue-400 relative">
        <Link href="/">
          <div className="text-2xl bg-white w-20 h-10 rounded-full font-bold flex items-center justify-center">
            ITM
          </div>
        </Link>

        <div className="flex justify-end items-center">
          <MdOutlineSearch className="text-3xl cursor-pointer lg:hidden" onClick={toggleSearch} />

          <div className="relative w-80 hidden lg:block">
            <MdOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="記事、質問を検索..."
              className="w-full pl-10 p-2 border border-gray-300 rounded outline-none"
            />
          </div>

          {name && (
            <div className="relative" ref={notificationRef}>
              <FaBell
                className="text-xl cursor-pointer mx-2"
                onClick={toggleNotification}
                size={30}
                color={"yellow"}
              />
              {isNotificationOpen && (
                <div className="absolute right-0 top-14 w-64 bg-gray-200 border border-black shadow-lg rounded-md p-4 opacity-95">
                  <h3 className="font-bold border-b border-black p-0 m-0">通知</h3>
                  <ul>
                    <li className="pb-2">新しいメッセージがあります。</li>
                    <li className="pt-2">更新があります。</li>
                    <li className="pt-2">新しいコメントが投稿されました。</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {!name && (
            <a href="/login"><button className="bg-orange-500 text-white mx-2 px-3 py-2 rounded flex items-center gap-2 hidden lg:flex">
              <FaPlus /> ログイン
            </button></a>
          )}

          {name && (
            <div className="relative" ref={menuRef}>
              <FaUser className="text-xl cursor-pointer" onClick={toggleMenu} size={30} />
              {isMenuOpen && (
                <div className="absolute right-0 top-14 w-48 bg-gray-200 border border-black shadow-lg rounded-md p-4 opacity-95">
                  <ul className="flex flex-col gap-2">
                    <li>
                      <Link href="/mypage">マイページ</Link>
                    </li>
                    <li>
                      <button onClick={Logout} className="text-left w-full">ログアウト</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {name && (
            <Link href="/post">
              <button className="bg-green-500 text-white mx-2 px-3 py-2 rounded flex items-center gap-2 hidden lg:flex">
                <FaPlus /> 投稿する
              </button>
            </Link>
          )}
        </div>
      </div>

      {isSearchOpen && (
        <div className="w-full px-4 py-2 bg-gray-100 border-b border-gray-300 lg:hidden">
          <input
            type="text"
            placeholder="記事、質問を検索..."
            className="w-full p-2 border border-gray-300 rounded outline-none"
          />
        </div>
      )}

      <nav className="flex justify-around bg-gray-800 text-white py-2">
        <Link href="/" className={`${pathname === "/" ? "border-b-2 border-white" : ""}`}>ホーム</Link>
        <Link href="/timeline" className={`${pathname === "/timeline" ? "border-b-2 border-white" : ""}`}>タイムライン</Link>
        <Link href="/trend" className={`${pathname === "/trend" ? "border-b-2 border-white" : ""}`}>トレンド</Link>
      </nav>
    </header>
  );
};

export default Header;
