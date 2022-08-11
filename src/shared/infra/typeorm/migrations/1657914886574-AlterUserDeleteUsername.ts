import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserDeleteUsername1657914886574
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'username');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users ADD username varchar(255)`);
  }
}
