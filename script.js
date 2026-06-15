
/* ==========================================================================
   NOVA ELECTRONICS — SCRIPT
   Handles: preloader, navbar scroll state, mobile menu, search panel,
   product data + rendering, filtering/search, scroll-reveal (Intersection
   Observer), animated counters, contact form validation, FABs & toast.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------ */
  /* 1. PRELOADER                                                         */
  /* ------------------------------------------------------------------ */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('is-hidden'), 400);
  });
  // Fallback in case 'load' fires very late (e.g. slow external images)
  setTimeout(() => preloader.classList.add('is-hidden'), 2500);


  /* ------------------------------------------------------------------ */
  /* 2. NAVBAR SCROLL STATE                                               */
  /* ------------------------------------------------------------------ */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ------------------------------------------------------------------ */
  /* 3. MOBILE HAMBURGER MENU                                             */
  /* ------------------------------------------------------------------ */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');

  const openMobileNav = () => {
    mobileNav.classList.add('is-open');
    mobileNavBackdrop.classList.add('is-open');
    hamburger.classList.add('is-active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    mobileNav.classList.remove('is-open');
    mobileNavBackdrop.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    mobileNav.classList.contains('is-open') ? closeMobileNav() : openMobileNav();
  });

  mobileNavBackdrop.addEventListener('click', closeMobileNav);

  // Close drawer when a link is tapped
  document.querySelectorAll('.mobile-nav__link, .mobile-nav__cta').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileNav();
      closeSearch();
    }
  });


  /* ------------------------------------------------------------------ */
  /* 4. SEARCH PANEL TOGGLE                                               */
  /* ------------------------------------------------------------------ */
  const searchToggle = document.getElementById('searchToggle');
  const searchPanel = document.getElementById('searchPanel');
  const searchInput = document.getElementById('searchInput');
  const searchClose = document.getElementById('searchClose');

  function openSearch() {
    searchPanel.classList.add('is-open');
    searchToggle.setAttribute('aria-expanded', 'true');
    setTimeout(() => searchInput.focus(), 250);
  }

  function closeSearch() {
    searchPanel.classList.remove('is-open');
    searchToggle.setAttribute('aria-expanded', 'false');
  }

  searchToggle.addEventListener('click', () => {
    searchPanel.classList.contains('is-open') ? closeSearch() : openSearch();
  });

  searchClose.addEventListener('click', closeSearch);


  /* ------------------------------------------------------------------ */
  /* 5. PRODUCT DATA                                                      */
  /* ------------------------------------------------------------------ */
  // In a real deployment this could come from a CMS/API. Kept inline here
  // for a fast, dependency-free demo that's easy to edit.
  const PRODUCTS = [
    {
      id: 'p1',
      name: 'AuraPhone 15 Pro',
      category: 'smartphones',
      categoryLabel: 'Smartphone',
      price: 79999,
      oldPrice: 89999,
      rating: 4.8,
      reviews: 312,
      badge: 'New',
      img: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'p2',
      name: 'Galaxy Vision X1',
      category: 'smartphones',
      categoryLabel: 'Smartphone',
      price: 64999,
      oldPrice: 72999,
      rating: 4.6,
      reviews: 248,
      badge: 'Best Seller',
      img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'p3',
      name: 'Pixel Edge 9',
      category: 'smartphones',
      categoryLabel: 'Smartphone',
      price: 54999,
      oldPrice: null,
      rating: 4.5,
      reviews: 187,
      badge: '',
      img: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'p4',
      name: 'NovaBook Pro 14"',
      category: 'laptops',
      categoryLabel: 'Laptop',
      price: 109999,
      oldPrice: 124999,
      rating: 4.9,
      reviews: 156,
      badge: 'Top Rated',
      img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'p5',
      name: 'StormBook Gaming 16"',
      category: 'laptops',
      categoryLabel: 'Laptop',
      price: 139999,
      oldPrice: 154999,
      rating: 4.7,
      reviews: 98,
      badge: 'New',
      img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'p6',
      name: 'AirSlim Ultrabook',
      category: 'laptops',
      categoryLabel: 'Laptop',
      price: 84999,
      oldPrice: null,
      rating: 4.4,
      reviews: 73,
      badge: '',
      img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'p7',
      name: 'TabNova 11 2-in-1',
      category: 'tablets',
      categoryLabel: 'Tablet',
      price: 42999,
      oldPrice: 47999,
      rating: 4.6,
      reviews: 134,
      badge: 'Best Seller',
      img: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'p8',
      name: 'PocketPad Mini',
      category: 'tablets',
      categoryLabel: 'Tablet',
      price: 27999,
      oldPrice: null,
      rating: 4.3,
      reviews: 61,
      badge: '',
      img: 'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'p9',
      name: 'NovaWatch Active 2',
      category: 'watches',
      categoryLabel: 'Smart Watch',
      price: 14999,
      oldPrice: 17999,
      rating: 4.7,
      reviews: 289,
      badge: 'New',
      img: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'p10',
      name: 'PulseFit GT Pro',
      category: 'watches',
      categoryLabel: 'Smart Watch',
      price: 9999,
      oldPrice: 12499,
      rating: 4.4,
      reviews: 152,
      badge: '',
      img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'p11',
      name: 'EchoBuds Pro ANC',
      category: 'audio',
      categoryLabel: 'Audio',
      price: 8999,
      oldPrice: 10999,
      rating: 4.8,
      reviews: 421,
      badge: 'Best Seller',
      img: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'p12',
      name: 'BassWave Speaker Mini',
      category: 'audio',
      categoryLabel: 'Audio',
      price: 4999,
      oldPrice: 6499,
      rating: 4.5,
      reviews: 198,
      badge: '',
      img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'p13',
      name: 'StudioOver Headphones',
      category: 'audio',
      categoryLabel: 'Audio',
      price: 12999,
      oldPrice: 15999,
      rating: 4.7,
      reviews: 167,
      badge: 'New',
      img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'p14',
      name: '65W Fast Charger Combo',
      category: 'accessories',
      categoryLabel: 'Accessory',
      price: 1999,
      oldPrice: 2499,
      rating: 4.6,
      reviews: 312,
      badge: '',
      img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'p15',
      name: 'Armor Shield Case Set',
      category: 'accessories',
      categoryLabel: 'Accessory',
      price: 1299,
      oldPrice: null,
      rating: 4.3,
      reviews: 89,
      badge: '',
      img: 'https://images.unsplash.com/photo-1601593346740-925612772716?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 'p16',
      name: '20000mAh Power Bank',
      category: 'accessories',
      categoryLabel: 'Accessory',
      price: 2499,
      oldPrice: 2999,
      rating: 4.5,
      reviews: 204,
      badge: 'Best Seller',
      img: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=500&auto=format&fit=crop'
    }
  ];

  const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });


  /* ------------------------------------------------------------------ */
  /* 6. PRODUCT RENDERING                                                 */
  /* ------------------------------------------------------------------ */
  const productGrid = document.getElementById('productGrid');
  const productEmpty = document.getElementById('productEmpty');

  // Build a star-rating icon string (full / half / empty stars)
  function buildStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;
    const totalFull = rating % 1 >= 0.75 ? fullStars + 1 : fullStars;
    let html = '';
    for (let i = 0; i < 5; i++) {
      if (i < totalFull) {
        html += '<i class="fa-solid fa-star"></i>';
      } else if (i === totalFull && hasHalf) {
        html += '<i class="fa-solid fa-star-half-stroke"></i>';
      } else {
        html += '<i class="fa-regular fa-star"></i>';
      }
    }
    return html;
  }

  function createProductCard(product, index) {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.category = product.category;
    card.dataset.name = product.name.toLowerCase();
    // Stagger the entrance animation slightly for a polished feel
    card.style.animationDelay = `${(index % 8) * 0.05}s`;

    card.innerHTML = `
      <div class="product-card__img-wrap">
        ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
        <button class="product-card__wish" aria-label="Add ${product.name} to wishlist" aria-pressed="false">
          <i class="fa-regular fa-heart"></i>
        </button>
        <img src="${product.img}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="product-card__body">
        <span class="product-card__category">${product.categoryLabel}</span>
        <h3 class="product-card__name">${product.name}</h3>
        <div class="product-card__rating">
          ${buildStars(product.rating)}
          <span>${product.rating.toFixed(1)} (${product.reviews})</span>
        </div>
        <div class="product-card__price-row">
          <span class="product-card__price">${currencyFormatter.format(product.price)}</span>
          ${product.oldPrice ? `<span class="product-card__price-old">${currencyFormatter.format(product.oldPrice)}</span>` : ''}
        </div>
        <button class="product-card__cta" type="button" data-product="${product.id}">
          View Details <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    `;
    return card;
  }

  function renderProducts(list) {
    productGrid.innerHTML = '';
    if (list.length === 0) {
      productEmpty.hidden = false;
      return;
    }
    productEmpty.hidden = true;
    list.forEach((product, index) => {
      productGrid.appendChild(createProductCard(product, index));
    });
  }

  renderProducts(PRODUCTS);


  /* ------------------------------------------------------------------ */
  /* 7. WISHLIST TOGGLE (delegated)                                       */
  /* ------------------------------------------------------------------ */
  productGrid.addEventListener('click', (e) => {
    const wishBtn = e.target.closest('.product-card__wish');
    if (wishBtn) {
      const isActive = wishBtn.classList.toggle('is-active');
      wishBtn.setAttribute('aria-pressed', String(isActive));
      const icon = wishBtn.querySelector('i');
      icon.className = isActive ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
      showToast(isActive ? 'Added to wishlist' : 'Removed from wishlist', 'heart');
      return;
    }

    const detailsBtn = e.target.closest('.product-card__cta');
    if (detailsBtn) {
      const product = PRODUCTS.find(p => p.id === detailsBtn.dataset.product);
      if (product) {
        showToast(`${product.name} — details coming soon!`, 'info');
      }
    }
  });


  /* ------------------------------------------------------------------ */
  /* 8. FILTERING & SEARCH                                                */
  /* ------------------------------------------------------------------ */
  const filterButtons = document.querySelectorAll('.filter-btn');
  let activeFilter = 'all';

  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();

    const filtered = PRODUCTS.filter(product => {
      const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
      const matchesQuery = !query
        || product.name.toLowerCase().includes(query)
        || product.categoryLabel.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });

    renderProducts(filtered);
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      activeFilter = btn.dataset.filter;
      applyFilters();

      // Scroll products into view if filter was triggered from elsewhere
      document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Live search as the user types
  searchInput.addEventListener('input', () => {
    applyFilters();
  });

  // Pressing Enter in search jumps to products and closes the panel
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyFilters();
      closeSearch();
      document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // Category cards & footer links can jump straight to a filtered view
  document.querySelectorAll('[data-filter], [data-filter-link]').forEach(el => {
    // Skip the filter buttons themselves (already handled above)
    if (el.classList.contains('filter-btn')) return;

    el.addEventListener('click', (e) => {
      const filterKey = el.dataset.filter || el.dataset.filterLink;
      if (!filterKey) return;
      e.preventDefault();

      const targetBtn = document.querySelector(`.filter-btn[data-filter="${filterKey}"]`);
      if (targetBtn) {
        targetBtn.click();
      }
    });
  });


  /* ------------------------------------------------------------------ */
  /* 9. SCROLL-REVEAL ANIMATIONS (Intersection Observer)                  */
  /* ------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        entry.target.style.setProperty('--reveal-delay', `${delay}ms`);
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ------------------------------------------------------------------ */
  /* 10. ANIMATED STAT COUNTERS                                           */
  /* ------------------------------------------------------------------ */
  const statNums = document.querySelectorAll('.stat__num');

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1500;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease-out for a natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('en-IN');
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toLocaleString('en-IN');
      }
    }
    requestAnimationFrame(tick);
  }

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statNums.forEach(el => statsObserver.observe(el));


  /* ------------------------------------------------------------------ */
  /* 11. ACTIVE NAV LINK ON SCROLL                                        */
  /* ------------------------------------------------------------------ */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-80px 0px -50% 0px' });

  sections.forEach(section => sectionObserver.observe(section));


  /* ------------------------------------------------------------------ */
  /* 12. CONTACT FORM VALIDATION & SUBMISSION                             */
  /* ------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  const validators = {
    name: (value) => value.trim().length >= 2 ? '' : 'Please enter your full name.',
    phone: (value) => /^[0-9+\s-]{7,15}$/.test(value.trim()) ? '' : 'Enter a valid phone number.',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Enter a valid email address.',
    message: (value) => value.trim().length >= 10 ? '' : 'Message should be at least 10 characters.'
  };

  function showFieldError(field, message) {
    const errorEl = contactForm.querySelector(`[data-error-for="${field}"]`);
    const inputEl = contactForm.querySelector(`#${field}`);
    if (errorEl) errorEl.textContent = message;
    if (inputEl) inputEl.classList.toggle('is-invalid', Boolean(message));
  }

  // Validate on blur for immediate feedback
  Object.keys(validators).forEach(field => {
    const input = contactForm.querySelector(`#${field}`);
    if (!input) return;
    input.addEventListener('blur', () => {
      showFieldError(field, validators[field](input.value));
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    Object.keys(validators).forEach(field => {
      const input = contactForm.querySelector(`#${field}`);
      const error = validators[field](input.value);
      showFieldError(field, error);
      if (error) isValid = false;
    });

    if (!isValid) {
      showToast('Please fix the highlighted fields.', 'error');
      return;
    }

    const submitBtn = contactForm.querySelector('.form-submit');
    submitBtn.classList.add('is-loading');

    // Simulate a network request — replace with a real API call as needed
    setTimeout(() => {
      submitBtn.classList.remove('is-loading');
      contactForm.reset();
      formSuccess.hidden = false;
      showToast('Message sent successfully!', 'success');
      setTimeout(() => { formSuccess.hidden = true; }, 6000);
    }, 1200);
  });


  /* ------------------------------------------------------------------ */
  /* 13. NEWSLETTER FORM                                                  */
  /* ------------------------------------------------------------------ */
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    if (input.value.trim()) {
      showToast('Subscribed! Watch your inbox for offers.', 'success');
      newsletterForm.reset();
    }
  });


  /* ------------------------------------------------------------------ */
  /* 14. BACK-TO-TOP BUTTON                                               */
  /* ------------------------------------------------------------------ */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 480);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ------------------------------------------------------------------ */
  /* 15a. FOOTER YEAR                                                     */
  /* ------------------------------------------------------------------ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ------------------------------------------------------------------ */
  /* 15. TOAST NOTIFICATIONS                                              */
  /* ------------------------------------------------------------------ */
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message, type = 'info') {
    const icons = {
      success: 'fa-circle-check',
      error: 'fa-circle-exclamation',
      heart: 'fa-heart',
      info: 'fa-circle-info'
    };
    toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i> ${message}`;
    toast.classList.add('is-visible');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3000);
  }

});

