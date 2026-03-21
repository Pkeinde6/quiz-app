// ============================================
// Tracker d'appareils - Supabase Realtime
// ============================================

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kgkenqocfulbftfjvazt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtna2VucW9jZnVsYmZ0Zmp2YXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwNjE3NjMsImV4cCI6MjA4NzYzNzc2M30.RcwQ4cyO1-wOUIizwMktdDYhekwyUqSsFBctlzffOCE';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── State ──
let channel = null;
const onlineSince = new Date().toISOString();

// ── Helpers ──

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

function getDeviceInfo() {
  return {
    device_id: getDeviceId(),
    device_type: detectDeviceType(),
    os: detectOS(),
    browser: detectBrowser(),
    screen_size: `${screen.width}x${screen.height}`,
    language: navigator.language,
  };
}

// ── Database registration (historical) ──

export async function registerDevice() {
  const info = getDeviceInfo();
  const now = new Date().toISOString();

  try {
    const { data } = await supabase
      .from('devices')
      .select('id')
      .eq('device_id', info.device_id);

    if (data && data.length === 0) {
      await supabase.from('devices').insert({
        ...info,
        first_seen: now,
        last_seen: now,
      });
    } else {
      await supabase
        .from('devices')
        .update({ last_seen: now, device_type: info.device_type, os: info.os, browser: info.browser })
        .eq('device_id', info.device_id);
    }
  } catch (e) {
    console.warn('Tracker:', e.message);
  }
}

// ── Realtime Presence ──

/**
 * Rejoint le canal Presence. Appelle onSync(devices[]) a chaque changement.
 */
export function startPresence(onSync) {
  const info = getDeviceInfo();

  channel = supabase.channel('online-users', {
    config: { presence: { key: info.device_id } },
  });

  channel
    .on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState();
      const devices = [];
      for (const presences of Object.values(state)) {
        if (presences.length > 0) devices.push(presences[0]);
      }
      onSync(devices);
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({
          ...info,
          online_since: onlineSince,
          current_page: 'home',
        });
      }
    });
}

/**
 * Met a jour la page courante dans la Presence.
 */
export function updatePresencePage(page) {
  if (!channel) return;
  channel.track({
    ...getDeviceInfo(),
    online_since: onlineSince,
    current_page: page,
  });
}

/**
 * Se deconnecte du canal Presence.
 */
export function stopPresence() {
  if (channel) {
    channel.unsubscribe();
    channel = null;
  }
}
