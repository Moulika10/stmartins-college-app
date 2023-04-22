# StMartins-Api

## Prerequisites

Install [NodeJS](https://nodejs.org/).

Install [Docker](https://docs.docker.com/).

Install [Postgres - V10.18](https://content-www.enterprisedb.com/downloads/postgres-postgresql-downloads/)

## Starting the app locally without docker

```bash
create your local postgres db with password as "pass" in Postgres(PgAdmin)

Run the following script to set up the db with data and run the application

1.  npm install
2.  export NODE_ENV=local
3.  npm run start-local
```

If you could run your migrations successfully you should see tables being created in you postgres public db.

If successful, you should be able to use one of the following links to verify your service is running and can be communicated with:
Otherwise: `http://localhost:3000/api/v1/health-check`

## Run Services

Once your app is up and running you should see a swagger page on `http://localhost:3000/api/v1/docs` try to execute the endpoints you should see the data coming back.

## Resolutions

```bash
1.  If you could not change your db password in postgres try to update in --> project folder

stmartins-college-app/config/env/local.config.env

DB_PASSWORD=`with your own password`

2. I saw 500 when running the app on windows even though everything was working fine on macbook, I tried the below solution and everything started to work fine

In your pg_hba.conf file (on Windows the directory is \Program Files\PostgreSQL\13\data) change IPv4 and IPv6 local connections method to trust. The scram-sha-256 encryption mechanism expects a password which is why it fails. (It would be all the way end of the file)

```
