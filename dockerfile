FROM node:20-alpine3.17

ARG DATABASE_URL
ARG NEXT_PUBLIC_CLIENTVAR

RUN apk add --no-cache libc6-compat openssl1.1-compat

WORKDIR /app

ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

COPY package*.json ./
RUN npm ci

COPY . .

RUN SKIP_ENV_VALIDATION=1 npm run build

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN chown -R nextjs:nodejs .next/standalone
RUN chown -R nextjs:nodejs .next/static
RUN chown -R nextjs:nodejs node_modules
RUN rm -rf .next/standalone/node_modules
RUN rm -rf src
RUN mv .next/standalone/* ./

USER nextjs

EXPOSE 3000

CMD ./scripts/run.sh
