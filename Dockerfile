FROM node:18.20.2
ENV TZ="Asia/Bangkok"
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN (cd frontend && npm install && npm run build)
EXPOSE 3000
CMD ["npm", "run", "dev"]