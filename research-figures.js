(() => {
  'use strict';
  if (typeof HTMLDialogElement === 'undefined' || typeof HTMLDialogElement.prototype.showModal !== 'function') return;

  const viewer = document.createElement('dialog');
  viewer.id = 'research-figure-viewer';
  viewer.setAttribute('aria-labelledby', 'research-figure-title');
  viewer.innerHTML = `
    <div class="research-figure-header">
      <h2 id="research-figure-title"></h2>
      <button type="button" data-figure-close aria-label="Close enlarged image">Close <span aria-hidden="true">×</span></button>
    </div>
    <div class="research-figure-stage"><img alt=""></div>`;
  document.body.append(viewer);

  const title = viewer.querySelector('#research-figure-title');
  const stage = viewer.querySelector('.research-figure-stage');
  const image = stage.querySelector('img');
  const closeButton = viewer.querySelector('[data-figure-close]');
  let opener = null;

  function closeViewer() {
    if (viewer.open) viewer.close();
  }

  // Delegation also handles figures inserted into the project detail dialog.
  document.addEventListener('click', event => {
    const link = event.target.closest('a.absorber-figure-link');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const thumbnail = link.querySelector('img');
    if (!thumbnail) return;
    event.preventDefault();
    opener = link;
    const heading = link.closest('figure')?.querySelector('figcaption strong');
    title.textContent = heading?.textContent || thumbnail.alt || 'Project image';
    image.alt = thumbnail.alt;
    image.src = link.href;
    document.body.classList.add('research-figure-viewing');
    if (!viewer.open) viewer.showModal();
    closeButton.focus({ preventScroll: true });
  });

  closeButton.addEventListener('click', closeViewer);
  viewer.addEventListener('cancel', event => {
    event.preventDefault();
    event.stopPropagation();
    closeViewer();
  });
  viewer.addEventListener('click', event => {
    if (event.target === viewer || event.target === stage) closeViewer();
  });
  viewer.addEventListener('close', () => {
    document.body.classList.remove('research-figure-viewing');
    image.removeAttribute('src');
    if (opener?.isConnected) opener.focus({ preventScroll: true });
    opener = null;
  });
  window.addEventListener('hashchange', closeViewer);
  window.addEventListener('popstate', closeViewer);
})();
