# ============================================================================
# partsunion-landing-page — Next.js 16 with output: export → static via serve
# ============================================================================
FROM node:22.23.2-alpine@sha256:c610fcdfb1d5b4740dd70c284ed3cb16bb857e0f7166196e36a5501df7a3aa32 AS deps

WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund --no-progress

# ---- Production dependencies (locked runtime server only) ----
FROM node:22.23.2-alpine@sha256:c610fcdfb1d5b4740dd70c284ed3cb16bb857e0f7166196e36a5501df7a3aa32 AS production-deps

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund --no-progress

# ---- Builder ----
FROM node:22.23.2-alpine@sha256:c610fcdfb1d5b4740dd70c284ed3cb16bb857e0f7166196e36a5501df7a3aa32 AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- Runtime (serve static export from /out) ----
FROM node:22.23.2-alpine@sha256:c610fcdfb1d5b4740dd70c284ed3cb16bb857e0f7166196e36a5501df7a3aa32 AS runner

WORKDIR /app

# The runtime never invokes npm or Corepack. Remove their bundled package trees
# so build tooling (including tar/pacote/sigstore) is not shipped to production,
# and install the current Alpine OpenSSL security fixes over the pinned base.
RUN apk upgrade --no-cache libcrypto3 libssl3 \
    && rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack \
    && rm -f /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack \
       /usr/local/bin/pnpm /usr/local/bin/pnpx /usr/local/bin/yarn /usr/local/bin/yarnpkg

ARG VCS_REF=unknown
ARG BUILD_DATE=unknown
ARG APP_RELEASE=landingpage@unversioned
ARG VCS_REPOSITORY=https://github.com/Partsunion/landingpage
LABEL org.opencontainers.image.source="$VCS_REPOSITORY" \
      org.opencontainers.image.revision="$VCS_REF" \
      org.opencontainers.image.created="$BUILD_DATE" \
      org.opencontainers.image.version="$APP_RELEASE"

ENV NODE_ENV=production \
    PORT=8080 \
    APP_RELEASE="$APP_RELEASE" \
    GIT_COMMIT_SHA="$VCS_REF" \
    BUILD_DATE="$BUILD_DATE"

# Next.js with output: export drops the static site in out/
COPY --from=builder /app/out ./out
# `_headers` is hosting-provider metadata, not a public asset. The canonical
# production Caddyfile applies these headers and explicitly rejects this path.
RUN rm -f ./out/_headers
COPY --from=production-deps /app/node_modules ./node_modules
COPY package.json ./
COPY server.mjs ./
COPY lib/static-segments.mjs lib/compressed-assets.mjs ./lib/

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD wget -q --spider http://127.0.0.1:8080/ || exit 1

# Audit H-9: serve as the built-in non-root `node` user (port 8080 > 1024).
USER node
CMD ["node", "server.mjs"]
