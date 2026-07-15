---
title: Real-Time Notes App
repoUrl: https://github.com/tirth2801/google-keep-clone
liveUrl: https://note-keeper-application.netlify.app/
image: googleKeep.jpg
order: 3
stack: [React]
outcome: "Instant add/edit/delete with zero perceived latency"
---

**Problem:** recreate the responsiveness of Google Keep's note-taking UX —
adds, edits, and deletes should feel instant, with no page reloads.

**Approach:** a React app driven entirely by hooks and props-based state
management, with conditional rendering handling the note grid's live updates.

- Real-time add, edit, and delete with immediate UI feedback.
- Conditional rendering for empty/populated states.
- Hooks-based state management, no external state library needed.
