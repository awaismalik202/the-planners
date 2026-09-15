(function () {
  var triggers = document.querySelectorAll('[data-lightbox]');
  if (!triggers.length) return;

  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('hidden', '');
  overlay.innerHTML =
    '<div class="lightbox-backdrop" data-lightbox-close tabindex="-1"></div>' +
    '<div class="lightbox-panel">' +
    '<button type="button" class="lightbox-close" data-lightbox-close aria-label="Close image">' +
    '<span aria-hidden="true">&times;</span>' +
    '</button>' +
    '<figure class="lightbox-figure">' +
    '<img class="lightbox-img" alt="" />' +
    '<figcaption class="lightbox-caption"></figcaption>' +
    '</figure>' +
    '</div>';
  document.body.appendChild(overlay);

  var img = overlay.querySelector('.lightbox-img');
  var caption = overlay.querySelector('.lightbox-caption');
  var closeBtn = overlay.querySelector('.lightbox-close');
  var lastFocus = null;
  var open = false;

  function getFocusable() {
    return overlay.querySelectorAll(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  }

  function setOpen(isOpen) {
    open = isOpen;
    overlay.classList.toggle('is-open', isOpen);
    overlay.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    if (isOpen) {
      overlay.removeAttribute('hidden');
      document.body.classList.add('lightbox-open');
    } else {
      overlay.setAttribute('hidden', '');
      document.body.classList.remove('lightbox-open');
      img.removeAttribute('src');
      img.alt = '';
      caption.textContent = '';
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
      lastFocus = null;
    }
  }

  function openLightbox(src, alt, title) {
    lastFocus = document.activeElement;
    img.src = src;
    img.alt = alt || '';
    caption.textContent = title || alt || '';
    setOpen(true);
    closeBtn.focus();
  }

  function closeLightbox() {
    if (!open) return;
    setOpen(false);
  }

  triggers.forEach(function (el) {
    el.addEventListener('click', function () {
      var src = el.getAttribute('data-lightbox') || (el.querySelector('img') && el.querySelector('img').src);
      if (!src) return;
      var imgEl = el.querySelector('img');
      var alt = el.getAttribute('data-lightbox-alt') || (imgEl && imgEl.alt) || '';
      var title = el.getAttribute('data-lightbox-title') || '';
      openLightbox(src, alt, title);
    });
  });

  overlay.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-lightbox-close')) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!open) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeLightbox();
      return;
    }
    if (e.key !== 'Tab') return;
    var nodes = Array.prototype.slice.call(getFocusable());
    if (!nodes.length) return;
    var first = nodes[0];
    var last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
})();
