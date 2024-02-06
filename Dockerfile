FROM node:16 as install
LABEL stage="install"

WORKDIR /src/install

COPY package.json .
COPY yarn.lock .

RUN yarn install

FROM node:16 as compile
LABEL stage=compile

WORKDIR /src/build

COPY --from=install /src/install .
COPY . .

RUN yarn build
RUN yarn install --production=true


