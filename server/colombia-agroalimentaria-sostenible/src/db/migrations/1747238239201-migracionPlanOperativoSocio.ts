import { MigrationInterface, QueryRunner } from "typeorm";

export class MigracionPlanOperativoSocio1747238239201 implements MigrationInterface {
    name = 'MigracionPlanOperativoSocio1747238239201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`BPIN_lugares\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`nombre\` text NULL, \`descripcion\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`subproductos_lugares\` (\`subproducto_id\` bigint NOT NULL, \`lugar_id\` bigint NOT NULL, PRIMARY KEY (\`subproducto_id\`, \`lugar_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`BPIN_entregables\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`nombre\` text NULL, \`descripcion\` text NULL, \`hito_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`BPIN_hitos\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`nombre\` text NULL, \`porcentaje_hito\` decimal(5,2) NULL, \`fecha_esperada\` date NULL, \`subproducto_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`BPIN_subproductos\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`nombre\` text NULL, \`que_se_hara\` text NULL, \`metodologia\` text NULL, \`como_se_reportara\` text NULL, \`producto_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`subproductos_lugares\` ADD CONSTRAINT \`FK_a0b9481571b8546715750b50d62\` FOREIGN KEY (\`subproducto_id\`) REFERENCES \`BPIN_subproductos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`subproductos_lugares\` ADD CONSTRAINT \`FK_4679877cde398c2baea98015761\` FOREIGN KEY (\`lugar_id\`) REFERENCES \`BPIN_lugares\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`BPIN_entregables\` ADD CONSTRAINT \`FK_0c6ce54f272fbf5cd9ee0a5e703\` FOREIGN KEY (\`hito_id\`) REFERENCES \`BPIN_hitos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`BPIN_hitos\` ADD CONSTRAINT \`FK_e476b10faec9176a702b00b1001\` FOREIGN KEY (\`subproducto_id\`) REFERENCES \`BPIN_subproductos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`BPIN_subproductos\` ADD CONSTRAINT \`FK_29b55fa5d3fd156f1ca80de1161\` FOREIGN KEY (\`producto_id\`) REFERENCES \`BPIN_productos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`BPIN_subproductos\` DROP FOREIGN KEY \`FK_29b55fa5d3fd156f1ca80de1161\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_hitos\` DROP FOREIGN KEY \`FK_e476b10faec9176a702b00b1001\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_entregables\` DROP FOREIGN KEY \`FK_0c6ce54f272fbf5cd9ee0a5e703\``);
        await queryRunner.query(`ALTER TABLE \`subproductos_lugares\` DROP FOREIGN KEY \`FK_4679877cde398c2baea98015761\``);
        await queryRunner.query(`ALTER TABLE \`subproductos_lugares\` DROP FOREIGN KEY \`FK_a0b9481571b8546715750b50d62\``);
        await queryRunner.query(`DROP TABLE \`BPIN_subproductos\``);
        await queryRunner.query(`DROP TABLE \`BPIN_hitos\``);
        await queryRunner.query(`DROP TABLE \`BPIN_entregables\``);
        await queryRunner.query(`DROP TABLE \`subproductos_lugares\``);
        await queryRunner.query(`DROP TABLE \`BPIN_lugares\``);
    }

}
