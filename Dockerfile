# syntax=docker/dockerfile:1.4

#############################
# Base image with Node and pnpm
FROM node:18-slim AS base

ENV PNPM_HOME=/usr/local/share/.pnpm
ENV PATH=$PNPM_HOME:$PATH

# Install pnpm
RUN npm install -g pnpm@9.6.0

WORKDIR /app

#############################
# Build backend
FROM base AS backend
WORKDIR /app/backend

# Copy workspace file and backend manifest
COPY pnpm-workspace.yaml ../
COPY backend/package.json ./
COPY backend/tsconfig.json ./

# Install dependencies for backend only
RUN pnpm install --filter ./backend --no-frozen-lockfile

# Copy source and build
COPY backend/src ./src
RUN pnpm --filter ./backend run build

#############################
# Build frontend
FROM base AS frontend
WORKDIR /app/frontend

COPY pnpm-workspace.yaml ../
COPY frontend/package.json ./
COPY frontend/tsconfig.json ./
COPY frontend/vite.config.ts ./

RUN pnpm install --filter ./frontend --no-frozen-lockfile

COPY frontend/src ./src
RUN pnpm --filter ./frontend run build

#############################
# Runtime image combining built backend and frontend
FROM base AS production
WORKDIR /app

# Copy built backend and its node_modules
COPY --from=backend /app/backend/dist ./backend/dist
COPY --from=backend /app/backend/node_modules ./backend/node_modules
COPY --from=backend /app/backend/package.json ./backend/package.json

# Copy built frontend static files
COPY --from=frontend /app/frontend/dist ./frontend/dist

EXPOSE 4000
CMD ["node", "backend/dist/index.js"]
