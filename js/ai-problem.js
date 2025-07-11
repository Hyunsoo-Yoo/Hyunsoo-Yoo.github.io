(() => {
  /* 배경 이미지 3장 - 필요하면 경로만 바꾸세요 */
  const imgs = [
    'images/background2.png',
    'images/background3.png',
    'images/background4.png'
  ];

  const delay = 5000;           // 전환 간격(ms)
  const target = document.getElementById('ai-problem');
  if (!target) return;          // 섹션이 없으면 종료

  /* 첫 슬라이드 div 만들기 */
  const slide = document.createElement('div');
  slide.className = 'slide';
  slide.style.backgroundImage = `url(${imgs[0]})`;
  target.prepend(slide);

  /* 교체 루프 */
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % imgs.length;
    slide.style.opacity = 0;                 // 페이드아웃
    setTimeout(() => {
      slide.style.backgroundImage = `url(${imgs[idx]})`;
      slide.style.opacity = 1;               // 페이드인
    }, 700);                                 // 700 ms = CSS 전환 시간
  }, delay);

})();