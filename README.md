# 잔잔북스
<div align="center">
  <img width="300" alt="image" src="https://github.com/misobae/janjanbooks/assets/156400599/ad647f41-1c06-45eb-b777-2df7f4186904">
</div>


## 프로젝트 소개
잔잔북스는 독서 기록을 편리하게 관리하는 웹 애플리케이션입니다. 원하는 책을 검색하여 책 정보와 함께 독서 상태, 기간, 리뷰를 기록할 수 있습니다. 독서 상태별로 구분된 서재 기능과 작성한 리뷰에 대한 검색 기능 등 꼭 필요한 기능을 갖추고 있습니다. 또한 독서 통계 페이지에서 자신의 독서 패턴을 파악할 수 있습니다.


## 기능 소개
### 도서 검색 기능
책 제목이나 작가명으로 기록하고 싶은 책을 검색할 수 있습니다.
<div>
  <img width="300" alt="image" src="https://github.com/misobae/janjanbooks/assets/156400599/03c545cc-22ea-460b-8b3c-d547192cf86a">
</div>
<br />

### 검색한 도서에 대한 상세 기록과 수정, 삭제 기능
책 정보와 함께 독서 상태, 기간, 리뷰를 기록하고 수정 및 삭제할 수 있습니다.
#### 기록
<div>
  <img width="300" alt="image" src="https://github.com/misobae/janjanbooks/assets/156400599/7da77337-34ff-471c-a611-3645f5a54e8f">
</div>

#### 수정
<div>
  <img width="300" alt="image" src="https://github.com/misobae/janjanbooks/assets/156400599/9cdad056-43cb-4420-b9b6-24290ec14f5e">
</div>

#### 삭제
<div>
  <img width="300" alt="image" src="https://github.com/misobae/janjanbooks/assets/156400599/b57494d2-15ec-494c-97ee-d289831c3e9a">
</div>
<br />

### 저장한 독서 기록을 상태별로 나누어볼 수 있는 탭 기능
탭 기능을 사용하여 독서 기록을 상태별로 구분하여 편리하게 관리할 수 있습니다.
<div>
  <img width="300" alt="image" src="https://github.com/misobae/janjanbooks/assets/156400599/33e67026-da2c-4bd8-b1ab-33c2144cc35b">
</div>
<br />


### 저장한 독서 기록 내부 검색 기능
서재 내부에서 저장한 독서 기록을 검색하여 원하는 기록을 빠르게 찾을 수 있습니다.
<div>
  <img width="300" alt="image" src="https://github.com/misobae/janjanbooks/assets/156400599/4d902110-5681-479d-9b78-c45049cfc5ab">
</div>
<br />

### 연도별, 월별 독서 통계
연도별, 월별 독서 빈도를 통계 페이지에서 한눈에 파악할 수 있습니다.
<div>
  <img width="300" alt="image" src="https://github.com/misobae/janjanbooks/assets/156400599/0ee2436d-bf58-4446-a2c8-51b456116611">
</div>
<br />


## 트러블 슈팅
<a href="https://velog.io/@baesmile/%EC%9E%94%EC%9E%94%EB%B6%81%EC%8A%A4-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9B%84%EA%B8%B0#%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85" target="_blank" rel="noreferrer noopener">블로그에 작성했습니다.</a>

## 사용한 기술 및 라이브러리
- 언어: TypeScript
- 코어 라이브러리: React
- 상태관리: Recoil, React Query
- 스타일: Tailwind CSS
- HTTP 클라이언트: Axios
- 외부 라이브러리: 카카오 REST API
- 패키지 매니저: npm
- 빌드: Webpack

## 개발 환경
node ```v20.11.0```

npm ```10.2.4```

## 프로젝트 설치 및 실행 방법
1. 소스 코드 가져오기
```bash
git clone https://github.com/misobae/janjanbooks.git
```
2. 복제된 프로젝트 폴더로 이동
```bash
cd janjanbooks
```
3. 패키지 Dependencies 설치
```bash
npm install
```
4. [kakao developers](https://developers.kakao.com/)에서 API key 요청, 이를 .env 파일에 추가
```bash
KAKAO_API_KEY=KAKAO_API_KEY
```
5. 애플리케이션 실행
```bash
npm run dev
```