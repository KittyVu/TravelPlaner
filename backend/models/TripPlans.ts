import { DataTypes } from "sequelize";
import { dbCon } from "../libs/db";
import Trips from "./Trips";

const TripPlans = dbCon.define("TripPlans", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tripid: { type: DataTypes.INTEGER, allowNull: false },
    plan: { type: DataTypes.JSONB, allowNull: true },
    planRaw: { type: DataTypes.TEXT, allowNull: true }
});

// one-one relationship
Trips.hasOne(TripPlans, { foreignKey: "tripid" });
TripPlans.belongsTo(Trips, { foreignKey: "tripid" });

export default TripPlans;
