(() => {
  'use strict';
  if (typeof HTMLDialogElement === 'undefined' || typeof HTMLDialogElement.prototype.showModal !== 'function') return;

  const viewer = document.createElement('dialog');
  viewer.id = 'photo-viewer';
  viewer.setAttribute('aria-labelledby', 'photo-viewer-title');
  viewer.innerHTML = `
    <div class="photo-viewer-header">
      <div><p class="photo-viewer-kicker">Photography by Yunjae Lee</p><h2 id="photo-viewer-title"></h2></div>
      <button type="button" data-photo-close aria-label="Close photograph">Close <span aria-hidden="true">×</span></button>
    </div>
    <figure class="photo-viewer-stage"><img class="photo-viewer-image" alt=""></figure>
    <div class="photo-viewer-footer">
      <p class="photo-viewer-count" aria-live="polite" aria-atomic="true"></p>
      <a class="photo-viewer-original" target="_blank" rel="noopener">Open image ↗</a>
      <div class="photo-viewer-controls"><button type="button" data-photo-previous aria-label="Previous photograph">← Previous</button><button type="button" data-photo-next aria-label="Next photograph">Next →</button></div>
    </div>`;
  document.body.append(viewer);

  const photo = viewer.querySelector('.photo-viewer-image');
  const title = viewer.querySelector('#photo-viewer-title');
  const count = viewer.querySelector('.photo-viewer-count');
  const original = viewer.querySelector('.photo-viewer-original');
  const closeButton = viewer.querySelector('[data-photo-close]');
  let photographs = [];
  let position = 0;
  let opener = null;

  function showPhoto(index) {
    if (!photographs.length) return;
    position = (index + photographs.length) % photographs.length;
    const link = photographs[position];
    photo.alt = link.querySelector('img').alt;
    photo.src = link.href;
    title.textContent = link.dataset.photoTitle;
    count.textContent = `${position + 1} / ${photographs.length}`;
    original.href = link.href;
    original.setAttribute('aria-label', `Open ${link.dataset.photoTitle} in a new tab`);
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-photo]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const gallery = link.closest('.photography-gallery');
    if (!gallery) return;
    event.preventDefault();
    photographs = [...gallery.querySelectorAll('a[data-photo]')];
    opener = link;
    showPhoto(photographs.indexOf(link));
    document.body.classList.add('photo-viewing');
    if (!viewer.open) viewer.showModal();
    closeButton.focus({ preventScroll: true });
  });

  function closeViewer() {
    if (viewer.open) viewer.close();
  }
  closeButton.addEventListener('click', closeViewer);
  viewer.querySelector('[data-photo-previous]').addEventListener('click', () => showPhoto(position - 1));
  viewer.querySelector('[data-photo-next]').addEventListener('click', () => showPhoto(position + 1));
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(position + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  viewer.addEventListener('cancel', event => { event.preventDefault(); closeViewer(); });
  viewer.addEventListener('click', event => {
    if (event.target === viewer || event.target.classList.contains('photo-viewer-stage')) closeViewer();
  });
  viewer.addEventListener('close', () => {
    document.body.classList.remove('photo-viewing');
    if (opener && opener.isConnected) opener.focus({ preventScroll: true });
  });
  window.addEventListener('hashchange', closeViewer);
})();
