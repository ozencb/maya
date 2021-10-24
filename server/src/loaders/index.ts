import { Application } from "express";

import expressLoader from "./express";
import { initOrm } from "../lib";

export default async (app: Application) => {
  expressLoader(app);
  await initOrm(app);
};
