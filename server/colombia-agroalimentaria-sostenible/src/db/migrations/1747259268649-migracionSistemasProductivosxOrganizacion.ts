import { MigrationInterface, QueryRunner } from "typeorm";

export class MigracionSistemasProductivosxOrganizacion1747259268649 implements MigrationInterface {
    name = 'MigracionSistemasProductivosxOrganizacion1747259268649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sistemas_productivos\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`nombre\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`subprod_x_org_x_sistoperativo\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`subproducto_id\` bigint NOT NULL, \`org_x_sistprod_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sistemaprod_x_organizacion\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`organizacion_id\` bigint NOT NULL, \`sistema_productivo_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`subprod_x_org_x_sistoperativo\` ADD CONSTRAINT \`FK_f83dd84837b4bfcea0aaa512e66\` FOREIGN KEY (\`subproducto_id\`) REFERENCES \`BPIN_subproductos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`subprod_x_org_x_sistoperativo\` ADD CONSTRAINT \`FK_81dbd8b23ea1800d8a8f562fb85\` FOREIGN KEY (\`org_x_sistprod_id\`) REFERENCES \`sistemaprod_x_organizacion\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sistemaprod_x_organizacion\` ADD CONSTRAINT \`FK_13fec32e54163a0fc4bd1f9c0dc\` FOREIGN KEY (\`sistema_productivo_id\`) REFERENCES \`sistemas_productivos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sistemaprod_x_organizacion\` DROP FOREIGN KEY \`FK_13fec32e54163a0fc4bd1f9c0dc\``);
        await queryRunner.query(`ALTER TABLE \`subprod_x_org_x_sistoperativo\` DROP FOREIGN KEY \`FK_81dbd8b23ea1800d8a8f562fb85\``);
        await queryRunner.query(`ALTER TABLE \`subprod_x_org_x_sistoperativo\` DROP FOREIGN KEY \`FK_f83dd84837b4bfcea0aaa512e66\``);
        await queryRunner.query(`DROP TABLE \`sistemaprod_x_organizacion\``);
        await queryRunner.query(`DROP TABLE \`subprod_x_org_x_sistoperativo\``);
        await queryRunner.query(`DROP TABLE \`sistemas_productivos\``);
    }

}
