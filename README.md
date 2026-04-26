# Rathnavel Pon — Personal Landing Page

Premium personal brand landing page for **Rathnavel Ponnuswami**.

Live at: **ponrathnavel.io** (after DNS setup)

---

## How to Deploy on GitHub Pages — Step by Step

### STEP 1 — Create a GitHub account
Go to **github.com** and sign up (free)

---

### STEP 2 — Create a new repository

1. After logging in, click the **+** icon (top right) → **New repository**
2. Set **Repository name** to exactly: `rathnavel-pon`
3. Set visibility to **Public**
4. Leave everything else as default
5. Click **Create repository**

---

### STEP 3 — Install Git on your computer

Download from: https://git-scm.com/downloads

After installing, open **Terminal** (Mac/Linux) or **Command Prompt** (Windows)

---

### STEP 4 — Upload the project

Run these commands one by one. Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

```bash
cd ponrathnavel
npm install
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/rathnavel-pon.git
git branch -M main
git push -u origin main
```

---

### STEP 5 — Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

Your site goes live in ~2 minutes at:
`https://YOUR_GITHUB_USERNAME.github.io/rathnavel-pon`

---

## Connect Your Custom Domain (ponrathnavel.io)

### STEP 6 — Change base URL in vite.config.ts

Open `vite.config.ts` and change:
```ts
base: '/rathnavel-pon/',
```
to:
```ts
base: '/',
```

Then push:
```bash
git add .
git commit -m "Set base for custom domain"
git push
```

---

### STEP 7 — Add domain in GitHub

1. Repo → **Settings** → **Pages**
2. Under **Custom domain**, type: `ponrathnavel.io`
3. Click **Save**
4. Tick **Enforce HTTPS**

---

### STEP 8 — Update DNS records

In your domain registrar (GoDaddy, Namecheap, etc.) add these records:

| Type  | Name | Value                                   |
|-------|------|-----------------------------------------|
| A     | @    | 185.199.108.153                         |
| A     | @    | 185.199.109.153                         |
| A     | @    | 185.199.110.153                         |
| A     | @    | 185.199.111.153                         |
| CNAME | www  | YOUR_GITHUB_USERNAME.github.io          |

DNS takes 10 minutes to 24 hours to go live.

---

## Updating Content Later

Edit files, then:
```bash
git add .
git commit -m "Updated content"
git push
```
GitHub Actions rebuilds and redeploys automatically.

---

## Project Structure

```
ponrathnavel/
├── .github/workflows/deploy.yml   <- Auto-deploy (do not touch)
├── public/
│   ├── favicon.svg
│   └── CNAME                      <- Your custom domain
├── src/
│   ├── main.tsx
│   ├── index.css
│   └── App.tsx                    <- All page content lives here
├── index.html                     <- SEO meta tags
├── vite.config.ts                 <- Change base here for custom domain
└── package.json
```
