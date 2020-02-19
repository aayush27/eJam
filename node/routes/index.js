import express from 'express';
import { getWeatherOfCity } from '../controllers/weather.controller';
const router = express.Router();

router.get('/getWeatherOfCity', getWeatherOfCity);

module.exports = router;
