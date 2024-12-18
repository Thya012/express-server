# Express Server with Docker Compose

## Setup some services in Ubuntu
```sh
apt update
apt upgrade
apt install npm
apt install git -y
apt install curl -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
nvm install 18
```
## install docker
```sh
apt install docker
systemctl start docker

## Setting Up Environment Variables

Copy the example `.env` file to `.env` and update it with your configuration:

```sh
cp .env.example .env
```

## Setup ENV
```sh
cp .env.example .env
```
## Build Project
```sh
docker compose build
```
## Run Project
```sh
docker compose up -d
```
## Run fanker for testing
```sh
docker attach <CONTAINER_ID_OR_NAME_Server>
node fixture.js
```
## Tesing API
```sh
localhost:3000/docs

```
