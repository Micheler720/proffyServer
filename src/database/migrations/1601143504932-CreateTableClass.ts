import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export default class CreateTableClass1601143504932 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'class',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'subject_id',
          type: 'uuid',
        },
        {
          name: 'user_id',
          type: 'uuid',
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
    await queryRunner.createForeignKey(
      'class',
      new TableForeignKey({
        name: 'proffyId',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'class',
      new TableForeignKey({
        name: 'subjectId',
        referencedTableName: 'subjects',
        referencedColumnNames: ['id'],
        columnNames: ['subject_id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('class', 'proffyId');
    await queryRunner.dropForeignKey('class', 'subjectId');
    await queryRunner.dropTable('class');
  }
}
