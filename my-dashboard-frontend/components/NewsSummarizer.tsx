'use client'; // 클라이언트 컴포넌트 선언 필수!

import { useState } from 'react';

export default function NewsSummarizer() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      // VS Code에서 실행 중인 Next.js가 8080(Spring)으로 요청을 쏘도록 설정
      const res = await fetch(`http://localhost:8080/api/news/summary?url=${encodeURIComponent(url)}`);
      const data = await res.text();
      setSummary(data);
    } catch (err) {
      alert("요약 실패! 백엔드(IntelliJ)가 켜져 있는지 확인하세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto border rounded-lg shadow-lg bg-white">
      <input 
        className="border p-2 w-full mb-2"
        placeholder="뉴스 URL을 입력하세요"
        onChange={(e) => setUrl(e.target.value)}
      />
      <button 
        className="bg-blue-500 text-white p-2 w-full rounded"
        onClick={fetchSummary}
      >
        {loading ? '요약 중...' : '요약하기'}
      </button>

      {summary && (
        <div className="mt-6 p-4 border-t">
          <h3 className="font-bold text-lg mb-2">AI 요약 결과</h3>
          <p className="whitespace-pre-line">{summary}</p>
        </div>
      )}
    </div>
  );
}