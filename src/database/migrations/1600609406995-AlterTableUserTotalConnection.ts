import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterTableUserTotalConnection1600609406995 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.addColumn('users', new TableColumn({
      name: 'connections',
      type: 'int',
      isNullable: false,
      default: '0',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn('users', 'connections');
  }
}
