import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1706542045762 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    { name: 'id', type: 'serial', isPrimary: true },
                    { name: 'fullname', type: 'varchar', length: '150' },
                    { name: 'email', type: 'varchar', length: '255', isUnique: true },
                    { name: 'password', type: 'varchar', length: '255' },
                    { name: 'phone_number', type: 'char', length: '11' },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
            true,
        );

        // You might need to add more logic for indexes, foreign keys, etc., based on your requirements.
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}
