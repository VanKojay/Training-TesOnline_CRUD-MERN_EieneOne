import { Sequelize } from "sequelize";

const db = new Sequelize("tes2_crud", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
