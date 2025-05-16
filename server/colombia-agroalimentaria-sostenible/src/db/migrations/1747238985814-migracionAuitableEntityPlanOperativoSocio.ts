import { MigrationInterface, QueryRunner } from "typeorm";

export class MigracionAuitableEntityPlanOperativoSocio1747238985814 implements MigrationInterface {
    name = 'MigracionAuitableEntityPlanOperativoSocio1747238985814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`BPIN_entregables\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`BPIN_entregables\` ADD \`created_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`BPIN_entregables\` ADD \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`BPIN_entregables\` ADD \`updated_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`BPIN_entregables\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`BPIN_entregables\` ADD \`deleted_at\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`BPIN_hitos\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`BPIN_hitos\` ADD \`created_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`BPIN_hitos\` ADD \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`BPIN_hitos\` ADD \`updated_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`BPIN_hitos\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`BPIN_hitos\` ADD \`deleted_at\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`BPIN_subproductos\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`BPIN_subproductos\` ADD \`created_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`BPIN_subproductos\` ADD \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`BPIN_subproductos\` ADD \`updated_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`BPIN_subproductos\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`BPIN_subproductos\` ADD \`deleted_at\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`BPIN_lugares\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`BPIN_lugares\` ADD \`created_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`BPIN_lugares\` ADD \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`BPIN_lugares\` ADD \`updated_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`BPIN_lugares\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`BPIN_lugares\` ADD \`deleted_at\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`subproductos_lugares\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`subproductos_lugares\` ADD \`created_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`subproductos_lugares\` ADD \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`subproductos_lugares\` ADD \`updated_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`subproductos_lugares\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`subproductos_lugares\` ADD \`deleted_at\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subproductos_lugares\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`subproductos_lugares\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`subproductos_lugares\` DROP COLUMN \`updated_by\``);
        await queryRunner.query(`ALTER TABLE \`subproductos_lugares\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`subproductos_lugares\` DROP COLUMN \`created_by\``);
        await queryRunner.query(`ALTER TABLE \`subproductos_lugares\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_lugares\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_lugares\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_lugares\` DROP COLUMN \`updated_by\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_lugares\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_lugares\` DROP COLUMN \`created_by\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_lugares\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_subproductos\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_subproductos\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_subproductos\` DROP COLUMN \`updated_by\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_subproductos\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_subproductos\` DROP COLUMN \`created_by\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_subproductos\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_hitos\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_hitos\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_hitos\` DROP COLUMN \`updated_by\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_hitos\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_hitos\` DROP COLUMN \`created_by\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_hitos\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_entregables\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_entregables\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_entregables\` DROP COLUMN \`updated_by\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_entregables\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_entregables\` DROP COLUMN \`created_by\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_entregables\` DROP COLUMN \`created_at\``);
    }

}
