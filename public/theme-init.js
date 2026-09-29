/* Apply a saved palette before the stylesheet paints. Storage can be unavailable. */
(() => {
  let theme = 'linen';
  try {
    const saved = localStorage.getItem('loomz-palette');
    if (['linen', 'sage', 'dusk'].includes(saved)) theme = saved;
  } catch { /* The default palette remains usable. */ }
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme === 'dusk' ? 'dark' : 'light';
})();
