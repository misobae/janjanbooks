# 잔잔북스
![project_janjanbooks_thumb](https://github.com/misobae/janjanbooks/assets/156400599/c24e6b10-8a0d-426a-9bac-682ba12adb4b)

## 프로젝트 소개
이 프로젝트는 독서 기록을 편리하게 관리하는 웹 어플리케이션입니다. 사용자는 책 정보와 함께 독서 상태, 기간, 독서록이나 독후감을 쉽게 기록할 수 있으며, 연도별과 월별 통계를 통해 독서 빈도를 시각적으로 확인할 수 있습니다.


## 기능 소개
### 도서 검색 기능
카카오 API를 활용해 도서 검색 기능을 구현했습니다.

![도서 검색](https://github.com/misobae/janjanbooks/assets/156400599/62e41917-f5ed-4279-8412-e7c0b915fba4)

<br />

### 검색한 도서에 대한 상세 기록과 수정, 삭제 기능

#### 기록
검색한 책의 상세 정보와 사용자가 작성한 리뷰를 Recoil State에 저장하여 기록 기능을 구현했습니다. 사용자가 도서를 검색하고 선택하면, 해당 책의 정보와 사용자가 입력한 리뷰가 localStorage에 저장됩니다. 

![독서+기록_out](https://github.com/misobae/janjanbooks/assets/156400599/fbcd2bff-a133-4ebe-9f0c-ab80708448bd)

#### 수정
사용자가 리뷰를 수정하면, 해당 리뷰를 새로운 정보로 업데이트하는 기능을 구현했습니다. 사용자가 기존의 리뷰를 선택하고 수정하면, 기존 리뷰 목록에서 수정된 리뷰의 ID와 일치하는 항목을 찾아 업데이트합니다.

![기록+수정_out](https://github.com/misobae/janjanbooks/assets/156400599/01ba9b77-1aa5-449a-a991-8562d580ba03)


#### 삭제
사용자가 리뷰를 삭제하면, 해당 리뷰를 목록에서 제거하는 기능을 구현했습니다. 사용자가 삭제하려는 리뷰를 선택하면, 기존 리뷰 목록을 필터링하여 삭제할 리뷰의 ID와 일치하지 않는 항목만을 새로운 배열에 담아 전체 리뷰 목록을 업데이트합니다.

![기록 삭제](https://github.com/misobae/janjanbooks/assets/156400599/5624f35a-385d-4595-8aa3-40f50e38be8b)

<br />

### 저장한 독서 기록을 상태별로 나누어볼 수 있는 탭 기능
사용자가 저장한 독서 기록을 상태별로 구분하여 편리하게 관리할 수 있는 탭 기능을 구현했습니다. 각 탭 버튼을 클릭하면 해당 카테고리로 라우팅 되고, 해당 카테고리에 속하는 독서 기록을 필터링하여 리스트에 출력합니다.

![카테고리](https://github.com/misobae/janjanbooks/assets/156400599/7f322824-dfe2-4800-9e83-438becd54842)


<br />

### 저장한 독서 기록 내부 검색 기능
사용자가 저장한 독서 기록 중에서 원하는 책을 빠르게 찾을 수 있도록 내부 검색 기능을 구현했습니다. 검색창에 기록한 책의 제목이나 정보를 검색하면, 저장된 기록 중에서 검색한 내용과 일치하는 기록을 찾아 리스트에 표시합니다.

![내부 검색](https://github.com/misobae/janjanbooks/assets/156400599/5d6cf7ea-e828-40fa-8bdd-8aa060cca253)


<br />

### 연도별, 월별 독서 통계
다 읽은 책은 통계 페이지에서 연도별, 월별로 독서 빈도를 시각적으로 확인할 수 있도록 구현했습니다.

![통계](https://github.com/misobae/janjanbooks/assets/156400599/dcbd4397-7c3d-4496-99fb-1c0baa254616)



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