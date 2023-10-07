# set-up project

This project is not complete yet,becasuse I just done login and register api in backend.And Then I want to add refresh token and other necessary api.

## Frontend run server

```bash
cd client
```

- create .env file

```bash
 VITE_BASE_URL="http://localhost:5000/api"
```

- install package

```bash
npm install
```

- run server [frontend]

```bash
 npm run dev
```

## Backend run server

```bash
cd server
```

- create .env file

```bash
DATABASE_URL=your mysql database url
JWT_ACCESS_SECRET=your secret key
JWT_REFRESH_SECRET= your secret key
```

- install package

```bash
npm install
```

- run server [backend]

```bash
npm run dev
```
