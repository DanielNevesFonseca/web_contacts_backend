import { DataSource } from 'typeorm';
import { settings } from './database.module';
import { CreateUsersTable1706542045762 } from 'src/migrations/1706542045762-CreateUsersTable';
import { CreateContactsTable1706544231632 } from 'src/migrations/1706544231632-CreateContactsTable';

export const dataSource = new DataSource({
  ...settings,
  synchronize: false,
  entities: [CreateUsersTable1706542045762, CreateContactsTable1706544231632],
});
