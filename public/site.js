(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const nav = $('siteNav');
  const line = document.querySelector('.scroll-line');
  const menu = $('siteMenu');
  const toggle = document.querySelector('.menu-toggle');
  const close = document.querySelector('.menu-close');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let returnFocus = toggle;

  function progress() {
    nav?.classList.toggle('scrolled', scrollY > 70);
    const distance = document.documentElement.scrollHeight - innerHeight;
    if (line) line.style.width = `${distance > 0 ? Math.min(100, scrollY / distance * 100) : 0}%`;
  }
  addEventListener('scroll', progress, { passive: true });
  progress();
  function openMenu() {
    returnFocus = document.activeElement;
    menu.removeAttribute('inert');
    menu.setAttribute('aria-hidden', 'false');
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    close.focus();
  }
  function closeMenu() {
    if (!menu.classList.contains('open')) return;
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    menu.setAttribute('inert', '');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    (returnFocus || toggle).focus();
  }
  toggle?.addEventListener('click', openMenu);
  close?.addEventListener('click', closeMenu);
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu?.classList.contains('open')) closeMenu();
  });
  menu?.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const items = [...menu.querySelectorAll('button,a[href]')].filter(el => el.getClientRects().length);
    if (!items.length) return;
    if (e.shiftKey && document.activeElement === items[0]) { e.preventDefault(); items.at(-1).focus(); }
    if (!e.shiftKey && document.activeElement === items.at(-1)) { e.preventDefault(); items[0].focus(); }
  });

  const grid = $('productsGrid');
  if (grid) {
    const cards = [...grid.querySelectorAll('.product-card')];
    const search = $('search'), family = $('family'), season = $('season'), sort = $('sort');
    function update() {
      const q = search.value.trim().toLocaleLowerCase();
      const visible = [];
      cards.forEach(card => {
        const ok = (!q || card.dataset.search.includes(q)) &&
          (!family.value || card.dataset.family === family.value) &&
          (!season.value || card.dataset.season === season.value);
        card.hidden = !ok;
        if (ok) visible.push(card);
      });
      const collator = new Intl.Collator('en', { sensitivity: 'base' });
      visible.sort((a, b) => {
        if (sort.value === 'name') return collator.compare(a.dataset.name, b.dataset.name);
        if (sort.value === 'price-low') return Number(a.dataset.price) - Number(b.dataset.price);
        if (sort.value === 'price-high') return Number(b.dataset.price) - Number(a.dataset.price);
        return Number(a.dataset.order) - Number(b.dataset.order);
      }).forEach(card => grid.appendChild(card));
      $('results').textContent = `Showing ${visible.length} of ${cards.length} cloth studies`;
      $('emptyState').hidden = visible.length > 0;
    }
    [search, family, season, sort].forEach(el => el.addEventListener(el === search ? 'input' : 'change', update));
    function reset() { search.value = ''; family.value = ''; season.value = ''; sort.value = 'curated'; update(); search.focus(); }
    $('reset').addEventListener('click', reset);
    $('emptyReset').addEventListener('click', reset);
    update();
  }

  const imageDialog = $('imageDialog');
  $('zoomImage')?.addEventListener('click', () => { imageDialog.showModal(); $('closeImage').focus(); });
  $('closeImage')?.addEventListener('click', () => imageDialog.close());
  imageDialog?.addEventListener('click', e => { if (e.target === imageDialog) imageDialog.close(); });

  const form = $('inquiryForm');
  if (form) {
    const product = $('product'), service = $('service'), quantity = $('quantity');
    const money = n => `PKR ${n.toLocaleString('en-PK')}`;
    const stitching = { fabric: 0, shalwar: 3200, kurta: 2400, waistcoat: 3900 };
    const labels = { fabric: 'Fabric only', shalwar: 'Fabric + shalwar kameez', kurta: 'Fabric + kurta', waistcoat: 'Fabric + waistcoat' };
    const params = new URLSearchParams(location.search);
    if ([...product.options].some(o => o.value === params.get('product'))) product.value = params.get('product');
    function calculation() {
      let n = Number.parseInt(quantity.value, 10);
      if (!Number.isFinite(n)) n = 1;
      n = Math.min(20, Math.max(1, n));
      const selected = product.selectedOptions[0];
      const fabric = Number(selected?.dataset.price || 0);
      const rate = stitching[service.value] || 0;
      return { n, selected, fabric, rate, total: (fabric + rate) * n };
    }
    function updateEstimate() {
      const c = calculation();
      $('estimateTotal').textContent = c.fabric ? money(c.total) : 'Select a cloth';
      $('estimateBreakdown').textContent = c.fabric
        ? `${c.n} × (${money(c.fabric)} fabric guide${c.rate ? ` + ${money(c.rate)} illustrative stitching` : ''}). This is a mockup budget, not a quote.`
        : 'Choose a fabric for a guide total. Final cut, stock, price and tailoring are confirmed before an order.';
    }
    [product, service, quantity].forEach(el => el.addEventListener('change', updateEstimate));
    quantity.addEventListener('input', updateEstimate);
    updateEstimate();
    form.addEventListener('submit', e => e.preventDefault());
    form.querySelectorAll('input,select,textarea').forEach(el => el.addEventListener('input', () => {
      el.classList.remove('invalid');
      const error = $(el.id + 'Error'); if (error) error.textContent = '';
      $('formStatus').textContent = '';
    }));
    function brief() {
      ['name', 'contact'].forEach(id => { $(id).classList.remove('invalid'); $(id + 'Error').textContent = ''; });
      const name = $('name').value.trim(), contact = $('contact').value.trim();
      let valid = true;
      if (!name) { $('name').classList.add('invalid'); $('nameError').textContent = 'Enter your name.'; valid = false; }
      const plausible = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) || contact.replace(/\D/g, '').length >= 7;
      if (!plausible) { $('contact').classList.add('invalid'); $('contactError').textContent = 'Enter a valid email or phone number.'; valid = false; }
      if (!valid) { $('formStatus').textContent = 'Complete the highlighted fields first.'; ($('name').classList.contains('invalid') ? $('name') : $('contact')).focus(); return null; }
      const c = calculation();
      return [
        'LOOMZ — fabric and tailoring inquiry',
        `Name: ${name}`, `Contact: ${contact}`,
        `Cloth: ${c.fabric ? c.selected.textContent : 'Please advise'}`,
        `Request: ${labels[service.value]}`, `Number of cuts: ${c.n}`,
        `Timing or occasion: ${$('timing').value.trim() || 'Not specified'}`,
        `Measurements and style notes: ${$('notes').value.trim() || 'To discuss'}`,
        `Illustrative website budget: ${c.fabric ? money(c.total) : 'To discuss'}`,
        '', 'Please confirm actual fabric, composition, width, required cut, care, price, availability, fitting and completion date before an order.'
      ].join('\n');
    }
    $('copyInquiry').addEventListener('click', async () => {
      const value = brief(); if (!value) return;
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(value);
        $('manualCopy').hidden = true;
        $('formStatus').textContent = 'Brief copied. Paste it into your preferred channel; this website has not sent it.';
      } catch {
        $('manualCopy').hidden = false;
        $('manualText').value = value;
        $('manualText').focus(); $('manualText').select();
        $('formStatus').textContent = 'Clipboard unavailable here. Select and copy the brief shown below.';
      }
    });
    $('downloadInquiry').addEventListener('click', () => {
      const value = brief(); if (!value) return;
      const url = URL.createObjectURL(new Blob([value], { type: 'text/plain;charset=utf-8' }));
      const a = document.createElement('a'); a.href = url; a.download = 'LOOMZ-fabric-inquiry.txt';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      $('formStatus').textContent = 'Brief downloaded. This website has not sent it.';
    });
  }
})();
