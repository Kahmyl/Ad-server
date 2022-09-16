import { DataSource } from "typeorm";
import { dbconfig } from "./db";

export const AppDataSource = new DataSource(dbconfig.getTypeOrmConfig);