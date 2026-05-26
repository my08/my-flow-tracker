'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// ChartCard 컴포넌트와 인터페이스들도 같이 옮겨오세요!
// [DTO 매핑] 백엔드 indicator_meta 테이블 엔티티 스펙
interface IndicatorMeta {
  indicatorCode: string;   
  indicatorName: string;   
  category: string;
  preferredView: 'chart' | 'text';
  currentValue: string | null;
}

// [DTO 매핑] FRED API를 거쳐 백엔드가 가공해준 차트 데이터 스펙
interface ChartDataPoint {
  data: string;  
  value: number; 
}

// 개별 차트 카드 컴포넌트 (독립적 데이터 호출)
function ChartCard({ meta, BASE_API_URL }: { meta: IndicatorMeta; BASE_API_URL: string }) {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loadingChart, setLoadingChart] = useState<boolean>(false);

  useEffect(() => {
    const fetchActiveChartData = async () => {
      try {
        setLoadingChart(true);
        const res = await fetch(`${BASE_API_URL}/indicator-chart/${meta.indicatorCode}`);
        if (!res.ok) throw new Error(`${meta.indicatorCode} 차트 데이터 로드 실패`);
        const data: ChartDataPoint[] = await res.json();
        setChartData(data);
      } catch (err) {
        console.error(`${meta.indicatorCode} 차트 연동 에러:`, err);
      } finally {
        setLoadingChart(false);
      }
    };

    fetchActiveChartData();
  }, [meta.indicatorCode, BASE_API_URL]);

  return (
    <div className="bg-white p-8 rounded-sm border border-slate-300 shadow-xs flex flex-col justify-between">
      <div>
        {/* 카드 상단 정보 */}
        <div className="flex justify-between items-start mb-8 border-b-2 border-dashed border-slate-300 pb-6 relative">
          <div>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-slate-100 text-slate-500 border border-slate-200">
              {meta.category}
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-3 tracking-tighter truncate max-w-[240px]">
              {meta.indicatorName} (LIVE)
            </h3>
          </div>
          <div className="text-right">
            <span className="text-[10px] block text-slate-400">DB_VAL</span>
            <p className="text-2xl font-black text-blue-700 mt-1">
              {chartData.length>0 ? chartData[chartData.length-1].value : (meta.currentValue || 'NULL')}
            </p>
          </div>
        </div>

        {/* 실시간 데이터 차트 렌더링 영역 */}
        {loadingChart ? (
          <div className="h-[320px] flex flex-col items-center justify-center text-slate-400 gap-4 border border-slate-100 rounded-sm bg-[#faf9f6]">
            <div className="w-5 h-5 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
            <p className="text-xs">RETRIEVING_REALTIME_FRED_OBSERVATIONS...</p>
          </div>
        ) : meta.preferredView === 'chart' ? (
          <div className="h-[320px] min-h-[320px] w-full bg-[#fdfdfd] pt-6 pr-4 border border-slate-100 rounded-sm shadow-inner relative overflow-hidden">
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-slate-100 border-r border-dashed border-slate-200"></div>

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="data" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={['auto', 'auto']} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '2px', fontSize: '12px' }}
                  itemStyle={{ color: '#1e293b' }}
                  cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '3 3' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#1d4ed8" 
                  strokeWidth={3} 
                  dot={{ r: 4, stroke: '#1d4ed8', strokeWidth: 1.5, fill: '#ffffff' }}
                  activeDot={{ r: 6, stroke: '#1d4ed8', strokeWidth: 2, fill: '#ffffff' }}
                  animationDuration={800} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="bg-[#faf9f6] rounded-sm p-6 border border-slate-200 text-sm text-slate-600 space-y-3 h-[320px] flex flex-col justify-center leading-relaxed">
            <p className="font-bold text-slate-800 text-lg">/* LIVE_SPEC_GUIDE */</p>
            <p>• INDICATOR_TYPE : TEXT_METRIC_RULES</p>
            <p>• {meta.indicatorName} ({meta.indicatorCode}) IS COMPILED DATA.</p>
          </div>
        )}
      </div>

      {/* 카드 하단 명세서 풋터 */}
      <div className="mt-8 pt-4 border-t-2 border-dashed border-slate-300 flex justify-between text-xs text-slate-400">
        <span>FRED_SERIES: {meta.indicatorCode}</span>
        <span>LAST_OBS_UPDATE: {chartData.length > 0 ? chartData[chartData.length - 1].data : 'N/A'}</span>
        <span>SYS_HASH: #{meta.indicatorCode.toLowerCase()}_live_feed</span>
      </div>
    </div>
  );
}
export function Dashboard() {
  const [metaList, setMetaList] = useState<IndicatorMeta[]>([]);
  const [loadingMeta, setLoadingMeta] = useState<boolean>(true);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  
  // 💡 [추가 상태] 현재 활성화된 카테고리 탭 관리 (기본값 'ALL')
  const [activeTab, setActiveTab] = useState<string>('ALL');

  const BASE_API_URL = 'http://localhost:8080/api/v1';

  // 마스터 지표 로드
  useEffect(() => {
    fetch(`${BASE_API_URL}/indicator-meta`)
      .then((res) => {
        if (!res.ok) throw new Error('마스터 데이터 로드 실패');
        return res.json();
      })
      .then((data: IndicatorMeta[]) => {
        setMetaList(data);
        if (data.length > 0) {
          // 초기 진입 시 상위 2개 지표 활성화
          setSelectedCodes(data.slice(0, 2).map(m => m.indicatorCode)); 
        }
        setLoadingMeta(false);
      })
      .catch((err) => {
        console.error("마스터 연동 에러:", err);
        setLoadingMeta(false);
      });
  }, []);

  // 💡 마스터 데이터에서 존재하는 고유 카테고리 목록을 동적으로 추출 ('ALL' 탭 추가)
  const categories = ['ALL', ...Array.from(new Set(metaList.map(m => m.category)))];

  // 다중 체크박스 토글 핸들러
  const handleToggleIndicator = (code: string) => {
    setSelectedCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  // 💡 탭 선택에 따라 상단에 보여줄 지표 필터링 (하단 차트 출력에는 영향을 주지 않음)
  const filteredMetaList = activeTab === 'ALL' 
    ? metaList 
    : metaList.filter(m => m.category === activeTab);

  // 하단 그리드에 띄울 최종 선택된 대시보드 카드들
  const activeMetas = metaList.filter(m => selectedCodes.includes(m.indicatorCode));

  return (
    <div className="p-6 sm:p-12 max-w-7xl mx-auto">
      
      {/* 📄 상단 헤더 영역 */}
      <header className="mb-12 border-b-2 border-dashed border-slate-400 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          [STATEMENT] LIVE_MACRO_ECONOMIC_INDICATOR
        </h1>
        <p className="text-xs text-slate-500 mt-2">
          SRC: FRED_API // SYS: SPRINGBOOT-V4 // STATUS: LIVE_OK
        </p>
      </header>

      <div className="space-y-8">
        
        {/* 🔍 지표 선택 및 카테고리 탭 필터 영역 */}
        <div className="bg-white p-6 rounded-sm border border-slate-300 shadow-xs border-l-4 border-l-slate-700">
          <h3 className="text-xs font-bold text-slate-400 mb-4">
            &gt; SELECT_LIVE_INDICATOR (CATEGORY_TAB_FILTER)
          </h3>
          
          {loadingMeta ? (
            <p className="text-xs text-slate-400">LOADING_DATABASE_RECORDS...</p>
          ) : (
            <div className="space-y-6">
              
              {/* 💡 카테고리 탭 버튼 스위치 바 */}
              <div className="flex flex-wrap border-b border-slate-200 text-xs">
                {categories.map((category) => {
                  const isActive = activeTab === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveTab(category)}
                      className={`px-4 py-2 font-bold uppercase transition-all -mb-[1px] border-b-2 ${
                        isActive
                          ? 'border-slate-800 text-slate-900 font-black'
                          : 'border-transparent text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              {/* 💡 선택된 탭의 카테고리에 속한 지표 칩들만 출력 */}
              <div className="flex flex-wrap gap-3min-h-[40px]">
                {filteredMetaList.map((meta) => {
                  const isChecked = selectedCodes.includes(meta.indicatorCode);
                  return (
                    <label 
                      key={meta.indicatorCode} 
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border text-xs cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-slate-100 border-slate-800 font-bold text-slate-900 shadow-inner'
                          : 'bg-white border-slate-200 text-slate-400 hover:border-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="accent-slate-800 cursor-pointer"
                        checked={isChecked}
                        onChange={() => handleToggleIndicator(meta.indicatorCode)} 
                      />
                      <span>
                        {meta.indicatorName} ({meta.indicatorCode})
                      </span>
                    </label>
                  );
                })}
                
                {filteredMetaList.length === 0 && (
                  <p className="text-xs text-slate-400 italic">해당 카테고리에 할당된 지표가 대시보드에 없습니다.</p>
                )}
              </div>

            </div>
          )}
        </div>

        {/* 📊 하단 메인 차트 영역 (그리드 멀티 뷰) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeMetas.map((meta) => (
            <ChartCard 
              key={meta.indicatorCode} 
              meta={meta} 
              BASE_API_URL={BASE_API_URL} 
            />
          ))}
        </div>

        {activeMetas.length === 0 && !loadingMeta && (
          <div className="text-center py-16 border border-dashed border-dashed border-slate-300 text-xs text-slate-400 bg-white">
            NO_INDICATOR_SELECTED. 모니터링할 지표 칩을 하나 이상 활성화하세요.
          </div>
        )}
      </div>
    </div>
  );
}