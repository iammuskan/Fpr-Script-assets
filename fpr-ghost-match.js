
  /* FPRMembers.com — Build 13: Ghost Match — Range Coordination System
   Mount: <div class="fpr-ghost-mount" data-api-url="" data-member-id="" data-member-name="">
   Bootstrap: FPRGhostMatch.init(document.querySelector('.fpr-ghost-mount'))

   CRITICAL LANGUAGE RULE: "dealer cost" is BANNED. Use "member pricing" exclusively.
   CRITICAL SAFETY RULE: No location is shared until both members are fully_verified.
*/

const FPRGhostMatch = (() => {
  // ─── STATE ──────────────────────────────────────────────────────────────────
  let _el, _api, _memberId, _memberName;
  let _view        = 'welcome';
  let _subview     = null;
  let _verification = { status: 'unverified' };
  let _profile      = {};
  let _matches      = [];
  let _meetups      = [];
  let _activeGroup  = null;
  let _activeMeetup = null;
  let _ammoOrder    = null;
  let _ammoOrderLoading = false;
  let _ammoOrderError = '';
  let _invitesSent  = [];
  let _demoMode     = true;
  let _matchSearchComplete = false;
  let _matchEmptyMessage = 'No matches found yet. Check back soon!';
  let _accessChecked = false;
  let _isPaidMember = false;
  let _memberstackMember = null;

  // LANGUAGE COMPLIANCE: this string must appear in all ammo pricing displays
  const MEMBER_PRICING_LABEL = 'Member Pricing';

  const ICONS = {
    ammo: '<path d="M8 3h8l1 4H7l1-4Z"/><path d="M7 7h10v14H7z"/><path d="M10 11h4"/>',
    arrowLeft: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    back: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/><path d="M5 4h14a2 2 0 0 1 2 2v15H3V6a2 2 0 0 1 2-2Z"/>',
    camera: '<path d="M14.5 4 16 7h3a2 2 0 0 1 2 2v10H3V9a2 2 0 0 1 2-2h3l1.5-3h5Z"/><circle cx="12" cy="13" r="3"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    cross: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    email: '<path d="M4 5h16v14H4z"/><path d="m4 7 8 6 8-6"/>',
    friend: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    id: '<path d="M3 5h18v14H3z"/><path d="M7 9h5"/><path d="M7 13h3"/><circle cx="16" cy="12" r="2"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    light: '<path d="M15 14c.6-.8 1-1.8 1-3a4 4 0 0 0-8 0c0 1.2.4 2.2 1 3l1 1v2h4v-2l1-1Z"/><path d="M10 21h4"/><path d="M12 2v2"/>',
    location: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    mail: '<path d="M4 4h16v16H4z"/><path d="m4 7 8 6 8-6"/>',
    package: '<path d="m21 8-9-5-9 5 9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
    phone: '<path d="M7 2h10v20H7z"/><path d="M11 18h2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4"/><path d="m15.4 6.5-6.8 4"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-5"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    upload: '<path d="M12 3v12"/><path d="m7 8 5-5 5 5"/><path d="M4 17v3h16v-3"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    warning: '<path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v5"/><path d="M12 17h.01"/>',
  };

  function icon(name, className = 'fpr-ghost-svg-icon') {
    return `<svg class="${className}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.info}</svg>`;
  }

  // ─── DEMO DATA ──────────────────────────────────────────────────────────────
  const DEMO = {
    verification: { status: 'fully_verified', phone_last4: '4821', fully_verified_at: '2026-04-10' },
    profile: {
      display_name: 'John D.', skill_level: 'intermediate', is_opted_in: true,
      disciplines: ['handgun', 'ccw_qual', 'home_defense_training'],
      availability: ['saturday_am', 'saturday_pm', 'sunday_am'],
      home_state: 'TX', max_distance_miles: 25,
      bio: 'Former LEO, intermediate shooter focused on defensive pistol. Looking for training partners.',
    },
    matchGroup: {
      id: 'demo-group-1',
      status: 'all_accepted',
      match_count: 3,
      narrative: {
        headline: 'All three of you share a strong defensive training focus and consistent weekend availability — this group is an ideal match.',
        body: 'Your group brings together a complementary mix of intermediate and experienced defensive pistol shooters with overlapping Saturday morning availability. The shared focus on practical handgun and CCW qualification creates a natural foundation for a structured group training session.',
        range_day_suggestion: 'A defensive handgun session focusing on draw-from-holster drills and target transitions would leverage all three members\' shared interest in practical shooting.',
        ammo_coordination_note: 'All members have indicated 9mm as their primary caliber — consider coordinating a group ammo order at member pricing to maximize the range day value.',
      },
      common_disciplines: ['handgun', 'ccw_qual'],
      members: [
        { display_name: 'Sarah M.', skill_level: 'intermediate', disciplines: ['handgun', 'ccw_qual'], availability: ['saturday_am', 'saturday_pm'], approx_distance: '~8 miles' },
        { display_name: 'Tom K.',   skill_level: 'experienced',  disciplines: ['handgun', 'home_defense_training', 'precision_rifle'], availability: ['saturday_am', 'sunday_am'], approx_distance: '~15 miles' },
        { display_name: 'Alex R.', skill_level: 'new_shooter',  disciplines: ['handgun', 'ccw_qual'], availability: ['saturday_am'], approx_distance: '~4 miles' },
      ],
    },
    meetup: {
      id: 'demo-meetup-1',
      range_name: 'Texas Shooting Center',
      range_address: '12234 FM 1960 W, Houston, TX 77065',
      proposed_date: '2026-05-24',
      proposed_time: 'Saturday 10:00 AM',
      status: 'confirmed',
      attendees: [
        { display_name: 'John D.', rsvp: 'yes' },
        { display_name: 'Sarah M.', rsvp: 'yes' },
        { display_name: 'Tom K.',   rsvp: 'yes' },
        { display_name: 'Alex R.', rsvp: 'yes' },
      ],
    },
    ammoOrder: {
      id: 'demo-order-1',
      status: 'open',
      pricing_note: 'All items at member pricing — never dealer cost',
      items: [
        { member_id: 'demo', display_name: 'John D.', caliber: '9mm', brand: 'Blazer Brass', quantity_rounds: 250, pricing_tier: 'member_pricing' },
        { member_id: 'sarah', display_name: 'Sarah M.', caliber: '9mm', brand: 'Federal', quantity_rounds: 200, pricing_tier: 'member_pricing' },
        { member_id: 'tom',   display_name: 'Tom K.',   caliber: '9mm', brand: 'Winchester', quantity_rounds: 150, pricing_tier: 'member_pricing' },
      ],
    },
    history: [
      { id: 'h1', range_name: 'Red\'s Indoor Range', proposed_date: '2026-03-15', status: 'completed', attendees: [{display_name:'Sarah M.',rsvp:'yes'},{display_name:'Mike T.',rsvp:'yes'}] },
      { id: 'h2', range_name: 'Top Gun Range',       proposed_date: '2026-02-08', status: 'completed', attendees: [{display_name:'Tom K.',rsvp:'yes'}] },
    ],
    invites: [
      { id: 'i1', friend_name: 'Chris Wilson', friend_email: 'c.wilson@email.com', status: 'rsvp_yes', sent_at: '2026-05-01' },
    ],
  };

  // ─── UTILS ──────────────────────────────────────────────────────────────────
  function skillLabel(s) {
    const map = { never_shot:'Never Shot', new_shooter:'New Shooter', intermediate:'Intermediate', experienced:'Experienced', advanced:'Advanced', competition:'Competition', instructor:'Instructor' };
    return map[s] || s;
  }
  function discLabel(d) {
    const map = { handgun:'Handgun', precision_rifle:'Precision Rifle', '3gun':'3-Gun', ccw_qual:'CCW Qual', home_defense_training:'Home Defense', hunting_prep:'Hunting Prep', historical:'Historical', collecting:'Collecting', competition:'Competition', long_range:'Long Range' };
    return map[d] || d;
  }
  function availLabel(a) {
    const map = { weekday_mornings:'Weekday AM', weekday_afternoons:'Weekday PM', weekday_evenings:'Weekday Evenings', saturday_am:'Sat AM', saturday_pm:'Sat PM', sunday_am:'Sun AM', sunday_pm:'Sun PM' };
    return map[a] || a;
  }
  function verifyColor(s) {
    return s === 'fully_verified' ? '#059669' : s === 'id_submitted' ? '#2563EB' : s === 'phone_verified' || s === 'email_confirmed' ? '#D97706' : '#6B7280';
  }
  function verifyChipText(s) {
    return { fully_verified:'Verified', id_submitted:'ID Under Review', phone_verified:'Phone Verified', email_confirmed:'Email Confirmed', unverified:'Not Verified', suspended:'Suspended' }[s] || s;
  }
  function isActivePlanConnection(conn) {
    const status = String(conn?.status || conn?.planConnectionStatus || conn?.paymentStatus || '').toLowerCase();
    if (conn?.active === false || conn?.isActive === false) return false;
    return !status || ['active', 'trialing', 'paid', 'current'].includes(status);
  }
  function isFreePlan(plan) {
    const text = `${plan?.name || ''} ${plan?.planName || ''} ${plan?.type || ''} ${plan?.slug || ''}`.toLowerCase();
    const price = plan?.price ?? plan?.amount ?? plan?.amountCents ?? plan?.priceCents;
    if (text.includes('free')) return true;
    if (price === 0 || price === '0') return true;
    return false;
  }
  function getMemberstackCustomField(member, fieldId) {
    const data = member?.data || member || {};
    const sources = [data.customFields, data.customfields, data.metaData, data.metadata, member?.customFields, member?.metaData].filter(Boolean);
    for (const source of sources) {
      if (source[fieldId] !== undefined) return source[fieldId];
      const camel = fieldId.replace(/-([a-z])/g, (_, ch) => ch.toUpperCase());
      if (source[camel] !== undefined) return source[camel];
    }
    return '';
  }
  function hasPaidAuthorizePlan(member) {
    const planName = String(getMemberstackCustomField(member, 'plan-name') || '').trim().toLowerCase();
    return ['founding 50', 'elite member'].includes(planName);
  }
  function hasPaidMemberstackPlan(member) {
    if (hasPaidAuthorizePlan(member)) return true;
    const data = member?.data || member || {};
    const rawPlans = [
      data.planConnections, data.plans, data.memberships, data.permissions,
      member?.planConnections, member?.plans, member?.memberships,
    ].filter(Array.isArray).flat();
    return rawPlans.some(conn => {
      const plan = conn?.plan || conn?.membership || conn;
      return isActivePlanConnection(conn) && !isFreePlan(plan);
    });
  }
  async function loadMemberstackAccess() {
    if (_demoMode) {
      _accessChecked = true;
      _isPaidMember = true;
      return;
    }
    try {
      const api = window.memberstack || window.$memberstackDom || null;
      if (api?.getCurrentMember) {
        _memberstackMember = await api.getCurrentMember();
      } else if (window.MemberStack?.onReady?.then) {
        _memberstackMember = await window.MemberStack.onReady;
      }
      const memberData = _memberstackMember?.data || _memberstackMember || {};
      _memberId = memberData.id || memberData.memberId || _memberId;
      _memberName = memberData.name || memberData.fullName || memberData.metaData?.name || memberData.customFields?.name || _memberName;
      _isPaidMember = hasPaidAuthorizePlan(_memberstackMember) || hasPaidMemberstackPlan(_memberstackMember);
    } catch {
      _isPaidMember = false;
    } finally {
      _accessChecked = true;
    }
  }

  // ─── VIEWS ──────────────────────────────────────────────────────────────────
  function renderLocked() {
    return `<div class="fpr-ghost-locked">
      <div class="fpr-ghost-locked-icon">${icon('lock', 'fpr-ghost-svg-icon fpr-ghost-svg-icon-lg')}</div>
      <h2>Ghost Match is for paid FPRMembers</h2>
      <p>Upgrade your membership and complete verification to access matches, meetups, ammo coordination, and friend invites.</p>
      <a class="fpr-ghost-btn fpr-ghost-btn-primary" href="/account/plans">Upgrade Membership ${icon('arrowRight')}</a>
    </div>`;
  }

  function renderWelcome() {
    const v = _verification;
    const isVerified = v.status === 'fully_verified';
    return `<div class="fpr-ghost-welcome">
      <div class="fpr-ghost-welcome-icon"><i class="ti ti-users"></i></div>
      <h1 class="fpr-ghost-welcome-title">Ghost Match</h1>
      <p class="fpr-ghost-welcome-sub">
        Find verified FPRMembers near you for a private group range day. Ghost Match connects members you by skill level, shared interests, and availability. All meetups at public, licensed ranges. Full identity verification required before any member's location is shared.
      </p>
      <p class="fpr-ghost-welcome-sub">Find your circle. Train smarter together.
      </p>
      <p class="fpr-ghost-welcome-sub">Connect with verified FPRMembers for private range days, training groups, and local shooting circles.

      </p>
      <p class="fpr-ghost-welcome-sub">Trusted member networking for serious firearms owners.

      </p>
      <p class="fpr-ghost-welcome-sub">Verified local connections for training, preparedness, and range coordination.
      </p>
      <div class="fpr-ghost-safety-box">
        <strong>${icon('shield')} Safety First - How Ghost Match Protects You</strong>
        <ul>
          <li>Full government ID verification before participation</li>
          <li>Your location (zip code only) is never shown until you join a confirmed group</li>
          <li>Public, licensed ranges only — no private property meetups</li>
          <li>Group minimum of 3 verified members — no direct 1-on-1 matches</li>
          <li>Block and report any member instantly</li>
         
        </ul>
      </div>
      <div class="fpr-ghost-feature-grid">
        <div class="fpr-ghost-feature-card"><span class="fpr-ghost-feature-icon"><i class="ti ti-user-check"></i></span><div class="fpr-ghost-feature-text"><strong>Matched Groups</strong><span>2–5 members, same skill level, shared interests, overlapping schedules</span></div></div>
        <div class="fpr-ghost-feature-card"><span class="fpr-ghost-feature-icon"><i class="ti ti-shield-check"></i></span><div class="fpr-ghost-feature-text"><strong>Identity Verified</strong><span>Every Ghost Match member verified by government ID before matching</span></div></div>
        <div class="fpr-ghost-feature-card"><span class="fpr-ghost-feature-icon"><i class="ti ti-package"></i></span><div class="fpr-ghost-feature-text"><strong>Group Ammo Orders</strong><span>Coordinate group ammo at member pricing — quantity coordination, no dealer cost shown</span></div></div>
        <div class="fpr-ghost-feature-card"><span class="fpr-ghost-feature-icon"><i class="ti ti-user-plus"></i></span><div class="fpr-ghost-feature-text"><strong>Bring a Friend</strong><span>Invite non-members to a range day — introduces them to FPRMembers.com</span></div></div>
      </div>
      ${!isVerified ? `
        <button class="fpr-ghost-btn fpr-ghost-btn-primary fpr-ghost-btn-lg" data-action="nav" data-view="verify">
          ${icon('shield')} Start Identity Verification ${icon('arrowRight')}
        </button>
        <p style="text-align:center;font-size:12px;color:#9AA3AF;margin-top:10px">Required before opt-in. Typically completes within 24 hours.</p>
      ` : `
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="fpr-ghost-btn fpr-ghost-btn-primary fpr-ghost-btn-lg" style="flex:1" data-action="nav" data-view="matches">View My Matches</button>
          <button class="fpr-ghost-btn fpr-ghost-btn-secondary" style="flex:1" data-action="nav" data-view="profile">Update Profile</button>
        </div>
      `}
    </div>`;
  }

  function renderVerify() {
    const v = _verification;
    const level = { unverified:0, email_confirmed:1, phone_verified:2, id_submitted:3, fully_verified:4 }[v.status] || 0;

    const steps = [
      { n:1, id:'email', icon:'mail', title:'Confirm Email', desc:'Your FPRMembers email is confirmed via your membership account.', status: level>=1?'done':'active' },
      { n:2, id:'phone', icon:'phone', title:'Verify Phone', desc:'Enter your mobile number and confirm with a one-time SMS code.', status: level>=2?'done':level>=1?'active':'pending' },
      { n:3, id:'id',    icon:'id', title:'Submit Photo ID', desc:"Upload a government-issued photo ID (driver's license, passport, or military ID). Reviewed manually within 24 hours.", status: level>=4?'done':level>=3?'review':level>=2?'active':'pending' },
      { n:4, id:'done',  icon:'shield', title:'Fully Verified', desc:'Your identity has been confirmed. You may now opt into Ghost Match and participate in range coordination.', status: level>=4?'done':'pending' },
    ];

    return `<div class="fpr-ghost-verify-panel">
      <h2 style="font-size:18px;font-weight:800;color:#0F1923;margin:0 0 6px">Identity Verification</h2>
      <p style="font-size:12.5px;color:#9AA3AF;margin:0 0 18px">Required before Ghost Match participation. Your information is used only for verification.</p>

      <div class="fpr-ghost-verify-steps">
        ${steps.map(s => `
          <div class="fpr-ghost-verify-step ${s.status}">
            <span class="fpr-ghost-verify-icon">${icon(s.icon, 'fpr-ghost-svg-icon fpr-ghost-svg-icon-md')}</span>
            <div class="fpr-ghost-verify-body">
              <div class="fpr-ghost-verify-step-title">${s.title}</div>
              <div class="fpr-ghost-verify-step-desc">${s.desc}</div>
              ${s.status === 'active' && s.id === 'phone' ? `
                <div style="display:flex;gap:8px;margin-top:10px">
                  <input class="fpr-ghost-input" id="phone-input" placeholder="Mobile number" type="tel" style="flex:1">
                  <button class="fpr-ghost-btn fpr-ghost-btn-primary" data-action="verify-phone">Send Code</button>
                </div>` : ''}
              ${s.status === 'active' && s.id === 'id' ? `
                <label class="fpr-ghost-id-dropzone" for="id-file-input" style="margin-top:10px">
                  <span class="fpr-ghost-id-dropzone-icon">${icon('camera', 'fpr-ghost-svg-icon fpr-ghost-svg-icon-lg')}</span>
                  <div class="fpr-ghost-id-dropzone-title">Upload Government ID</div>
                  <div class="fpr-ghost-id-dropzone-sub">JPEG, PNG, or PDF · Max 10MB</div>
                </label>
                <input type="file" id="id-file-input" accept="image/*,.pdf" style="display:none" data-action="id-file-select">
                <div style="margin-top:8px">
                  <label class="fpr-ghost-label">ID Type</label>
                  <select class="fpr-ghost-select" id="id-type-select">
                    <option value="drivers_license">Driver's License</option>
                    <option value="passport">Passport</option>
                    <option value="military_id">Military ID</option>
                    <option value="state_id">State ID</option>
                  </select>
                </div>
                <button class="fpr-ghost-btn fpr-ghost-btn-primary" data-action="submit-id" style="margin-top:10px">Submit ID for Review</button>
                <div class="fpr-ghost-privacy-note">${icon('lock')} ID reviewed by admin only. Not stored after verification.</div>
              ` : ''}
            </div>
            <span class="fpr-ghost-verify-status ${s.status==='done'?'done':s.status==='active'?'active':s.status==='review'?'review':'pending'}">
              ${s.status==='done'?'Done':s.status==='active'?'Required':s.status==='review'?'Under Review':'Upcoming'}
            </span>
          </div>`).join('')}
      </div>

      ${level >= 4 ? `
        <div style="background:#ECFDF5;border:1px solid rgba(5,150,105,.25);border-radius:10px;padding:16px;text-align:center">
          <div style="margin-bottom:6px;color:#059669">${icon('shield', 'fpr-ghost-svg-icon fpr-ghost-svg-icon-lg')}</div>
          <div style="font-size:15px;font-weight:800;color:#059669;margin-bottom:6px">Identity Verified</div>
          <p style="font-size:13px;color:#065F46;margin:0 0 14px">You are fully verified and can opt into Ghost Match.</p>
          <button class="fpr-ghost-btn fpr-ghost-btn-primary" data-action="nav" data-view="profile">Set Up Matching Profile ${icon('arrowRight')}</button>
        </div>` : ''}

      <div style="margin-top:16px;font-size:11.5px;color:#9AA3AF;line-height:1.6">
        Ghost Match verifies your identity to protect all members. Your ID is reviewed by a human admin within 24 hours and is not stored after verification. Your zip code is encrypted and is never displayed to other members in full.
      </div>
    </div>`;
  }

  function renderProfile() {
    const p = Object.keys(_profile).length > 1 ? _profile : DEMO.profile;
    const skills = ['never_shot','new_shooter','intermediate','experienced','advanced','competition','instructor'];
    const discs  = ['handgun','precision_rifle','3gun','ccw_qual','home_defense_training','hunting_prep','historical','collecting','competition','long_range'];
    const discLabels = { handgun:'Handgun', precision_rifle:'Precision Rifle', '3gun':'3-Gun', ccw_qual:'CCW Qual', home_defense_training:'Home Defense', hunting_prep:'Hunting Prep', historical:'Historical', collecting:'Collecting', competition:'Competition', long_range:'Long Range' };
    const avails = ['weekday_mornings','weekday_afternoons','weekday_evenings','saturday_am','saturday_pm','sunday_am','sunday_pm'];

    return `<div style="max-width:640px;margin:0 auto">
      <h2 style="font-size:18px;font-weight:800;color:#0F1923;margin:0 0 4px">Matching Profile</h2>
      <p style="font-size:12.5px;color:#9AA3AF;margin:0 0 18px">This profile is shown to your matched group. Display first name and last initial only.</p>

      <div style="background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 4px rgba(0,0,0,.07);margin-bottom:14px">
        <div class="fpr-ghost-label">Display Name <span>(First name + last initial only, e.g. "John D.")</span></div>
        <input class="fpr-ghost-input" id="p-name" value="${p.display_name||''}" maxlength="30" placeholder="John D.">

        <div class="fpr-ghost-label" style="margin-top:14px">Skill Level</div>
        <div class="fpr-ghost-option-grid">
          ${skills.map(s => `<div class="fpr-ghost-option${(p.skill_level||'intermediate')===s?' selected':''}" data-select="skill_level" data-value="${s}">
            <span class="fpr-ghost-option-icon">${icon('target')}</span>
            <span class="fpr-ghost-option-label">${skillLabel(s)}</span>
          </div>`).join('')}
        </div>

        <div class="fpr-ghost-label" style="margin-top:14px">Shooting Disciplines <span>(select all that apply)</span></div>
        <div class="fpr-ghost-option-grid">
          ${discs.map(d => {
            const checked = (p.disciplines||[]).includes(d);
            return `<div class="fpr-ghost-option${checked?' selected':''}" data-select-multi="disciplines" data-value="${d}">
              <span class="fpr-ghost-option-label">${discLabels[d]||d}</span>
            </div>`;
          }).join('')}
        </div>

        <div class="fpr-ghost-label" style="margin-top:14px">Availability</div>
        <div class="fpr-ghost-avail-grid">
          ${avails.map(a => `<span class="fpr-ghost-avail-chip${(p.availability||[]).includes(a)?' selected':''}" data-select-multi="availability" data-value="${a}">${availLabel(a)}</span>`).join('')}
        </div>

        <div class="fpr-ghost-profile-grid" style="margin-top:14px">
          <div>
            <div class="fpr-ghost-label">Home State</div>
            <input class="fpr-ghost-input" id="p-state" value="${p.home_state||'TX'}" maxlength="2" placeholder="TX">
          </div>
          <div>
            <div class="fpr-ghost-label">Your Zip Code</div>
            <input class="fpr-ghost-input" id="p-zip" maxlength="5" placeholder="78701" type="tel">
          </div>
        </div>

        <div class="fpr-ghost-label" style="margin-top:14px">Short Bio <span>(optional — shown to verified matches)</span></div>
        <textarea class="fpr-ghost-textarea" id="p-bio" placeholder="A sentence or two about your shooting background and what you're looking for in a range partner...">${p.bio||''}</textarea>
      </div>

      ${_verification.status === 'fully_verified' ? `
        <div style="background:#fff;border-radius:12px;padding:16px 18px;box-shadow:0 1px 4px rgba(0,0,0,.07);margin-bottom:14px">
          <div style="display:flex;align-items:center;justify-content:space-between">
            <div>
              <div style="font-size:13px;font-weight:800;color:#0F1923">Ghost Match Opt-In</div>
              <div style="font-size:12px;color:#9AA3AF;margin-top:2px">Allow the system to include you in match proposals</div>
            </div>
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="p-optin" ${p.is_opted_in?'checked':''} style="width:18px;height:18px;accent-color:#0D9488">
              <span style="font-size:13px;font-weight:700;color:${p.is_opted_in?'#059669':'#9AA3AF'}">${p.is_opted_in?'Active':'Inactive'}</span>
            </label>
          </div>
        </div>` : `
        <div style="background:#FFF7ED;border:1px solid rgba(234,88,12,.25);border-radius:10px;padding:12px 16px;margin-bottom:14px;font-size:12.5px;color:#92400E">
          Complete identity verification to activate Ghost Match opt-in.
          <button class="fpr-ghost-btn fpr-ghost-btn-secondary" data-action="nav" data-view="verify" style="margin-top:8px;display:block">Complete Verification ${icon('arrowRight')}</button>
        </div>`}

      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px">
        <button class="fpr-ghost-btn fpr-ghost-btn-primary" style="flex:1" data-action="save-profile">Save Profile</button>
        ${_verification.status==='fully_verified' && _profile.is_opted_in ? `<button class="fpr-ghost-btn fpr-ghost-btn-primary" style="flex:1" data-action="find-matches">${icon('search')} Find My Matches ${icon('arrowRight')}</button>` : ''}
      </div>
    </div>`;
  }

  function renderMatches() {
    const group = _activeGroup || _matches[0] || (_demoMode ? DEMO.matchGroup : null);
    if (_verification.status !== 'fully_verified') {
      return `<div class="fpr-ghost-empty-card">${icon('lock', 'fpr-ghost-svg-icon fpr-ghost-svg-icon-lg')}<h3>Verification Required</h3><p>Complete identity verification before viewing Ghost Match proposals.</p><button class="fpr-ghost-btn fpr-ghost-btn-primary" data-action="nav" data-view="verify">Complete Verification</button></div>`;
    }
    if (!group) {
      return `<div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
          <h2 style="font-size:18px;font-weight:800;color:#0F1923;margin:0">Your Match Proposals</h2>
          <button class="fpr-ghost-btn fpr-ghost-btn-primary" data-action="find-matches" style="font-size:12px;padding:7px 14px">${icon('search')} Find New Matches</button>
        </div>
        <div class="fpr-ghost-empty-card">${icon('users', 'fpr-ghost-svg-icon fpr-ghost-svg-icon-lg')}<h3>No matches found yet</h3><p>${_matchEmptyMessage}</p></div>
      </div>`;
    }
    return `<div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <h2 style="font-size:18px;font-weight:800;color:#0F1923;margin:0">Your Match Proposals</h2>
        <button class="fpr-ghost-btn fpr-ghost-btn-primary" data-action="find-matches" style="font-size:12px;padding:7px 14px">${icon('search')} Find New Matches</button>
      </div>

      <div class="fpr-ghost-match-card">
        <div class="fpr-ghost-match-header">
          <span class="fpr-ghost-match-title">Ghost Match — ${group.match_count || group.members.length} Members Nearby</span>
          <span class="fpr-ghost-match-count">${group.common_disciplines?.map(discLabel).join(' · ') || 'Mixed disciplines'}</span>
        </div>

        <div class="fpr-ghost-member-list">
          ${(group.members||[]).map(m => `
            <div class="fpr-ghost-member-row">
              <div class="fpr-ghost-member-avatar">${m.display_name.charAt(0)}</div>
              <div style="flex:1">
                <div class="fpr-ghost-member-name">${m.display_name}</div>
                <div class="fpr-ghost-member-skill">${skillLabel(m.skill_level)}</div>
                <div class="fpr-ghost-member-tags">
                  ${(m.disciplines||[]).slice(0,3).map(d=>`<span class="fpr-ghost-member-tag">${discLabel(d)}</span>`).join('')}
                </div>
              </div>
              <div class="fpr-ghost-member-distance">${m.approx_distance}</div>
            </div>`).join('')}
        </div>

        ${group.narrative ? `
          <div class="fpr-ghost-why-box">
            <div class="fpr-ghost-why-title">Why You'll Get Along</div>
            <div class="fpr-ghost-why-headline">${group.narrative.headline || ''}</div>
            <div class="fpr-ghost-why-body">${group.narrative.body || ''}</div>
            ${group.narrative.range_day_suggestion ? `<div class="fpr-ghost-why-range">${icon('light')} ${group.narrative.range_day_suggestion}</div>` : ''}
          </div>` : ''}

        <div class="fpr-ghost-match-actions">
          <button class="fpr-ghost-btn fpr-ghost-btn-primary" data-action="accept-match">${icon('check')} Accept Match</button>
          <button class="fpr-ghost-btn fpr-ghost-btn-secondary" data-action="find-matches">Find Different Match</button>
          <button class="fpr-ghost-btn fpr-ghost-btn-danger" data-action="decline-match" style="margin-left:auto">Decline</button>
        </div>
      </div>

      <div style="font-size:11.5px;color:#9AA3AF;text-align:center;padding:8px 0">
        Member locations are not revealed until all members accept and a meetup is proposed.
      </div>
    </div>`;
  }

  function renderMeetups() {
    const meetup = _activeMeetup || (_meetups.find(m => ['confirmed','proposed'].includes(m.status)) || (_demoMode ? DEMO.meetup : null));
    const history = _meetups.length ? _meetups.filter(m => !meetup || m.id !== meetup.id) : (_demoMode ? DEMO.history : []);

    return `<div>
      <h2 style="font-size:18px;font-weight:800;color:#0F1923;margin:0 0 16px">Meetups & Range Days</h2>

      ${meetup ? `
        <div class="fpr-ghost-meetup-card">
          <div class="fpr-ghost-meetup-header">
            <div>
              <div class="fpr-ghost-meetup-range">${icon('location')} ${meetup.range_name}</div>
              <div class="fpr-ghost-meetup-date">${icon('calendar')} ${meetup.proposed_date} · ${meetup.proposed_time || ''}</div>
            </div>
            <span class="fpr-ghost-meetup-status ${meetup.status}">${meetup.status.replace(/_/g,' ').toUpperCase()}</span>
          </div>
          <div class="fpr-ghost-attendee-chips">
            ${(meetup.attendees||[]).map(a => `<span class="fpr-ghost-attendee-chip ${a.rsvp==='no'?'rsvp-no':''}">${a.display_name} ${a.rsvp==='yes'?'Yes':a.rsvp==='no'?'No':'Pending'}</span>`).join('')}
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="fpr-ghost-btn fpr-ghost-btn-primary" data-action="nav" data-view="ammo">${icon('package')} Group Ammo Order</button>
            <button class="fpr-ghost-btn fpr-ghost-btn-secondary" data-action="nav" data-view="invite">${icon('friend')} Bring a Friend</button>
            <button class="fpr-ghost-btn fpr-ghost-btn-secondary" data-action="propose-meetup">${icon('location')} Propose New Meetup</button>
          </div>
          <div style="display:flex;justify-content:flex-end;margin-top:12px">
            <button onclick="FPRShare.open('Share Your Meetup')" style="display:inline-flex;align-items:center;gap:6px;background:#E5B657;color:#0F1923;border:none;border-radius:8px;padding:9px 16px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">
              ${icon('share')}
              Share Your Meetup
            </button>
          </div>
        </div>` : `
        <div style="background:#fff;border-radius:12px;padding:20px;margin-bottom:14px;box-shadow:0 1px 4px rgba(0,0,0,.07)">
          <h3 style="font-size:14px;font-weight:800;margin:0 0 10px">Propose a Meetup</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
            <div><div class="fpr-ghost-label">Public Range Name *</div><input class="fpr-ghost-input" id="m-range" placeholder="Texas Shooting Center"></div>
            <div><div class="fpr-ghost-label">Date *</div><input class="fpr-ghost-input" id="m-date" type="date"></div>
            <div><div class="fpr-ghost-label">Range Address *</div><input class="fpr-ghost-input" id="m-addr" placeholder="Public range address only"></div>
            <div><div class="fpr-ghost-label">Time</div><input class="fpr-ghost-input" id="m-time" placeholder="Saturday 10:00 AM"></div>
          </div>
          <div class="fpr-ghost-label">Notes</div>
          <textarea class="fpr-ghost-textarea" id="m-notes" placeholder="What are we working on? What to bring..."></textarea>
          <button class="fpr-ghost-btn fpr-ghost-btn-primary" data-action="submit-meetup" style="margin-top:12px;width:100%">Propose Meetup</button>
          <p style="font-size:11px;color:#9AA3AF;margin:8px 0 0">Public licensed ranges only. No private property or home range addresses.</p>
        </div>`}

      ${history.length ? `
        <h3 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#9AA3AF;margin:16px 0 10px">Past Range Days</h3>
        ${history.map(m => `
          <div class="fpr-ghost-meetup-card" style="border-left-color:#9AA3AF;opacity:.75">
            <div class="fpr-ghost-meetup-header">
              <div><div class="fpr-ghost-meetup-range">${m.range_name}</div><div class="fpr-ghost-meetup-date">${m.proposed_date}</div></div>
              <span class="fpr-ghost-meetup-status completed">COMPLETED</span>
            </div>
          </div>`).join('')}` : ''}
    </div>`;
  }

  function renderAmmoOrder() {
    const meetup = _activeMeetup || _meetups.find(m => ['confirmed','proposed'].includes(m.status));
    if (!_demoMode && !meetup) {
      return `<div class="fpr-ghost-empty-card">${icon('calendar', 'fpr-ghost-svg-icon fpr-ghost-svg-icon-lg')}<h3>No active meetup</h3><p>Confirm or propose a meetup before coordinating a group ammo order.</p><button class="fpr-ghost-btn fpr-ghost-btn-secondary" data-action="nav" data-view="meetups">${icon('arrowLeft')} Back to Meetups</button></div>`;
    }
    if (!_demoMode && (_ammoOrderLoading || !_ammoOrder)) {
      return `<div class="fpr-ghost-loading"><div class="fpr-ghost-spinner"></div><div class="fpr-ghost-loading-text">${_ammoOrderError || 'Preparing group ammo order...'}</div></div>`;
    }
    const order = _ammoOrder || DEMO.ammoOrder;
    const items = order.items || [];
    const totalRounds = items.reduce((s, i) => s + (i.quantity_rounds || 0), 0);

    return `<div>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
        <button class="fpr-ghost-btn fpr-ghost-btn-secondary" data-action="nav" data-view="meetups" style="font-size:12px;padding:6px 12px">${icon('arrowLeft')} Back to Meetup</button>
        <h2 style="font-size:17px;font-weight:800;color:#0F1923;margin:0">Group Ammo Order</h2>
      </div>

      <div class="fpr-ghost-ammo-panel" style="margin-bottom:14px">
        <div class="fpr-ghost-ammo-header">
          <div class="fpr-ghost-ammo-title">Group Ammo Coordination</div>
          <span class="fpr-ghost-pricing-badge">${MEMBER_PRICING_LABEL}</span>
        </div>
        <div class="fpr-ghost-pricing-rule-note">
          ${icon('lock')} All ammo items are priced at <strong>member pricing</strong>. Pricing details are available at checkout through your FPR dealer.
        </div>
        <div style="margin-top:14px">
          ${items.length ? items.map(item => `
            <div class="fpr-ghost-ammo-item">
              <span class="fpr-ghost-ammo-member">${item.display_name || 'Member'}</span>
              <span class="fpr-ghost-ammo-caliber">${item.caliber}${item.brand ? ` — ${item.brand}` : ''}</span>
              <span class="fpr-ghost-ammo-qty">${item.quantity_rounds} rds</span>
              <span class="fpr-ghost-ammo-pricing">${MEMBER_PRICING_LABEL}</span>
            </div>`).join('') : `<div class="fpr-ghost-ammo-empty">No ammo items added yet.</div>`}
          <div style="padding-top:10px;display:flex;justify-content:space-between;font-size:12.5px;font-weight:700;color:#0F1923">
            <span>Total Group Order</span>
            <span>${totalRounds.toLocaleString()} rounds · All at ${MEMBER_PRICING_LABEL}</span>
          </div>
        </div>
      </div>

      <div class="fpr-ghost-ammo-panel">
        <div class="fpr-ghost-ammo-title" style="margin-bottom:12px">Add Your Ammo</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:10px">
          <div><div class="fpr-ghost-label">Caliber *</div><input class="fpr-ghost-input" id="ammo-caliber" placeholder="9mm"></div>
          <div><div class="fpr-ghost-label">Brand</div><input class="fpr-ghost-input" id="ammo-brand" placeholder="Blazer Brass"></div>
          <div><div class="fpr-ghost-label">Quantity (rounds) *</div><input class="fpr-ghost-input" id="ammo-qty" type="number" placeholder="200" min="1"></div>
        </div>
        <button class="fpr-ghost-btn fpr-ghost-btn-primary" data-action="add-ammo" style="width:100%">Add to Group Order — Member Pricing</button>
        <p style="font-size:11px;color:#9AA3AF;margin:8px 0 0">Member pricing is applied to all group orders. Checkout through your FPR dealer.</p>
      </div>

      <button class="fpr-ghost-btn fpr-ghost-btn-primary fpr-ghost-btn-lg" data-action="submit-ammo" style="margin-top:14px">Submit Group Order</button>
    </div>`;
  }

  function renderInvite() {
    const sentInvites = _invitesSent.length ? _invitesSent : DEMO.invites;
    return `<div>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
        <button class="fpr-ghost-btn fpr-ghost-btn-secondary" data-action="nav" data-view="meetups" style="font-size:12px;padding:6px 12px">${icon('arrowLeft')} Back</button>
        <h2 style="font-size:17px;font-weight:800;color:#0F1923;margin:0">Bring a Friend</h2>
      </div>

      <div class="fpr-ghost-invite-panel" style="margin-bottom:14px">
        <div class="fpr-ghost-invite-title">Invite a Non-Member</div>
        <p class="fpr-ghost-invite-sub">Invite a friend who doesn't have an FPRMembers account. They'll get range day details and an introduction to member pricing.</p>
        <div class="fpr-ghost-invite-grid">
          <div><div class="fpr-ghost-label">Friend's Name</div><input class="fpr-ghost-input" id="inv-name" placeholder="Chris Wilson"></div>
          <div><div class="fpr-ghost-label">Friend's Email *</div><input class="fpr-ghost-input" id="inv-email" type="email" placeholder="chris@email.com"></div>
        </div>
        <div><div class="fpr-ghost-label">Personal Note <span>(optional — included in invite email)</span></div>
          <textarea class="fpr-ghost-textarea" id="inv-note" placeholder="Hey Chris, we'd love to have you join us at the range. Great opportunity to see what FPRMembers is about..."></textarea>
        </div>
        <button class="fpr-ghost-btn fpr-ghost-btn-primary" data-action="send-invite" style="margin-top:12px;width:100%">${icon('mail')} Send Invitation</button>
        <p style="font-size:11px;color:#9AA3AF;margin:8px 0 0">
          Your friend will receive the range day details. After the event, they'll get a follow-up introduction to FPRMembers.com and member pricing.
        </p>
      </div>

      ${sentInvites.length ? `
        <h3 style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#9AA3AF;margin:0 0 10px">Invitations Sent</h3>
        ${sentInvites.map(inv => `
          <div class="fpr-ghost-invite-sent">
            <strong>${inv.friend_name || inv.friend_email}</strong>
            <span>${inv.friend_email} · Status: ${inv.status.replace(/_/g,' ')}</span>
          </div>`).join('')}` : ''}
    </div>`;
  }

  // ─── MAIN RENDER ────────────────────────────────────────────────────────────
  function render() {
    const v = _verification;
    const chipText  = verifyChipText(v.status);
    const chipClass = v.status === 'fully_verified' ? 'fully_verified' : 'unverified';

    const navItems = [
      { id: 'matches',  label: `${icon('target')} Matches` },
      { id: 'meetups',  label: `${icon('location')} Meetups` },
      { id: 'ammo',     label: `${icon('package')} Ammo` },
      { id: 'invite',   label: `${icon('friend')} Bring a Friend` },
      { id: 'profile',  label: 'Profile' },
    ];

    const content = {
      welcome: renderWelcome,
      verify:  renderVerify,
      profile: renderProfile,
      matches: renderMatches,
      meetups: renderMeetups,
      ammo:    renderAmmoOrder,
      invite:  renderInvite,
    }[_view] || renderWelcome;

    _el.innerHTML = `<div class="fpr-ghost">
      <div class="fpr-ghost-topbar">
        <div class="fpr-ghost-brand">FPRMembers</div>
        <span class="fpr-ghost-topbar-title">Ghost Match™</span>
        ${_accessChecked && _isPaidMember && _view !== 'welcome' ? `
          <nav class="fpr-ghost-topbar-nav">
            ${navItems.map(n => `<button class="fpr-ghost-nav-btn${_view===n.id?' active':''}" data-action="nav" data-view="${n.id}">${n.label}</button>`).join('')}
          </nav>` : ''}
        <span class="fpr-ghost-verify-chip ${chipClass}">${chipText}</span>
      </div>
      <div class="fpr-ghost-body" id="ghost-body">${_accessChecked && !_isPaidMember ? renderLocked() : content()}</div>
    </div>`;

    attachHandlers();
  }

  // ─── HANDLERS ───────────────────────────────────────────────────────────────
  function attachHandlers() {
    const body = _el.querySelector('#ghost-body');
    if (!body) return;
    body.addEventListener('click', handleClick);

    // Option/multi-select
    body.addEventListener('click', e => {
      const opt = e.target.closest('[data-select]');
      if (opt) { _profile[opt.dataset.select] = opt.dataset.value; render(); }
      const mopt = e.target.closest('[data-select-multi]');
      if (mopt) {
        const key = mopt.dataset.selectMulti, val = mopt.dataset.value;
        const arr = Array.isArray(_profile[key]) ? [..._profile[key]] : [];
        const idx = arr.indexOf(val);
        if (idx >= 0) arr.splice(idx,1); else arr.push(val);
        _profile[key] = arr;
        render();
      }
      const chip = e.target.closest('.fpr-ghost-avail-chip[data-select-multi]');
      if (chip) {
        const key = chip.dataset.selectMulti, val = chip.dataset.value;
        const arr = Array.isArray(_profile[key]) ? [..._profile[key]] : [];
        const idx = arr.indexOf(val);
        if (idx >= 0) arr.splice(idx,1); else arr.push(val);
        _profile[key] = arr;
        render();
      }
    });
  }

  function handleClick(e) {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;

    if (action === 'nav') {
      _view = btn.dataset.view;
      if (_view === 'ammo') {
        render();
        ensureAmmoOrder();
        return;
      }
      render();
      return;
    }

    switch (action) {
      case 'verify-phone':   handleVerifyPhone(); break;
      case 'submit-id':      handleSubmitId(); break;
      case 'find-matches':   handleFindMatches(); break;
      case 'accept-match':   handleAcceptMatch(); break;
      case 'decline-match':  handleDeclineMatch(); break;
      case 'save-profile':   handleSaveProfile(); break;
      case 'submit-meetup':  handleProposeMeetup(); break;
      case 'add-ammo':       handleAddAmmo(); break;
      case 'submit-ammo':    handleSubmitAmmoOrder(); break;
      case 'send-invite':    handleSendInvite(); break;
    }
  }

  async function handleVerifyPhone() {
    if (_demoMode) {
      _verification = { ..._verification, status: 'phone_verified' }; render(); return;
    }
    const phone = document.getElementById('phone-input')?.value;
    if (!phone) { alert('Enter your mobile number'); return; }
    try {
      await apiPost('/api/ghost/verify/phone', { member_id: _memberId, phone_last4: phone.slice(-4) });
      _verification.status = 'phone_verified'; render();
    } catch (err) { alert(err.message); }
  }

  async function handleSubmitId() {
    if (_demoMode) {
      _verification = { ..._verification, status: 'id_submitted' }; render(); return;
    }
    const fileInput = document.getElementById('id-file-input');
    const idType    = document.getElementById('id-type-select')?.value;
    if (!fileInput?.files[0]) { alert('Select an ID photo to upload'); return; }
    const formData = new FormData();
    formData.append('id_photo', fileInput.files[0]);
    formData.append('member_id', _memberId);
    formData.append('id_type', idType || 'drivers_license');
    try {
      const res = await fetch(`${_api}/api/ghost/verify/id-upload`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error((await res.json()).error);
      _verification.status = 'id_submitted'; render();
    } catch (err) { alert(err.message); }
  }

  async function handleFindMatches() {
    const body = _el.querySelector('#ghost-body');
    if (body) body.innerHTML = `<div class="fpr-ghost-loading"><div class="fpr-ghost-spinner"></div><div class="fpr-ghost-loading-text">Finding your matches…</div><div class="fpr-ghost-loading-step">Scanning nearby verified members · Scoring compatibility · Generating group narrative</div></div>`;

    if (_demoMode) {
      await delay(1500);
      _activeGroup = DEMO.matchGroup;
      _view = 'matches';
      render();
      return;
    }

    try {
      const d = await apiPost(`/api/ghost/member/${_memberId}/find-matches`, {});
      _matchSearchComplete = true;
      if (Array.isArray(d.matches) && d.matches.length === 0) {
        _activeGroup = null;
        _matches = [];
        _matchEmptyMessage = d.message || 'No matches found yet. Check back soon!';
      } else {
        _activeGroup = d;
        _matches = [d];
      }
      _view = 'matches';
      render();
    } catch (err) {
      if (body) body.innerHTML = `<div class="fpr-ghost-loading" style="color:#DC2626">${icon('warning')} ${err.message}<br><button class="fpr-ghost-btn fpr-ghost-btn-secondary" data-action="nav" data-view="profile" style="margin-top:12px">${icon('arrowLeft')} Back</button></div>`;
    }
  }

  function handleAcceptMatch() {
    if (_demoMode) {
      _activeMeetup = DEMO.meetup;
      _view = 'meetups';
      render();
      return;
    }
    if (!_activeGroup?.group_id) return;
    apiPost(`/api/ghost/match/${_activeGroup.group_id}/respond`, { member_id: _memberId, response: 'accepted' })
      .then(() => { _view = 'meetups'; render(); })
      .catch(err => alert(err.message));
  }

  function handleDeclineMatch() {
    if (_demoMode) { _activeGroup = null; _view = 'welcome'; render(); return; }
    if (!_activeGroup?.group_id) return;
    apiPost(`/api/ghost/match/${_activeGroup.group_id}/respond`, { member_id: _memberId, response: 'declined' })
      .then(() => { _activeGroup = null; _view = 'welcome'; render(); })
      .catch(err => alert(err.message));
  }

  async function handleSaveProfile() {
    const g = id => document.getElementById(id);
    _profile.display_name = g('p-name')?.value || _profile.display_name;
    _profile.home_state   = g('p-state')?.value?.toUpperCase() || _profile.home_state;
    _profile.bio          = g('p-bio')?.value || _profile.bio;
    const optin = g('p-optin')?.checked;
    if (optin !== undefined) _profile.is_opted_in = optin;

    if (_demoMode) { alert('Profile saved (demo mode).'); return; }

    try {
      await apiPost('/api/ghost/profile', { member_id: _memberId, ..._profile });
      const zip = g('p-zip')?.value;
      if (zip) await apiPost(`/api/ghost/member/${_memberId}/location`, { zip_code: zip, state: _profile.home_state || 'TX' });
      if (_profile.is_opted_in) {
        await apiPost(`/api/ghost/member/${_memberId}/opt-in`, { accepted_terms: true });
      }
      alert('Profile saved.');
    } catch (err) { alert(err.message); }
  }

  async function handleProposeMeetup() {
    const g = id => document.getElementById(id);
    const body = { range_name: g('m-range')?.value, range_address: g('m-addr')?.value, proposed_date: g('m-date')?.value, proposed_time: g('m-time')?.value, notes: g('m-notes')?.value, member_id: _memberId };
    if (!body.range_name || !body.range_address || !body.proposed_date) { alert('Range name, address, and date are required.'); return; }

    if (_demoMode) { _activeMeetup = { ...DEMO.meetup, range_name: body.range_name || DEMO.meetup.range_name, proposed_date: body.proposed_date || DEMO.meetup.proposed_date }; window.fprAwardTicket('meetup_proposed', {}); render(); return; }

    const groupId = _activeGroup?.group_id;
    if (!groupId) { alert('No accepted match group found.'); return; }
    try {
      const d = await apiPost(`/api/ghost/match/${groupId}/propose-meetup`, body);
      _activeMeetup = d.meetup; window.fprAwardTicket('meetup_proposed', {}); render();
    } catch (err) { alert(err.message); }
  }

  async function handleAddAmmo() {
    const g = id => document.getElementById(id);
    const item = { caliber: g('ammo-caliber')?.value, brand: g('ammo-brand')?.value, quantity_rounds: parseInt(g('ammo-qty')?.value), pricing_tier: 'member_pricing', display_name: (_profile.display_name || DEMO.profile.display_name), member_id: _memberId };
    if (!item.caliber || !item.quantity_rounds) { alert('Caliber and quantity are required.'); return; }

    if (_demoMode) {
      const order = _ammoOrder || { ...DEMO.ammoOrder, items: [...DEMO.ammoOrder.items] };
      order.items.push(item);
      _ammoOrder = order;
      render();
      return;
    }

    if (!_ammoOrder?.id) await ensureAmmoOrder();
    const orderId = _ammoOrder?.id;
    if (!orderId) { alert(_ammoOrderError || 'Unable to prepare the group order.'); return; }
    apiPost(`/api/ghost/ammo-order/${orderId}/item`, item)
      .then(d => {
        _ammoOrder.items = [...(_ammoOrder.items || []), d.item || item];
        render();
      })
      .catch(err => alert(err.message));
  }

  function handleSubmitAmmoOrder() {
    if (_demoMode) { alert('Group ammo order submitted at member pricing. Your FPR dealer will contact the group to coordinate fulfillment.'); return; }
    const orderId = _ammoOrder?.id;
    if (!orderId) return;
    apiPost(`/api/ghost/ammo-order/${orderId}/submit`, { member_id: _memberId })
      .then(() => alert('Order submitted at member pricing.'))
      .catch(err => alert(err.message));
  }

  async function handleSendInvite() {
    const g = id => document.getElementById(id);
    const body = { member_id: _memberId, friend_name: g('inv-name')?.value, friend_email: g('inv-email')?.value, personal_note: g('inv-note')?.value, meetup_id: _activeMeetup?.id };
    if (!body.friend_email) { alert('Friend email is required.'); return; }

    if (_demoMode) {
      _invitesSent.push({ friend_name: body.friend_name, friend_email: body.friend_email, status: 'sent', sent_at: new Date().toISOString().slice(0,10) });
      alert(`Invite sent to ${body.friend_email}!\n\nIn production, they'll receive an email with the range day details and an introduction to FPRMembers.com member pricing.\nAfter the event, they'll get a follow-up invite to join.`);
      render();
      return;
    }

    try {
      await apiPost('/api/ghost/invite-friend', body);
      _invitesSent.push(body);
      render();
    } catch (err) { alert(err.message); }
  }

  // ─── API HELPERS ─────────────────────────────────────────────────────────────
  async function apiPost(path, body) {
    const res = await fetch(`${_api}${path}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error((await res.json()).error || res.statusText);
    return res.json();
  }
  async function apiGet(path) {
    const res = await fetch(`${_api}${path}`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data.error || res.statusText);
      err.status = res.status;
      throw err;
    }
    return data;
  }
  function getActiveMeetup() {
    if (_activeMeetup?.id) return _activeMeetup;
    const meetup = _meetups.find(m => ['confirmed','proposed'].includes(m.status)) || null;
    if (meetup) _activeMeetup = meetup;
    return meetup;
  }
  async function ensureAmmoOrder() {
    if (_demoMode || _ammoOrder || _ammoOrderLoading) return;
    const meetup = getActiveMeetup();
    if (!meetup?.id) return;
    _ammoOrderLoading = true;
    _ammoOrderError = '';
    render();
    try {
      let data;
      try {
        data = await apiGet(`/api/ghost/meetup/${meetup.id}/ammo-order`);
      } catch (err) {
        if (err.status !== 404) throw err;
        data = await apiPost(`/api/ghost/meetup/${meetup.id}/ammo-order`, { member_id: _memberId });
      }
      _ammoOrder = { ...(data.order || {}), items: data.items || data.order?.items || [] };
    } catch (err) {
      _ammoOrderError = err.message || 'Unable to prepare group ammo order.';
    } finally {
      _ammoOrderLoading = false;
      render();
    }
  }
  function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

  async function loadData() {
    if (_demoMode) return;
    try {
      const [ver, prof, matches, meets] = await Promise.all([
        fetch(`${_api}/api/ghost/member/${_memberId}/verification`).then(r=>r.json()).catch(()=>null),
        fetch(`${_api}/api/ghost/member/${_memberId}/profile`).then(r=>r.json()).catch(()=>null),
        fetch(`${_api}/api/ghost/member/${_memberId}/matches`).then(r=>r.json()).catch(()=>({ groups:[] })),
        fetch(`${_api}/api/ghost/member/${_memberId}/meetups`).then(r=>r.json()).catch(()=>({ meetups:[] })),
      ]);
      if (ver?.verification) _verification = ver.verification;
      if (prof?.profile)     _profile       = prof.profile;
      _matches = matches?.groups || [];
      _activeGroup = _matches[0] || null;
      _matchSearchComplete = true;
      _meetups = meets?.meetups || [];
      _activeMeetup = _meetups.find(m => ['confirmed','proposed'].includes(m.status)) || null;
    } catch { /* demo fallback */ }
  }

  // ─── PUBLIC INIT ─────────────────────────────────────────────────────────────
  async function init(el) {
    _el          = el;
    _api         = (el.dataset.apiUrl || '').replace(/\/$/, '').replace(/\/api$/, '');
    _memberId    = el.dataset.memberId   || 'preview-member';
    _memberName  = el.dataset.memberName || 'FPR Member';
    _demoMode    = !_api;

    if (_demoMode) {
      _verification = DEMO.verification;
      _profile      = DEMO.profile;
      _accessChecked = true;
      _isPaidMember = true;
    } else {
      await loadMemberstackAccess();
      if (!_isPaidMember) { render(); return; }
      await loadData();
    }

    render();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.fpr-ghost-mount');
  if (el) FPRGhostMatch.init(el);
});
