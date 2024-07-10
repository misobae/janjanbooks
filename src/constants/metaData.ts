const metaDataRules = [
  {
    pattern: /^\/$/,
    title: '홈',
    keywords: '독서 기록 앱, 독서 기록 관리, 독서 기록 저장',
    description: '책을 읽고 기록하는 데에 도움이 되는 웹 애플리케이션입니다. 개인의 독서 기록을 관리하고 저장하여 독서 경험을 향상시키세요.'
  },
  {
    pattern: /^\/list\/*/,
    title: '서재',
    keywords: '독서 기록, 개인 서재, 책 목록',
    description: '서재 페이지는 사용자가 읽은 책의 목록을 보여주는 곳입니다. 책들을 관리하고, 독서 기록을 확인하세요.'
  },
  { 
    pattern: /^\/statistics\/*/,
    title: '통계',
    keywords: '독서 통계, 독서 통계 앱, 독서 통계 사이트',
    description: '통계 페이지에서는 독서 활동에 관련된 다양한 통계와 그래프를 확인할 수 있습니다. 독서 습관을 분석하고 개선할 수 있는 도구를 제공합니다.'
  },
  {
    pattern: /^\/search\/*/,
    title: '검색',
    keywords: '도서 검색, 책 검색, 도서 찾기',
    description: '검색 페이지에서는 다양한 도서를 검색하고 찾을 수 있습니다. 원하는 책을 빠르게 찾아보세요.'
  },
  { 
    pattern: /^\/record\/write\//,
    title: '기록 작성',
    keywords: '독서 기록 작성, 책 기록하기',
    description: '기록 작성 페이지에서는 읽은 책에 대한 기록을 작성할 수 있습니다. 책의 감상평이나 리뷰를 남겨보세요.'
  },
  {
    pattern: /^\/record\/update\//,
    title: '기록 수정',
    keywords: '독서 기록 수정, 책 기록 수정',
    description: '기록 수정 페이지에서는 이전에 작성한 독서 기록을 수정할 수 있습니다. 필요한 경우 정보를 업데이트하세요.'
  },
  {
    pattern: /^\/record\/*/,
    title: '기록',
    keywords: '독서 기록, 읽은 책',
    description: '기록 페이지에서는 사용자가 작성한 독서 기록을 확인할 수 있습니다. 작성한 기록을 확인하세요.'
  },
];


const getMetaData = (path: string) => {
  const metaData = metaDataRules.find(rule => rule.pattern.test(path));
  return metaData || { title: '잔잔북스', keywords: '잔잔북스',description: '잔잔북스' };
};

export default getMetaData;