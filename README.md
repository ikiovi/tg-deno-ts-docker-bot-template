# Telegram bot template

Telegram bot template using [Deno 2.x][2] and [grammY][0], with Docker.

## Setup

1. Clone this repository.
2. Copy `.env.example` to `.env` and set your `TOKEN`.
3. Install dependencies: `deno install` (or use `deno run install-deps`).
4. Run in development mode with file watching:

```shell
deno run dev
```

All tasks are defined in `deno.json`.

## Optional: Nix + direnv

If you use Nix, run `direnv allow` to automatically load a development shell
with Deno.

[0]: https://github.com/grammyjs/grammY
[1]: https://docs.docker.com/compose/
[2]: https://deno.com/
[3]: flake.nix
