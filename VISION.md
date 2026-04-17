# VISION.md

## Product Vision
A speech-to-speech AI repair buddy that knows the 2010 Ford F-150 FX4 5.4 Triton inside and out. Point your phone at any part of the truck, talk naturally, and get instant practical guidance — what's wrong, what to buy, where to buy it, and whether to fix it yourself or take it to a shop.

## Six pillars

### 1. Real-time speech-to-speech
Talk to it, it talks back. No typing, no buttons, no delay. Like having a knowledgeable friend standing next to you while you're under the truck. Gemini Live handles this — already working.

### 2. Deep truck knowledge
The bot must know the 2010 F-150 FX4 5.4 Triton as well as an experienced owner. Not generic car advice — specific knowledge:
- Every part, what it looks like healthy, what it looks like failing
- Common failure modes for this specific engine (cam phaser rattle, spark plug breakage, exhaust manifold studs, VCT solenoids)
- Available replacement parts with prices from RockAuto
- Practical tips from forums and owner experience
- Korean mechanic context (import costs, part availability)

### 3. Trustworthy session report
After a single inspection session, produce a report that's good enough to hand to a mechanic. Contains:
- Diagnosis with confidence level
- Captured photos of problem areas
- Recommended parts with RockAuto part numbers and prices
- Self-repair tips for DIY-safe items
- Clear "take this to a shop" escalation for dangerous/complex items
- Available in Korean for the mechanic

### 4. Visual part recognition
The bot should know what it's looking at. When pointed at a part:
- Identify the part (or area) from visual appearance
- Know what healthy vs failing looks like for that specific part
- Recognize rust severity, leak patterns, wear indicators, cracking
- Understand failing sounds described by the owner (chirp, whine, knock, rattle)

### 5. Fast, direct answers
No hedging, no generic disclaimers, no "I recommend consulting a professional." Be direct:
- "That's rust on the lower control arm. It's cracking. Replace it before it fails."
- "The serpentine belt looks glazed. $15 part, 10-minute job. Do it yourself."
- "That noise is the power steering motor. Normal at full lock. Don't worry about it."
Powered by Gemini for low-latency voice responses.

### 6. Self-correcting
If the bot isn't sure, it should say so and ask for a better view — not guess or loop on "I can't see." Good behavior:
- "I see heavy corrosion but I can't tell if that's the control arm or the sway bar. Move the camera down and to the left."
- "That looks like it could be a coolant leak but the image is blurry. Hold still for two seconds."
- "Earlier I said the belt looked fine but now I see glazing on the back side. Let me update — you should replace it."
The final report should be better than any single turn because it aggregates everything seen during the session.
