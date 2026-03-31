<!-- /assets/js/cookie-consent.js -->
/// assets/js/cookie-consent.js
/**
 * Simple cookie consent + preferences UI.
 * Before loading optional scripts, check:
 *   const consent = window.SealubbersConsent.getConsent();
 *   const prefs = window.SealubbersConsent.getPrefs();
 * Load analytics or ads tags only if consent === "accepted" and the relevant
 * prefs flag (analytics or ads) is true.
 */
(function(){
  var CONSENT_KEY = 'sealubbers_cookie_consent';
  var PREF_KEY = 'sealubbers_cookie_prefs';
  var defaultPrefs = { analytics: false, ads: false, functional: true };
  var doc = document;

  function getConsent(){
    return localStorage.getItem(CONSENT_KEY) || 'unset';
  }

  function setConsent(value){
    localStorage.setItem(CONSENT_KEY, value);
  }

  function getPrefs(){
    try {
      var stored = JSON.parse(localStorage.getItem(PREF_KEY) || '{}');
      return Object.assign({}, defaultPrefs, stored);
    } catch (err) {
      return Object.assign({}, defaultPrefs);
    }
  }

  function setPrefs(prefs){
    localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
  }

  function applyStyles(){
    if (doc.getElementById('sl-consent-style')) { return; }
    var style = doc.createElement('style');
    style.id = 'sl-consent-style';
    style.textContent = ''+
      '.sl-consent-banner{position:fixed;bottom:0;left:0;right:0;padding:1rem 1.25rem;background:#0f172a;color:#fff;box-shadow:0 -5px 20px rgba(15,23,42,0.2);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;z-index:2147483646;}'+
      '.sl-consent-banner p{flex:1 1 220px;margin:0;font-size:0.95rem;line-height:1.4;}'+
      '.sl-consent-banner a{color:#bbf7d0;text-decoration:underline;}'+
      '.sl-consent-actions{display:flex;gap:0.5rem;}'+
      '.sl-consent-banner button{border:none;border-radius:0.4rem;padding:0.55rem 1rem;font-weight:600;cursor:pointer;font-size:0.95rem;}'+
      '.sl-consent-accept{background:#22c55e;color:#0f172a;}'+
      '.sl-consent-manage{background:#fff;color:#0f172a;}'+
      '.sl-consent-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.5);display:flex;align-items:center;justify-content:center;z-index:2147483647;}'+
      '.sl-consent-modal{background:#fff;border-radius:0.75rem;max-width:420px;width:90%;padding:1.5rem;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;box-shadow:0 25px 60px rgba(15,23,42,0.25);}'+
      '.sl-consent-modal h2{margin-top:0;font-size:1.25rem;}'+
      '.sl-consent-toggle{display:flex;align-items:center;justify-content:space-between;margin:1rem 0;padding:0.75rem 0;border-bottom:1px solid #e2e8f0;}'+
      '.sl-consent-toggle label{font-weight:600;cursor:pointer;}'+
      '.sl-consent-modal button{margin-top:1rem;width:100%;padding:0.85rem;border:none;border-radius:0.5rem;font-weight:600;cursor:pointer;font-size:1rem;}'+
      '.sl-consent-save{background:#0f172a;color:#fff;}'+
      '.sl-consent-cancel{background:#e2e8f0;color:#0f172a;}';
    doc.head.appendChild(style);
  }

  function buildBanner(){
    var banner = doc.createElement('div');
    banner.className = 'sl-consent-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie consent banner');

    var msg = doc.createElement('p');
    msg.innerHTML = 'We use cookies to improve your experience and serve ads. See our <a href=\"/cookies.html\">Cookie Policy</a>.';

    var actions = doc.createElement('div');
    actions.className = 'sl-consent-actions';

    var accept = doc.createElement('button');
    accept.className = 'sl-consent-accept';
    accept.type = 'button';
    accept.textContent = 'Accept';

    var manage = doc.createElement('button');
    manage.className = 'sl-consent-manage';
    manage.type = 'button';
    manage.textContent = 'Manage';

    actions.appendChild(accept);
    actions.appendChild(manage);
    banner.appendChild(msg);
    banner.appendChild(actions);

    accept.addEventListener('click', function(){
      setConsent('accepted');
      setPrefs({ analytics: true, ads: true, functional: true });
      banner.remove();
    });

    manage.addEventListener('click', function(){
      openModal(banner);
    });

    return banner;
  }

  function openModal(banner){
    var overlay = doc.createElement('div');
    overlay.className = 'sl-consent-overlay';

    var modal = doc.createElement('div');
    modal.className = 'sl-consent-modal';

    var heading = doc.createElement('h2');
    heading.textContent = 'Manage cookie preferences';
    modal.appendChild(heading);

    var helper = doc.createElement('p');
    helper.style.marginTop = '0';
    helper.textContent = 'Enable or disable categories. Functional cookies keep the site running.';
    modal.appendChild(helper);

    var prefs = getPrefs();

    var toggles = [
      { key: 'analytics', label: 'Analytics', description: 'Helps us measure traffic (Cloudflare Web Analytics).' },
      { key: 'ads', label: 'Ads & Personalization', description: 'Allows Google AdSense to personalize ads.' },
      { key: 'functional', label: 'Functional', description: 'Saves your settings and improves core features.' }
    ];

    var controls = {};

    toggles.forEach(function(toggle){
      var row = doc.createElement('div');
      row.className = 'sl-consent-toggle';

      var label = doc.createElement('label');
      label.textContent = toggle.label;

      var input = doc.createElement('input');
      input.type = 'checkbox';
      input.checked = !!prefs[toggle.key];
      input.id = 'sl-consent-' + toggle.key;

      label.setAttribute('for', input.id);

      var desc = doc.createElement('small');
      desc.textContent = toggle.description;
      desc.style.display = 'block';
      desc.style.fontWeight = '400';
      desc.style.color = '#475569';
      desc.style.marginTop = '0.25rem';

      var textWrap = doc.createElement('div');
      textWrap.appendChild(label);
      textWrap.appendChild(desc);

      row.appendChild(textWrap);
      row.appendChild(input);

      controls[toggle.key] = input;
      modal.appendChild(row);
    });

    var save = doc.createElement('button');
    save.className = 'sl-consent-save';
    save.type = 'button';
    save.textContent = 'Save preferences';

    var cancel = doc.createElement('button');
    cancel.className = 'sl-consent-cancel';
    cancel.type = 'button';
    cancel.textContent = 'Cancel';

    save.addEventListener('click', function(){
      var nextPrefs = {
        analytics: controls.analytics.checked,
        ads: controls.ads.checked,
        functional: controls.functional.checked
      };
      setPrefs(nextPrefs);
      var anyEnabled = nextPrefs.analytics || nextPrefs.ads || nextPrefs.functional;
      setConsent(anyEnabled ? 'accepted' : 'rejected');
      overlay.remove();
      if (banner && banner.parentNode) {
        banner.remove();
      }
    });

    cancel.addEventListener('click', function(){
      overlay.remove();
    });

    modal.appendChild(save);
    modal.appendChild(cancel);
    overlay.appendChild(modal);
    doc.body.appendChild(overlay);
  }

  function init(){
    applyStyles();
    if (getConsent() === 'unset') {
      doc.body.appendChild(buildBanner());
    }
  }

  doc.addEventListener('DOMContentLoaded', init);

  window.SealubbersConsent = {
    getConsent: getConsent,
    getPrefs: getPrefs,
    openPreferences: function(){
      applyStyles();
      openModal(null);
    }
  };
})();
