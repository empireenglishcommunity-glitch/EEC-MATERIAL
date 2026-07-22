# Deploying the EEC website to the Hetzner VPS

Target: `empireenglish.online` (root domain), served by a Dockerized Next.js standalone
server on the Hetzner VPS, routed through the existing Cloudflare Tunnel. Follows the
established `/opt/<app>/` + `127.0.0.1:PORT` convention.

> We do these steps **together** — you run the commands on the VPS; I prepared everything here.

## 1. Get the code onto the VPS
```bash
ssh root@77.42.43.250
mkdir -p /opt/eec-web
# then copy the web/ folder here, e.g. via git:
#   git clone <repo> /tmp/eec && cp -r /tmp/eec/web/* /opt/eec-web/
# (or rsync/scp the web/ directory to /opt/eec-web/)
cd /opt/eec-web
```

## 2. Configure environment (optional but recommended)
```bash
cp .env.example .env
# set WAITLIST_WEBHOOK_URL to your n8n webhook so waitlist leads flow into n8n:
#   WAITLIST_WEBHOOK_URL=https://bot.empireenglish.online/webhook/eec-waitlist
nano .env
```

## 3. Build & run
```bash
docker compose up -d --build
# verify locally on the box:
curl -I http://127.0.0.1:8080/ar   # expect 200
```

## 4. Route the domain via Cloudflare Tunnel
Add an ingress entry in `/root/.cloudflared/config.yml` (above the catch-all `service: http_status:404`):
```yaml
  - hostname: empireenglish.online
    service: http://localhost:8080
  - hostname: www.empireenglish.online
    service: http://localhost:8080
```
Create the DNS routes (Cloudflare will add proxied CNAMEs to the tunnel):
```bash
cloudflared tunnel route dns <your-tunnel-name> empireenglish.online
cloudflared tunnel route dns <your-tunnel-name> www.empireenglish.online
```
Restart the tunnel:
```bash
systemctl restart cloudflared    # or: docker restart cloudflared
```

## 5. Verify
- Visit `https://empireenglish.online` → should redirect to `/ar` (Arabic, RTL).
- `https://empireenglish.online/en` → English (LTR).
- Submit the waitlist form → check n8n received the lead (or container logs if no webhook).

## 6. (Optional) Hook into existing ops
- Add `eec-web` to the watchdog health-check list.
- Add `/opt/eec-web` (and `.env`) to the daily backup routine.

## Updating the site later (redeploy)

The repo is cloned at `/opt/EEC-MATERIAL` and the app copy runs from `/opt/eec-web`
(your `.env` lives only in `/opt/eec-web` and is preserved across updates).

```bash
ssh root@77.42.43.250

# 1) pull the latest code on the working branch
cd /opt/EEC-MATERIAL
git fetch origin
git checkout spec/eec-learning-ecosystem
git pull

# 2) refresh the app copy (preserves /opt/eec-web/.env, which is not in the repo)
cp -r /opt/EEC-MATERIAL/web/. /opt/eec-web/

# 3) rebuild + restart
cd /opt/eec-web
docker compose up -d --build
docker compose ps            # eec-web should be "Up"
```

Verify the new build on the box:
```bash
curl -I http://127.0.0.1:8080/ar                                  # 200 (site)
curl -I http://127.0.0.1:8080/coursebook/eec-stage0-student.pdf   # 200, application/pdf
```

### What ships in this build
- **55 finished Stage-0 lessons** embedded in the portal (both editions from one source).
- The **Empire Coursebook PDFs** are baked into the image (Dockerfile copies `public/`)
  and served at `/coursebook/eec-stage0-student.pdf` and `/coursebook/eec-stage0-teacher.pdf`.
  The Student's Edition is also linked from the portal dashboard.
- Regenerate the PDFs anytime with the pipeline in `tools/pdf/` (see its README), then
  redeploy. They are committed under `web/public/coursebook/`, so a fresh `git pull` +
  `docker compose up -d --build` publishes the current books automatically.

## Resource note
Capped at 512MB / 0.75 CPU in `docker-compose.yml` — comfortable alongside n8n on the
4GB box. Adjust limits if needed.
