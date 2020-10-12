import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export default class CreateTableClassSchedule1601145036670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'class_schedules',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'class_id',
          type: 'uuid',
        },
        {
          name: 'week_day',
          type: 'int',
        },
        {
          name: 'time',
          type: 'varchar',
        },
        {
          name: 'created_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
      ],
    }));
    await queryRunner.createForeignKey('class_schedules', new TableForeignKey({
      name: 'class_id',
      referencedTableName: 'class',
      referencedColumnNames: ['id'],
      columnNames: ['class_id'],
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('class_schedules', 'class_id');
    await queryRunner.dropTable('class_schedules');
  }
}
