/* Casa Carestiato — MISSION CONTROL v3.1
   Plancia di comando a schermata unica (no-scroll), stile HUD/mission-control.
   Hand-coded custom card, nessuna libreria di card esterna. */

const WEATHER_ENTITY = 'weather.forecast_casa_carestiato';
const ANNOUNCE_SCRIPT = 'script.announce_su_alexa';
const GATE_ENTITY = 'switch.cancellone';
const SUN_ENTITY = 'sun.sun';
const SUN_NEXT_SETTING = 'sensor.sun_next_setting';
const SUN_NEXT_RISING = 'sensor.sun_next_rising';

const WEATHER_ICONS = {
  'clear-night': 'mdi:weather-night', 'cloudy': 'mdi:weather-cloudy', 'exceptional': 'mdi:alert-circle-outline',
  'fog': 'mdi:weather-fog', 'hail': 'mdi:weather-hail', 'lightning': 'mdi:weather-lightning',
  'lightning-rainy': 'mdi:weather-lightning-rainy', 'partlycloudy': 'mdi:weather-partly-cloudy',
  'pouring': 'mdi:weather-pouring', 'rainy': 'mdi:weather-rainy', 'snowy': 'mdi:weather-snowy',
  'snowy-rainy': 'mdi:weather-snowy-rainy', 'sunny': 'mdi:weather-sunny', 'windy': 'mdi:weather-windy',
  'windy-variant': 'mdi:weather-windy-variant',
};

const C = {
  soggiorno: '#5ac8fa', cucina: '#34c759', camera: '#af52de', giardino: '#32ade6',
  pluriuso: '#5e5ce6', lavanderia: '#ff9f0a', gold: '#c9a869', danger: '#ff453a',
};

/* Luci con spegnimento automatico: entity, sensore potenza, timeout (s), preavviso (s prima dello spegnimento) */
const LIGHTS = [
  { id: 'vetrinetta', name: 'Vetrinetta', room: 'Soggiorno', icon: 'mdi:cabinet', entity: 'switch.shelly1pmg3_28372f38c4c4', power: 'sensor.shelly1pmg3_28372f38c4c4_potenza', timeout: 900, warn: 20, color: C.soggiorno },
  { id: 'cucina1', name: 'Cucina 1 (lunghi)', room: 'Cucina', icon: 'mdi:ceiling-light-multiple', entity: 'switch.shelly2pmg3_d0cf13dab110_output_1', power: 'sensor.shelly2pmg3_d0cf13dab110_output_1_potenza', timeout: 600, warn: 20, color: C.cucina },
  { id: 'cucina2', name: 'Cucina 2 (corti)', room: 'Cucina', icon: 'mdi:ceiling-light-multiple-outline', entity: 'switch.shelly2pmg3_d0cf13dab110_output_0', power: 'sensor.shelly2pmg3_d0cf13dab110_output_0_potenza', timeout: 600, warn: 20, color: C.cucina },
  { id: 'lavanderia', name: 'Lavanderia', room: 'Lavanderia', icon: 'mdi:ceiling-light', entity: 'switch.shelly1pmg3_dcda0cdf6e60', power: 'sensor.shelly1pmg3_dcda0cdf6e60_potenza', timeout: 300, warn: 20, color: C.lavanderia },
  { id: 'faro', name: 'Faro giardino', room: 'Giardino', icon: 'mdi:spotlight-beam', entity: 'switch.shelly1g3_48f6ee8a5b4c_faro', power: null, timeout: null, warn: null, color: C.giardino },
];

const COVERS = [
  { name: 'Tenda Soggiorno', icon: 'mdi:blinds-horizontal', entity: 'cover.tenda_soggiorno_tenda_soggiorno', power: 'sensor.tenda_soggiorno_tenda_soggiorno_potenza', color: C.soggiorno },
  { name: 'Tenda Pluriuso', icon: 'mdi:blinds-horizontal', entity: 'cover.shellyplus2pm_a0dd6c4e2fd8_tenda_pluriuso', power: 'sensor.shellyplus2pm_a0dd6c4e2fd8_tenda_pluriuso_potenza', color: C.pluriuso },
];

/* Tutti i sensori di potenza reali — totale consumi CORRETTO (include lavanderia e le due tende) */
const POWER_SENSORS = [
  { name: 'Vetrinetta', entity: 'sensor.shelly1pmg3_28372f38c4c4_potenza', energia: 'sensor.shelly1pmg3_28372f38c4c4_energia', color: C.soggiorno },
  { name: 'Cucina 1', entity: 'sensor.shelly2pmg3_d0cf13dab110_output_1_potenza', energia: 'sensor.shelly2pmg3_d0cf13dab110_output_1_energia', color: C.cucina },
  { name: 'Cucina 2', entity: 'sensor.shelly2pmg3_d0cf13dab110_output_0_potenza', energia: 'sensor.shelly2pmg3_d0cf13dab110_output_0_energia', color: C.cucina },
  { name: 'Lavanderia', entity: 'sensor.shelly1pmg3_dcda0cdf6e60_potenza', energia: 'sensor.shelly1pmg3_dcda0cdf6e60_energia', color: C.lavanderia },
  { name: 'Tenda Sogg.', entity: 'sensor.tenda_soggiorno_tenda_soggiorno_potenza', energia: 'sensor.tenda_soggiorno_tenda_soggiorno_energia', color: C.soggiorno },
  { name: 'Tenda Pluriuso', entity: 'sensor.shellyplus2pm_a0dd6c4e2fd8_tenda_pluriuso_potenza', energia: 'sensor.shellyplus2pm_a0dd6c4e2fd8_tenda_pluriuso_energia', color: C.pluriuso },
];
const POWER_SCALE_MAX = 2000;

const SPEAKERS = [
  { name: 'Alexa Piano Terra', room: 'Soggiorno', icon: 'mdi:speaker', entity: 'media_player.echo_pop_di_nicolo' },
  { name: 'Alexa Piano Primo', room: 'Camera da letto', icon: 'mdi:speaker', entity: 'media_player.echo_dot_di_nicolo' },
  { name: 'Ovunque', room: 'Multi-stanza', icon: 'mdi:speaker-multiple', entity: 'media_player.ovunque' },
];

const SPOTIFY_ENTITY = 'media_player.spotify_nico';
/* Dispositivi selezionabili per Spotify Connect (source_list reale dell'entity) */
const SPOTIFY_DEVICES = [
  { label: 'Alexa Piano Terra', icon: 'mdi:speaker', source: 'Echo Pop di Nicolò' },
  { label: 'Alexa Piano Primo', icon: 'mdi:speaker', source: 'Echo Dot di Nicolò' },
  { label: 'Ovunque', icon: 'mdi:speaker-multiple', source: 'Ovunque' },
];

const TVS = [
  { name: 'TV Soggiorno 65"', sub: 'Samsung Q80A', icon: 'mdi:television', entity: 'media_player.samsung_65_tv_qe65q80aatxzt', controllable: true },
  { name: 'TV Pluriuso 55"', sub: 'DLNA', icon: 'mdi:television', entity: 'media_player.tv_tv_pluriuso_55', controllable: false },
];

const ALL_OFF_TARGETS = LIGHTS.map(l => l.entity);

const UPDATE_ENTITIES = [
  'update.home_assistant_core_update', 'update.alexa_media_player_update', 'update.terminal_ssh_update',
  'update.home_assistant_operating_system_update', 'update.home_assistant_supervisor_update',
  'update.hacs_update', 'update.matter_server_update',
];

const PRINTER_STATE = 'sensor.hp_laserjet_mfp_m28_m31';
const PRINTER_TONER = 'sensor.hp_laserjet_mfp_m28_m31_black_cartridge_hp_cf244a';
const BACKUP_LAST = 'sensor.backup_last_successful_automatic_backup';

const PRINTER_LABELS = { idle: 'Inattiva', printing: 'In stampa', stopped: 'Ferma' };

function relTime(iso) {
  if (!iso) return '--';
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return 'ora';
  if (mins < 60) return `${mins} min fa`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} h fa`;
  return `${Math.round(hours / 24)} g fa`;
}

function fmtMMSS(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}
function secsSince(iso) {
  return (Date.now() - new Date(iso).getTime()) / 1000;
}
function safeNum(st) {
  const v = st ? parseFloat(st.state) : NaN;
  return isNaN(v) ? 0 : v;
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
* { box-sizing: border-box; }
button { all: unset; cursor: pointer; }
:host { display:block; height:100%; width:100%; overflow:hidden; }

.dash {
  position:relative;
  height:100%; width:100%;
  overflow:hidden;
  padding: 14px 20px 10px;
  background:
    radial-gradient(circle at 85% -10%, rgba(201,168,105,0.16), transparent 45%),
    radial-gradient(circle at 5% 110%, rgba(90,200,250,0.13), transparent 40%),
    linear-gradient(160deg, #080b10 0%, #10141a 45%, #141920 100%);
  font-family: 'Outfit', sans-serif;
  color: #e9ebee;
  display:grid;
  grid-template-rows: 58px 1fr 30px;
  gap: 10px;
}
.mono { font-family: 'JetBrains Mono', monospace; }

/* ---------- panel base (HUD glass + corner brackets) ---------- */
.panel {
  position:relative;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(201,168,105,0.24);
  border-radius: 16px;
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  box-shadow: 0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.065);
  padding: 10px 12px;
  display:flex; flex-direction:column; min-height:0;
}
.panel::before, .panel::after {
  content:""; position:absolute; width:10px; height:10px; pointer-events:none; opacity:.55;
}
.panel::before { top:-1px; left:-1px; border-top:2px solid #c9a869; border-left:2px solid #c9a869; border-radius:6px 0 0 0; }
.panel::after { bottom:-1px; right:-1px; border-bottom:2px solid #c9a869; border-right:2px solid #c9a869; border-radius:0 0 6px 0; }
.panel-title {
  font-size:12px; text-transform:uppercase; letter-spacing:1.6px; font-weight:700;
  color:#c9a869; opacity:.85; margin-bottom:6px; display:flex; align-items:center; gap:6px; flex-shrink:0;
}
.panel-title .n { margin-left:auto; font-size:11px; color:rgba(233,235,238,0.45); letter-spacing:.5px; }

/* ---------- header ---------- */
.topbar { display:grid; grid-template-columns: auto 1fr auto; align-items:center; gap:16px; min-height:0; }
.brand { display:flex; align-items:center; gap:10px; }
.live-dot { width:8px; height:8px; border-radius:50%; background:#34c759; box-shadow:0 0 8px #34c759; animation: pulse 2s ease-in-out infinite; flex-shrink:0; }
@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.35; } }
.brand-title { font-size:18px; font-weight:800; letter-spacing:2.5px; color:#f3f2ef; line-height:1.1; }
.brand-sub { font-size:11px; font-weight:600; letter-spacing:1.8px; text-transform:uppercase; color:rgba(233,235,238,0.52); }

.ticker { display:flex; align-items:center; gap:8px; overflow:hidden; min-width:0; }
.chip {
  display:flex; align-items:center; gap:6px; padding:5px 12px; border-radius:999px; flex-shrink:0;
  background: rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.12);
  font-size:12.5px; font-weight:600; color:rgba(233,235,238,0.92); white-space:nowrap;
}
.chip ha-icon { --mdc-icon-size:14px; }
.chip.ok { color:#34c759; }
.chip.ok ha-icon { color:#34c759; }
.chip.warn { color:#ffd60a; border-color:rgba(255,214,10,0.35); }
.chip.warn ha-icon { color:#ffd60a; }

.clockbox { text-align:right; flex-shrink:0; }
.clock { font-size:29px; font-weight:700; line-height:1; letter-spacing:1px; color:#f3f2ef; }
.datestr { font-size:11.5px; font-weight:600; color:rgba(233,235,238,0.52); text-transform:capitalize; margin-top:2px; }

/* ---------- main grid ---------- */
.main { display:grid; grid-template-columns: 1.15fr 1fr 1.05fr 0.85fr; gap:12px; min-height:0; }
.col { display:flex; flex-direction:column; gap:12px; min-height:0; }
.col > .panel { flex:1; min-height:0; }

/* ---------- ZONE / luci ---------- */
.light-list { display:flex; flex-direction:column; gap:6px; flex:1; min-height:0; overflow:hidden; }
.light-row { position:relative; display:flex; align-items:center; gap:12px; padding:10px 12px; border-radius:12px; overflow:hidden; transition:background .15s; flex:1; }
.light-row:hover { background: rgba(255,255,255,0.065); }
.light-badge { width:38px; height:38px; border-radius:11px; display:flex; align-items:center; justify-content:center; flex-shrink:0; background: color-mix(in srgb, var(--c) 22%, transparent); border:1px solid color-mix(in srgb, var(--c) 45%, transparent); }
.light-badge ha-icon { --mdc-icon-size:18px; color: var(--c); }
.light-row.on .light-badge { background: var(--c); box-shadow: 0 0 12px color-mix(in srgb, var(--c) 60%, transparent); }
.light-row.on .light-badge ha-icon { color:#0b0d10; }
.light-info { flex:1; min-width:0; }
.light-name { font-size:14px; font-weight:700; color:#f3f2ef; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.light-room { font-size:11px; color:rgba(233,235,238,0.52); text-transform:uppercase; letter-spacing:.6px; }
.light-meta { text-align:right; flex-shrink:0; }
.light-power { font-size:12.5px; font-weight:600; color:rgba(233,235,238,0.65); }
.light-timer { font-size:12.5px; font-weight:700; color:#c9a869; }
.light-timer.warn { color:#ff453a; animation: pulse 1s ease-in-out infinite; }
.light-dot { width:7px; height:7px; border-radius:50%; background:rgba(233,235,238,0.25); flex-shrink:0; }
.light-dot.on { background: var(--c); box-shadow:0 0 6px var(--c); }
.light-progress { position:absolute; left:0; bottom:0; height:2px; width:0%; background: var(--c); opacity:.8; transition: width 1s linear; }
.light-progress.warn { background:#ff453a; }

/* ---------- ENERGIA ---------- */
.col > .energy-panel { flex: 1.2; }
.energy-top { display:flex; align-items:center; gap:14px; }
.gauge-wrap { position:relative; width:108px; height:108px; flex-shrink:0; }
.gauge-wrap svg { width:100%; height:100%; transform:rotate(-90deg); }
.gauge-bg { fill:none; stroke:rgba(255,255,255,0.11); stroke-width:8; }
.gauge-fill { fill:none; stroke:#c9a869; stroke-width:8; stroke-linecap:round; transition: stroke-dashoffset .6s ease, stroke .3s; }
.gauge-center { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; }
.gauge-value { font-size:16.5px; font-weight:700; color:#f3f2ef; }
.gauge-label { font-size:9px; color:rgba(233,235,238,0.52); text-transform:uppercase; letter-spacing:.5px; }
.energy-stats { flex:1; min-width:0; }
.energy-total-kwh { font-size:12.5px; color:rgba(233,235,238,0.65); }
.energy-total-kwh b { color:#c9a869; font-weight:700; }
.energy-legend { display:grid; grid-template-columns:1fr 1fr; gap:2px 10px; margin-top:6px; flex:1; align-content:space-evenly; min-height:0; overflow:hidden; }
.spark-wrap { margin-top:6px; flex-shrink:0; }
.spark-wrap svg { width:100%; height:38px; display:block; }
.spark-label { font-size:9px; color:rgba(233,235,238,0.42); text-transform:uppercase; letter-spacing:.6px; margin-top:2px; display:flex; justify-content:space-between; }
.el-row { display:flex; align-items:center; gap:5px; font-size:11.5px; color:rgba(233,235,238,0.68); }
.el-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
.el-name { flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.el-val { font-weight:700; color:#e9ebee; }

/* ---------- COPERTURE ---------- */
.col > .cover-panel { flex:1; }
.cover-list { display:flex; flex-direction:column; gap:10px; flex:1; min-height:0; }
.cover-row { display:flex; flex-direction:column; justify-content:center; gap:8px; flex:1; padding:8px 10px; border-radius:12px; background:rgba(255,255,255,0.03); }
.cover-head { display:flex; align-items:center; gap:9px; }
.cover-head ha-icon { --mdc-icon-size:18px; color:rgba(233,235,238,0.65); }
.cover-name { font-size:14px; font-weight:700; color:#f3f2ef; flex:1; }
.cover-state { font-size:12px; color:rgba(233,235,238,0.55); }
.cover-body { display:flex; align-items:center; gap:10px; }
.cover-bar { flex:1; height:10px; border-radius:5px; background:rgba(255,255,255,0.11); overflow:hidden; }
.cover-fill { height:100%; background: var(--c, #c9a869); transition: width .5s ease; }
.cover-btns { display:flex; gap:6px; flex-shrink:0; }
.cover-btns button { width:30px; height:30px; border-radius:8px; background:rgba(255,255,255,0.085); border:1px solid rgba(255,255,255,0.13); display:flex; align-items:center; justify-content:center; }
.cover-btns button:hover { background:rgba(201,168,105,0.25); }
.cover-btns button ha-icon { --mdc-icon-size:15px; color:#e9ebee; }

/* ---------- SPOTIFY ---------- */
.spot { display:flex; align-items:center; gap:11px; padding:10px; margin-bottom:8px; border-radius:14px; background:linear-gradient(135deg, rgba(30,215,96,0.14), rgba(30,215,96,0.03)); border:1px solid rgba(30,215,96,0.28); flex-shrink:0; }
.spot-art { width:52px; height:52px; border-radius:10px; background:rgba(255,255,255,0.085) center/cover no-repeat; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
.spot-art ha-icon { --mdc-icon-size:26px; color:#1ed760; }
.spot-art.has-img ha-icon { display:none; }
.spot-info { flex:1; min-width:0; }
.spot-title { font-size:13px; font-weight:700; color:#f3f2ef; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.spot-artist { font-size:11px; color:rgba(233,235,238,0.6); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.spot-src { margin-top:3px; font-size:10px; font-weight:700; letter-spacing:.4px; color:#1ed760; background:rgba(30,215,96,0.12); border:1px solid rgba(30,215,96,0.3); border-radius:999px; padding:1px 7px; max-width:100%; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; display:inline-block; }
.spot-btns { display:flex; gap:4px; flex-shrink:0; }
.spot-btns .icon-btn.main { width:34px; height:34px; background:#1ed760; border-color:#1ed760; }
.spot-btns .icon-btn.main ha-icon { color:#062b12; --mdc-icon-size:16px; }

/* ---------- AUDIO & TV ---------- */
.col > .audio-panel { flex:1.3; }
.spk-list { display:flex; flex-direction:column; gap:4px; flex:1; min-height:0; }
.spk-row { display:flex; align-items:center; gap:10px; padding:7px 6px; border-radius:10px; flex:1; }
.spk-row.unavail { opacity:.4; pointer-events:none; }
.spk-row > ha-icon { --mdc-icon-size:18px; color:rgba(233,235,238,0.6); flex-shrink:0; }
.spk-info { flex:1; min-width:0; }
.spk-name { font-size:13px; font-weight:700; color:#f3f2ef; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.spk-sub { font-size:11px; color:rgba(233,235,238,0.52); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.spk-row.playing .spk-sub { color:#34c759; }
.icon-btn { width:30px; height:30px; border-radius:50%; background:rgba(255,255,255,0.085); display:flex; align-items:center; justify-content:center; flex-shrink:0; border:1px solid rgba(255,255,255,0.11); }
.icon-btn:hover { background:rgba(201,168,105,0.3); }
.icon-btn ha-icon { --mdc-icon-size:14px; color:#e9ebee; }

.announce-row { display:flex; gap:6px; margin:6px 0; flex-shrink:0; }
.announce-input {
  flex:1; min-width:0; background:rgba(255,255,255,0.075); border:1px solid rgba(255,255,255,0.13); border-radius:8px;
  padding:6px 9px; font-size:12.5px; color:#e9ebee; font-family:'Outfit',sans-serif;
}
.announce-input::placeholder { color:rgba(233,235,238,0.4); }
.announce-btn { width:30px; height:30px; border-radius:8px; background:rgba(201,168,105,0.22); border:1px solid rgba(201,168,105,0.4); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.announce-btn ha-icon { --mdc-icon-size:14px; color:#c9a869; }
.announce-btn:hover { background:rgba(201,168,105,0.35); }

.sep { height:1px; background:rgba(255,255,255,0.11); margin:4px 0 6px; flex-shrink:0; }
.tv-list { display:flex; flex-direction:column; gap:4px; flex:1; min-height:0; }

/* ---------- AZIONI ---------- */
.col > .actions-panel { flex:1.1; }
.gate-status { font-size:11px; letter-spacing:1px; text-transform:uppercase; font-weight:700; color:rgba(233,235,238,0.52); text-align:center; margin-bottom:6px; flex-shrink:0; }
.gate-status.busy { color:#ffd60a; }
.action-btn-group { display:flex; flex-direction:column; gap:8px; flex:1; min-height:0; }
.action-btn {
  display:grid; grid-template-columns:auto 1fr; column-gap:12px; row-gap:3px; align-content:center; align-items:center; text-align:left;
  padding:12px 16px; border-radius:14px; flex:1; min-height:0;
  background: rgba(255,255,255,0.065); border:1px solid rgba(255,255,255,0.13); transition:.2s ease;
}
.action-btn:hover { background: rgba(255,255,255,0.11); transform: translateY(-1px); }
.action-btn ha-icon { --mdc-icon-size:28px; color:#e9ebee; grid-row:1 / span 2; }
.action-btn span { font-size:14px; font-weight:700; color:#f3f2ef; }
.action-btn small { font-size:11px; font-weight:600; color:rgba(233,235,238,0.55); line-height:1.3; }
.action-btn.gate { border-color: rgba(255,69,58,0.3); }
.action-btn.gate ha-icon { color:#ff6b60; }
.action-btn.gate.busy { background: rgba(255,214,10,0.15); border-color: rgba(255,214,10,0.5); }
.action-btn.offall { border-color: rgba(201,168,105,0.3); }
.action-btn.offall ha-icon { color:#c9a869; }

/* ---------- SISTEMA ---------- */
.col > .system-panel { flex:0.9; }
.sys-list { display:flex; flex-direction:column; gap:8px; flex:1; min-height:0; }
.sys-row { display:flex; align-items:center; gap:10px; flex:1; padding:6px 8px; border-radius:10px; background:rgba(255,255,255,0.03); }
.sys-row ha-icon { --mdc-icon-size:18px; color:rgba(233,235,238,0.6); flex-shrink:0; }
.sys-info { flex:1; min-width:0; }
.sys-label { font-size:12.5px; font-weight:700; color:#f3f2ef; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.sys-sub { font-size:10px; color:rgba(233,235,238,0.52); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.sys-val { font-size:13px; font-weight:700; color:rgba(233,235,238,0.72); flex-shrink:0; }
.sys-val.ok { color:#34c759; }
.sys-val.warn { color:#ffd60a; }
.sys-val.danger { color:#ff453a; }

/* ---------- modale conferma cancello / modale generica ---------- */
.modal-overlay {
  position:absolute; inset:0; background:rgba(3,4,6,0.72); backdrop-filter: blur(6px);
  display:flex; align-items:center; justify-content:center; z-index:50; opacity:0; pointer-events:none; transition: opacity .18s ease;
}
.modal-overlay.show { opacity:1; pointer-events:all; }
.modal-box {
  width:min(340px, 86%); background:#12151a; border:1px solid rgba(255,69,58,0.35); border-radius:18px;
  padding:22px 20px; text-align:center; box-shadow:0 20px 60px rgba(0,0,0,0.6);
}
.modal-box ha-icon { --mdc-icon-size:34px; color:#ff6b60; }
.modal-title { font-size:16.5px; font-weight:800; color:#f3f2ef; margin-top:8px; }
.modal-sub { font-size:13px; color:rgba(233,235,238,0.65); margin-top:6px; line-height:1.4; }
.modal-btns { display:flex; gap:10px; margin-top:16px; }
.modal-btns button { flex:1; padding:10px; border-radius:10px; font-size:13.5px; font-weight:700; }
.modal-btns button:first-child { background:rgba(255,255,255,0.085); color:#e9ebee; border:1px solid rgba(255,255,255,0.15); }
.modal-btns button.confirm { background:#ff453a; color:#fff; }
.modal-btns button.confirm:hover { background:#ff6b60; }

/* ---------- modale Spotify Connect ---------- */
.spotify-modal-box { border-color: rgba(30,215,96,0.35); }
.spotify-modal-box ha-icon.header-icon { color:#1ed760; }
.spotify-device-list { display:flex; flex-direction:column; gap:8px; margin-top:16px; text-align:left; }
.spotify-device-row {
  display:flex; align-items:center; gap:10px; padding:12px 14px; border-radius:12px; width:100%;
  background: rgba(255,255,255,0.075); border:1px solid rgba(255,255,255,0.13); transition:.15s ease;
}
.spotify-device-row:hover { background: rgba(30,215,96,0.12); border-color: rgba(30,215,96,0.3); }
.spotify-device-row ha-icon:first-child { --mdc-icon-size:18px; color: rgba(233,235,238,0.68); flex-shrink:0; }
.spotify-device-row span { flex:1; font-size:14px; font-weight:600; color:#f3f2ef; }
.spotify-device-row .check { --mdc-icon-size:16px; color:#1ed760; opacity:0; flex-shrink:0; }
.spotify-device-row.active { border-color: rgba(30,215,96,0.4); background: rgba(30,215,96,0.08); }
.spotify-device-row.active .check { opacity:1; }

/* ---------- footer ---------- */
.footer { display:flex; align-items:center; gap:8px; min-height:0; overflow:hidden; }
.timers { display:flex; gap:8px; flex:1; overflow:hidden; min-width:0; }
.timer-chip {
  display:flex; align-items:center; gap:5px; padding:3px 10px; border-radius:999px; flex-shrink:0;
  background:rgba(201,168,105,0.1); border:1px solid rgba(201,168,105,0.25); font-size:11.5px; font-weight:600; color:#c9a869; white-space:nowrap;
}
.timer-chip.warn { background:rgba(255,69,58,0.12); border-color:rgba(255,69,58,0.35); color:#ff6b60; }
.timer-chip ha-icon { --mdc-icon-size:11px; }
.watermark { font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:rgba(233,235,238,0.35); flex-shrink:0; white-space:nowrap; }
`;

class CasaDashboardCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._built = false;
    this._gatePulseUntil = 0;
    this._lastTotalPower = 0;
    this._powerHistory = [];
    this._historyTicks = 0;
    this._historySeeded = false;
    this._resizeObserver = null;
    this._onResize = () => this._syncHeight();
  }

  setConfig(config) { this._config = config || {}; }
  getCardSize() { return 1; }

  set hass(hass) {
    this._hass = hass;
    if (!this._built) {
      this._build();
      this._built = true;
      this._clockTimer = setInterval(() => this._tick(), 1000);
      requestAnimationFrame(() => requestAnimationFrame(() => this._syncHeight()));
      window.addEventListener('resize', this._onResize);
      if (window.ResizeObserver) {
        this._resizeObserver = new ResizeObserver(() => this._syncHeight());
        this._resizeObserver.observe(this);
      }
    }
    this._update();
  }
  get hass() { return this._hass; }

  disconnectedCallback() {
    if (this._clockTimer) clearInterval(this._clockTimer);
    window.removeEventListener('resize', this._onResize);
    if (this._resizeObserver) { this._resizeObserver.disconnect(); this._resizeObserver = null; }
  }

  _syncHeight() {
    const rect = this.getBoundingClientRect();
    /* clientWidth riflette la larghezza reale già disposta dal layout (esclude la sidebar HA);
       window.innerWidth va usato solo come ultimissima risorsa, mai come primo valore. */
    const w = this.clientWidth || rect.width || window.innerWidth;
    const h = Math.max(300, window.innerHeight - rect.top);
    this.style.height = h + 'px';
    this.style.width = '100%';
    const MIN_H = 620;
    const dash = this.shadowRoot && this.shadowRoot.querySelector('.dash');
    if (!dash) return;
    const s = Math.min(1, h / MIN_H);
    if (s < 1) {
      dash.style.width = (w / s) + 'px';
      dash.style.height = (h / s) + 'px';
      dash.style.transform = `scale(${s})`;
      dash.style.transformOrigin = 'top left';
    } else {
      dash.style.width = ''; dash.style.height = ''; dash.style.transform = ''; dash.style.transformOrigin = '';
    }
  }

  _build() {
    const root = this.shadowRoot;
    root.innerHTML = `
      <style>${CSS}</style>
      <div class="dash">
        <header class="topbar">
          <div class="brand">
            <div class="live-dot"></div>
            <div class="brand-text">
              <div class="brand-title">MISSION CONTROL</div>
              <div class="brand-sub">Casa Carestiato</div>
            </div>
          </div>
          <div class="ticker" id="ticker"></div>
          <div class="clockbox">
            <div class="clock mono" id="clock">--:--</div>
            <div class="datestr" id="date"></div>
          </div>
        </header>

        <div class="main">
          <div class="col">
            <div class="panel" style="flex:1;">
              <div class="panel-title"><ha-icon icon="mdi:lightbulb-group"></ha-icon>Zone &amp; Luci<span class="n">${LIGHTS.length} circuiti</span></div>
              <div class="light-list">
                ${LIGHTS.map(l => `
                <div class="light-row" data-entity="${l.entity}" data-action="toggle:${l.entity}" id="lrow-${l.id}" style="--c:${l.color}">
                  <div class="light-badge"><ha-icon icon="${l.icon}"></ha-icon></div>
                  <div class="light-info">
                    <div class="light-name">${l.name}</div>
                    <div class="light-room">${l.room}</div>
                  </div>
                  <div class="light-meta">
                    <div class="light-power" id="lp-${l.id}">--</div>
                    <div class="light-timer mono" id="lt-${l.id}"></div>
                  </div>
                  <div class="light-dot" id="ld-${l.id}"></div>
                  <div class="light-progress" id="lpb-${l.id}"></div>
                </div>`).join('')}
              </div>
            </div>
          </div>

          <div class="col">
            <div class="panel energy-panel">
              <div class="panel-title"><ha-icon icon="mdi:flash"></ha-icon>Energia<span class="n">totale corretto</span></div>
              <div class="energy-top">
                <div class="gauge-wrap">
                  <svg viewBox="0 0 100 100">
                    <circle class="gauge-bg" cx="50" cy="50" r="42"></circle>
                    <circle class="gauge-fill" id="gauge-fill" cx="50" cy="50" r="42"></circle>
                  </svg>
                  <div class="gauge-center">
                    <div class="gauge-value mono" id="gauge-value">0 W</div>
                    <div class="gauge-label">live</div>
                  </div>
                </div>
                <div class="energy-stats">
                  <div class="energy-total-kwh">Contatori totali: <b id="energy-kwh">-- kWh</b></div>
                  <div class="energy-legend" id="energy-legend"></div>
                </div>
              </div>
              <div class="spark-wrap">
                <svg viewBox="0 0 200 40" preserveAspectRatio="none">
                  <polyline id="power-spark" fill="none" stroke="#c9a869" stroke-width="2" points=""></polyline>
                </svg>
                <div class="spark-label"><span>Storico rapido</span><span id="spark-range">ultimi 5 min</span></div>
              </div>
            </div>
            <div class="panel cover-panel">
              <div class="panel-title"><ha-icon icon="mdi:blinds-horizontal"></ha-icon>Coperture</div>
              <div class="cover-list">
                ${COVERS.map((c, i) => `
                <div class="cover-row">
                  <div class="cover-head">
                    <ha-icon icon="${c.icon}"></ha-icon>
                    <div class="cover-name">${c.name}</div>
                    <div class="cover-state" id="cv-state-${i}">--</div>
                  </div>
                  <div class="cover-body">
                    <div class="cover-bar"><div class="cover-fill" id="cv-fill-${i}" style="--c:${c.color}"></div></div>
                    <div class="cover-btns">
                      <button data-action="cover-open:${c.entity}"><ha-icon icon="mdi:arrow-up-bold"></ha-icon></button>
                      <button data-action="cover-stop:${c.entity}"><ha-icon icon="mdi:stop"></ha-icon></button>
                      <button data-action="cover-close:${c.entity}"><ha-icon icon="mdi:arrow-down-bold"></ha-icon></button>
                    </div>
                  </div>
                </div>`).join('')}
              </div>
            </div>
          </div>

          <div class="col">
            <div class="panel audio-panel">
              <div class="panel-title"><ha-icon icon="mdi:speaker-multiple"></ha-icon>Audio &amp; Alexa</div>
              <div class="spot" id="spot">
                <div class="spot-art" id="spot-art"><ha-icon icon="mdi:spotify"></ha-icon></div>
                <div class="spot-info">
                  <div class="spot-title" id="spot-title">Spotify</div>
                  <div class="spot-artist" id="spot-artist">In attesa</div>
                  <button class="spot-src" data-action="spotify-source" id="spot-src" title="Cambia dispositivo">Scegli dispositivo</button>
                </div>
                <div class="spot-btns">
                  <button class="icon-btn" data-action="spotify-prev"><ha-icon icon="mdi:skip-previous"></ha-icon></button>
                  <button class="icon-btn main" data-action="media-toggle:${SPOTIFY_ENTITY}" id="spot-play"><ha-icon icon="mdi:play"></ha-icon></button>
                  <button class="icon-btn" data-action="spotify-next"><ha-icon icon="mdi:skip-next"></ha-icon></button>
                </div>
              </div>
              <div class="spk-list">
                ${SPEAKERS.map(s => `
                <div class="spk-row" id="spk-${s.entity.replace(/\./g, '_')}">
                  <ha-icon icon="${s.icon}"></ha-icon>
                  <div class="spk-info">
                    <div class="spk-name">${s.name}</div>
                    <div class="spk-sub" id="spksub-${s.entity.replace(/\./g, '_')}">--</div>
                  </div>
                  <button class="icon-btn" data-action="vol-down:${s.entity}"><ha-icon icon="mdi:volume-minus"></ha-icon></button>
                  <button class="icon-btn" data-action="media-toggle:${s.entity}" id="spkbtn-${s.entity.replace(/\./g, '_')}"><ha-icon icon="mdi:play"></ha-icon></button>
                  <button class="icon-btn" data-action="vol-up:${s.entity}"><ha-icon icon="mdi:volume-plus"></ha-icon></button>
                </div>`).join('')}
              </div>
              <div class="announce-row">
                <input class="announce-input" id="announce-input" type="text" placeholder="Messaggio da annunciare su tutti gli Echo..." />
                <button class="announce-btn" data-action="announce"><ha-icon icon="mdi:bullhorn"></ha-icon></button>
              </div>
              <div class="sep"></div>
              <div class="tv-list">
                ${TVS.map(t => `
                <div class="spk-row" id="spk-${t.entity.replace(/\./g, '_')}">
                  <ha-icon icon="${t.icon}"></ha-icon>
                  <div class="spk-info">
                    <div class="spk-name">${t.name}</div>
                    <div class="spk-sub" id="spksub-${t.entity.replace(/\./g, '_')}">${t.sub}</div>
                  </div>
                  ${t.controllable ? `
                  <button class="icon-btn" data-action="vol-down:${t.entity}"><ha-icon icon="mdi:volume-minus"></ha-icon></button>
                  <button class="icon-btn" data-action="vol-up:${t.entity}"><ha-icon icon="mdi:volume-plus"></ha-icon></button>
                  <button class="icon-btn" data-action="toggle:${t.entity}" id="spkbtn-${t.entity.replace(/\./g, '_')}"><ha-icon icon="mdi:power"></ha-icon></button>
                  ` : `
                  <button class="icon-btn" data-action="more-info:${t.entity}"><ha-icon icon="mdi:information-outline"></ha-icon></button>
                  `}
                </div>`).join('')}
              </div>
            </div>
          </div>

          <div class="col">
            <div class="panel actions-panel">
              <div class="panel-title"><ha-icon icon="mdi:console"></ha-icon>Azioni Rapide</div>
              <div class="gate-status" id="gate-status">CANCELLO · PRONTO</div>
              <div class="action-btn-group">
                <button class="action-btn gate" id="gate-btn" data-action="gate-request">
                  <ha-icon icon="mdi:gate"></ha-icon>
                  <span>Apri Cancello</span>
                  <small>Impulso sicuro + annuncio vocale</small>
                </button>
                <button class="action-btn offall" data-action="all-off">
                  <ha-icon icon="mdi:power"></ha-icon>
                  <span>Tutto Spento</span>
                  <small>Spegne tutte le luci</small>
                </button>
              </div>
            </div>
            <div class="panel system-panel">
              <div class="panel-title"><ha-icon icon="mdi:server"></ha-icon>Sistema</div>
              <div class="sys-list">
                <div class="sys-row">
                  <ha-icon icon="mdi:cloud-download-outline"></ha-icon>
                  <div class="sys-info">
                    <div class="sys-label">Aggiornamenti</div>
                    <div class="sys-sub">Core, add-on, firmware</div>
                  </div>
                  <div class="sys-val mono" id="sys-updates">--</div>
                </div>
                <div class="sys-row">
                  <ha-icon icon="mdi:printer-outline"></ha-icon>
                  <div class="sys-info">
                    <div class="sys-label">Stampante</div>
                    <div class="sys-sub" id="sys-printer-state">--</div>
                  </div>
                  <div class="sys-val mono" id="sys-toner">--</div>
                </div>
                <div class="sys-row">
                  <ha-icon icon="mdi:backup-restore"></ha-icon>
                  <div class="sys-info">
                    <div class="sys-label">Backup</div>
                    <div class="sys-sub" id="sys-backup-sub">--</div>
                  </div>
                  <div class="sys-val mono" id="sys-backup-val">--</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer class="footer">
          <div class="timers" id="footer-timers"></div>
          <div class="watermark">Casa Carestiato · Mission Control</div>
        </footer>

        <div class="modal-overlay" id="gate-modal">
          <div class="modal-box">
            <ha-icon icon="mdi:gate-alert"></ha-icon>
            <div class="modal-title">Confermi apertura cancello?</div>
            <div class="modal-sub">Verrà inviato un comando a impulso al cancello carraio e partirà l'annuncio vocale automatico su Alexa.</div>
            <div class="modal-btns">
              <button data-action="gate-cancel">Annulla</button>
              <button class="confirm" data-action="gate-confirm">Conferma apertura</button>
            </div>
          </div>
        </div>

        <div class="modal-overlay" id="spotify-modal">
          <div class="modal-box spotify-modal-box">
            <ha-icon class="header-icon" icon="mdi:spotify"></ha-icon>
            <div class="modal-title">Scegli dispositivo Spotify</div>
            <div class="modal-sub">Seleziona l'altoparlante su cui riprodurre la musica.</div>
            <div class="spotify-device-list" id="spotify-device-list">
              ${SPOTIFY_DEVICES.map(d => `
              <button class="spotify-device-row" data-action="spotify-select:${d.source}" data-source="${d.source}">
                <ha-icon icon="${d.icon}"></ha-icon>
                <span>${d.label}</span>
                <ha-icon class="check" icon="mdi:check-circle"></ha-icon>
              </button>`).join('')}
            </div>
            <div class="modal-btns">
              <button data-action="spotify-cancel">Chiudi</button>
            </div>
          </div>
        </div>
      </div>
    `;

    root.addEventListener('click', (ev) => {
      const el = ev.composedPath().find(n => n.dataset && n.dataset.action);
      if (!el) return;
      const idx = el.dataset.action.indexOf(':');
      const action = idx === -1 ? el.dataset.action : el.dataset.action.slice(0, idx);
      const entity = idx === -1 ? null : el.dataset.action.slice(idx + 1);
      this._handleAction(action, entity);
    });

    root.getElementById('announce-input').addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') this._handleAction('announce', null);
    });

    this._tick();
  }

  _handleAction(action, entity) {
    if (!this._hass) return;
    switch (action) {
      case 'toggle':
        this._hass.callService('homeassistant', 'toggle', { entity_id: entity });
        break;
      case 'cover-open':
        this._hass.callService('cover', 'open_cover', { entity_id: entity });
        break;
      case 'cover-close':
        this._hass.callService('cover', 'close_cover', { entity_id: entity });
        break;
      case 'cover-stop':
        this._hass.callService('cover', 'stop_cover', { entity_id: entity });
        break;
      case 'media-toggle':
        this._hass.callService('media_player', 'media_play_pause', { entity_id: entity });
        break;
      case 'spotify-prev':
        this._hass.callService('media_player', 'media_previous_track', { entity_id: SPOTIFY_ENTITY });
        break;
      case 'spotify-next':
        this._hass.callService('media_player', 'media_next_track', { entity_id: SPOTIFY_ENTITY });
        break;
      case 'spotify-source':
        this.shadowRoot.getElementById('spotify-modal').classList.add('show');
        break;
      case 'spotify-select':
        this.shadowRoot.getElementById('spotify-modal').classList.remove('show');
        this._hass.callService('media_player', 'select_source', { entity_id: SPOTIFY_ENTITY, source: entity });
        break;
      case 'spotify-cancel':
        this.shadowRoot.getElementById('spotify-modal').classList.remove('show');
        break;
      case 'vol-up':
        this._hass.callService('media_player', 'volume_up', { entity_id: entity });
        break;
      case 'vol-down':
        this._hass.callService('media_player', 'volume_down', { entity_id: entity });
        break;
      case 'announce': {
        const input = this.shadowRoot.getElementById('announce-input');
        const msg = (input && input.value.trim()) || "Prova, prova. Messaggio dalla plancia di comando.";
        this._hass.callService('script', ANNOUNCE_SCRIPT.split('.')[1], { messaggio: msg });
        if (input) input.value = '';
        break;
      }
      case 'gate-request':
        this.shadowRoot.getElementById('gate-modal').classList.add('show');
        break;
      case 'gate-cancel':
        this.shadowRoot.getElementById('gate-modal').classList.remove('show');
        break;
      case 'gate-confirm':
        this.shadowRoot.getElementById('gate-modal').classList.remove('show');
        this._hass.callService('switch', 'turn_on', { entity_id: GATE_ENTITY });
        this._gatePulseUntil = Date.now() + 6000;
        break;
      case 'all-off':
        this._hass.callService('homeassistant', 'turn_off', { entity_id: ALL_OFF_TARGETS });
        break;
      case 'more-info':
        this._fireMoreInfo(entity);
        break;
    }
  }

  _fireMoreInfo(entity) {
    const ev = new CustomEvent('hass-more-info', { bubbles: true, composed: true, detail: { entityId: entity } });
    this.dispatchEvent(ev);
  }

  _tick() {
    const now = new Date();
    const sh = this.shadowRoot;
    const clockEl = sh.getElementById('clock');
    if (clockEl) clockEl.textContent = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateEl = sh.getElementById('date');
    if (dateEl) dateEl.textContent = now.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });
    this._updateTimers();
    this._updateGate();
    this._historyTicks++;
    if (this._historyTicks % 5 === 0) {
      this._powerHistory.push(this._lastTotalPower);
      if (this._powerHistory.length > 60) this._powerHistory.shift();
      this._renderSparkline();
    }
  }

  _renderSparkline() {
    const line = this.shadowRoot.getElementById('power-spark');
    if (!line) return;
    const data = this._powerHistory;
    if (data.length < 2) { line.setAttribute('points', ''); return; }
    const max = Math.max(POWER_SCALE_MAX * 0.15, ...data);
    const points = data.map((v, i) => {
      const x = (i / (data.length - 1)) * 200;
      const y = 38 - (Math.min(v, max) / max) * 36;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
    line.setAttribute('points', points);
  }

  _updateGate() {
    if (!this._hass) return;
    const sh = this.shadowRoot;
    const st = this._hass.states[GATE_ENTITY];
    const relayOn = st && st.state === 'on';
    const pulsing = Date.now() < this._gatePulseUntil;
    const busy = relayOn || pulsing;
    const statusEl = sh.getElementById('gate-status');
    const btnEl = sh.getElementById('gate-btn');
    if (statusEl) {
      statusEl.textContent = busy ? 'CANCELLO · IMPULSO ATTIVO' : 'CANCELLO · PRONTO';
      statusEl.classList.toggle('busy', busy);
    }
    if (btnEl) btnEl.classList.toggle('busy', busy);
  }

  _updateTimers() {
    if (!this._hass) return;
    const sh = this.shadowRoot;
    const states = this._hass.states;
    const chips = [];

    LIGHTS.forEach(l => {
      if (!l.timeout) return;
      const st = states[l.entity];
      const lt = sh.getElementById(`lt-${l.id}`);
      const pb = sh.getElementById(`lpb-${l.id}`);
      if (!st) return;
      if (st.state === 'on') {
        const elapsed = secsSince(st.last_changed);
        const remaining = l.timeout - elapsed;
        if (remaining > 0) {
          const isWarn = remaining <= l.warn;
          const label = fmtMMSS(remaining);
          if (lt) { lt.textContent = label; lt.classList.toggle('warn', isWarn); }
          if (pb) {
            const pct = Math.max(0, Math.min(100, (remaining / l.timeout) * 100));
            pb.style.width = pct + '%';
            pb.classList.toggle('warn', isWarn);
          }
          chips.push({ name: l.name, label, warn: isWarn });
        } else {
          if (lt) { lt.textContent = ''; lt.classList.remove('warn'); }
          if (pb) { pb.style.width = '0%'; }
        }
      } else {
        if (lt) { lt.textContent = ''; lt.classList.remove('warn'); }
        if (pb) { pb.style.width = '0%'; }
      }
    });

    const container = sh.getElementById('footer-timers');
    if (container) {
      container.innerHTML = chips.length
        ? chips.map(c => `<div class="timer-chip ${c.warn ? 'warn' : ''}"><ha-icon icon="mdi:timer-sand"></ha-icon>${c.name} · ${c.label}</div>`).join('')
        : `<div class="timer-chip" style="opacity:.5"><ha-icon icon="mdi:check-circle-outline"></ha-icon>Nessuno spegnimento automatico in corso</div>`;
    }
  }

  _update() {
    if (!this._hass || !this._built) return;
    const states = this._hass.states;
    const sh = this.shadowRoot;

    /* ---- ticker: meteo, sole, alert ---- */
    const chips = [];
    const wx = states[WEATHER_ENTITY];
    if (wx) {
      const icon = WEATHER_ICONS[wx.state] || 'mdi:weather-partly-cloudy';
      const temp = wx.attributes.temperature !== undefined ? `${Math.round(wx.attributes.temperature)}°` : '--';
      chips.push(`<div class="chip"><ha-icon icon="${icon}"></ha-icon>${temp}</div>`);
    }
    const sun = states[SUN_ENTITY];
    if (sun) {
      const aboveHorizon = sun.state === 'above_horizon';
      const nextEvent = states[aboveHorizon ? SUN_NEXT_SETTING : SUN_NEXT_RISING];
      if (nextEvent) {
        const t = new Date(nextEvent.state).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
        const icon = aboveHorizon ? 'mdi:weather-sunset-down' : 'mdi:weather-sunset-up';
        const label = aboveHorizon ? 'Tramonto' : 'Alba';
        chips.push(`<div class="chip"><ha-icon icon="${icon}"></ha-icon>${label} ${t}</div>`);
      }
    }
    const updatesOn = UPDATE_ENTITIES.filter(id => states[id] && states[id].state === 'on').length;
    if (updatesOn > 0) {
      chips.push(`<div class="chip warn"><ha-icon icon="mdi:cloud-download-outline"></ha-icon>${updatesOn} aggiornament${updatesOn === 1 ? 'o' : 'i'}</div>`);
    }
    const toner = states[PRINTER_TONER];
    if (toner && !isNaN(parseFloat(toner.state)) && parseFloat(toner.state) <= 10) {
      chips.push(`<div class="chip warn"><ha-icon icon="mdi:printer-alert"></ha-icon>Toner ${Math.round(parseFloat(toner.state))}%</div>`);
    }
    const backup = states[BACKUP_LAST];
    if (backup && backup.state === 'unknown') {
      chips.push(`<div class="chip warn"><ha-icon icon="mdi:backup-restore"></ha-icon>Backup non configurato</div>`);
    }
    const ticker = sh.getElementById('ticker');
    if (ticker) ticker.innerHTML = chips.join('');

    /* ---- luci ---- */
    LIGHTS.forEach(l => {
      const st = states[l.entity];
      const row = sh.getElementById(`lrow-${l.id}`);
      const dot = sh.getElementById(`ld-${l.id}`);
      const powerEl = sh.getElementById(`lp-${l.id}`);
      if (!st) return;
      const on = st.state === 'on';
      if (row) row.classList.toggle('on', on);
      if (dot) dot.classList.toggle('on', on);
      if (powerEl) {
        if (l.power) {
          const p = states[l.power];
          powerEl.textContent = p ? `${safeNum(p).toFixed(0)} W` : '--';
        } else {
          powerEl.textContent = on ? 'Accesa' : 'Spenta';
        }
      }
    });

    /* ---- coperture ---- */
    COVERS.forEach((c, i) => {
      const st = states[c.entity];
      const fillEl = sh.getElementById(`cv-fill-${i}`);
      const stateEl = sh.getElementById(`cv-state-${i}`);
      if (!st) return;
      const pos = st.attributes.current_position !== undefined ? st.attributes.current_position : (st.state === 'open' ? 100 : 0);
      if (fillEl) fillEl.style.width = `${pos}%`;
      let label = `${pos}%`;
      if (st.state === 'opening') label = 'Apertura...';
      else if (st.state === 'closing') label = 'Chiusura...';
      else if (st.state === 'open' && pos >= 100) label = 'Aperta';
      else if (st.state === 'closed' || pos <= 0) label = 'Chiusa';
      if (stateEl) stateEl.textContent = label;
    });

    /* ---- energia ---- */
    let total = 0;
    let totalKwh = 0;
    POWER_SENSORS.forEach(p => {
      total += safeNum(states[p.entity]);
      totalKwh += safeNum(states[p.energia]);
    });
    const legendRows = POWER_SENSORS.map(p => {
      const val = safeNum(states[p.entity]);
      return `<div class="el-row"><div class="el-dot" style="background:${p.color}"></div><div class="el-name">${p.name}</div><div class="el-val">${val.toFixed(0)} W</div></div>`;
    }).join('');
    const legendEl = sh.getElementById('energy-legend');
    if (legendEl) legendEl.innerHTML = legendRows;
    const gaugeVal = sh.getElementById('gauge-value');
    if (gaugeVal) gaugeVal.textContent = total >= 1000 ? `${(total / 1000).toFixed(2)} kW` : `${total.toFixed(0)} W`;
    const kwhEl = sh.getElementById('energy-kwh');
    if (kwhEl) kwhEl.textContent = `${totalKwh.toFixed(1)} kWh`;
    const gaugeFill = sh.getElementById('gauge-fill');
    if (gaugeFill) {
      const circumference = 2 * Math.PI * 42;
      const pct = Math.max(0, Math.min(1, total / POWER_SCALE_MAX));
      gaugeFill.style.strokeDasharray = `${circumference}`;
      gaugeFill.style.strokeDashoffset = `${circumference * (1 - pct)}`;
      gaugeFill.style.stroke = pct > 0.85 ? '#ff453a' : '#c9a869';
    }
    this._lastTotalPower = total;
    /* Pre-inizializza lo storico con il primo valore reale, cosi' lo sparkline non parte vuoto */
    if (!this._historySeeded) {
      this._historySeeded = true;
      this._powerHistory = new Array(60).fill(total);
      this._renderSparkline();
    }

    /* ---- sistema ---- */
    const sysUpdatesEl = sh.getElementById('sys-updates');
    if (sysUpdatesEl) {
      const n = UPDATE_ENTITIES.filter(id => states[id] && states[id].state === 'on').length;
      sysUpdatesEl.textContent = n > 0 ? `${n}` : 'OK';
      sysUpdatesEl.className = `sys-val mono ${n > 0 ? 'warn' : 'ok'}`;
    }
    const printerSt = states[PRINTER_STATE];
    const tonerSt = states[PRINTER_TONER];
    const printerStateEl = sh.getElementById('sys-printer-state');
    const tonerEl = sh.getElementById('sys-toner');
    if (printerStateEl) printerStateEl.textContent = printerSt ? (PRINTER_LABELS[printerSt.state] || printerSt.state) : '--';
    if (tonerEl) {
      const toner = tonerSt ? safeNum(tonerSt) : null;
      tonerEl.textContent = toner !== null ? `${toner.toFixed(0)}%` : '--';
      tonerEl.className = `sys-val mono ${toner !== null && toner <= 10 ? 'danger' : toner !== null && toner <= 30 ? 'warn' : 'ok'}`;
    }
    const backupSt = states[BACKUP_LAST];
    const backupSubEl = sh.getElementById('sys-backup-sub');
    const backupValEl = sh.getElementById('sys-backup-val');
    if (backupSt) {
      const configured = backupSt.state !== 'unknown';
      if (backupSubEl) backupSubEl.textContent = configured ? 'Ultimo backup' : 'Non configurato';
      if (backupValEl) {
        backupValEl.textContent = configured ? relTime(backupSt.state) : '--';
        backupValEl.className = `sys-val mono ${configured ? 'ok' : 'warn'}`;
      }
    }

    /* ---- Spotify ---- */
    {
      const sp = states[SPOTIFY_ENTITY];
      const box = sh.getElementById('spot');
      if (box) box.style.display = sp ? '' : 'none';
      if (sp) {
        const a = sp.attributes;
        const playing = sp.state === 'playing';
        const hasTrack = playing || sp.state === 'paused';
        const t = sh.getElementById('spot-title'); if (t) t.textContent = hasTrack && a.media_title ? a.media_title : 'Spotify';
        const ar = sh.getElementById('spot-artist'); if (ar) ar.textContent = hasTrack ? (a.media_artist || '') : (sp.state === 'unavailable' ? 'Non disponibile' : 'In attesa');
        const src = sh.getElementById('spot-src'); if (src) src.textContent = a.source || 'Scegli dispositivo';
        const art = sh.getElementById('spot-art');
        if (art) {
          const pic = hasTrack ? a.entity_picture : null;
          if (pic !== this._spotPic) { this._spotPic = pic; art.style.backgroundImage = pic ? `url("${pic}")` : ''; art.classList.toggle('has-img', !!pic); }
        }
        const pb = sh.querySelector('#spot-play ha-icon'); if (pb) pb.setAttribute('icon', playing ? 'mdi:pause' : 'mdi:play');
        const deviceRows = sh.querySelectorAll('.spotify-device-row');
        deviceRows.forEach(r => r.classList.toggle('active', r.dataset.source === a.source));
      }
    }

    /* ---- audio: speaker Alexa ---- */
    SPEAKERS.forEach(s => {
      const st = states[s.entity];
      const key = s.entity.replace(/\./g, '_');
      const row = sh.getElementById(`spk-${key}`);
      const sub = sh.getElementById(`spksub-${key}`);
      const btn = sh.getElementById(`spkbtn-${key}`);
      if (!st) return;
      const unavail = st.state === 'unavailable';
      if (row) { row.classList.toggle('unavail', unavail); row.classList.toggle('playing', st.state === 'playing'); }
      let label = 'In attesa';
      if (st.state === 'playing') label = st.attributes.media_title || 'In riproduzione';
      else if (st.state === 'paused') label = 'In pausa';
      else if (st.state === 'idle') label = 'In attesa';
      else if (unavail) label = 'Non disponibile';
      if (sub) sub.textContent = label;
      if (btn) {
        const ic = btn.querySelector('ha-icon');
        if (ic) ic.setAttribute('icon', st.state === 'playing' ? 'mdi:pause' : 'mdi:play');
      }
    });

    /* ---- TV ---- */
    TVS.forEach(t => {
      const st = states[t.entity];
      const key = t.entity.replace(/\./g, '_');
      const row = sh.getElementById(`spk-${key}`);
      const sub = sh.getElementById(`spksub-${key}`);
      const btn = sh.getElementById(`spkbtn-${key}`);
      if (!st) return;
      const unavail = st.state === 'unavailable';
      if (row) row.classList.toggle('unavail', unavail && !t.controllable);
      if (sub && t.controllable) {
        let label = t.sub;
        if (st.state === 'on') {
          const vol = typeof st.attributes.volume_level === 'number' ? ` · vol ${Math.round(st.attributes.volume_level * 100)}` : '';
          label = `Accesa${st.attributes.source ? ' · ' + st.attributes.source : ''}${vol}`;
        } else if (st.state === 'off' || unavail) label = 'Spenta';
        else if (st.state === 'playing') label = st.attributes.media_title || 'In riproduzione';
        else if (st.state === 'paused') label = 'In pausa';
        else if (st.state === 'idle') label = 'In attesa';
        else if (unavail) label = 'Non disponibile';
        sub.textContent = label;
      } else if (sub) {
        /* TV DLNA (es. Pluriuso 55"): 'unavailable' significa solo 'spenta', non un errore */
        sub.textContent = unavail ? 'Spenta' : t.sub;
      }
      if (btn) btn.style.background = st.state === 'on' ? 'rgba(52,199,89,0.35)' : '';
    });
  }
}

customElements.define('casa-dashboard-card', CasaDashboardCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'casa-dashboard-card',
  name: 'Casa Dashboard — Mission Control',
  description: 'Plancia di comando a schermata unica (no-scroll) per Casa Carestiato.',
});
