import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigrationCsicap1741181348513 implements MigrationInterface {
    name = 'FirstMigrationCsicap1741181348513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`GCF_componentes\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`codigo\` bigint NOT NULL AUTO_INCREMENT, \`nombre\` text NULL, \`descripcion\` text NULL, PRIMARY KEY (\`codigo\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`BPIN_objetivos\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`codigo\` bigint NOT NULL AUTO_INCREMENT, \`nombre\` text NOT NULL, PRIMARY KEY (\`codigo\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`BPIN_actividades\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`codigo\` bigint NULL, \`nombre\` text NULL, \`BPIN_objetivos_codigo\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`BPIN_sub_actividades\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`codigo\` bigint NULL, \`año\` bigint NULL, \`sub_actividad\` text NULL, \`presupuesto\` float NULL, \`BPIN_actividades_id\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`BPIN_responsables\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`BPIN_producto_id\` bigint NULL, \`persona_id\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`BPIN_productos\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`codigo\` bigint NULL, \`nombre\` text NULL, \`descripcion_alcance\` text NULL, \`fecha_entrega\` date NULL, \`BPIN_subactividades_id\` bigint NULL, \`GCF_ejes_codigo\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`GCF_ejes\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`codigo\` bigint NOT NULL AUTO_INCREMENT, \`nombre\` text NULL, \`descripcion\` text NULL, \`GCF_componentes_codigo\` bigint NULL, PRIMARY KEY (\`codigo\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`GCF_subactividades\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`codigo\` bigint NULL, \`nombre\` text NULL, \`GCF_subactividadescol\` text NULL, \`GCF_actividades_id\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`GCF_actividades\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`codigo\` bigint NULL, \`nombre\` text NULL, \`GCF_ejes_codigo\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`BPIN_actividades\` ADD CONSTRAINT \`FK_e790f3bfd4eaee80ebf02a0f512\` FOREIGN KEY (\`BPIN_objetivos_codigo\`) REFERENCES \`BPIN_objetivos\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`BPIN_sub_actividades\` ADD CONSTRAINT \`FK_ced9d3d5dc826ae4eb6c57eee01\` FOREIGN KEY (\`BPIN_actividades_id\`) REFERENCES \`BPIN_actividades\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`BPIN_responsables\` ADD CONSTRAINT \`FK_aec4bc2bcbd4bb02305f79e5f43\` FOREIGN KEY (\`BPIN_producto_id\`) REFERENCES \`BPIN_productos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`BPIN_productos\` ADD CONSTRAINT \`FK_0060675c9c6b47743bc03a0c03a\` FOREIGN KEY (\`GCF_ejes_codigo\`) REFERENCES \`GCF_ejes\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`BPIN_productos\` ADD CONSTRAINT \`FK_21c7b83b05af8a850de7d5f6880\` FOREIGN KEY (\`BPIN_subactividades_id\`) REFERENCES \`BPIN_sub_actividades\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`GCF_ejes\` ADD CONSTRAINT \`FK_4829b08fac29efa0d6776764bba\` FOREIGN KEY (\`GCF_componentes_codigo\`) REFERENCES \`GCF_componentes\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`GCF_subactividades\` ADD CONSTRAINT \`FK_4c75c00d0b4e3ba1d271de283fb\` FOREIGN KEY (\`GCF_actividades_id\`) REFERENCES \`GCF_actividades\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`GCF_actividades\` ADD CONSTRAINT \`FK_728fc33b56c83b302953d57ea90\` FOREIGN KEY (\`GCF_ejes_codigo\`) REFERENCES \`GCF_ejes\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`GCF_actividades\` DROP FOREIGN KEY \`FK_728fc33b56c83b302953d57ea90\``);
        await queryRunner.query(`ALTER TABLE \`GCF_subactividades\` DROP FOREIGN KEY \`FK_4c75c00d0b4e3ba1d271de283fb\``);
        await queryRunner.query(`ALTER TABLE \`GCF_ejes\` DROP FOREIGN KEY \`FK_4829b08fac29efa0d6776764bba\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_productos\` DROP FOREIGN KEY \`FK_21c7b83b05af8a850de7d5f6880\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_productos\` DROP FOREIGN KEY \`FK_0060675c9c6b47743bc03a0c03a\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_responsables\` DROP FOREIGN KEY \`FK_aec4bc2bcbd4bb02305f79e5f43\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_sub_actividades\` DROP FOREIGN KEY \`FK_ced9d3d5dc826ae4eb6c57eee01\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_actividades\` DROP FOREIGN KEY \`FK_e790f3bfd4eaee80ebf02a0f512\``);
        await queryRunner.query(`DROP TABLE \`GCF_actividades\``);
        await queryRunner.query(`DROP TABLE \`GCF_subactividades\``);
        await queryRunner.query(`DROP TABLE \`GCF_ejes\``);
        await queryRunner.query(`DROP TABLE \`BPIN_productos\``);
        await queryRunner.query(`DROP TABLE \`BPIN_responsables\``);
        await queryRunner.query(`DROP TABLE \`BPIN_sub_actividades\``);
        await queryRunner.query(`DROP TABLE \`BPIN_actividades\``);
        await queryRunner.query(`DROP TABLE \`BPIN_objetivos\``);
        await queryRunner.query(`DROP TABLE \`GCF_componentes\``);
    }

}
