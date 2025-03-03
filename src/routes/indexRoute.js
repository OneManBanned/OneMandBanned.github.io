import { Router } from "express";
import { getIndex, postForm } from "../controllers/index.js";

export const indexRoute = Router();

indexRoute.get("/", getIndex)
indexRoute.post("/", postForm)

