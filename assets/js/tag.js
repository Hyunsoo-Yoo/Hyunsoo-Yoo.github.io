function cleanTags() {
  const badTags = document.querySelectorAll('.bad-tag');
  badTags.forEach(tag => {
    tag.classList.add('fade-out');

    // 애니메이션 끝나고 display: none 적용
    setTimeout(() => {
      tag.style.display = 'none';
    }, 800); // 애니메이션 시간(ms)과 동일하게
  });
}

function restoreTags() {
  const badTags = document.querySelectorAll('.bad-tag');
  badTags.forEach(tag => {
    tag.classList.remove('fade-out');
    tag.style.display = 'inline';  // 다시 보이게!
  });
}