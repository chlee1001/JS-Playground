# JS-Playground

This is a playground for JavaScript. It is a collection of small projects that I have created to learn JavaScript. The projects are not meant to be used in production, but rather to learn and experiment with JavaScript.

## Prerequisites

- [Node.js](https://nodejs.org/)
    - Version 16.13.0 이상
- [Yarn](https://yarnpkg.com/getting-started/install)
    - Yarn Berry 사용

### Directory Structure

```bash
.
├── js-simple-project # 간단한 자바스크립트 프로젝트 
├── markup # 네이버 주문 페이지 마크업
│   └── naver-ordering
├── react-playground # React playground mono repo with yarn berry
│   ├── react-carousel # React carousel component
│   ├── react-modal # React modal component
│   ├── react-pagination # React pagination component
│   └── react-skeleton # React skeleton component
├── LICENSE
├── README.md
├── package.json
├── tsconfig.json
└── yarn.lock
```

### Development server

Webpack dev server runs at `localhost:3001`.

```bash
# 루트 프로젝트에서 실행 (루트 프로젝트에서 각 프로젝트 폴더로 이동해서 실행)
yarn start
```

### Production build

Build outputs are created in `dist`.

```bash
yarn build
```
