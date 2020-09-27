import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterTableUsersSurname1600201101836 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'surname',
      type: 'varchar',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'surname');
  }
}
