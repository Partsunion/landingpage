# ============================================================================
# partsunion-landing-page — Next.js 16 with output: export → static via serve
# ============================================================================
FROM node:22-alpine AS deps

WORKDIR /app
COPY package*.json ./
RUN npm install --no-audit --no-fund --no-progress

# ---- Builder ----
FROM node:22-alpine AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- Runtime (serve static export from /out) ----
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

RUN npm install -g serve@14

# Next.js with output: export drops the static site in out/
COPY --from=builder /app/out ./out

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD wget -q --spider http://localhost:8080/ || exit 1

CMD ["serve", "out", "-l", "8080", "--no-clipboard"]
