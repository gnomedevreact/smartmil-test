import { config } from 'dotenv';
import app from './app.js';
import { AppDataSource } from './data-source.js';

config();

const PORT = process.env.PORT || 3000;

async function main() {
  await AppDataSource.initialize();
  app.listen(PORT, () =>
    console.log(`Listening on port http://localhost:${PORT}`),
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
