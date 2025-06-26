    data: {
      tag: s,
      payload: e
    }
  });
};
ft.freezePage = () => {
  Ce.forEach((s) => s.freeze());
};
ft.takeFullSnapshot = (s) => {
  if (!rr)
    throw new Error("please take full snapshot after start recording");
  Vt(s);
};
ft.mirror = se;
var Wi;
(function(s) {
  s[s.NotStarted = 0] = "NotStarted", s[s.Running = 1] = "Running", s[s.Stopped = 2] = "Stopped";
})(Wi || (Wi = {}));
const Vi = {
  "Content-Type": "application/json",
  "X-Vantara-Time-Zone": Intl.DateTimeFormat().resolvedOptions().timeZone
}, bf = "https://in.vantara.ai", Gi = 5e3, Cf = 5, vf = 2e3, If = 3e4, ji = 1e4;
var Fe = /* @__PURE__ */ ((s) => (s.Initializing = "initializing", s.Ready = "ready", s))(Fe || {});
const be = class be {
  constructor(e, t, r, i, n) {
    X(this, "productId");
    X(this, "clientKey");
    X(this, "endpoint");
    X(this, "sessionInfo");
    X(this, "state");
    X(this, "lastSendTime", Date.now());
    X(this, "isSending", !1);
    X(this, "retryCount", 0);
    X(this, "retryTimeout", null);
    X(this, "flushInterval", null);
    X(this, "events", []);
    X(this, "stopRrwebRecording", null);
    if (!e.startsWith("prd_") || e.length !== 30)
      throw new Error(
        "Vantara: Invalid product ID, product ID must start with 'prd_' and be 30 characters long"
      );
    if (!t.startsWith("key_"))
      throw new Error(
        "Vantara: Invalid client key, client key must start with 'key_'"
      );
    this.productId = e, this.clientKey = t, this.endpoint = r, this.sessionInfo = i, this.state = n;
  }
  static async initializeAsync(e, t, r, i) {
    return be.currentSession = new be(
      e,
      t,
      i ?? bf,
      r,
      {
        type: "initializing"
        /* Initializing */
      }
    ), await be.currentSession.startOrRestartOrResumeSession();
  }
  static reset() {
    be.currentSession = null;
  }
  async startOrRestartOrResumeSession() {
    if (this.stopRecording(), this.state.type !== "initializing")
      throw new Error(
        "Vantara: Unexpected state - starting session when not initializing"
      );
    const e = sessionStorage.getItem("sessionId"), t = await fetch(`${this.endpoint}/session`, {
      method: "POST",
      headers: {
        ...Vi,
        "X-Vantara-Product-Id": this.productId,
        "X-Vantara-Client-Key": this.clientKey,
        ...e ? {
          "X-Vantara-Session-Id": e
        } : {}
      },
      body: JSON.stringify({
        environment: this.sessionInfo.environment,
        version: this.sessionInfo.version,
        extra: this.sessionInfo.metadata
      })
    });
    if (!t.ok)
      return console.warn(
        `Vantara: Failed to initialize session: ${t.statusText}`
      ), !1;
    const i = await t.json();
    if (!i.sampled)
      return console.debug("Vantara: Session not sampled, will not record"), !1;
    if (!i.sessionId)
      return console.warn("Vantara: No session ID received, will not record"), !1;
    const n = i.sessionId;
    return sessionStorage.setItem("sessionId", n), this.state = {
      type: "ready",
      sessionId: n
    }, console.debug(e === n ? "Vantara: Resumed session" : "Vantara: Started session"), this.startRecording(), !0;
  }
  async identify(e) {
