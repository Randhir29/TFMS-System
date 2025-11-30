// hooks/useInspectDom.js
import { useEffect } from "react";

export function useInspectDom(ref, label = "ref") {
  useEffect(() => {
    if (!ref || !ref.current) {
      console.warn("useInspectDom: no ref available yet for", label);
      return;
    }
    const el = ref.current;
    console.group(`useInspectDom — ${label}`);
    console.log("DOM element:", el);
    console.log("tagName:", el.tagName, "id:", el.id, "classList:", [...el.classList]);
    // computed style snapshot
    const cs = getComputedStyle(el);
    const snapshot = {
      display: cs.display,
      position: cs.position,
      zIndex: cs.zIndex,
      pointerEvents: cs.pointerEvents,
      transform: cs.transform,
      top: cs.top,
      left: cs.left,
      right: cs.right,
      width: cs.width,
      height: cs.height,
      background: cs.background,
      color: cs.color,
    };
    console.log("computedStyleSnapshot:", snapshot);
    // print applicable stylesheet rules (best-effort)
    try {
      const sheets = [...document.styleSheets];
      const matches = [];
      for (const s of sheets) {
        try {
          const rules = s.cssRules || s.rules;
          for (const r of rules) {
            try {
              if (r.selectorText && el.matches(r.selectorText)) matches.push(r.cssText);
            } catch {}
          }
        } catch {}
      }
      console.log("matching CSS rules (first 30):", matches.slice(0,30));
    } catch (e) {
      console.warn("Could not enumerate stylesheet rules (CORS or sheet restrictions).");
    }
    console.groupEnd();

    // mirror the important snapshot to local terminal (optional)
    try {
      const payload = { label, snapshot };
      const url = 'http://localhost:4001/client-log';
      const body = JSON.stringify({ level: 'info', payload, ts: Date.now() });
      if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
        try { navigator.sendBeacon(url, body) } catch (e) {}
      } else if (typeof fetch === 'function') {
        try { fetch(url, { method: 'POST', body, headers: { 'Content-Type': 'application/json' }, keepalive: true }) } catch (e) {}
      }
    } catch (e) { /* ignore */ }
  }, [ref, label]);
}
