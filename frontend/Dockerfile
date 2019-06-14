
FROM mhart/alpine-node:11 AS builder
WORKDIR /frontend/urban-survival-guide
COPY . /frontend
RUN yarn run build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /frontend/urban-survival-guide
COPY --from=builder /frontend/urban-survival-guide/build .
CMD ["npm", "start"]
