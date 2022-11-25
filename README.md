# Hello There

A Twitter clone where users are able to interact with each other using "sayings" (otherwise known as Tweets on Twitter).

## Prerequisites

Make sure that you have installed [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/).

## Normal Installation

In your favorite shell, type the following in order.

```
git clone https://github.com/AKeyNo/hello-there.git
cd label-this
npm install
```

Fill out the .env_example file and rename the file name to ".env".
After this, type in the following commands.

```
npx prisma generate
npx migrate dev
npm run dev
```

After running these commands, it will be on http://localhost:3000/.

## Docker Installation

In your favorite shell, type the following in order.

```
git clone https://github.com/AKeyNo/hello-there.git
cd hello-there
```

Fill out the .env_example file and rename the file name to .env.
After this, type in the following commands.

```
docker build -t hello-there .
docker-compose up --build --force-recreate
```

In Docker, open the shell for the main application (called hello-there), and type the following command.

```
npx prisma migrate dev
```

## License

Hello There is released under the MIT License. Check the [LICENSE](https://github.com/AKeyNo/hello-there/blob/main/LICENSE) file for more information.
