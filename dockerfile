FROM node:alpine

WORKDIR /root

COPY . /root

WORKDIR /root/backend
RUN npm install

WORKDIR /root/frontend
RUN npm install

WORKDIR /root

EXPOSE 3000 8089
CMD cd backend ; npm start & cd .. ; cd frontend ; npm start