import { DataTypes } from "sequelize";
import { dbCon } from "../libs/db";

const UserReferences = dbCon.define("UserReferences", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userid: { type: DataTypes.INTEGER, allowNull: false },
    travelStyle: { type: DataTypes.STRING, allowNull: true },
    budget: { type: DataTypes.STRING, allowNull: true },
    favoriteFoods: { type: DataTypes.STRING, allowNull: true},
    lastCityVisited: { type: DataTypes.STRING, allowNull: true },
    lastTripPeriod: { type: DataTypes.STRING, allowNull: true }
}, {
    timestamps: true
});

export default UserReferences;
