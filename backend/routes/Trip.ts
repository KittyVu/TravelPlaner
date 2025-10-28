import express from 'express';
import { tripPlan, tripList } from '../controllers/Trip';
import { tripDetail } from '../controllers/Trip';
import { chatPlan } from '../controllers/Trip';
import { authorization } from '../middleware/authorization';


const trip = express.Router();

trip.get("/detail/:id", authorization, tripDetail);
trip.post("/chat", chatPlan)
trip.post("/", tripPlan);
trip.get("/", authorization, tripList)

export default trip