// src/server.js
const app = require('./app');
const prisma = require('./config/prismaClient'); // make sure this file exists

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await prisma.$connect(); // check DB connection in local dev
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Server failed to start', err);
    process.exit(1);
  }
}
start();
