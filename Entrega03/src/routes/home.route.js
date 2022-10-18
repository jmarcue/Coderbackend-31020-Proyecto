import express from 'express';
import homeController from '../controllers/home.controller.js';

const router = express.Router();
const home = new homeController();

router.get('/', home.getData);


export default router;