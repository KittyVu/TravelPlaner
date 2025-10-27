import { DataTypes } from "sequelize";
import { dbCon } from "../libs/db";
import UserReferences from "./UserReferences";
import Trips from "./Trips";


const Users = dbCon.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
});

// One-one
Users.hasOne(UserReferences, { foreignKey: "userid" });
UserReferences.belongsTo(Users, { foreignKey: "userid" });

// One-many
Users.hasMany(Trips, { foreignKey: "userid" });
Trips.belongsTo(Users, { foreignKey: "userid" });

export default Users;