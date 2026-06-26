/* ============================================================
   FPR Legacy Suite — Build 16
   Four-system dashboard IIFE: Forecaster · Ledger · Brain · Intel
   ============================================================ */

(function (root, factory) {
  root.FPRLegacy = factory();
}(window, function () {
  'use strict';

  const API_BASE = window.FPR_LEGACY_API || 'http://localhost:3016';

  const DEMO = {
    memberId: 'member_001',
    portfolio_index: 71,
    total_market_value: 4395,
    total_purchase_cost: 2319,
    asset_count: 3,
    owned_count: 3,
    brain_opted_in: true,
    active_signals: [
      { id: 's1', signal_type: 'suppressor_research', signal_strength: 78,
        signal_data: { view_count: 5, days: 10, state: 'TX', experience: 'intermediate' } },
      { id: 's2', signal_type: 'upgrade_pattern', signal_strength: 62,
        signal_data: { pattern_text: '79% of AR-15 owners upgraded from iron sights to an optic within 60 days' } },
    ],
    portfolio: [
      {
        id: 'a1', make: 'Colt', model: 'Python', caliber: '.357 Mag',
        year_manufactured: 1978, condition: 'excellent', purchase_price: 1200,
        purchase_date: '2019-03-14', acquired_from: 'auction', is_saved: false,
        trust_score: 85, ledger_id: 'l1', succession_activated: true,
        trust_label: { label: 'Fully Documented', color: '#10B981' },
        valuation: {
          current_market_value: 2800, projected_1yr: 3058, projected_3yr: 3648,
          projected_5yr: 4353, projected_10yr: 6738,
          collector_index: 87, collector_tier: 'elite_collector',
          collector_label: 'Elite Collector', rarity_score: 92, demand_score: 80,
          legislative_risk: 12, optimal_sell_window: 'Hold 10+ years — appreciation accelerates with age',
          valuation_reasoning: 'The Colt Python commands a substantial collector premium driven by its discontinued status and legendary reputation for precision. Original 1978 examples in excellent condition are increasingly scarce on the secondary market, with recent auction data showing consistent 8–10% annual appreciation over the past decade. The 10-year projection reflects accelerating scarcity as surviving examples in this condition become rarer.',
          chart_data: [
            { year: 0, value: 2800 }, { year: 1, value: 3058 }, { year: 2, value: 3341 },
            { year: 3, value: 3648 }, { year: 5, value: 4353 }, { year: 7, value: 5192 }, { year: 10, value: 6738 },
          ],
        },
      },
      {
        id: 'a2', make: 'Sig Sauer', model: 'P365 XL', caliber: '9mm',
        year_manufactured: 2023, condition: 'new', purchase_price: 599,
        purchase_date: '2024-01-10', acquired_from: 'fpr', is_saved: false,
        trust_score: 55, ledger_id: 'l2', succession_activated: false,
        trust_label: { label: 'Partially Documented', color: '#F59E0B' },
        valuation: {
          current_market_value: 650, projected_1yr: 667, projected_3yr: 701,
          projected_5yr: 738, projected_10yr: 814,
          collector_index: 42, collector_tier: 'mid_collector',
          collector_label: 'Collector Grade', rarity_score: 28, demand_score: 72,
          legislative_risk: 18, optimal_sell_window: '3–5 year optimal window',
          valuation_reasoning: 'The P365 XL maintains strong secondary market demand due to its widespread adoption as a CCW platform. As a current-production firearm, appreciation is modest but consistent with the 9mm carry category trend. Strong demand will support value, though no significant collector premium is expected within the 5-year window.',
          chart_data: [
            { year: 0, value: 650 }, { year: 1, value: 667 }, { year: 2, value: 683 },
            { year: 3, value: 701 }, { year: 5, value: 738 }, { year: 7, value: 776 }, { year: 10, value: 814 },
          ],
        },
      },
      {
        id: 'a3', make: 'Glock', model: '19 Gen5', caliber: '9mm',
        year_manufactured: 2022, condition: 'very_good', purchase_price: 520,
        purchase_date: '2023-06-22', acquired_from: 'fpr', is_saved: false,
        trust_score: 40, ledger_id: 'l3', succession_activated: false,
        trust_label: { label: 'Minimal Documentation', color: '#F97316' },
        valuation: {
          current_market_value: 545, projected_1yr: 558, projected_3yr: 585,
          projected_5yr: 614, projected_10yr: 672,
          collector_index: 35, collector_tier: 'standard',
          collector_label: 'Standard Market', rarity_score: 15, demand_score: 78,
          legislative_risk: 22, optimal_sell_window: 'Sell within 1–2 years or upgrade to higher-demand platform',
          valuation_reasoning: 'The Glock 19 is among the highest-volume semi-auto pistols in existence, which limits collector appreciation potential. Excellent secondary market liquidity and broad demand support stable value, but the standard market appreciation rate reflects abundant supply. Very good condition examples consistently transact at a slight discount to new.',
          chart_data: [
            { year: 0, value: 545 }, { year: 1, value: 558 }, { year: 2, value: 571 },
            { year: 3, value: 585 }, { year: 5, value: 614 }, { year: 7, value: 642 }, { year: 10, value: 672 },
          ],
        },
      },
    ],
    vault_assets: [
      { id: 'l1', asset_id: 'a1', trust_score: 85, has_receipt: true, has_photos: true, has_ballistics: true, has_maintenance: true, succession_activated: true, make: 'Colt', model: 'Python', caliber: '.357 Mag', condition: 'excellent', succession_state: 'TX', succession_ffl_name: 'Texas Gun Works', documents: [{ id: 'd1', doc_type: 'receipt', description: 'Original Auction Receipt', uploaded_at: '2019-03-15T00:00:00Z', file_size: 180000, mime_type: 'application/pdf' }, { id: 'd2', doc_type: 'photo', description: 'Left profile', uploaded_at: '2019-03-15T00:00:00Z', file_size: 3200000, mime_type: 'image/jpeg' }, { id: 'd3', doc_type: 'ballistics', description: 'Range fingerprint — 5 targets', uploaded_at: '2019-06-10T00:00:00Z', file_size: 9800000, mime_type: 'image/jpeg' }], maintenance_logs: [{ id: 'm1', log_date: '2024-01-20', service_type: 'professional_service', round_count_at_service: 3200, shop_name: 'Texas Gun Works', cost: 95 }] },
      { id: 'l2', asset_id: 'a2', trust_score: 55, has_receipt: true, has_photos: false, has_ballistics: false, has_maintenance: true, succession_activated: false, make: 'Sig Sauer', model: 'P365 XL', caliber: '9mm', condition: 'new', succession_state: null, documents: [{ id: 'd4', doc_type: 'receipt', description: 'FPR Purchase Receipt', uploaded_at: '2024-01-10T00:00:00Z', file_size: 95000, mime_type: 'application/pdf' }], maintenance_logs: [] },
      { id: 'l3', asset_id: 'a3', trust_score: 40, has_receipt: false, has_photos: false, has_ballistics: false, has_maintenance: false, succession_activated: false, make: 'Glock', model: '19 Gen5', caliber: '9mm', condition: 'very_good', succession_state: null, documents: [], maintenance_logs: [] },
    ],
    brain_patterns: [
      { pattern_type: 'also_bought', trigger_entity: 'Sig Sauer P365 XL', outcome_entity: 'Vedder Holster', sample_size: 142, confidence_pct: 87.3, time_window_days: 21, pattern_text: '87% of members who added a P365 XL also added a carry holster within 21 days', insight_category: 'purchase_sequence', icon: '🛒', category_label: 'What Members Buy Together', sample_display: '142 members' },
      { pattern_type: 'upgrade_path', trigger_entity: 'Glock 19', outcome_entity: 'aftermarket trigger', sample_size: 98, confidence_pct: 74.5, time_window_days: 90, pattern_text: '74% of members with a Glock 19 added an aftermarket trigger within 90 days of their first purchase', insight_category: 'upgrade', icon: '⬆️', category_label: 'Common Upgrade Paths', sample_display: '100+ members' },
      { pattern_type: 'accessory_sequence', trigger_entity: 'any 9mm pistol', outcome_entity: 'Streamlight TLR-1', sample_size: 203, confidence_pct: 68.2, time_window_days: 45, pattern_text: 'Members purchasing a 9mm pistol added a weapon light within 45 days at 68% rate', insight_category: 'accessory', icon: '🔧', category_label: 'Popular Accessories', sample_display: '200+ members' },
      { pattern_type: 'training_outcome', trigger_entity: 'Spotter usage', outcome_entity: 'improved accuracy', sample_size: 156, confidence_pct: 82.1, time_window_days: 60, pattern_text: 'Members using Spotter 3+ sessions improved documented accuracy by an average of 22% within 60 days', insight_category: 'training', icon: '🎯', category_label: 'Training Outcomes', sample_display: '156 members' },
      { pattern_type: 'also_bought', trigger_entity: 'Colt Python', outcome_entity: 'leather holster', sample_size: 67, confidence_pct: 91.2, time_window_days: 30, pattern_text: '91% of Colt Python owners added a leather holster within 30 days', insight_category: 'purchase_sequence', icon: '🛒', category_label: 'What Members Buy Together', sample_display: '67 members' },
      { pattern_type: 'upgrade_path', trigger_entity: 'any AR-15', outcome_entity: 'optic upgrade', sample_size: 312, confidence_pct: 78.9, time_window_days: 60, pattern_text: '79% of AR-15 owners upgraded from iron sights to an optic within 60 days', insight_category: 'upgrade', icon: '⬆️', category_label: 'Common Upgrade Paths', sample_display: '312 members' },
      { pattern_type: 'accessory_sequence', trigger_entity: 'suppressor purchase', outcome_entity: 'subsonic ammo', sample_size: 44, confidence_pct: 95.5, time_window_days: 14, pattern_text: '95% of members who added a suppressor purchased subsonic ammunition within 14 days', insight_category: 'accessory', icon: '🔧', category_label: 'Popular Accessories', sample_display: '44 members' },
      { pattern_type: 'training_outcome', trigger_entity: 'GunIQ CCW course', outcome_entity: 'permit obtained', sample_size: 73, confidence_pct: 69.3, time_window_days: 180, pattern_text: '69% of members completing GunIQ CCW Fundamentals obtained a carry permit within 180 days', insight_category: 'training', icon: '🎯', category_label: 'Training Outcomes', sample_display: '73 members' },
    ],
    intel_messages: [
      { id: 'im1', trigger_type: 'suppressor_research', subject: 'Texas NFA: What You Need to Know', body: "You've been researching suppressors — here's the quick Texas rundown. Texas is one of the best states for suppressor ownership: no state permit required, legal with federal NFA approval, and very popular among members here.\n\nThe ATF Form 4 process takes 6–12 months currently. You'll pay a one-time $200 tax stamp. Once approved, your suppressor transfers to your name and you can use it freely in Texas. The most common choice for your 9mm platforms is a Yankee Hill Machine or Dead Air Sandman series — both work well on the P365 XL with a threaded barrel.\n\nWant me to pull up suppressor options that pair well with your current collection? Your Arsenal IQ also flags suppressor as a gap worth addressing.", is_read: false, created_at: '2026-05-04T14:30:00Z', map_compliant: true },
      { id: 'im2', trigger_type: 'upgrade_pattern', subject: 'Your Glock 19 Upgrade Path', body: "Based on what members with a similar profile typically do: 74% of Glock 19 owners add an aftermarket trigger within 90 days of their first purchase. You're at 90 days now.\n\nFor your experience level and CCW focus, the most popular choices are the Apex Tactical flat-face trigger or the Agency Arms 417 — both improve reset and pull weight without compromising striker safety. Spotter data shows members with a left-pull pattern often benefit most from a trigger upgrade before range time.\n\nYour Glock 19's Trust Score is at 40/100 — adding photos and a maintenance log would significantly strengthen your documentation.", is_read: true, created_at: '2026-05-01T09:15:00Z', map_compliant: true },
    ],
  };

  let state = {
    activeView: 'forecaster',
    selectedAsset: null,
    selectedVaultAsset: null,
    dashboardData: null,
    loading: false,
    addAssetOpen: false,
    successionOpen: false,
    brainOptedIn: true,
  };

  const ICON = {
    chart:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    vault:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>`,
    brain:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>`,
    intel:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/></svg>`,
    plus:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    check:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
    shield:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    upload:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>`,
    close:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    gun:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 8H2v3l3 1v6h4v-3h6v3h4v-6l3-1V8z"/></svg>`,
    eye:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    star:    `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    bell:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  };

  function fmt(n) {
    if (n == null) return '—';
    return '$' + Math.round(n).toLocaleString();
  }
  function fmtDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  }
  function esc(str) {
    return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function trustTierClass(score) {
    if (score >= 90) return 'lg-trust-elite';
    if (score >= 70) return 'lg-trust-high';
    if (score >= 50) return 'lg-trust-mid';
    if (score >= 30) return 'lg-trust-low';
    return 'lg-trust-none';
  }

  function drawCollectorRing(canvas, score, tier) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = 52;
    canvas.width  = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width  = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);
    const cx = size / 2, cy = size / 2, r = 21;
    const tierColors = {
      elite_collector: '#F59E0B',
      high_collector:  '#3B82F6',
      mid_collector:   '#10B981',
      standard:        '#94A3B8',
      declining:       '#EF4444',
    };
    const color = tierColors[tier] || '#94A3B8';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 5;
    ctx.stroke();
    const startAngle = -Math.PI / 2;
    const endAngle   = startAngle + (Math.PI * 2 * score / 100);
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(score, cx, cy);
  }

  function drawProjectionChart(canvas, datasets, labels) {
    const ctx  = canvas.getContext('2d');
    const dpr  = window.devicePixelRatio || 1;
    const W    = canvas.parentElement.clientWidth || 700;
    const H    = 200;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);
    const pad = { top: 20, right: 20, bottom: 30, left: 70 };
    const gW  = W - pad.left - pad.right;
    const gH  = H - pad.top  - pad.bottom;
    const allVals = datasets.flatMap(d => d.data.map(p => p.value));
    const minV = Math.min(...allVals) * 0.92;
    const maxV = Math.max(...allVals) * 1.06;
    const xOf = (yr) => pad.left + (yr / 10) * gW;
    const yOf = (v)  => pad.top  + (1 - (v - minV) / (maxV - minV)) * gH;
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (gH / 4) * i;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
      const v = maxV - (maxV - minV) * (i / 4);
      ctx.fillStyle = 'rgba(148,163,184,0.7)';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('$' + Math.round(v).toLocaleString(), pad.left - 6, y + 3);
    }
    [0, 1, 3, 5, 7, 10].forEach(yr => {
      const x = xOf(yr);
      ctx.fillStyle = 'rgba(148,163,184,0.7)';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Yr ' + yr, x, H - 4);
    });
    const colors = ['#F59E0B', '#3B82F6', '#10B981', '#7C3AED', '#F97316'];
    datasets.forEach((ds, di) => {
      const color = colors[di % colors.length];
      const pts = ds.data;
      if (!pts.length) return;
      ctx.beginPath();
      ctx.moveTo(xOf(pts[0].year), yOf(pts[0].value));
      pts.slice(1).forEach(p => ctx.lineTo(xOf(p.year), yOf(p.value)));
      ctx.lineTo(xOf(pts[pts.length - 1].year), pad.top + gH);
      ctx.lineTo(xOf(pts[0].year), pad.top + gH);
      ctx.closePath();
      ctx.fillStyle = color.replace('#', 'rgba(') + ',0.06)';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(xOf(pts[0].year), yOf(pts[0].value));
      pts.slice(1).forEach(p => ctx.lineTo(xOf(p.year), yOf(p.value)));
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      ctx.stroke();
      const last = pts[pts.length - 1];
      ctx.beginPath();
      ctx.arc(xOf(last.year), yOf(last.value), 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });
  }

  function renderForecaster(container, data) {
    /* FIX: safely call fprAwardTicket only if it exists */
    if (typeof window.fprAwardTicket === 'function') {
      window.fprAwardTicket('legacy_portfolio_viewed', {});
    }
    container.innerHTML = '';

    const header = el('div', 'lg-section-header');
    header.innerHTML = `
      <div>
        <div class="lg-section-title">${ICON.chart} Legacy Forecaster</div>
        <div class="lg-section-sub">Secondary market valuations · All prices from auction data only</div>
      </div>
      <button class="lg-btn lg-btn-gold" id="lg-add-asset-btn">${ICON.plus} Add Firearm</button>`;
    container.appendChild(header);

    const stats = el('div', 'lg-stats-row');
    stats.innerHTML = `
      <div class="lg-stat-card">
        <div class="lg-stat-label">Portfolio Collector Index</div>
        <div class="lg-stat-value lg-gold">${data.portfolio_index}<span style="font-size:14px;font-weight:400">/100</span></div>
        <div class="lg-stat-sub">Aggregate secondary market grade</div>
      </div>
      <div class="lg-stat-card">
        <div class="lg-stat-label">Secondary Market Value</div>
        <div class="lg-stat-value">${fmt(data.total_market_value)}</div>
        <div class="lg-stat-sub">Current auction-based estimate</div>
        <div class="lg-purchase-note">Purchase price: ${fmt(data.total_purchase_cost)} (separate)</div>
      </div>
      <div class="lg-stat-card">
        <div class="lg-stat-label">Firearms in Collection</div>
        <div class="lg-stat-value">${data.owned_count}</div>
        <div class="lg-stat-sub">${data.asset_count} total · ${data.asset_count - data.owned_count} saved</div>
      </div>
      <div class="lg-stat-card">
        <div class="lg-stat-label">Avg Trust Score</div>
        <div class="lg-stat-value lg-green">${data.avg_trust_score || Math.round(data.portfolio.reduce((s,a)=>s+a.trust_score,0)/data.portfolio.length)}</div>
        <div class="lg-stat-sub">/100 documentation grade</div>
      </div>`;
    container.appendChild(stats);

    const portfolioChartData = data.portfolio.filter(a => a.valuation);
    if (portfolioChartData.length) {
      const chartWrap = el('div', 'lg-chart-wrap');
      chartWrap.innerHTML = `
        <div class="lg-chart-title">10-Year Portfolio Projection</div>
        <div class="lg-chart-sub">Secondary market estimates · Not a guarantee of future value</div>
        <canvas class="lg-chart" id="lg-portfolio-chart"></canvas>
        <div class="lg-chart-legend" id="lg-portfolio-legend"></div>`;
      container.appendChild(chartWrap);

      requestAnimationFrame(() => {
        const canvas = document.getElementById('lg-portfolio-chart');
        const datasets = portfolioChartData.map(a => ({
          label: `${a.make} ${a.model}`,
          data: a.valuation.chart_data,
        }));
        drawProjectionChart(canvas, datasets, []);
        const legend = document.getElementById('lg-portfolio-legend');
        const colors = ['#F59E0B', '#3B82F6', '#10B981'];
        portfolioChartData.forEach((a, i) => {
          const item = el('div', 'lg-legend-item');
          item.innerHTML = `<span class="lg-legend-dot" style="background:${colors[i%colors.length]}"></span>${esc(a.make)} ${esc(a.model)}`;
          legend.appendChild(item);
        });
      });
    }

    const grid = el('div', 'lg-portfolio-grid');
    data.portfolio.forEach(asset => {
      const card = el('div', 'lg-asset-card');
      const v = asset.valuation;
      const collectorTier = v?.collector_tier || 'standard';
      const ci = v?.collector_index || 0;

      card.innerHTML = `
        <div class="lg-asset-header">
          <div>
            <div class="lg-asset-name">${esc(asset.make)} ${esc(asset.model)}</div>
            <div class="lg-asset-meta">${esc(asset.caliber || '')} · ${esc(asset.condition || '')} · ${asset.year_manufactured || '—'}</div>
          </div>
          <canvas class="lg-collector-ring" id="ring-${asset.id}"></canvas>
        </div>
        <div class="lg-asset-values">
          <div class="lg-value-block">
            <div class="lg-value-label">Secondary Market Value</div>
            <div class="lg-value-num">${v ? fmt(v.current_market_value) : '—'}</div>
            <div class="lg-value-sub">${v ? `10yr: ${fmt(v.projected_10yr)}` : 'Not valued'}</div>
          </div>
          <div class="lg-value-block">
            <div class="lg-value-label">Purchase Price</div>
            <div class="lg-value-num lg-purchase">${fmt(asset.purchase_price)}</div>
            <div class="lg-value-sub">${fmtDate(asset.purchase_date)}</div>
          </div>
        </div>
        <div class="lg-asset-footer">
          <div class="lg-trust-bar-wrap">
            <div class="lg-trust-bar-label">
              <span>Trust Score</span>
              <span style="color:${asset.trust_label?.color || '#94A3B8'}">${asset.trust_score}/100</span>
            </div>
            <div class="lg-trust-bar-bg">
              <div class="lg-trust-bar-fill" style="width:${asset.trust_score}%;background:${asset.trust_label?.color || '#94A3B8'}"></div>
            </div>
          </div>
          ${v ? `<div class="lg-sell-window" title="${esc(v.optimal_sell_window)}">${esc(v.collector_label || '')}</div>` : ''}
        </div>
        <div style="display:flex;justify-content:flex-end;padding:8px 0 0">
          <button onclick="FPRShare.open('Share Your Legacy')" style="display:inline-flex;align-items:center;gap:6px;background:#E5B657;color:#0F1923;border:none;border-radius:8px;padding:8px 14px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Share Your Legacy
          </button>
        </div>`;

      card.addEventListener('click', () => showAssetDetail(asset));
      grid.appendChild(card);

      requestAnimationFrame(() => {
        const ringCanvas = document.getElementById(`ring-${asset.id}`);
        if (ringCanvas) drawCollectorRing(ringCanvas, ci, collectorTier);
      });
    });
    container.appendChild(grid);

    document.getElementById('lg-add-asset-btn')?.addEventListener('click', () => openAddAssetModal());
  }

  function showAssetDetail(asset) {
    const v = asset.valuation;
    const overlay = el('div', 'lg-modal-overlay');
    overlay.innerHTML = `
      <div class="lg-modal" style="max-width:640px">
        <div class="lg-modal-header">
          <div class="lg-modal-title">${esc(asset.make)} ${esc(asset.model)}</div>
          <button class="lg-btn lg-btn-outline lg-btn-sm" id="lg-asset-modal-close">${ICON.close}</button>
        </div>
        <div class="lg-modal-body">
          ${v ? `
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:20px">
            <div class="lg-stat-card">
              <div class="lg-stat-label">Collector Index</div>
              <div class="lg-stat-value lg-gold" style="font-size:20px">${v.collector_index}/100</div>
              <div class="lg-stat-sub">${esc(v.collector_label || '')}</div>
            </div>
            <div class="lg-stat-card">
              <div class="lg-stat-label">Rarity Score</div>
              <div class="lg-stat-value" style="font-size:20px">${v.rarity_score}/100</div>
              <div class="lg-stat-sub">Secondary market scarcity</div>
            </div>
            <div class="lg-stat-card">
              <div class="lg-stat-label">Demand Score</div>
              <div class="lg-stat-value" style="font-size:20px">${v.demand_score}/100</div>
              <div class="lg-stat-sub">Auction transaction volume</div>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px">
            <div>
              <div class="lg-stat-label" style="margin-bottom:8px">Secondary Market Value</div>
              <div style="font-size:24px;font-weight:800;color:var(--lg-gold-light)">${fmt(v.current_market_value)}</div>
              <div style="font-size:11px;color:var(--lg-gray-400);margin-top:2px">From ${v.data_points_used || 'available'} auction comparables</div>
            </div>
            <div>
              <div class="lg-stat-label" style="margin-bottom:8px">Purchase Price</div>
              <div style="font-size:24px;font-weight:800;color:var(--lg-gray-400)">${fmt(asset.purchase_price)}</div>
              <div style="font-size:11px;color:var(--lg-slate);margin-top:2px">${fmtDate(asset.purchase_date)} · separate from market value</div>
            </div>
          </div>
          <div style="margin-bottom:20px">
            <div class="lg-chart-title" style="margin-bottom:4px">10-Year Projection</div>
            <div class="lg-chart-sub" style="margin-bottom:12px">Secondary market estimates based on historical auction data and rarity signals</div>
            <div style="display:flex;gap:10px;margin-bottom:10px;flex-wrap:wrap">
              ${[[1,'1yr'],[3,'3yr'],[5,'5yr'],[10,'10yr']].map(([yr,lbl]) => `
                <div style="background:var(--lg-navy);border:1px solid var(--lg-navy-light);border-radius:8px;padding:10px 14px;text-align:center">
                  <div style="font-size:10px;color:var(--lg-gray-400);font-weight:600;text-transform:uppercase;margin-bottom:3px">${lbl}</div>
                  <div style="font-size:16px;font-weight:800;color:var(--lg-gold-light)">${fmt(v['projected_' + yr + 'yr'])}</div>
                </div>`).join('')}
            </div>
            <canvas id="lg-detail-chart" style="width:100%;height:160px;display:block"></canvas>
          </div>
          <div style="background:var(--lg-navy);border:1px solid var(--lg-navy-light);border-radius:8px;padding:14px;margin-bottom:16px">
            <div style="font-size:12px;font-weight:700;color:var(--lg-gold);margin-bottom:6px">ANALYST SUMMARY</div>
            <div style="font-size:13px;color:var(--lg-gray-200);line-height:1.55">${esc(v.valuation_reasoning || '')}</div>
          </div>
          <div style="font-size:12px;color:var(--lg-gold);font-weight:600;padding:8px 12px;background:rgba(217,119,6,0.07);border-radius:6px">
            ${ICON.chart} Optimal Sell Window: ${esc(v.optimal_sell_window || '')}
          </div>` : '<div class="lg-empty"><p>No valuation computed yet.</p></div>'}
        </div>
        <div class="lg-modal-footer">
          <button class="lg-btn lg-btn-outline" id="lg-asset-modal-close2">Close</button>
          <button class="lg-btn lg-btn-gold" id="lg-valuate-btn">${ICON.refresh} Valuate Now</button>
        </div>
      </div>`;

    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
      if (v?.chart_data) {
        const c = document.getElementById('lg-detail-chart');
        if (c) drawProjectionChart(c, [{ label: `${asset.make} ${asset.model}`, data: v.chart_data }], []);
      }
    });
    const close = () => overlay.remove();
    overlay.querySelector('#lg-asset-modal-close')?.addEventListener('click', close);
    overlay.querySelector('#lg-asset-modal-close2')?.addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    overlay.querySelector('#lg-valuate-btn')?.addEventListener('click', () => {
      showToast('Valuation refresh requires API connection', 'info');
    });
  }

  function openAddAssetModal() {
    const overlay = el('div', 'lg-modal-overlay');
    overlay.innerHTML = `
      <div class="lg-modal">
        <div class="lg-modal-header">
          <div class="lg-modal-title">${ICON.gun} Add Firearm to Portfolio</div>
          <button class="lg-btn lg-btn-outline lg-btn-sm" id="lg-add-close">${ICON.close}</button>
        </div>
        <div class="lg-modal-body">
          <form class="lg-form" id="lg-add-form">
            <div class="lg-form-row">
              <div class="lg-field"><label class="lg-label">Make</label><input class="lg-input" name="make" required placeholder="Colt, Glock, Sig Sauer…"></div>
              <div class="lg-field"><label class="lg-label">Model</label><input class="lg-input" name="model" required placeholder="Python, 19, P365 XL…"></div>
            </div>
            <div class="lg-form-row">
              <div class="lg-field"><label class="lg-label">Caliber</label><input class="lg-input" name="caliber" placeholder=".357 Mag, 9mm…"></div>
              <div class="lg-field"><label class="lg-label">Year Manufactured</label><input class="lg-input" name="year_manufactured" type="number" min="1800" max="2030" placeholder="1978"></div>
            </div>
            <div class="lg-form-row">
              <div class="lg-field"><label class="lg-label">Condition</label>
                <select class="lg-select" name="condition">
                  <option value="new">New</option>
                  <option value="excellent">Excellent</option>
                  <option value="very_good" selected>Very Good</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              <div class="lg-field"><label class="lg-label">Purchase Price</label><input class="lg-input" name="purchase_price" type="number" min="0" step="0.01" placeholder="Your purchase price"></div>
            </div>
            <div class="lg-form-row">
              <div class="lg-field"><label class="lg-label">Purchase Date</label><input class="lg-input" name="purchase_date" type="date"></div>
              <div class="lg-field"><label class="lg-label">Acquired From</label>
                <select class="lg-select" name="acquired_from">
                  <option value="fpr">FPRMembers.com</option>
                  <option value="auction">Auction</option>
                  <option value="private_party">Private Party</option>
                  <option value="estate">Estate</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div class="lg-field"><label class="lg-label">Serial (Last 4 Only)</label><input class="lg-input" name="serial_masked" maxlength="4" placeholder="Last 4 digits only"></div>
            <div style="font-size:11px;color:var(--lg-slate);background:var(--lg-navy);padding:10px 12px;border-radius:6px">
              All valuations use secondary market auction data only. Purchase price is stored separately and is never compared to MAP pricing.
            </div>
          </form>
        </div>
        <div class="lg-modal-footer">
          <button class="lg-btn lg-btn-outline" id="lg-add-cancel">Cancel</button>
          <button class="lg-btn lg-btn-gold" id="lg-add-submit">${ICON.plus} Add to Portfolio</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    overlay.querySelector('#lg-add-close')?.addEventListener('click', close);
    overlay.querySelector('#lg-add-cancel')?.addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    overlay.querySelector('#lg-add-submit')?.addEventListener('click', () => {
      showToast('Asset saved (requires API connection for full persistence)', 'success');
      close();
    });
  }

  function renderLedger(container, data) {
    container.innerHTML = '';
    const header = el('div', 'lg-section-header');
    header.innerHTML = `
      <div>
        <div class="lg-section-title">${ICON.vault} Legacy Ledger</div>
        <div class="lg-section-sub">Encrypted vault · AES-256-GCM · Off-chain document storage</div>
      </div>`;
    container.appendChild(header);

    const grid = el('div', 'lg-vault-grid');
    const listCol = el('div', 'lg-vault-list');
    data.vault_assets.forEach((la, i) => {
      const item = el('div', 'lg-vault-item');
      if (i === 0) item.classList.add('lg-selected');
      item.innerHTML = `
        <div class="lg-vault-item-name">${esc(la.make)} ${esc(la.model)}</div>
        <div class="lg-vault-item-meta">${esc(la.caliber || '')} · ${esc(la.condition || '')}</div>
        <div class="lg-trust-badge ${trustTierClass(la.trust_score)}">${ICON.shield} ${la.trust_score}/100 Trust</div>`;
      item.addEventListener('click', () => {
        listCol.querySelectorAll('.lg-vault-item').forEach(el => el.classList.remove('lg-selected'));
        item.classList.add('lg-selected');
        renderVaultDetail(detailCol, la);
      });
      listCol.appendChild(item);
    });
    grid.appendChild(listCol);

    const detailCol = el('div', 'lg-vault-detail');
    grid.appendChild(detailCol);
    container.appendChild(grid);
    if (data.vault_assets.length) renderVaultDetail(detailCol, data.vault_assets[0]);
  }

  function renderVaultDetail(container, la) {
    const trustWeights = { base: 10, receipt: 20, photos: 15, ballistics: 20, maintenance: 15, succession: 20 };
    const ts = la.trust_score;
    container.innerHTML = `
      <div class="lg-card" style="margin-bottom:16px">
        <div class="lg-card-header">
          <div class="lg-card-title">${esc(la.make)} ${esc(la.model)} — Vault Record</div>
          <span class="lg-trust-badge ${trustTierClass(ts)}">${ts}/100 Trust Score</span>
        </div>
        <div class="lg-card-body">
          <div class="lg-trust-breakdown" style="margin-bottom:14px">
            ${[
              ['Base (in vault)', 10, true],
              ['Purchase Receipt', trustWeights.receipt, la.has_receipt],
              ['Photos', trustWeights.photos, la.has_photos],
              ['Ballistics Fingerprint', trustWeights.ballistics, la.has_ballistics],
              ['Maintenance Logs', trustWeights.maintenance, la.has_maintenance],
              ['Succession Configured', trustWeights.succession, la.succession_activated],
            ].map(([lbl, w, has]) => `
              <div class="lg-trust-row">
                <span class="lg-trust-row-label">${lbl}</span>
                <div class="lg-trust-row-bar">
                  <div class="lg-trust-row-fill" style="width:${has?100:0}%;background:${has?'var(--lg-green)':'var(--lg-navy-light)'}"></div>
                </div>
                <span class="lg-trust-row-val" style="color:${has?'var(--lg-green)':'var(--lg-gray-400)'}">${has?'+'+w:'0'}</span>
              </div>`).join('')}
          </div>
          <div style="font-size:12px;font-weight:700;color:var(--lg-gray-400);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">Documents (${la.documents?.length || 0})</div>
          <div class="lg-doc-grid">
            ${['receipt','photo','ballistics','maintenance_log','appraisal'].map(type => {
              const doc = la.documents?.find(d => d.doc_type === type);
              return `
                <div class="lg-doc-slot ${doc ? 'lg-filled' : ''}" title="${doc ? 'View ' + type : 'Upload ' + type}">
                  ${ICON.upload}
                  <span class="lg-doc-slot-label">${type.replace(/_/g,' ')}</span>
                  ${doc ? `<div class="lg-doc-check">${ICON.check}</div>` : ''}
                </div>`;
            }).join('')}
          </div>
          ${la.maintenance_logs?.length ? `
          <div style="font-size:12px;font-weight:700;color:var(--lg-gray-400);text-transform:uppercase;letter-spacing:.5px;margin:14px 0 8px">Maintenance History</div>
          ${la.maintenance_logs.map(log => `
            <div style="background:var(--lg-navy);border:1px solid var(--lg-navy-light);border-radius:8px;padding:10px 12px;margin-bottom:6px;font-size:12px">
              <div style="font-weight:700;color:var(--lg-white);margin-bottom:2px">${esc(log.service_type?.replace(/_/g,' '))} · ${fmtDate(log.log_date)}</div>
              <div style="color:var(--lg-gray-400)">${log.shop_name ? esc(log.shop_name) + ' · ' : ''}${log.round_count_at_service ? log.round_count_at_service.toLocaleString() + ' rds at service' : ''}${log.cost ? ' · $' + log.cost : ''}</div>
            </div>`).join('')}` : ''}
          <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">
            <button class="lg-btn lg-btn-outline lg-btn-sm" id="lg-upload-doc-btn">${ICON.upload} Upload Document</button>
            <button class="lg-btn lg-btn-outline lg-btn-sm" id="lg-add-log-btn">${ICON.plus} Maintenance Log</button>
            ${!la.succession_activated ? `<button class="lg-btn lg-btn-gold lg-btn-sm" id="lg-succession-btn">${ICON.shield} Configure Succession</button>` : ''}
          </div>
        </div>
      </div>
      ${la.succession_activated ? `
      <div class="lg-succession-panel">
        <div class="lg-succession-title">${ICON.shield} Succession Plan Active — ${esc(la.succession_state || '')}</div>
        <div style="font-size:12px;color:var(--lg-gray-400);margin-bottom:10px">FFL: ${esc(la.succession_ffl_name || 'Not specified')} · Beneficiary email on file (encrypted)</div>
        <div style="font-size:11px;font-weight:700;color:var(--lg-gold);margin-bottom:6px">TRANSFER GUIDE</div>
        <ol class="lg-succession-steps">
          ${getSuccessionGuide(la.succession_state).map((step, i) => `
            <li class="lg-succession-step">
              <span class="lg-succession-num">${i+1}</span>
              <span>${esc(step)}</span>
            </li>`).join('')}
        </ol>
      </div>` : ''}`;

    container.querySelector('#lg-succession-btn')?.addEventListener('click', () => openSuccessionModal(la));
    container.querySelector('#lg-upload-doc-btn')?.addEventListener('click', () => showToast('Document upload requires API connection', 'info'));
    container.querySelector('#lg-add-log-btn')?.addEventListener('click', () => showToast('Maintenance log requires API connection', 'info'));
  }

  function getSuccessionGuide(stateCode) {
    const TX_GUIDE = [
      'No state firearms license required for estate transfer in Texas.',
      'Long guns may transfer directly to heirs — no FFL required for immediate family.',
      'Handgun transfers to non-immediate family require FFL + NICS background check.',
      'NFA items (suppressors, SBRs) require ATF Form 5 (Tax Exempt) before possession.',
      'Document with signed bill of sale and copy of death certificate.',
      'Consult a licensed Texas attorney and FFL for complex estates.',
    ];
    return stateCode === 'TX' ? TX_GUIDE : [
      'Contact a licensed FFL in your state for estate transfer requirements.',
      'Obtain a death certificate copy before any transfer.',
      'NFA items require ATF Form 5 — do not take possession before approval.',
      'Consult a firearms attorney in your state.',
      'Document all transfers with signed bill of sale and death certificate.',
    ];
  }

  function openSuccessionModal(la) {
    const overlay = el('div', 'lg-modal-overlay');
    overlay.innerHTML = `
      <div class="lg-modal">
        <div class="lg-modal-header">
          <div class="lg-modal-title">${ICON.shield} Configure Succession — ${esc(la.make)} ${esc(la.model)}</div>
          <button class="lg-btn lg-btn-outline lg-btn-sm" id="lg-succ-close">${ICON.close}</button>
        </div>
        <div class="lg-modal-body">
          <div style="font-size:12px;color:var(--lg-gold);background:rgba(217,119,6,0.08);border:1px solid rgba(217,119,6,0.2);border-radius:6px;padding:10px 12px;margin-bottom:16px;line-height:1.5">
            This information is encrypted with AES-256-GCM before storage. Only you can decrypt it. FPR never has access to your beneficiary details in plaintext.
          </div>
          <form class="lg-form" id="lg-succ-form">
            <div class="lg-field"><label class="lg-label">Beneficiary Full Name</label><input class="lg-input" name="beneficiary_name" required placeholder="Full legal name"></div>
            <div class="lg-field"><label class="lg-label">Beneficiary Email</label><input class="lg-input" name="beneficiary_email" type="email" required placeholder="heir@email.com"></div>
            <div class="lg-form-row">
              <div class="lg-field"><label class="lg-label">Transfer State</label>
                <select class="lg-select" name="succession_state">
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                  <option value="CA">California</option>
                  <option value="OTHER">Other State</option>
                </select>
              </div>
              <div class="lg-field"><label class="lg-label">Designated FFL (Optional)</label><input class="lg-input" name="ffl_name" placeholder="FFL dealer name"></div>
            </div>
          </form>
        </div>
        <div class="lg-modal-footer">
          <button class="lg-btn lg-btn-outline" id="lg-succ-cancel">Cancel</button>
          <button class="lg-btn lg-btn-gold" id="lg-succ-save">${ICON.shield} Activate Succession</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    overlay.querySelector('#lg-succ-close')?.addEventListener('click', close);
    overlay.querySelector('#lg-succ-cancel')?.addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    overlay.querySelector('#lg-succ-save')?.addEventListener('click', () => {
      showToast('Succession configured and encrypted (requires API connection)', 'success');
      close();
    });
  }

  function renderBrain(container, data) {
    container.innerHTML = '';
    const header = el('div', 'lg-section-header');
    header.innerHTML = `
      <div>
        <div class="lg-section-title">${ICON.brain} FPR Collective Brain</div>
        <div class="lg-section-sub">Anonymized intelligence · Minimum 25-member sample · No individual identification</div>
      </div>`;
    container.appendChild(header);

    const optBar = el('div', 'lg-opt-status-bar');
    optBar.innerHTML = `
      <div>
        <div class="lg-opt-label">Data Contribution Status</div>
        <div class="lg-opt-status" id="lg-opt-status">
          <span class="lg-opt-dot ${data.brain_opted_in ? 'on' : 'off'}"></span>
          <span>${data.brain_opted_in ? 'Contributing — your behavior improves collective insights' : 'Opted out — not contributing'}</span>
        </div>
      </div>
      <button class="lg-btn ${data.brain_opted_in ? 'lg-btn-outline' : 'lg-btn-gold'} lg-btn-sm" id="lg-brain-opt-btn">
        ${data.brain_opted_in ? 'Opt Out' : 'Opt In'}
      </button>`;
    container.appendChild(optBar);

    const note = el('div', null);
    note.style.cssText = 'font-size:12px;color:var(--lg-slate);background:var(--lg-navy-mid);border:1px solid var(--lg-navy-light);border-radius:8px;padding:10px 14px;margin-bottom:20px;line-height:1.5';
    note.innerHTML = `Your member_id is never stored in the Collective Brain. All events are anonymized with a daily-rotating cryptographic hash before ingestion. Patterns only surface when at least 25 members share the same behavior — individual data cannot be inferred from any displayed insight.`;
    container.appendChild(note);

    const grid = el('div', 'lg-brain-grid');
    data.brain_patterns.forEach(p => {
      const card = el('div', 'lg-insight-card');
      card.innerHTML = `
        <div class="lg-insight-header">
          <div class="lg-insight-icon">${p.icon}</div>
          <div class="lg-insight-category">${esc(p.category_label)}</div>
        </div>
        <div class="lg-insight-text">${esc(p.pattern_text)}</div>
        <div class="lg-insight-footer">
          <div>
            <div class="lg-insight-confidence">${p.confidence_pct}%</div>
            <div class="lg-insight-meta">confidence</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:12px;font-weight:600;color:var(--lg-white)">${p.time_window_days} day window</div>
            <div class="lg-insight-meta">${p.sample_display}</div>
          </div>
        </div>`;
      grid.appendChild(card);
    });
    container.appendChild(grid);

    let optedIn = data.brain_opted_in;
    document.getElementById('lg-brain-opt-btn')?.addEventListener('click', () => {
      optedIn = !optedIn;
      showToast(optedIn ? 'Opted in to Collective Brain' : 'Opted out — your data will no longer be contributed', optedIn ? 'success' : 'info');
      renderBrain(container, { ...data, brain_opted_in: optedIn });
    });
  }

  function renderIntel(container, data) {
    container.innerHTML = '';
    const header = el('div', 'lg-section-header');
    header.innerHTML = `
      <div>
        <div class="lg-section-title">${ICON.intel} Member Intelligence Engine</div>
        <div class="lg-section-sub">Proactive AI · MAP-compliant messaging · Behavior-driven triggers</div>
      </div>`;
    container.appendChild(header);

    const grid = el('div', 'lg-intel-grid');
    const msgCol = el('div');
    const msgTitle = el('div', null);
    msgTitle.style.cssText = 'font-size:13px;font-weight:700;color:var(--lg-gray-400);text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px';
    msgTitle.textContent = 'Proactive Messages';
    msgCol.appendChild(msgTitle);

    const msgList = el('div', 'lg-message-list');
    if (!data.intel_messages?.length) {
      msgList.innerHTML = `<div class="lg-empty"><p>No proactive messages yet.</p></div>`;
    } else {
      data.intel_messages.forEach(msg => {
        const card = el('div', `lg-message-card${msg.is_read === false ? ' lg-unread' : ''}`);
        card.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px">
            <div class="lg-message-subject">${esc(msg.subject)}</div>
            <span class="lg-message-type-tag">${esc((msg.trigger_type||'').replace(/_/g,' '))}</span>
          </div>
          <div class="lg-message-body">${esc(msg.body).split('\n\n').map(p => `<p style="margin-bottom:6px">${p}</p>`).join('')}</div>
          <div class="lg-message-meta">
            <span>${fmtDate(msg.created_at)}</span>
            <span class="lg-tag lg-tag-green">${ICON.check} MAP Compliant</span>
          </div>`;
        msgList.appendChild(card);
      });
    }
    msgCol.appendChild(msgList);
    grid.appendChild(msgCol);

    const sigCol = el('div');
    const sigTitle = el('div', null);
    sigTitle.style.cssText = 'font-size:13px;font-weight:700;color:var(--lg-gray-400);text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px';
    sigTitle.textContent = 'Active Signals';
    sigCol.appendChild(sigTitle);

    const sigPanel = el('div', 'lg-signal-panel');
    if (data.active_signals?.length) {
      data.active_signals.forEach(sig => {
        const card = el('div', 'lg-signal-card');
        card.innerHTML = `
          <div class="lg-signal-label">${esc(sig.signal_type.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase()))}</div>
          <div class="lg-signal-desc">${esc(sig.signal_data?.pattern_text || 'Signal detected · Analyzing for relevant communication')}</div>
          <div class="lg-signal-strength-bar">
            <div class="lg-signal-strength-fill" style="width:${sig.signal_strength}%"></div>
          </div>
          <div style="font-size:10px;color:var(--lg-gray-400);margin-top:4px">Strength: ${sig.signal_strength}/100</div>`;
        sigPanel.appendChild(card);
      });
    } else {
      sigPanel.innerHTML = `<div class="lg-empty" style="padding:24px"><p>No active signals.</p></div>`;
    }

    const mapNote = el('div', null);
    mapNote.style.cssText = 'margin-top:16px;background:var(--lg-navy-mid);border:1px solid var(--lg-navy-light);border-radius:8px;padding:14px';
    mapNote.innerHTML = `
      <div style="font-size:12px;font-weight:700;color:var(--lg-gold);margin-bottom:8px">MAP Compliance</div>
      <div class="lg-trust-breakdown">
        ${['Always-banned cost language', 'Price figures (MAP items)', 'Claude scan before send', 'Sanitize before store'].map(item => `
          <div class="lg-trust-row">
            <span class="lg-trust-row-label" style="font-size:11px">${item}</span>
            <span style="color:var(--lg-green);font-size:11px;font-weight:700">Active</span>
          </div>`).join('')}
      </div>`;
    sigCol.appendChild(sigPanel);
    sigCol.appendChild(mapNote);
    grid.appendChild(sigCol);
    container.appendChild(grid);
  }

  function showToast(msg, type = 'info') {
    const existing = document.querySelectorAll('.lg-toast');
    existing.forEach(t => t.remove());
    const toast = el('div', `lg-toast lg-toast-${type}`, esc(msg));
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }

  function init(mountEl) {
    if (!mountEl) return;
    mountEl.classList.add('fpr-lg');
    mountEl.innerHTML = '';

    const header = el('div', 'lg-header');
    header.innerHTML = `
      <div class="lg-logo">FPR<span>Legacy</span></div>
      <nav class="lg-nav" id="lg-nav">
        <button class="lg-nav-tab lg-active" data-view="forecaster">${ICON.chart} Forecaster</button>
        <button class="lg-nav-tab" data-view="ledger">${ICON.vault} Vault Ledger</button>
        <button class="lg-nav-tab" data-view="brain">${ICON.brain} Collective Brain</button>
        <button class="lg-nav-tab" data-view="intel">
          ${ICON.intel} Intelligence
          <span class="lg-nav-badge" id="lg-intel-badge">2</span>
        </button>
      </nav>`;
    mountEl.appendChild(header);

    const views = {};
    ['forecaster', 'ledger', 'brain', 'intel'].forEach(name => {
      const view = el('div', `lg-view${name === 'forecaster' ? ' lg-visible' : ''}`, '');
      view.dataset.view = name;
      mountEl.appendChild(view);
      views[name] = view;
    });

    header.querySelector('#lg-nav').addEventListener('click', e => {
      const btn = e.target.closest('.lg-nav-tab');
      if (!btn) return;
      const target = btn.dataset.view;
      header.querySelectorAll('.lg-nav-tab').forEach(t => t.classList.toggle('lg-active', t === btn));
      Object.values(views).forEach(v => v.classList.toggle('lg-visible', v.dataset.view === target));
      state.activeView = target;
      renderView(target);
    });

    renderView('forecaster');

    function renderView(name) {
      const v = views[name];
      if (!v) return;
      switch (name) {
        case 'forecaster': renderForecaster(v, DEMO); break;
        case 'ledger':     renderLedger(v, DEMO);     break;
        case 'brain':      renderBrain(v, DEMO);       break;
        case 'intel':      renderIntel(v, DEMO);       break;
      }
    }
  }

  function autoInit() {
    document.querySelectorAll('[data-fpr-legacy]').forEach(el => init(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  return { init };
}));
