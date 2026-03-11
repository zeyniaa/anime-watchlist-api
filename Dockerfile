# FROM
FROM node:20-alpine

# WORKDIR
WORKDIR /app

# COPY 
COPY --chown=node:node package*.json ./

# RUN
RUN npm install

# COPY
COPY --chown=node:node . .

# USER
USER node

# CMD
CMD ["npm", "start"]