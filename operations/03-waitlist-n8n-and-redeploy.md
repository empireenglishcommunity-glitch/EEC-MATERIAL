# Wire the Waitlist to n8n + Redeploy the Site (v1.0)

> **Purpose:** Make the live site's waitlist **actually capture leads** (into your existing n8n) and push
> the latest site (free-guide page + success CTA) live. The site's `/api/waitlist` already forwards to
> `WAITLIST_WEBHOOK_URL` if set — we just create the n8n webhook and set that env var, then redeploy.
> We do this together: you run the steps, I adjust.

---

## Part A — Create the n8n webhook (captures leads)

In your n8n (`bot.empireenglish.online`):
1. **New workflow** → add a **Webhook** node:
   - HTTP Method: **POST**
   - Path: `eec-waitlist`
   - (Copy the **Production URL** — it'll look like `https://bot.empireenglish.online/webhook/eec-waitlist`)
2. Add what you want to do with each lead (any/all):
   - **Google Sheets → Append row** (name, contact, country, goal, level, source, submittedAt), or
   - **Telegram → Send message** (instant lead alert to you), or
   - Email, Airtable, etc.
   - The incoming JSON fields are: `name, contact, email?, country, goal, level, source, submittedAt`.
3. **Activate** the workflow (toggle top-right). Test-fire once if you like.

*(The site sends a plain JSON POST — no auth header. If you want a shared secret, tell me and I'll add a header check to the API route.)*

---

## Part B — Set the env + redeploy (on the VPS)

```bash
ssh root@77.42.43.250

# 1) update the code (pull the branch, refresh the app copy)
cd /opt/EEC-MATERIAL && git pull
cp -r /opt/EEC-MATERIAL/web/. /opt/eec-web/   # note: your .env is NOT in the repo, so it's preserved

# 2) set the webhook URL
cd /opt/eec-web
nano .env
#   WAITLIST_WEBHOOK_URL=https://bot.empireenglish.online/webhook/eec-waitlist

# 3) rebuild + restart
docker compose up -d --build
docker compose ps            # eec-web should be "Up"
```

---

## Part C — Verify end to end
```bash
# local check on the box
curl -I http://127.0.0.1:8080/ar/guide          # expect 200 (new free-guide page)
curl -s -X POST http://127.0.0.1:8080/api/waitlist -H "Content-Type: application/json" \
  -d '{"name":"Test","contact":"t@t.com","country":"EG","goal":"Work","level":"Beginner"}'
# expect {"ok":true}  AND the lead should appear in your n8n (sheet/Telegram)
```
Then publicly:
- Visit `https://empireenglish.online/ar/waitlist` → submit the form → you should get the **"Get your free guide →"** button, and the lead should land in **n8n**.
- Visit `https://empireenglish.online/ar/guide` → the free 5-sounds guide page.

---

## Notes
- If leads don't reach n8n: confirm the workflow is **Active**, the URL is the **Production** one (not test), and `WAITLIST_WEBHOOK_URL` is set in `/opt/eec-web/.env` (then `docker compose up -d --build` again).
- Want a shared-secret header on the webhook for security? Say the word — quick add to `/api/waitlist`.

*Traceability: activates R6/R10 lead capture on the live site (3C.1) via the existing n8n; ships the
lead-magnet `/guide` page + waitlist success CTA.*
