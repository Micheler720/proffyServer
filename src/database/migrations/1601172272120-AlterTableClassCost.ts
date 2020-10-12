import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterTableClassCost1601172272120 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('class', new TableColumn({
      name: 'cost',
      type: 'float4',
      default: 0,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('class', 'cost');
  }
}
