FROM node:20.11.0
RUN mkdir /app
COPY package.json /app/
WORKDIR /app
COPY . ./

ENV NEXT_PUBLIC_BACKEND_URL=https://final-year-project-backend-sddgverzza-el.a.run.app

RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run","start"]