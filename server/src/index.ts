import "reflect-metadata";
import "dotenv/config";

import express from "express";
import loaders from "./loaders";

(async () => {
  const port = process.env.PORT || 8888;
  const app = express();

  loaders(app);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

    // logger.verbose('Server is running on port %s', port);
  });
})();
