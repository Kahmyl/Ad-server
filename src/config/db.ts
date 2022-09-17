import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '.';

require('dotenv').config();

class DbConfig extends ConfigService {
  constructor() {
    super(process.env);
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      synchronize: !this.isProduction(),
      entities: ['dist/**/*.entity.js'],
      migrationsTableName: 'migration',
      migrations: ['dist/migration/*.js'],
      ssl: { rejectUnauthorized: false },
    };
  }
}

const dbconfig = new DbConfig().ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { dbconfig };