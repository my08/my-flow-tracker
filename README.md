# 📊 Macro Monitor Dashboard

실시간 FRED(Federal Reserve Economic Data) API를 기반으로 주요 거시경제 지표를 시각화하는 모니터링 시스템입니다.

## 🚀 Overview
- **Purpose**: 실시간 매크로 경제 지표(금리, 물가, 고용 등)의 변화를 다중 뷰로 모니터링
- **Tech Stack**:
  - **Frontend**: Next.js (React), Recharts
  - **Backend**: Spring Boot (Java)
  - **Data Source**: FRED API

## 🛠 Features
- **Multi-View Grid**: 선택한 경제 지표들을 그리드 레이아웃으로 동시 관찰
- **Category Filtering**: 지표별(금리, 물가, 고용 등) 탭 기반 필터링 제공
- **Real-time Monitoring**: 최신 관측 데이터 자동 갱신 및 시각화
- **Interactive UI**: 체크박스 기반의 간편한 대시보드 커스터마이징

## 📈 Indicators
현재 모니터링 가능한 주요 카테고리:
- **INTEREST_RATE**: 기준금리, 국채 금리(10Y, 30Y 등)
- **INFLATION**: CPI, Core PCE 등
- **EMPLOYMENT**: 실업률, 비농업 고용자 수
- **GROWTH**: GDP, 산업생산 등

## ⚙️ How to Start
```bash
# 1. Clone the repository
git clone [YOUR_REPOSITORY_URL]

# 2. Run Backend
./gradlew bootRun

# 3. Run Frontend
npm run dev
