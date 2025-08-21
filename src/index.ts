import { env } from "./config/env";
import { connectDB } from "./config/db";
import app from "./app";
import { logger } from "./config/logger";

async function bootstrap() {
  try {
    await connectDB();
    app.listen(env.PORT, () =>
      logger.info(`Server running on port ${env.PORT}`)
    );
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

bootstrap();
