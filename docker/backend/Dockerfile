FROM node:18-bullseye
# In development we prefer debian, so the Prsima executable doesn't need to be rebuild when doing volume mounting


WORKDIR /usr/src/app
COPY . .

EXPOSE 8080

CMD ["yarn", "start:docker"] 