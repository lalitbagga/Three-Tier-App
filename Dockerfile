FROM node:26-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM node:26-alpine AS runtime

ENV NODE_ENV=production
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY index.js ./
COPY package.json ./

# Use the pre-created non-root user in the Node image.
USER node

EXPOSE 3000

CMD ["node", "index.js"]