// utils/inspectImport.js
export function inspectImport(name, value) {
  // call early (top of component file) to record what was imported
  try {
    console.group(`inspectImport — ${name}`);
    console.log("VALUE:", value);
    console.log("TYPEOF:", typeof value);

    if (value && typeof value === "object") {
      console.log("keys:", Object.keys(value));
      // detect Radix-like shape
      const radixKeys = ["Root", "Trigger", "Content", "Arrow", "Provider"];
      const hasRadixShape = radixKeys.some(k => Object.prototype.hasOwnProperty.call(value, k));
      if (hasRadixShape) console.warn("Detected Radix-style component (object with subcomponents).");
    }
    if (typeof value === "function") {
      console.info("Looks like React component (function/class).");
      // helpful string of function source start
      try { console.log("fn signature:", value.name || "(anonymous)"); } catch(e) {}
    }
    console.groupEnd();
  } catch (e) {
    console.error("inspectImport failed", e);
  }
}

// Try to mirror logs to a local terminal log server (optional).
function _postClientLog(level, payload) {
  try {
    const url = 'http://localhost:4001/client-log'
    const body = JSON.stringify({ level, payload, ts: Date.now() })
    // Prefer sendBeacon for reliability on unload, fall back to fetch
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      try { navigator.sendBeacon(url, body) } catch (e) { /* ignore */ }
    } else if (typeof fetch === 'function') {
      try { fetch(url, { method: 'POST', body, headers: { 'Content-Type': 'application/json' }, keepalive: true }) } catch (e) { }
    }
  } catch (e) {}
}

// Export a helper used by components to forward important logs to terminal server
export function forwardClientLog(level, payload) {
  _postClientLog(level, payload);
}

