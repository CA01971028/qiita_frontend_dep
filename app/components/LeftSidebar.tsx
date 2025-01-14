import Link from "next/link";
import { FaGlobe, FaJs, FaReact, FaUser } from "react-icons/fa";

// 左サイドバーのコンテンツ
export const LeftSidebar = () => {
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
        <Link href="/tags/webdevelopment">
          <li className="flex items-center hover:underline">
            <FaGlobe className="mr-2 text-green-500" /> WebDev
          </li>
        </Link>
      </ul>
      {/* ユーザーランキングセクション */}
      <h2 className="font-bold text-lg mt-6">ユーザーランキング</h2>
      <ul className="mt-2">
        <li className="flex items-center hover:underline">
          <FaUser className="mr-2 text-gray-500" /> ユーザー1
        </li>
        <li className="flex items-center hover:underline">
          <FaUser className="mr-2 text-gray-500" /> ユーザー2
        </li>
        <li className="flex items-center hover:underline">
          <FaUser className="mr-2 text-gray-500" /> ユーザー3
        </li>
      </ul>
    </div>
  );
};