# @unemeta/sdk

![GitHub package.json version](https://img.shields.io/github/package-json/v/Unemeta/unemeta-sdk) ![GitHub](https://img.shields.io/github/license/Unemeta/unemeta-sdk) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Unemeta/unemeta-sdk/Build)

This SDK is a collection of tools used to interact with the Unemeta API and smart contracts.

## Usage

### Install

This package has a peer dependency on [etherjs](https://docs.ethers.io/v5/).

Install with

```bash
yarn add @unemeta/sdk ethers
```

or

```bash
npm install @unemeta/sdk ethers --save
```

### Documentation

Read the [complete documentation](./doc/index.md)

## Dev

### Setup

Install dependencies with `pnpm`

- **Dev**: `pnpm dev`
- **Build**: `pnpm build`

### Release

- Create a [Personal access token](https://github.com/settings/tokens/new?scopes=repo&description=release-it) (Don't change the default scope)
- Create an `.env` (copy `.env.template`) and set you github personal access token.
- `yarn release` will run all the checks, build, and publish the package, and publish the github release note.
