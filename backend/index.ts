import express from "express"
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { dbCon } from "./libs/db";
import { createError } from "./libs/helpers";
import usersRouter from "./routes/User";
import tripRouter from "./routes/Trip";


const app = express();

/* ---------------- middlewares ----------------------- */
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,               
}));
app.use(cookieParser());
app.use(express.json());

/* ---------------- database ------------------- */
try {
    await dbCon.authenticate()
} catch (err) {
    console.error("database error:", err);
}

//await sequelize.sync({ force: true }); 
await dbCon.sync({ alter: true });

/* ----------- routers -------------------------- */
app.use("/api/user", usersRouter );
app.use("/api/trip", tripRouter)

/* -------------- error handlers -------------- */
app.use((req, res, next) => {
  next(createError(404, "❌ Route not defined!"));
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});