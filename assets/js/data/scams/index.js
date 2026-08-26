/** Alle Scam-Storys in Anzeigereihenfolge. */

import paketSms from './01-paket-sms.js';
import halloMama from './02-hallo-mama.js';
import fakeshop from './03-fakeshop.js';
import gamingSkins from './04-gaming-skins.js';
import bankSupport from './05-bank-support.js';
import loveScam from './06-love-scam.js';
import gewinnspiel from './07-gewinnspiel.js';
import krypto from './08-krypto.js';

const stories = [
  paketSms,
  halloMama,
  fakeshop,
  gamingSkins,
  bankSupport,
  loveScam,
  gewinnspiel,
  krypto,
];

export default stories;

export function storyById(id) {
  return stories.find((s) => s.id === id) || null;
}
