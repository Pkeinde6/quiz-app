// ============================================
// Tracker d'appareils - Supabase REST API
// ============================================

// ⚠️ Configuration Supabase
const SUPABASE_URL = 'https://kgkenqocfulbftfjvazt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtna2VucW9jZnVsYmZ0Zmp2YXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwNjE3NjMsImV4cCI6MjA4NzYzNzc2M30.RcwQ4cyO1-wOUIizwMktdDYhekwyUqSsFBctlzffOCE';

function isConfigured() {
  return SUPABASE_URL.startsWith('https://');
}

function getDeviceId() {
  let id = localStorage.getItem('quiz-device-id');
  if (!id) {
    id = crypto.randomUUID
      ? crypto.randomUUID()
      : Date.now().toString(36) + Math.random().toString(36).substring(2);
    localStorage.setItem('quiz-device-id', id);
  }
  return id;
}

function detectDeviceType() {
  const ua = navigator.userAgent;
  if (/iPad|Tablet/i.test(ua)) return 'Tablette';
  if (/Mobile|Android|iPhone/i.test(ua)) return 'Mobile';
  return 'PC';
}

function detectOS() {
  const ua = navigator.userAgent;
  if (/Windows/i.test(ua)) return 'Windows';
  if (/Mac/i.test(ua)) return 'macOS';
  if (/Linux/i.test(ua)) return 'Linux';
  if (/Android/i.test(ua)) return 'Android';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
  return 'Inconnu';
}

function detectBrowser() {
  const ua = navigator.userAgent;
  if (/Edg/i.test(ua)) return 'Edge';
  if (/Chrome/i.test(ua)) return 'Chrome';
  if (/Firefox/i.test(ua)) return 'Firefox';
  if (/Safari/i.test(ua)) return 'Safari';
  if (/Opera|OPR/i.test(ua)) return 'Opera';
  return 'Autre';
}

function headers(extra = {}) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

/**
 * Enregistre l'appareil dans Supabase (ou met à jour last_seen)
 */
export async function registerDevice() {
  if (!isConfigured()) return;

  const deviceId = getDeviceId();
  const info = {
    device_id: deviceId,
    device_type: detectDeviceType(),
    os: detectOS(),
    browser: detectBrowser(),
    screen_size: `${screen.width}x${screen.height}`,
    language: navigator.language,
    last_seen: new Date().toISOString(),
  };

  try {
    // Vérifie si l'appareil existe déjà
    const checkRes = await fetch(
      `${SUPABASE_URL}/rest/v1/devices?device_id=eq.${deviceId}&select=id`,
      { headers: headers() }
    );
    const existing = await checkRes.json();

    if (existing.length === 0) {
      // Nouvel appareil → INSERT
      await fetch(`${SUPABASE_URL}/rest/v1/devices`, {
        method: 'POST',
        headers: headers({ Prefer: 'return=minimal' }),
        body: JSON.stringify({ ...info, first_seen: info.last_seen }),
      });
    } else {
      // Appareil existant → UPDATE last_seen
      await fetch(
        `${SUPABASE_URL}/rest/v1/devices?device_id=eq.${deviceId}`,
        {
          method: 'PATCH',
          headers: headers({ Prefer: 'return=minimal' }),
          body: JSON.stringify({
            last_seen: info.last_seen,
            device_type: info.device_type,
            os: info.os,
            browser: info.browser,
          }),
        }
      );
    }
  } catch (e) {
    console.warn('Tracker:', e.message);
  }
}

/**
 * Retourne le nombre total d'appareils différents
 */
export async function getDeviceCount() {
  if (!isConfigured()) return 0;

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/devices?select=id`,
      { headers: headers({ Prefer: 'count=exact' }) }
    );
    const range = res.headers.get('content-range');
    if (range) {
      const total = range.split('/')[1];
      return parseInt(total) || 0;
    }
    const data = await res.json();
    return data.length;
  } catch {
    return 0;
  }
}

/**
 * Retourne la liste complète des appareils
 */
export async function getDevices() {
  if (!isConfigured()) return [];

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/devices?select=*&order=last_seen.desc`,
      { headers: headers() }
    );
    return await res.json();
  } catch {
    return [];
  }
}
