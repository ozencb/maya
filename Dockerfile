#build
FROM node as build
ARG BUILD_CONTEXT

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /fe
COPY package.json pnpm-lock.yaml .husky ./
COPY ./packages/$BUILD_CONTEXT/package.json packages/$BUILD_CONTEXT/
RUN pnpm install  --frozen-lockfile
COPY ./packages/$BUILD_CONTEXT packages/$BUILD_CONTEXT
RUN pnpm build:$BUILD_CONTEXT
CMD pnpm run serve:api

#webserver
FROM nginx:stable-alpine
ARG BUILD_CONTEXT
COPY --from=build /fe/packages/$BUILD_CONTEXT/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]