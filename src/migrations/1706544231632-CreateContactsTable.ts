import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateContactsTable1706544231632 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'contacts',
            columns: [
                { name: 'id', type: 'serial', isPrimary: true },
                { name: 'fullname', type: 'varchar', length: '150' },
                { name: 'email', type: 'varchar', length: '255' },
                { name: 'phone_number', type: 'char', length: '11' },
                { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                { name: 'updated_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                { name: 'userId', type: 'int' },  // Assuming 'userId' as the foreign key column
            ],
        }), true);

        // Adding a foreign key to link 'userId' with the 'id' column in 'users' table
        const contactsTable = await queryRunner.getTable('contacts');
        if (contactsTable) {
            await queryRunner.createForeignKey('contacts', new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',  // Adjust onDelete based on your requirements
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the foreign key first
        const contactsTable = await queryRunner.getTable('contacts');
        const foreignKey = contactsTable?.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);

        if (foreignKey) {
            await queryRunner.dropForeignKey('contacts', foreignKey);
        }

        // Drop the 'contacts' table
        await queryRunner.dropTable('contacts');
    }
}
