# ikomida-ui-website

The public site and sign-up funnel.

> Part of the **iKomida** platform. See **[ikomida-k8s-config](https://github.com/kaitbellahs/ikomida-k8s-config)** for the architecture overview of all 31 repositories.

---

## Role

The unauthenticated surface — what the platform looked like before you had an account, and the path to getting one. Also carries the vendor sign-up flow, including phone validation and contract signature.

## Targets

web

## Stack

Svelte · TypeScript · Capacitor · rollup

## Build

```bash
yarn install
yarn dev        # development build + watch
yarn prod       # production build
```

## Status

Built in 2022. The platform is no longer deployed; this repository is published as a record of the work. **The commit history predates generative AI coding assistants.**

## License

Licensed under the [Apache License 2.0](LICENSE) — free for commercial use, provided the copyright notice and [NOTICE](NOTICE) are retained.

Copyright 2022 Khalid Ait Bellahs.
