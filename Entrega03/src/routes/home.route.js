import express from 'express';
import homeController from '../controllers/home.controller.js';

const homeRoute = express.Router();
const home = new homeController();

homeRoute.get('/', home.getData);


export default homeRoute;