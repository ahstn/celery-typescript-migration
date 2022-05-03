# syntax = docker/dockerfile:1.4
# https://hub.docker.com/r/docker/dockerfile/

FROM node:lts-alpine
WORKDIR /app

COPY --link package*.json tsconfig.json /app
COPY --link src /app/src

RUN --mount=type=cache,target=/var/cache/apk \
  apk upgrade

RUN --mount=type=cache,id=npm,target=/root/.npm \
  npm install

RUN npm run build

ENTRYPOINT [ "node", "/app/build/main/index.js" ]
# CMD will overwritten by deployments and specify necessary arguments.
