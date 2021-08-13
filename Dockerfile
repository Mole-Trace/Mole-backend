# --- Base App ---
FROM node:lts-alpine

# Initialize directory
RUN mkdir -p /app
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock /app/

RUN yarn install --quiet --no-progress

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start:prod"]
