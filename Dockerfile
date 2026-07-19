FROM node:22 AS builder

WORKDIR /usr/src/app

ENV TZ=Europe/Istanbul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY package.json package-lock.yaml ./

RUN corepack enable pnpm
RUN npm install --frozen-lockfile

COPY . .

ENV NODE_ENV=production

RUN pnpm build

EXPOSE 3000
CMD ["npm", "run", "start"]