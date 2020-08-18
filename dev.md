# Develop steps

## init repo

```sh
npx create-next-app nextjs-blog --use-npm
```

## install UI library

```sh
npm i antd -S
```

## install next-i18next

```sh
npm i next-i18next
```

## export static html page

```sh
npm run export
```

## build the project

```sh
npm run build
```

## config eslint

```sh
npm install eslint-config-airbnb-typescript \
            eslint-plugin-import@^2.22.0 \
            eslint-plugin-jsx-a11y@^6.3.1 \
            eslint-plugin-react@^7.20.3 \
            eslint-plugin-react-hooks@^4.0.8 \
            @typescript-eslint/eslint-plugin@^3.6.1 \
            --save-dev
```

## add .eslintrc.j

## add tsconfig.json

## add pre-commit

```sh
npm i pre-commit
```