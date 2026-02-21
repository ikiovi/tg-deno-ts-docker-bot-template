# https://docs.deno.com/runtime/reference/docker/#use-multi-stage-builds
FROM denoland/deno:alpine-2.6.1 AS builder

WORKDIR /app
COPY deno.json deno.lock ./

ENV DENO_DIR=build/cache

RUN deno run install-deps

FROM denoland/deno:alpine-2.6.1

WORKDIR /app
COPY --from=builder /app .
COPY . .

ENV DENO_DIR=build/cache

ENTRYPOINT [ "deno", "task", "start" ]