import express from "express"
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { dbCon } from "./libs/db";
import { createError } from "./libs/helpers";
import usersRouter from "./routes/User";
import tripRouter from "./routes/Trip";
import type { Request, Response, NextFunction } from "express";
import type { ErrorType } from "./libs/types";


const app = express();

/* ---------------- middlewares ----------------------- */
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,               
}));
app.use(cookieParser());
app.use(express.json());

/* ---------------- database ------------------- */
(async () => {
  try {
    await dbCon.authenticate();
    await dbCon.sync({ alter: true });
    console.log("Database connected and synced");
  } catch (err) {
    console.error("Database error:", err);
  }
})();

//await sequelize.sync({ force: true }); 
//await dbCon.sync({ alter: true });

/* ----------- routers -------------------------- */
app.use("/api/user", usersRouter );
app.use("/api/trip", tripRouter)

/* -------------- error handlers -------------- */
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404, "❌ Route not defined!"));
});

app.use((err:ErrorType , req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});