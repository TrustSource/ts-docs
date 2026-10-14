/*
 * Reading tools for the TrustSource Online Help:
 *  - text size controls (A- / A / A+), remembered per browser
 *  - read aloud via the browser's speech synthesis (Web Speech API).
 *    The text is spoken by the browser or operating system; this script sends nothing anywhere.
 * Works on every page of the site. No dependencies.
 */
(function () {
  "use strict";

  var KEY_SCALE = "ts-help-font-scale";
  var KEY_RATE = "ts-help-tts-rate";
  var KEY_VOICE = "ts-help-tts-voice";
  var KEY_OPEN = "ts-help-tools-open";
  var SCALES = [100, 115, 130, 150, 175, 200];
  var RATES = [0.75, 1, 1.25, 1.5, 2];
  var MAX_CHUNK = 180; // some engines stop long utterances after ~15 s

  function store(key, value) {
    try {
      if (value === undefined) { return window.localStorage.getItem(key); }
      window.localStorage.setItem(key, String(value));
    } catch (e) { /* storage may be blocked: the tools still work for this page */ }
    return null;
  }

  /* ---------- text size ---------- */

  var scaleIndex = 0;

  function applyScale() {
    var pct = SCALES[scaleIndex];
    document.documentElement.style.setProperty("--ts-fs", String(pct / 100));
    if (pct === 100) {
      document.documentElement.removeAttribute("data-ts-fs");
    } else {
      document.documentElement.setAttribute("data-ts-fs", String(pct));
    }
  }

  function loadScale() {
    var saved = parseInt(store(KEY_SCALE), 10);
    var idx = SCALES.indexOf(saved);
    scaleIndex = idx >= 0 ? idx : 0;
    applyScale();
  }

  // apply as early as possible to avoid a visible jump
  loadScale();

  /* ---------- read aloud ---------- */

  var synth = window.speechSynthesis;
  var canSpeak = !!(synth && window.SpeechSynthesisUtterance);
  var queue = [];      // [{el, text}]
  var position = 0;
  var state = "idle";  // idle | playing | paused
  var runId = 0;
  var rate = 1;
  var voiceName = "";
  var els = {};

  var SKIP = "pre, code.highlight, .headerlink, .md-feedback, .md-content__button, .md-source-file, " +
             ".md-typeset .tabbed-labels, script, style, nav, form, .ts-tools, [aria-hidden='true']";

  function clean(text) {
    return text
      .replace(/\[!(NOTE|TIP|CAUTION|WARNING|IMPORTANT)\]/gi, function (m, kind) {
        return kind.charAt(0).toUpperCase() + kind.slice(1).toLowerCase() + ".";
      })
      .replace(/¶/g, " ")
      .replace(/[←-⇿]/g, " to ")
      .replace(/[\u{1F300}-\u{1FAFF}☀-➿]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function ownText(node) {
    var clone = node.cloneNode(true);
    var drop = clone.querySelectorAll("ul, ol, pre, .headerlink, table, .md-clipboard, .twemoji");
    for (var i = 0; i < drop.length; i++) { drop[i].parentNode.removeChild(drop[i]); }
    return clean(clone.textContent || "");
  }

  function inSkipped(el, root) {
    var n = el;
    while (n && n !== root) {
      if (n.matches && n.matches(SKIP)) { return true; }
      n = n.parentNode;
    }
    return false;
  }

  function collectBlocks() {
    var root = document.querySelector(".md-content__inner") || document.querySelector("main");
    var out = [];
    if (!root) { return out; }
    var nodes = root.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li, tr, summary, .admonition-title, figcaption, dt, dd");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (inSkipped(el, root)) { continue; }
      var text;
      var tag = el.tagName;
      if (tag === "TR") {
        var cells = el.children, parts = [];
        for (var c = 0; c < cells.length; c++) {
          var t = ownText(cells[c]);
          if (t) { parts.push(t); }
        }
        text = parts.join(", ");
      } else if (tag === "P" && el.closest("td, th, li")) {
        continue; // read as part of the cell or list item
      } else if (el.closest("td, th") && tag !== "TR") {
        continue;
      } else {
        text = ownText(el);
        if (tag === "LI") {
          // list items often wrap their text in <p>
          var p = el.querySelector(":scope > p");
          if (p && !text) { text = ownText(p); }
        }
      }
      if (!text || /^screenshot:/i.test(text)) { continue; }
      out.push({el: el, text: text});
    }
    return out;
  }

  function splitText(text) {
    if (text.length <= MAX_CHUNK) { return [text]; }
    var sentences = text.match(/[^.!?;:]+[.!?;:]*\s*/g) || [text];
    var chunks = [], cur = "";
    for (var i = 0; i < sentences.length; i++) {
      var s = sentences[i];
      if ((cur + s).length > MAX_CHUNK && cur) { chunks.push(cur); cur = ""; }
      while (s.length > MAX_CHUNK) {
        var cut = s.lastIndexOf(" ", MAX_CHUNK);
        if (cut < 40) { cut = MAX_CHUNK; }
        chunks.push(s.slice(0, cut));
        s = s.slice(cut);
      }
      cur += s;
    }
    if (cur) { chunks.push(cur); }
    return chunks;
  }

  function pickVoice() {
    var voices = synth.getVoices() || [];
    var lang = (document.documentElement.lang || "en").toLowerCase();
    var base = lang.split("-")[0];
    var chosen = null, i;
    if (voiceName) {
      for (i = 0; i < voices.length; i++) { if (voices[i].name === voiceName) { chosen = voices[i]; break; } }
    }
    if (!chosen) {
      for (i = 0; i < voices.length; i++) {
        if (voices[i].lang && voices[i].lang.toLowerCase().indexOf(base) === 0) {
          if (voices[i].localService || !chosen) { chosen = voices[i]; }
        }
      }
    }
    return {voice: chosen, lang: chosen ? chosen.lang : lang};
  }

  function mark(index) {
    var prev = document.querySelectorAll(".ts-reading");
    for (var i = 0; i < prev.length; i++) { prev[i].classList.remove("ts-reading"); }
    if (index == null || !queue[index]) { return; }
    var el = queue[index].el;
    el.classList.add("ts-reading");
    var rect = el.getBoundingClientRect();
    if (rect.top < 80 || rect.bottom > window.innerHeight - 80) {
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({block: "center", behavior: reduce ? "auto" : "smooth"});
    }
  }

  function setState(next) {
    state = next;
    if (!els.play) { return; }
    var playing = state === "playing";
    els.play.setAttribute("aria-pressed", playing ? "true" : "false");
    els.play.setAttribute("aria-label", playing ? "Pause reading" : (state === "paused" ? "Resume reading" : "Read page aloud"));
    els.play.setAttribute("title", els.play.getAttribute("aria-label"));
    els.play.textContent = playing ? "⏸" : "▶";
    els.stop.disabled = state === "idle";
    els.prev.disabled = state === "idle";
    els.next.disabled = state === "idle";
    var label = state === "idle" ? "" : (state === "paused" ? "Paused" : "Reading " + (position + 1) + " of " + queue.length);
    els.status.textContent = label;
  }

  function speakBlock(id) {
    if (id !== runId) { return; }
    if (position >= queue.length) { stop(); return; }
    mark(position);
    setState(state === "paused" ? "paused" : "playing");
    var chunks = splitText(queue[position].text);
    var picked = pickVoice();
    var n = 0;
    (function next() {
      if (id !== runId) { return; }
      if (n >= chunks.length) { position += 1; speakBlock(id); return; }
      var u = new window.SpeechSynthesisUtterance(chunks[n]);
      u.rate = rate;
      u.lang = picked.lang;
      if (picked.voice) { u.voice = picked.voice; }
      u.onend = function () { n += 1; next(); };
      u.onerror = function (ev) {
        if (id !== runId) { return; }
        if (ev && (ev.error === "canceled" || ev.error === "interrupted")) { return; }
        stop();
        if (els.status) { els.status.textContent = "Reading is not available in this browser."; }
      };
      synth.speak(u);
    })();
  }

  function startFrom(index) {
    synth.cancel();
    runId += 1;
    position = Math.max(0, Math.min(index, queue.length - 1));
    state = "playing";
    speakBlock(runId);
  }

  function selectionBlocks() {
    var sel = window.getSelection && window.getSelection();
    var text = sel ? clean(sel.toString()) : "";
    if (!text) { return null; }
    var anchor = sel.anchorNode && (sel.anchorNode.nodeType === 1 ? sel.anchorNode : sel.anchorNode.parentElement);
    return [{el: anchor || document.body, text: text}];
  }

  function play() {
    if (!canSpeak) { return; }
    if (state === "playing") { synth.pause(); setState("paused"); return; }
    if (state === "paused") { synth.resume(); setState("playing"); return; }
    var selected = selectionBlocks();
    queue = selected || collectBlocks();
    if (!queue.length) {
      if (els.status) { els.status.textContent = "Nothing to read on this page."; }
      return;
    }
    startFrom(0);
  }

  function stop() {
    runId += 1;
    if (canSpeak) { synth.cancel(); }
    mark(null);
    position = 0;
    setState("idle");
  }

  function skip(delta) {
    if (state === "idle") { return; }
    var wasPaused = state === "paused";
    var target = position + delta;
    if (target < 0) { target = 0; }
    if (target >= queue.length) { stop(); return; }
    startFrom(target);
    if (wasPaused) { synth.pause(); setState("paused"); }
  }

  /* ---------- toolbar ---------- */

  function button(label, text, cls) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "ts-tools__btn" + (cls ? " " + cls : "");
    b.setAttribute("aria-label", label);
    b.setAttribute("title", label);
    b.textContent = text;
    return b;
  }

  function buildVoiceOptions(select) {
    var voices = synth.getVoices() || [];
    var base = (document.documentElement.lang || "en").toLowerCase().split("-")[0];
    select.innerHTML = "";
    var auto = document.createElement("option");
    auto.value = "";
    auto.textContent = "Automatic voice";
    select.appendChild(auto);
    for (var i = 0; i < voices.length; i++) {
      if (!voices[i].lang || voices[i].lang.toLowerCase().indexOf(base) !== 0) { continue; }
      var o = document.createElement("option");
      o.value = voices[i].name;
      o.textContent = voices[i].name + " (" + voices[i].lang + ")";
      select.appendChild(o);
    }
    select.value = voiceName;
    if (select.value !== voiceName) { select.value = ""; }
  }

  function build() {
    if (document.querySelector(".ts-tools")) { return; }

    var wrap = document.createElement("div");
    wrap.className = "ts-tools";
    wrap.setAttribute("role", "region");
    wrap.setAttribute("aria-label", "Reading tools");

    var toggle = button("Open reading tools: text size and read aloud", "Aa", "ts-tools__toggle");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "ts-tools-panel");

    var panel = document.createElement("div");
    panel.className = "ts-tools__panel";
    panel.id = "ts-tools-panel";
    panel.hidden = true;

    /* text size */
    var sizeRow = document.createElement("div");
    sizeRow.className = "ts-tools__row";
    var sizeLabel = document.createElement("span");
    sizeLabel.className = "ts-tools__label";
    sizeLabel.textContent = "Text size";
    var smaller = button("Decrease text size", "A−");
    var reset = button("Reset text size", "A", "ts-tools__reset");
    var larger = button("Increase text size", "A+");
    var sizeValue = document.createElement("span");
    sizeValue.className = "ts-tools__value";
    sizeValue.setAttribute("aria-live", "polite");
    sizeRow.appendChild(sizeLabel);
    sizeRow.appendChild(smaller);
    sizeRow.appendChild(reset);
    sizeRow.appendChild(larger);
    sizeRow.appendChild(sizeValue);
    panel.appendChild(sizeRow);

    function refreshSize() {
      sizeValue.textContent = SCALES[scaleIndex] + "%";
      smaller.disabled = scaleIndex === 0;
      larger.disabled = scaleIndex === SCALES.length - 1;
    }
    function changeScale(idx) {
      scaleIndex = Math.max(0, Math.min(SCALES.length - 1, idx));
      applyScale();
      store(KEY_SCALE, SCALES[scaleIndex]);
      refreshSize();
    }
    smaller.addEventListener("click", function () { changeScale(scaleIndex - 1); });
    larger.addEventListener("click", function () { changeScale(scaleIndex + 1); });
    reset.addEventListener("click", function () { changeScale(0); });
    refreshSize();

    /* read aloud */
    var ttsRow = document.createElement("div");
    ttsRow.className = "ts-tools__row";
    var ttsLabel = document.createElement("span");
    ttsLabel.className = "ts-tools__label";
    ttsLabel.textContent = "Read aloud";
    ttsRow.appendChild(ttsLabel);

    if (canSpeak) {
      els.prev = button("Previous paragraph", "⏮");
      els.play = button("Read page aloud", "▶", "ts-tools__play");
      els.stop = button("Stop reading", "⏹");
      els.next = button("Next paragraph", "⏭");
      els.status = document.createElement("span");
      els.status.className = "ts-tools__status";
      els.status.setAttribute("role", "status");
      els.status.setAttribute("aria-live", "polite");
      ttsRow.appendChild(els.prev);
      ttsRow.appendChild(els.play);
      ttsRow.appendChild(els.stop);
      ttsRow.appendChild(els.next);
      panel.appendChild(ttsRow);

      var optRow = document.createElement("div");
      optRow.className = "ts-tools__row ts-tools__row--wrap";
      var speed = document.createElement("select");
      speed.className = "ts-tools__select";
      speed.setAttribute("aria-label", "Reading speed");
      for (var r = 0; r < RATES.length; r++) {
        var o = document.createElement("option");
        o.value = String(RATES[r]);
        o.textContent = RATES[r] + "×";
        speed.appendChild(o);
      }
      var savedRate = parseFloat(store(KEY_RATE));
      rate = RATES.indexOf(savedRate) >= 0 ? savedRate : 1;
      speed.value = String(rate);
      speed.addEventListener("change", function () {
        rate = parseFloat(speed.value);
        store(KEY_RATE, rate);
        if (state === "playing") { var at = position; startFrom(at); }
      });
      var voice = document.createElement("select");
      voice.className = "ts-tools__select ts-tools__select--voice";
      voice.setAttribute("aria-label", "Voice");
      voiceName = store(KEY_VOICE) || "";
      buildVoiceOptions(voice);
      if (synth.addEventListener) {
        synth.addEventListener("voiceschanged", function () { buildVoiceOptions(voice); });
      }
      voice.addEventListener("change", function () {
        voiceName = voice.value;
        store(KEY_VOICE, voiceName);
        if (state === "playing") { var at = position; startFrom(at); }
      });
      optRow.appendChild(speed);
      optRow.appendChild(voice);
      panel.appendChild(optRow);
      panel.appendChild(els.status);

      var hint = document.createElement("p");
      hint.className = "ts-tools__hint";
      hint.textContent = "Select text first to hear only that part. The voice comes from your browser or operating system.";
      panel.appendChild(hint);

      els.play.addEventListener("click", play);
      els.stop.addEventListener("click", stop);
      els.prev.addEventListener("click", function () { skip(-1); });
      els.next.addEventListener("click", function () { skip(1); });
      setState("idle");
    } else {
      var na = document.createElement("span");
      na.className = "ts-tools__status";
      na.textContent = "Not supported by this browser.";
      ttsRow.appendChild(na);
      panel.appendChild(ttsRow);
    }

    function setOpen(open) {
      panel.hidden = !open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      store(KEY_OPEN, open ? "1" : "0");
    }
    toggle.addEventListener("click", function () { setOpen(panel.hidden); });
    wrap.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && !panel.hidden) { setOpen(false); toggle.focus(); }
    });

    wrap.appendChild(panel);
    wrap.appendChild(toggle);
    document.body.appendChild(wrap);
    setOpen(store(KEY_OPEN) === "1");
  }

  function init() {
    loadScale();
    build();
  }

  window.addEventListener("pagehide", function () { if (canSpeak) { synth.cancel(); } });

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(function () { stop(); init(); });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
