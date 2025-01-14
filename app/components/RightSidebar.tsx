export const RightSidebar = () => {
    return (
      <div className="w-full sm:w-1/4 p-4 order-3 sm:order-none">
        <h2 className="font-bold text-lg">その他</h2>
        <ul className="mt-2">
          <li>トレンド記事1</li>
          <li>トレンド記事2</li>
          <li>トレンド記事3</li>
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