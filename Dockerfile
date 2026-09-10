FROM postgres:16-alpine
COPY /server/src/database/seed.sql /docker-entrypoint-initdb.d/