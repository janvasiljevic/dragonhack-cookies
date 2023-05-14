Web app for lending books amongst readers with large personal collections. A lender lists their available books and other users can request to borrow it.

# Environment setup

```bash
cd backend
yarn
cd ../frontend
yarn
cd ..
docker compose up
docker exec -it api bash
yarn db:gen_mig
yarn prisma db seed
```

Open the apllication on `localhost:3000`.
