# Meeting Package Assignment


Hello there,

Hope you like what you see. If you want, you can mess around with the code by
following any of the setup instructions below or you can see the assingment
itself hosted at https://mp.howlin.app

Enjoy.


## Setup Dev Env

Use the .env.example to create a .env file (simply remove the .example suffix).
```sh
# Install the dependencies
npm i

# Boot up the database
docker compose up

# Start prisma studio
npm run db:studio

# Run the db migrations
npm run db:push

# Populate the database
npm run db:load

# Start the dev server
npm run dev
```

## Stage

If you do make it this far, you will of course have to substitute the howlinbash/mp
container with something you have write access to, both in the commands below
and the dockerfile. 

Also replace the .env file with the .env.prod file. More elegant solutions
exist but perfect is the enemy of completion.
```sh
# Build the app container
docker build -t howlinbash/mp --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .

# Stage the containers
docker compose -f docker-compose.prod.yml up
```
You can follow something very similar if you wish to deploy to production.


## The Stack

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!
