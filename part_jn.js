    const t = await fetch(`${this.endpoint}/identify`, {
      method: "POST",
      headers: this._getPostInitializationHeaders(),
      body: JSON.stringify(e)
    });
    return t.ok ? !0 : (console.info(
      `Vantara: Failed to identify user: ${t.status} ${t.statusText}`
    ), !1);
  }
  async sendEvents(e) {
    try {
      const t = await fetch(`${this.endpoint}/batch`, {
        method: "POST",
        headers: this._getPostInitializationHeaders(),
        body: JSON.stringify({
          batchStartedAt: e[0].timestamp,
          eventsString: JSON.stringify(e)
        })
      });
      if (!t.ok)
        throw new Error(
          `Vantara: Got non-OK events response: ${t.statusText}`
        );
      const i = await t.json();
      return i.success ? !0 : (i.shouldRestartSession && (sessionStorage.removeItem("sessionId"), this.state = {
        type: "initializing"
        /* Initializing */
      }, await this.startOrRestartOrResumeSession(), console.info("Vantara: Restarted session")), !1);
    } catch (t) {
      return console.debug(
        "Vantara: Failed to send events, will retry automatically",
        t
      ), !1;
    }
  }
  _getPostInitializationHeaders() {
    if (this.state.type !== "ready")
      throw new Error(
        "Vantara: Library initialization not started. Call init() first."
      );
    return {
      ...Vi,
      "X-Vantara-Product-Id": this.productId,
      "X-Vantara-Client-Key": this.clientKey,
      "X-Vantara-Session-Id": this.state.sessionId
    };
  }
  clearRetryTimeout() {
    this.retryTimeout !== null && (clearTimeout(this.retryTimeout), this.retryTimeout = null);
  }
  scheduleRetry() {
    if (this.clearRetryTimeout(), this.retryCount < Cf) {
      const e = vf * Math.pow(2, this.retryCount);
      this.retryCount++, this.retryTimeout = window.setTimeout(() => {
        this.tryToSendEvents();
      }, e);
    } else
      console.warn("Vantara: Max retry count reached for sending events."), this.retryCount = 0;
  }
  async tryToSendEvents() {
    if (this.clearRetryTimeout(), this.isSending || this.events.length === 0) return;
    if (this.isSending = !0, this.events.length > Gi) {
      const i = this.events.length - Gi;
      this.events.splice(0, i), console.warn(
        `Vantara: Buffer exceeded maximum size. Dropped ${i} oldest events.`
      );
    }
    const e = Math.min(this.events.length, 1e3), t = this.events.slice(0, e);
    await this.sendEvents(t) ? (this.events.splice(0, t.length), this.lastSendTime = Date.now(), this.retryCount = 0) : this.scheduleRetry(), this.isSending = !1;
  }
  pushEvent(e) {
    this.events.push(e), (this.events.length >= 100 || // Send more frequently for smaller batches too
    Date.now() - this.lastSendTime >= ji && this.events.length > 0) && (this.clearRetryTimeout(), setTimeout(() => void this.tryToSendEvents(), 0));
  }
  startRecording() {
    if (this.stopRrwebRecording) {
      console.debug("Vantara: Recording already in progress");
      return;
    }
    this.stopRrwebRecording = ft({
      emit: (e) => this.pushEvent(e),
      maskAllInputs: !0
    }) ?? null, this.lastSendTime = Date.now(), this.flushInterval === null && (this.flushInterval = window.setInterval(() => {
      this.events.length > 0 && Date.now() - this.lastSendTime >= ji && this.tryToSendEvents();
    }, If));
  }
  stopRecording(e = !1) {
    this.stopRrwebRecording && (this.stopRrwebRecording(), this.stopRrwebRecording = null), this.flushInterval !== null && (clearInterval(this.flushInterval), this.flushInterval = null), e && (this.events.length = 0), this.events.length > 0 && this.tryToSendEvents();
  }
};
X(be, "currentSession", null);
let te = be, Xe = null;
const He = [];
function Vo() {
  if (!te.currentSession || te.currentSession.state.type !== Fe.Ready)
    return;
  const s = [];
  for (const e of He)
    try {
      e.callback(), s.push(e), console.debug(`Vantara: Completed '${e.method}'`);
