(() => {
  'use strict';
  const dialog = document.getElementById('detail-dialog');
  const title = document.getElementById('detail-title');
  const eyebrow = document.getElementById('detail-eyebrow');
  const body = document.getElementById('detail-body');
  const closeButton = document.getElementById('close-dialog');
  const backButton = document.getElementById('back-to-previous');
  const scroller = dialog.querySelector('.dialog-scroll');
  const defaultTitle = document.title;
  const templates = new Map([...document.querySelectorAll('template[id^="content-"]')].map(t => [t.id.replace('content-', ''), t]));
  let lastTrigger = null;
  let activeRoute = null;
  const routeLabels = {
    direction: 'research interests', research: 'research & projects', about: 'about me',
    outputs: 'research outputs', education: 'education', beyond: 'outside the lab',
    pll: 'hybrid PLLs', dvs: 'sensor design', rf: 'RF experience', absorber: 'metasurface absorber', amplifier: 'amplifier design', 'fpga-clock': 'FPGA digital clock', monitor: 'analog monitor'
  };
  function routeState(route) {
    const state = history.state && history.state.circuitNavigation;
    return state && state.route === route ? state : null;
  }
  function rememberView(focusRoute = null) {
    if (!activeRoute || !dialog.open) return;
    const state = routeState(activeRoute) || { route: activeRoute, fromRoute: null };
    history.replaceState({ ...history.state, circuitNavigation: {
      ...state, scrollTop: scroller.scrollTop, focusRoute
    } }, '', location.href);
  }
  function renderRoute() {
    const route = location.hash.slice(1);
    const template = templates.get(route);
    if (!template) {
      if (dialog.open) dialog.close();
      document.title = defaultTitle;
      activeRoute = null;
      backButton.hidden = true;
      return;
    }
    if (activeRoute === route && dialog.open) return;
    activeRoute = route;
    title.textContent = template.dataset.title;
    eyebrow.textContent = template.dataset.eyebrow;
    body.replaceChildren(template.content.cloneNode(true));
    document.title = `${template.dataset.title.replace(/\.$/, '')} — Yunjae Lee`;
    let state = routeState(route);
    if (!state) {
      state = { route, fromRoute: null, scrollTop: 0, focusRoute: null };
      history.replaceState({ ...history.state, circuitNavigation: state }, '', location.href);
    }
    backButton.hidden = !templates.has(state.fromRoute);
    backButton.textContent = `← Back to ${routeLabels[state.fromRoute] || 'previous view'}`;
    if (!dialog.open) dialog.showModal();
    const returnLink = templates.has(state.focusRoute)
      ? body.querySelector(`a[data-route="${state.focusRoute}"]`) : null;
    (returnLink || closeButton).focus({ preventScroll: true });
    scroller.scrollTop = Number.isFinite(state.scrollTop) ? state.scrollTop : 0;
  }
  function navigateTo(route) {
    if (activeRoute === route && dialog.open) return;
    const fromRoute = dialog.open ? activeRoute : null;
    rememberView(route);
    history.pushState({ circuitNavigation: {
      route, fromRoute, scrollTop: 0, focusRoute: null
    } }, '', `${location.pathname}${location.search}#${route}`);
    renderRoute();
  }
  function closeDetails() {
    rememberView();
    history.pushState(null, '', location.pathname + location.search);
    if (dialog.open) dialog.close();
    activeRoute = null;
    backButton.hidden = true;
    document.title = defaultTitle;
    if (lastTrigger && lastTrigger.isConnected) lastTrigger.focus({ preventScroll: true });
    else document.querySelector('.identity').focus({ preventScroll: true });
  }
  // All routed links retain real profile destinations for no-JS and older browsers.
  if (typeof dialog.showModal === 'function') {
    document.addEventListener('click', event => {
      const link = event.target.closest('a[data-route]');
      if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const route = link.dataset.route;
      if (!templates.has(route)) return;
      event.preventDefault();
      if (!dialog.open) lastTrigger = link;
      navigateTo(route);
    });
    backButton.addEventListener('click', () => {
      const state = routeState(activeRoute);
      if (!state || !templates.has(state.fromRoute)) return;
      rememberView();
      history.back();
    });
    closeButton.addEventListener('click', closeDetails);
    document.getElementById('back-to-map').addEventListener('click', closeDetails);
    dialog.addEventListener('cancel', event => { event.preventDefault(); closeDetails(); });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDetails();
    });
    window.addEventListener('hashchange', renderRoute);
    window.addEventListener('popstate', renderRoute);
    renderRoute();
  }
  const paths = [...document.querySelectorAll('[data-trace]')];
  for (const node of document.querySelectorAll('.map-node')) {
    const highlight = () => paths.forEach(path => path.classList.toggle('active', path.dataset.trace === node.dataset.route));
    const clear = () => paths.forEach(path => path.classList.remove('active'));
    node.addEventListener('pointerenter', highlight);
    node.addEventListener('pointerleave', clear);
    node.addEventListener('focus', highlight);
    node.addEventListener('blur', clear);
  }
  const toggle = document.getElementById('motion-toggle');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = preference.matches;
  function updateMotion() {
    document.body.classList.toggle('motion-paused', paused);
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.querySelector('.motion-label').textContent = paused ? 'Motion paused' : 'Pause motion';
    toggle.querySelector('.motion-icon').textContent = paused ? '▷' : 'Ⅱ';
    toggle.setAttribute('aria-label', paused ? 'Resume signal animation' : 'Pause signal animation');
    toggle.disabled = preference.matches;
    if (preference.matches) toggle.setAttribute('aria-label', 'Animation disabled by your reduced motion preference');
  }
  toggle.addEventListener('click', () => { paused = !paused; updateMotion(); });
  preference.addEventListener('change', () => { paused = preference.matches; updateMotion(); });
  document.addEventListener('visibilitychange', () => document.body.classList.toggle('page-hidden', document.hidden));
  updateMotion();
})();
