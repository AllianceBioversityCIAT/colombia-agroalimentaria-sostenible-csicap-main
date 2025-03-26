import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDBChanges1742917809342 implements MigrationInterface {
    name = 'UpdateDBChanges1742917809342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`BPIN_sub_actividades\` CHANGE \`sub_actividad\` \`nombre\` varchar(45) NULL`);
        await queryRunner.query(`ALTER TABLE \`GCF_subactividades\` DROP COLUMN \`GCF_subactividadescol\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_actividades\` DROP COLUMN \`nombre\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_actividades\` ADD \`nombre\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`GCF_componentes\` DROP COLUMN \`nombre\``);
        await queryRunner.query(`ALTER TABLE \`GCF_componentes\` ADD \`nombre\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`GCF_subactividades\` DROP COLUMN \`nombre\``);
        await queryRunner.query(`ALTER TABLE \`GCF_subactividades\` ADD \`nombre\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`GCF_ejes\` DROP COLUMN \`nombre\``);
        await queryRunner.query(`ALTER TABLE \`GCF_ejes\` ADD \`nombre\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`BPIN_productos\` DROP COLUMN \`nombre\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_productos\` ADD \`nombre\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`BPIN_productos\` DROP COLUMN \`descripcion_alcance\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_productos\` ADD \`descripcion_alcance\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`BPIN_sub_actividades\` DROP COLUMN \`nombre\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_sub_actividades\` ADD \`nombre\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`BPIN_sub_actividades\` DROP COLUMN \`nombre\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_sub_actividades\` ADD \`nombre\` varchar(45) NULL`);
        await queryRunner.query(`ALTER TABLE \`BPIN_productos\` DROP COLUMN \`descripcion_alcance\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_productos\` ADD \`descripcion_alcance\` varchar(45) NULL`);
        await queryRunner.query(`ALTER TABLE \`BPIN_productos\` DROP COLUMN \`nombre\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_productos\` ADD \`nombre\` varchar(45) NULL`);
        await queryRunner.query(`ALTER TABLE \`GCF_ejes\` DROP COLUMN \`nombre\``);
        await queryRunner.query(`ALTER TABLE \`GCF_ejes\` ADD \`nombre\` varchar(45) NULL`);
        await queryRunner.query(`ALTER TABLE \`GCF_subactividades\` DROP COLUMN \`nombre\``);
        await queryRunner.query(`ALTER TABLE \`GCF_subactividades\` ADD \`nombre\` varchar(45) NULL`);
        await queryRunner.query(`ALTER TABLE \`GCF_componentes\` DROP COLUMN \`nombre\``);
        await queryRunner.query(`ALTER TABLE \`GCF_componentes\` ADD \`nombre\` varchar(45) NULL`);
        await queryRunner.query(`ALTER TABLE \`BPIN_actividades\` DROP COLUMN \`nombre\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_actividades\` ADD \`nombre\` varchar(45) NULL`);
        await queryRunner.query(`ALTER TABLE \`GCF_subactividades\` ADD \`GCF_subactividadescol\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`BPIN_sub_actividades\` CHANGE \`nombre\` \`sub_actividad\` varchar(45) NULL`);
    }

}
