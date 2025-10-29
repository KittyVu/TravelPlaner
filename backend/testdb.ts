import { dbCon } from "./libs/db";

(async () => {
  try {
    await dbCon.authenticate(); // checks if DB connection works
    console.log("✅ Database connection successful!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  } finally {
    await dbCon.close(); // optional: close connection if just testing
  }
})();
