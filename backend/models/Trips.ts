import { DataTypes } from "sequelize";
import { dbCon } from "../libs/db";
import TripPlans from "./TripPlans";

const Trips = dbCon.define("Trips", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userid: { type: DataTypes.INTEGER, allowNull: false },
    city: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
});



export default Trips;