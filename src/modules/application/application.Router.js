import { Router } from "express";
import { appApplication } from "./application.Controler.js";
import   { multerlocal }  from "../../services/multer.services.js";

export const applicationRouter = Router()

applicationRouter.post('/', multerlocal().single('userResume'), appApplication);
