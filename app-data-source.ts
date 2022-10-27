import { DataSource } from "typeorm";
require("dotenv").config();

export const myDataSource = new DataSource({
    type: "postgres",
    host: process.env.PG_HOST,
    port: 5432,
    username: process.env.PG_ACCOUNT,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    synchronize: true,
    logging: false,
    entities: ["src/models/*.ts"]
});