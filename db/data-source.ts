import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceSettings = (): DataSourceOptions => {
  config();

  const dbUrl: string | undefined = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error("Missing env var: 'DATABASE_URL'");

  return {
    type: 'postgres',
    url: dbUrl,
    entities: ['dist/**/*.entity.{js,ts}'],
    migrations: ['dist/db/migrations/*.{js,ts}'],
    synchronize: false,
  };
};

const dataSource = new DataSource(dataSourceSettings());

export default dataSource;
