'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [apiStatus, setApiStatus] = useState<string>('確認中...');
  const [apiMessage, setApiMessage] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:3000/api/health')
      .then(res => res.json())
      .then(data => {
        setApiStatus(data.status);
        setApiMessage(data.message);
      })
      .catch(err => {
        setApiStatus('エラー');
        setApiMessage(err.message);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="text-center px-4">
        <h1 className="text-5xl font-bold mb-8 text-gray-900 dark:text-white">
          Blog Monorepo
        </h1>
        <p className="text-xl mb-12 text-gray-600 dark:text-gray-300">
          Next.js + Rails API
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            API接続状態
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">ステータス:</span>
              <span className={`font-semibold ${apiStatus === 'ok' ? 'text-green-600' : 'text-red-600'}`}>
                {apiStatus}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">メッセージ:</span>
              <span className="text-gray-800 dark:text-white">
                {apiMessage}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-4">
          <div className="text-gray-600 dark:text-gray-400">
            <p>フロントエンド: <strong>http://localhost:3001</strong></p>
            <p>バックエンド: <strong>http://localhost:3000</strong></p>
          </div>
        </div>
      </main>
    </div>
  );
}
