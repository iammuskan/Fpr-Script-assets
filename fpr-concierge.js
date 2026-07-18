/* ============================================================
   FPR Full Concierge — Build 17
   Extended from Build 15 Lite: purchase history, proactive
   suggestions, 5-star rating, conversation memory, 3-tab panel.
   Usage: FPRConciergeFull.init(el) or auto [data-fpr-concierge-full]
   ============================================================ */

(function (root, factory) {
  root.FPRConciergeFull = factory();
}(window, function () {
  'use strict';

  const API_BASE = window.FPR_CONCIERGE_API || 'http://localhost:3017';

  // ─── DEMO DATA ──────────────────────────────────────────────────
  const DEMO = {
    memberId: 'member_001',
    memberState: 'TX',
    purchaseHistory: [
      { product_name: 'Sig Sauer P365 XL', caliber: '9mm', purchase_date: '2024-01-10' },
      { product_name: 'Glock 19 Gen5',     caliber: '9mm', purchase_date: '2023-06-22' },
      { product_name: 'Vedder LightTuck Holster', caliber: null, purchase_date: '2024-01-28' },
    ],
    suggestions: [
      { id: 'sg1', product_name: 'Dead Air Sandman-S Suppressor', reasoning: 'Addresses your Arsenal IQ gap: NFA/suppressor ownership — you own 3 compatible 9mm platforms in TX.', map_covered: true },
      { id: 'sg2', product_name: 'Streamlight TLR-7A Weapon Light', reasoning: 'Addresses your Arsenal IQ gap: low-light optic — neither your P365 XL nor Glock 19 has a weapon light.', map_covered: false },
    ],
    sessionHistory: [
      { id: 'prev1', product_name: null, session_type: 'site_wide', message_count: 8, started_at: '2026-04-28T10:00:00Z', avg_rating: 5, context_summary: 'Member asked about suppressor options for their 9mm platforms in Texas. Discussed Dead Air and SilencerCo options, ATF Form 4 wait times, and integrally suppressed options.' },
    ],
    quickReplies: ['What holster fits my P365 XL?', 'Best 9mm defensive ammo?', 'Is this legal in TX?', 'What accessories do I need?'],
  };

  // ─── ICONS ──────────────────────────────────────────────────────
  const ICON = {
    chat:    `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    close:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    send:    `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
    star:    `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    lock:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    history: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    bag:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  };

  function esc(s)  { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  // Guards against unrendered Webflow CMS bindings (e.g. a data attribute
  // that literally comes through as "{{wf_product_name}}" because the CMS
  // field wasn't bound). Any value containing {{ ... }} is treated as
  // "not provided" so the raw placeholder text never reaches a member.
  function cleanVar(v) {
    if (!v) return '';
    if (/\{\{.*\}\}/.test(v)) return '';
    return v;
  }
  function fmtTime(iso) { return (iso ? new Date(iso) : new Date()).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'}); }
  function fmtDate(iso) { return new Date(iso).toLocaleDateString([],{month:'short',day:'numeric'}); }
  function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }

  async function api(path, method = 'GET', body) {
    const opts = { method, headers: { 'Content-Type': 'application/json' } };
    if (body) opts.body = JSON.stringify(body);
    const r = await fetch(API_BASE + path, opts);
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || `HTTP ${r.status}`);
    return d;
  }

  // ─── WIDGET FACTORY ─────────────────────────────────────────────
  function createWidget(mountEl) {
    const memberId    = cleanVar(mountEl.dataset.memberId)    || DEMO.memberId;
    const memberName  = cleanVar(mountEl.dataset.memberName)  || '';
    const productSku  = cleanVar(mountEl.dataset.productSku);
    const productName = cleanVar(mountEl.dataset.productName);
    const productBrand = cleanVar(mountEl.dataset.productBrand);
    const isMapCovered = mountEl.dataset.isMapCovered === 'true';

    let sessionId  = null;
    let isOpen     = false;
    let isSending  = false;
    let activeTab  = 'chat';
    let sessionEnded = false;

    // ─── DOM ─────────────────────────────────────────────────────
    const root = el('div', 'fpr-cf');

    // Launcher
    const launcher = el('button', 'cf-launcher');
    launcher.setAttribute('aria-label', 'Chat with FPR Concierge');
    launcher.innerHTML = ICON.chat;
    const badge = el('span', 'cf-badge', '1');
    badge.setAttribute('hidden', '');
    launcher.appendChild(badge);

    // ─── FIRST-VISIT PROMPT TOOLTIP ─────────────────────────────
    const TOOLTIP_KEY = 'fpr_concierge_tooltip_dismissed';
    const tooltip = el('div', 'cf-launcher-tooltip',
      'Click here to ask anything firearm related<span class="cf-tooltip-arrow"></span>');

    function showTooltip() {
      if (localStorage.getItem(TOOLTIP_KEY)) return;
      if (!tooltip.parentNode) root.appendChild(tooltip);
    }
    function dismissTooltip() {
      if (tooltip.parentNode) tooltip.parentNode.removeChild(tooltip);
      try { localStorage.setItem(TOOLTIP_KEY, '1'); } catch (e) {}
    }

    // ─── DESKTOP SIZE + TOOLTIP STYLES (self-contained, injected once) ───
    function injectDesktopStyles() {
      if (document.getElementById('fpr-cf-desktop-fix')) return;
      const style = document.createElement('style');
      style.id = 'fpr-cf-desktop-fix';
      style.textContent = `
        @media (min-width: 1024px) {
          .fpr-cf .cf-panel { width: 420px !important; height: 640px !important; max-height: 80vh !important; }
          .fpr-cf .cf-bubble, .fpr-cf .cf-messages { font-size: 15px !important; line-height: 1.5 !important; }
        }
        .fpr-cf { position: relative; }
        .fpr-cf .cf-launcher-tooltip {
          position: absolute; bottom: 78px; right: 0;
          background: var(--cf-navy, #0f1f33); color: #fff;
          font-size: 13px; font-weight: 600; padding: 10px 14px;
          border-radius: 10px; white-space: nowrap;
          box-shadow: 0 4px 14px rgba(0,0,0,.25);
          animation: cf-tooltip-bounce 2.2s ease-in-out infinite;
          z-index: 5;
        }
        .fpr-cf .cf-launcher-tooltip .cf-tooltip-arrow {
          position: absolute; bottom: -6px; right: 22px;
          width: 12px; height: 12px;
          background: var(--cf-navy, #0f1f33); transform: rotate(45deg);
        }
        @keyframes cf-tooltip-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `;
      document.head.appendChild(style);
    }
    injectDesktopStyles();

    // Panel
    const panel = el('div', 'cf-panel');
    panel.setAttribute('role', 'dialog');

    // Header
    const header = el('div', 'cf-header');
    header.innerHTML = `
      <div class="cf-header-avatar">${ICON.star}</div>
      <div class="cf-header-info">
        <div class="cf-header-title">FPR Concierge${memberName ? ` · ${esc(memberName)}` : ''}</div>
        <div class="cf-header-sub">Full context · ${DEMO.memberState} state laws · ${DEMO.purchaseHistory.length} purchases on file</div>
      </div>
      <div class="cf-header-actions">
        <button class="cf-icon-btn" id="cf-refresh" title="New conversation">${ICON.refresh}</button>
        <button class="cf-icon-btn" id="cf-close">${ICON.close}</button>
      </div>`;

    // Tabs
    const tabs = el('div', 'cf-tabs');
    tabs.innerHTML = `
      <button class="cf-tab cf-active" data-tab="chat">Chat</button>
      <button class="cf-tab" data-tab="suggestions">For You</button>
      <button class="cf-tab" data-tab="history">History</button>`;

    // MAP notice
    const mapNotice = el('div', 'cf-map-notice');
    mapNotice.innerHTML = `${ICON.lock}<span>Pricing on this item is available at checkout — add to cart for member pricing.</span>`;
    if (!isMapCovered) mapNotice.setAttribute('hidden', '');

    // Proactive suggestions bar (shown in chat tab)
    const sugBar = el('div', 'cf-suggestions-bar');
    sugBar.innerHTML = `
      <div class="cf-suggestions-label">Based on your Arsenal IQ gaps</div>
      <div class="cf-suggestion-chips" id="cf-sug-chips">
        ${DEMO.suggestions.map(s => `<button class="cf-suggestion-chip" data-sug="${esc(s.product_name)}" data-id="${s.id}">Ask about ${esc(s.product_name.split(' ').slice(0,3).join(' '))}…</button>`).join('')}
      </div>`;

    // Messages
    const messages = el('div', 'cf-messages');
    messages.setAttribute('aria-live', 'polite');

    // Typing
    const typing = el('div', 'cf-typing');
    typing.setAttribute('hidden', '');
    typing.innerHTML = `<div class="cf-msg-av">${ICON.star}</div><div class="cf-typing-bub"><span class="cf-dot"></span><span class="cf-dot"></span><span class="cf-dot"></span></div>`;

    // Quick replies
    const quickReplies = el('div', 'cf-quick-replies');
    quickReplies.setAttribute('hidden', '');

    // ─── CHAT TAB VIEW ────────────────────────────────────────
    const chatView = el('div', 'cf-tab-view');
    chatView.setAttribute('data-tab-content', 'chat');
    chatView.style.display = 'flex';
    chatView.style.flexDirection = 'column';
    chatView.style.flex = '1';
    chatView.style.overflow = 'hidden';
    chatView.appendChild(mapNotice);
    chatView.appendChild(sugBar);
    chatView.appendChild(messages);
    chatView.appendChild(typing);
    chatView.appendChild(quickReplies);

    // ─── SUGGESTIONS TAB ─────────────────────────────────────
    const sugView = el('div', 'cf-tab-view');
    sugView.setAttribute('data-tab-content', 'suggestions');
    sugView.setAttribute('hidden', '');
    sugView.style.overflowY = 'auto';
    sugView.innerHTML = `
      <div class="cf-suggestion-cards">
        <div style="font-size:11px;color:var(--cf-gray-400);padding:4px 2px 2px;line-height:1.5">Based on your Arsenal IQ score and purchase history — personalized for your ${DEMO.memberState} profile.</div>
        ${DEMO.suggestions.map(s => `
          <div class="cf-sug-card" data-sug-id="${s.id}">
            <div class="cf-sug-card-name">${esc(s.product_name)}</div>
            <div class="cf-sug-card-reason">${esc(s.reasoning)}</div>
            <div class="cf-sug-card-cta">Ask your Concierge →</div>
            ${s.map_covered ? `<div class="cf-sug-card-map">Member pricing available at checkout</div>` : ''}
          </div>`).join('')}
        <div style="font-size:11px;color:var(--cf-slate);padding:4px 0;line-height:1.5">
          ${ICON.lock} Pricing on MAP-covered items is available when you add to cart. The Concierge never quotes below-MAP prices.
        </div>
      </div>`;

    // ─── HISTORY TAB ──────────────────────────────────────────
    const histView = el('div', 'cf-tab-view');
    histView.setAttribute('data-tab-content', 'history');
    histView.setAttribute('hidden', '');
    histView.style.overflowY = 'auto';
    histView.innerHTML = `
      <div class="cf-history-list">
        <div style="font-size:11px;color:var(--cf-gray-400);padding:4px 2px 8px">Your recent Concierge conversations</div>
        ${DEMO.sessionHistory.map(s => `
          <div class="cf-history-item">
            <div class="cf-history-title">${s.product_name ? esc(s.product_name) : esc(s.session_type?.replace(/_/g,' ') || 'Site-wide conversation')}</div>
            <div class="cf-history-meta">${fmtDate(s.started_at)} · ${s.message_count} messages</div>
            ${s.context_summary ? `<div style="font-size:11px;color:var(--cf-slate);margin-top:4px;line-height:1.4">${esc(s.context_summary.slice(0,120))}…</div>` : ''}
            ${s.avg_rating ? `<div class="cf-history-stars">${'★'.repeat(Math.round(s.avg_rating))}${'☆'.repeat(5-Math.round(s.avg_rating))}</div>` : ''}
          </div>`).join('')}
        ${DEMO.purchaseHistory.length ? `
        <div style="font-size:11px;font-weight:700;color:var(--cf-gray-400);text-transform:uppercase;letter-spacing:.5px;margin:12px 0 6px">Purchase History on File</div>
        ${DEMO.purchaseHistory.map(p => `
          <div style="display:flex;align-items:center;gap:10px;padding:7px 10px;background:var(--cf-gray-100);border-radius:8px;margin-bottom:5px">
            <span style="font-size:18px">🔫</span>
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--cf-navy)">${esc(p.product_name)}</div>
              <div style="font-size:11px;color:var(--cf-gray-400)">${p.caliber ? esc(p.caliber) + ' · ' : ''}${fmtDate(p.purchase_date)}</div>
            </div>
          </div>`).join('')}` : ''}
      </div>`;

    // Input area
    const inputArea = el('div', 'cf-input-area');
    inputArea.innerHTML = `
      <div class="cf-input-row">
        <textarea class="cf-input" id="cf-input" placeholder="Ask anything…" rows="1" maxlength="2000"></textarea>
        <button class="cf-send-btn" id="cf-send" disabled>${ICON.send}</button>
      </div>
      <div class="cf-input-footer">${ICON.lock} FPR Concierge · Powered by Claude · fprmembers.com</div>`;

    // Assemble panel
    panel.appendChild(header);
    panel.appendChild(tabs);
    panel.appendChild(chatView);
    panel.appendChild(sugView);
    panel.appendChild(histView);
    panel.appendChild(inputArea);
    root.appendChild(panel);
    root.appendChild(launcher);
    mountEl.appendChild(root);

    // ─── ELEMENT REFS ─────────────────────────────────────────
    const inputEl  = panel.querySelector('#cf-input');
    const sendBtn  = panel.querySelector('#cf-send');
    const closeBtn = panel.querySelector('#cf-close');
    const refreshBtn = panel.querySelector('#cf-refresh');

    // ─── HELPERS ──────────────────────────────────────────────
    function scrollBottom() { messages.scrollTop = messages.scrollHeight; }

    function showTyping(show) {
      if (show) { typing.removeAttribute('hidden'); messages.appendChild(typing); }
      else typing.setAttribute('hidden', '');
      scrollBottom();
    }

    function addBubble(role, content, opts = {}) {
      const isConcierge = role === 'concierge';
      const wrapper = el('div', `cf-msg cf-msg--${role}`);
      const av = el('div', 'cf-msg-av');
      av.innerHTML = isConcierge ? ICON.star : '👤';
      const body = el('div', 'cf-msg-body');
      const bubble = el('div', 'cf-bubble');
      bubble.innerHTML = esc(content).split(/\n\n+/).map(p=>`<p style="margin-bottom:5px">${p.replace(/\n/g,'<br>')}</p>`).join('');
      const time = el('span', 'cf-msg-time', fmtTime(opts.created_at));
      body.appendChild(bubble);
      body.appendChild(time);

      // Star rating for concierge messages
      if (isConcierge && opts.messageId) {
        const ratingRow = el('div', 'cf-rating-row');
        for (let i = 1; i <= 5; i++) {
          const star = el('button', 'cf-star', '★');
          star.dataset.rating = i;
          star.addEventListener('click', () => submitRating(opts.messageId, i, ratingRow));
          ratingRow.appendChild(star);
        }
        body.appendChild(ratingRow);
      }

      wrapper.appendChild(av);
      wrapper.appendChild(body);
      messages.insertBefore(wrapper, typing.hasAttribute('hidden') ? null : typing);
      scrollBottom();
    }

    function submitRating(messageId, rating, ratingRow) {
      ratingRow.querySelectorAll('.cf-star').forEach((s, i) => {
        s.classList.toggle('cf-filled', i < rating);
        s.disabled = true;
      });
      api(`/api/concierge-full/session/${sessionId}/feedback`, 'POST', {
        member_id: memberId, message_id: messageId, rating,
      }).catch(() => {});
    }

    function renderQuickReplies(replies) {
      quickReplies.innerHTML = '';
      if (!replies?.length) { quickReplies.setAttribute('hidden', ''); return; }
      replies.forEach(text => {
        const chip = el('button', 'cf-quick-chip', esc(text));
        chip.addEventListener('click', () => {
          quickReplies.setAttribute('hidden', '');
          sendMessage(text);
        });
        quickReplies.appendChild(chip);
      });
      quickReplies.removeAttribute('hidden');
    }

    // ─── TAB SWITCHING ────────────────────────────────────────
    tabs.addEventListener('click', e => {
      const btn = e.target.closest('.cf-tab');
      if (!btn) return;
      const target = btn.dataset.tab;
      tabs.querySelectorAll('.cf-tab').forEach(t => t.classList.toggle('cf-active', t === btn));
      panel.querySelectorAll('.cf-tab-view').forEach(v => {
        const show = v.dataset.tabContent === target || v.getAttribute('data-tab-content') === target;
        if (show) { v.removeAttribute('hidden'); v.style.display = ''; }
        else { v.setAttribute('hidden', ''); }
      });
      activeTab = target;
      if (target === 'chat') inputArea.style.display = '';
      else inputArea.style.display = 'none';
    });

    // Suggestion cards → ask concierge
    sugView.querySelectorAll('.cf-sug-card').forEach(card => {
      card.addEventListener('click', () => {
        const name = card.querySelector('.cf-sug-card-name').textContent;
        tabs.querySelectorAll('.cf-tab')[0].click(); // switch to chat
        sendMessage(`Tell me about the ${name} — is it right for my collection?`);
      });
    });

    // Suggestion chips
    panel.querySelectorAll('.cf-suggestion-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        sugBar.setAttribute('hidden', '');
        sendMessage(`Tell me about the ${chip.dataset.sug} — is it right for me?`);
      });
    });

    // ─── SESSION ──────────────────────────────────────────────
    async function startSession() {
      messages.innerHTML = '';
      quickReplies.setAttribute('hidden', '');
      sessionId = null;
      sessionEnded = false;
      sendBtn.disabled = true;
      showTyping(true);

      try {
        const data = await api('/api/concierge-full/session/start', 'POST', {
          member_id: memberId,
          member_name: memberName || undefined,
          product_sku: productSku || undefined,
          product_name: productName || undefined,
          product_brand: productBrand || undefined,
          is_map_covered: isMapCovered,
        });
        sessionId = data.session_id;
        showTyping(false);
        addBubble('concierge', data.opening_message);
        renderQuickReplies(data.quick_replies || DEMO.quickReplies);
        sendBtn.disabled = false;
        badge.setAttribute('hidden', '');
        inputEl.focus();
      } catch {
        // Demo opening message
        showTyping(false);
        const purchaseNote = DEMO.purchaseHistory.length
          ? ` I've got your purchase history pulled up — your P365 XL, Glock 19, and ${DEMO.purchaseHistory.length - 2} other items are on file.`
          : '';
        const greetingName = memberName ? `Hey ${esc(memberName)}` : 'Hey';
        addBubble('concierge', `${greetingName} — good to see you. I'm your full FPR Concierge.${purchaseNote} I know your TX state laws, your Arsenal IQ gaps, and have the full catalog here. What can I help you with today?`);
        renderQuickReplies(DEMO.quickReplies);
        sendBtn.disabled = false;
        inputEl.focus();
      }
    }

    // ─── SEND MESSAGE ─────────────────────────────────────────
    async function sendMessage(text) {
      const content = (text || inputEl.value).trim();
      if (!content || isSending || sessionEnded) return;
      isSending = true;
      sendBtn.disabled = true;
      inputEl.value = '';
      autoResize();
      quickReplies.setAttribute('hidden', '');
      sugBar.setAttribute('hidden', '');
      addBubble('member', content);
      showTyping(true);

      if (sessionId) {
        try {
          const data = await api(`/api/concierge-full/session/${sessionId}/message`, 'POST', {
            member_id: memberId, content,
          });
          showTyping(false);
          addBubble('concierge', data.response, { messageId: data.message_id, created_at: data.created_at });
        } catch (err) {
          showTyping(false);
          addBubble('concierge', 'I hit a connection issue — please try again in a moment.');
        }
      } else {
        // Demo response when no API
        await new Promise(r => setTimeout(r, 1400));
        showTyping(false);
        const demoResponse = getDemoResponse(content);
        addBubble('concierge', demoResponse);
      }

      isSending = false;
      sendBtn.disabled = false;
    }

    function getDemoResponse(question) {
      const q = question.toLowerCase();
      if (/suppressor|silencer|nfa/.test(q)) {
        return `Great timing — you've been researching suppressors. In Texas, suppressors are completely legal with federal NFA approval. With your P365 XL and Glock 19, you'd want to look at the Dead Air Sandman-S or the SilencerCo Omega 9K — both are excellent for 9mm.\n\nATF Form 4 process currently runs about 8-10 months. You'll pay a one-time $200 tax stamp. Once approved, you can run it freely in Texas. Your Arsenal IQ actually flags this as your top gap.\n\nWant me to walk you through the host gun requirements for each option?`;
      }
      if (/holster/.test(q)) {
        return `For your P365 XL, the Vedder LightTuck is a solid choice — and you already have one on file. If you're looking for alternatives, the Tier 1 Compact and the Phlster Floodlight are both excellent for IWB carry with the XL's longer grip.\n\nFor appendix carry, I'd go with the Tier 1. For 4 o'clock, the Vedder or Galco King Tuk. Your Texas constitutional carry means no printing issues either way.`;
      }
      if (/ammo|ammunition/.test(q)) {
        return `For defensive 9mm in your P365 XL and Glock 19, Federal HST 124gr is what I'd reach for first — it's on your purchase history already, which is a good call. Consistent expansion, barrier blind, and reliable feeding in compact platforms.\n\nAlternatives worth considering: Speer Gold Dot 124gr +P if you want a bit more velocity, or Hornady Critical Duty 135gr if you're running through barriers. For range ammo, Federal or Blazer Brass 115gr is plenty.`;
      }
      return `Good question. With your TX profile, P365 XL, and Glock 19 on file, here's what's relevant to your situation.\n\nI'd want to know a bit more about what you're trying to accomplish. Are you thinking about this for CCW use, home defense, range work, or something else? Your Spotter data and Arsenal IQ score also give me some useful context here.\n\n(For a fully personalized answer, connect the API server so I can pull your complete member profile.)`;
    }

    // ─── RESIZE INPUT ─────────────────────────────────────────
    function autoResize() {
      inputEl.style.height = 'auto';
      inputEl.style.height = Math.min(inputEl.scrollHeight, 90) + 'px';
    }

    // ─── OPEN / CLOSE ─────────────────────────────────────────
    // Swap the icon without destroying the badge node — keeps the `badge`
    // variable pointed at the real DOM element so the 3-second auto-show timer
    // (and any future badge updates) actually affect what the user sees.
    function setLauncherIcon(openState) {
      launcher.replaceChildren();
      launcher.insertAdjacentHTML('afterbegin', openState ? ICON.close : ICON.chat);
      launcher.appendChild(badge);
    }
    function open() {
      dismissTooltip();
      isOpen = true;
      panel.classList.add('cf-open');
      setLauncherIcon(true);
      badge.setAttribute('hidden', '');
      if (!sessionId) startSession();
      else if (activeTab === 'chat') inputEl.focus();
    }
    function close() {
      isOpen = false;
      panel.classList.remove('cf-open');
      setLauncherIcon(false);
    }
    function toggle() { isOpen ? close() : open(); }

    // ─── EVENTS ───────────────────────────────────────────────
    launcher.addEventListener('click', toggle);
    closeBtn.addEventListener('click', close);
    refreshBtn.addEventListener('click', () => {
      if (sessionId) api(`/api/concierge-full/session/${sessionId}/end`, 'POST').catch(() => {});
      startSession();
    });
    sendBtn.addEventListener('click', () => sendMessage());
    inputEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
    inputEl.addEventListener('input', () => {
      autoResize();
      sendBtn.disabled = !inputEl.value.trim() || isSending;
    });

    // Show badge + tooltip after 3s
    setTimeout(() => { if (!isOpen) { badge.removeAttribute('hidden'); showTooltip(); } }, 3000);

    return { open, close, toggle };
  }

  // ─── PUBLIC API ──────────────────────────────────────────────────
  function init(el) { if (!el) return; return createWidget(el); }

  function autoInit() {
    document.querySelectorAll('[data-fpr-concierge-full]').forEach(el => init(el));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoInit);
  else autoInit();

  return { init };
}));
