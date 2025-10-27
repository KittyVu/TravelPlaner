import express from 'express';
import { tripPlan, tripList } from '../controllers/Trip';
import { tripDetail } from '../controllers/Trip';


const trip = express.Router();

trip.get("/detail/:id", tripDetail);
trip.post("/", tripPlan);
trip.get("/:id", tripList)

export default trip