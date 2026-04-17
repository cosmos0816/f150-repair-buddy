# DECISIONS.md

## Product Decisions

### 1. Scope is locked
This product is only for:
- 2010 Ford F-150
- 5.4 Triton

Reason:
A narrow scope is more credible, easier to build, and more useful than a fake “all cars” assistant.

---

### 2. Camera-first experience
The live camera is the primary surface.

Reason:
This is an inspection tool, not a chat app.

---

### 3. TikTok-style session layout
The session screen uses:
- full-screen camera
- right-side action rail
- compact bottom live caption area
- secondary history/timeline drawer

Reason:
This keeps the truck/part in view and prevents UI clutter.

---

### 4. Compact conversation by default
The app should not show a giant full chat thread by default.

Reason:
Conversation is useful, but it should not overpower the camera.

---

### 5. Evidence-driven workflow
The app must collect:
- captures
- bookmarks
- conversation context
- timestamps

Reason:
Without structured evidence, the app is only a camera demo.

---

### 6. Bookmarking is core
Bookmarks are a first-class interaction, not a bonus feature.

Reason:
The user needs to quickly mark sounds, leaks, rust, connectors, light issues, and belt/pulley issues during live inspection.

---

### 7. Result categories stay simple
Use:
- DIY safe
- Inspect only
- Shop required

Reason:
This is easier to trust and easier to act on than vague AI wording.

---

### 8. Real AI must fail honestly
If Gemini Live is not actually connected or working, the app must show a real failure state.

Reason:
Fake mock chatter destroys trust.

---

### 9. Secrets stay server-side
`GEMINI_API_KEY` must never be exposed to the client.

Reason:
Security and billing protection.

---

### 10. Grounding before expansion
Truck-specific knowledge and references matter more than broad AI behavior.

Reason:
The app needs real part/symptom context, not generic assistant behavior.

---

### 11. Owner manual is useful but not enough
The Ford owner manual should be a grounded reference source, but not the only source.

Reason:
Owner manuals help with terminology, controls, and basic checks. Real repair reasoning needs structured symptom/part knowledge too.

---

### 12. Torch is optional
Torch should only be shown when supported.

Reason:
Mobile web torch support is inconsistent, especially on iPhone Safari.

---

### 13. Mock mode remains valuable
Mock mode should continue to exist even as real Gemini integration is added.

Reason:
It keeps local development usable when live AI is unavailable.