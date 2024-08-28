## Backend Setup
1. Enter backend directory
```bash
cd backend/
```
2. Install node_modules
```bash
npm install
```
3. Change config/config.json (based on your username and password for mysql)
4. Setup database
```bash
npx sequelize-cli db:create
# to create a database
```
```bash
npx sequelize-cli db:migrate
# to add new table
```
```bash
npx sequelize-cli db:seed:all
# to add data to the table
```
5. Place .env inside backend folder
6. Run backend server
```bash
yarn start  
```

## Frontend Setup
1. Open another terminal and enter backend directory
```bash
cd frontend/
```
2. Install node_modules
```bash
npm install
```
3. Run frontend
```bash
npm run dev
```
4. Open [http://localhost:3000](http://localhost:3000) to see result
