### Setup instructions

1. Clone the repository
2. Run `nvm use`
3. Run `npm install`
4. Create a `.env` file from the help of `.env.example`.
5. Replace `DATABASE_URL` and `YOUR_JWT_SECRET` with your values
6. Run `npx prisma migrate dev`
7. Run `npx prisma generate`
8. Run `npx prisma studio` to view your DB
9. Run `npm start` to start the server at your `PORT`

You are provided with the `DGenius Backend APIs.postman_collection.json` postman collection to help you out with APIs.
