FROM node:alpine AS development

ENV REACT_APP_API_BASE_URL https://flight-status-mock.core.travelopia.cloud
ENV NODE_ENV development
RUN echo "The ARG variable value is $API_BASE_URL"
CMD [ "/bin/sh", "-c", "export" ]

WORKDIR /react-app

COPY ./package*.json /react-app

RUN npm install

COPY . .

CMD ["npm", "start"]