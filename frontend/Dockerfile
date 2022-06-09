FROM node:14.15.5-alpine
WORKDIR /demo
EXPOSE 3000
ENV PATH=".node_modules/.bin:$PATH"
COPY . .
RUN npm install
CMD ["npm", "start"]