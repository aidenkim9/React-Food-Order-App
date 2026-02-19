🍔 ReactFood

React를 활용해 구현한 음식 주문 웹 애플리케이션입니다.
백엔드 API와 통신하여 데이터를 불러오고, 장바구니 상태를 관리하며,
사용자 입력을 수집해 주문 데이터를 서버로 전송하는 전체 흐름을 구현했습니다.

목표: 클라이언트-서버 데이터 흐름 이해 및 상태 관리 구조 설계

🚀 주요 기능

📡 백엔드에서 음식 목록(fetch) 불러오기

🛒 장바구니에 상품 추가 / 수량 증가 / 감소

💰 총 금액 자동 계산

🪟 모달 기반 Cart & Checkout UI

📝 FormData를 활용한 사용자 입력 수집

📦 주문 객체 생성 후 POST 요청으로 서버 전송

⏳ 비동기 처리에 따른 loading / error 상태 관리

♻️ 불변성을 유지한 상태 업데이트 구현

🛠 기술 스택
Frontend

React

Context API

useState / useEffect

Fetch API

Backend

Node.js

Express

REST API

📦 데이터 흐름
1️⃣ 음식 목록 조회

useEffect에서 초기 데이터 fetch

loading / error 상태 관리

Context를 통해 전역 상태로 저장

2️⃣ 장바구니 상태 관리

상품 존재 여부 확인 후:

없으면 새로 추가

있으면 수량 증가

불변성을 유지한 배열 업데이트 방식으로 상태를 관리했습니다.

3️⃣ 주문 제출 흐름

Checkout 모달에서 FormData로 입력값을 수집한 뒤
다음과 같은 구조의 객체를 생성합니다:

{
"customer": {
"name": "홍길동",
"email": "example@email.com",
"street": "Seoul",
"postalCode": "12345",
"city": "Seoul"
},
"items": []
}

이 객체를 JSON으로 변환하여 백엔드로 POST 요청을 전송합니다.

🧠 프로젝트를 통해 배운 점

Context를 활용한 전역 상태 관리 구조 설계

비동기 처리 시 loading / error 상태 관리 방법

FormData 기반 폼 제출 처리 방식 이해

fetch를 이용한 REST API 통신 구조

불변성을 지키는 상태 업데이트 패턴

UI와 비즈니스 로직 분리의 중요성

📈 개선 예정 사항

API 로직을 별도 서비스 레이어로 분리

useReducer를 활용한 상태 관리 구조 개선

주문 성공 시 사용자 피드백 UI 추가

입력값 유효성 검증 강화

전체 프로젝트 배포 (Frontend + Backend)

🏁 실행 방법
npm install
npm run dev

⚠️ 백엔드 서버가 아래 주소에서 실행 중이어야 합니다:

http://localhost:3000

🎯 프로젝트 목적

이 프로젝트는 단순 UI 구현이 아닌,

클라이언트-서버 데이터 흐름 이해

상태 관리 설계 능력 향상

비동기 처리 경험 축적

을 목표로 제작되었습니다.

🔥 한 줄 요약

React 기반 음식 주문 앱을 통해
상태 관리, 비동기 처리, 서버 통신 흐름을 직접 설계하고 구현한 프로젝트입니다.
