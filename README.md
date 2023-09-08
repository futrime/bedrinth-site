# LipWebUI - Web app for searching, listing and inspecting public Lip teeth.

The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Deployment

### Docker Compose

Before you start, you need to install [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/).

Download the `docker-compose.yml` file from this repository.

```bash
curl -LO https://raw.githubusercontent.com/LipPkg/LipWebUI/HEAD/docker-compose.yml
```

Then, run the following command to start the server.

```bash
docker-compose up -d
```

If you are not root, you may need to run the following command instead.

```bash
sudo docker-compose up -d
```

To stop the server, run the following command.

```bash
docker-compose down
```

Then you can access the server at port `11401` on your host machine. You are likely to need to configure a reverse proxy to access the server from the Internet.

## Development

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

### Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
