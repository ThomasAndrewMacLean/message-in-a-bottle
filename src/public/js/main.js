const clickBtn = () => {
  console.log(navigator);
  if (navigator.share) {
    navigator
      .share({
        title: 'Web Fundamentals',
        text: 'Check out Web Fundamentals — it rocks!',
        url: 'https://developers.google.com/web'
      })
      .then(() => console.log('Successful share'))
      .catch(error => console.log('Error sharing', error));
  }
};

const btn = document.getElementById('btn');
if (btn) {
  btn.addEventListener('click', clickBtn);
}

const clickBtnWa = () => {
  let aLink = document.createElement('a');
  aLink.href = 'whatsapp://send?text=secret message...: ';
  aLink.click();
};
const btnWa = document.getElementById('btn-wa');
if (btnWa) {
  btnWa.addEventListener('click', clickBtnWa);
}
