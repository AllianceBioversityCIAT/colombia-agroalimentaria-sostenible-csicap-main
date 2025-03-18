import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDataModelCsicap1742307914245 implements MigrationInterface {
    name = 'UpdateDataModelCsicap1742307914245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`GCF_subactividades\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`codigo\` varchar(45) NULL, \`nombre\` varchar(45) NULL, \`GCF_subactividadescol\` text NULL, \`GCF_actividades_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`GCF_actividades\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`codigo\` varchar(45) NULL, \`nombre\` text NULL, \`GCF_ejes_codigo\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`BPIN_objetivos\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`nombre\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`BPIN_actividades\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`codigo\` varchar(45) NULL, \`nombre\` varchar(45) NULL, \`BPIN_objetivos_codigo\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`BPIN_sub_actividades\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`codigo\` varchar(45) NULL, \`periodo\` int NULL, \`sub_actividad\` varchar(45) NULL, \`presupuesto\` float NULL, \`BPIN_actividades_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`BPIN_responsables\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`BPIN_producto_id\` bigint NOT NULL, \`persona_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`BPIN_productos\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`codigo\` varchar(45) NULL, \`nombre\` varchar(45) NULL, \`descripcion_alcance\` varchar(45) NULL, \`fecha_entrega\` date NULL, \`BPIN_subactividades_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`BPIN_productos_x_eje\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`eje_id\` bigint NOT NULL, \`producto_id\` bigint NOT NULL, PRIMARY KEY (\`eje_id\`, \`producto_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`GCF_ejes\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`nombre\` varchar(45) NULL, \`descripcion\` text NULL, \`GCF_componentes_codigo\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`GCF_componentes\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`nombre\` varchar(45) NULL, \`descripcion\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`GCF_subactividades\` ADD CONSTRAINT \`FK_4c75c00d0b4e3ba1d271de283fb\` FOREIGN KEY (\`GCF_actividades_id\`) REFERENCES \`GCF_actividades\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`GCF_actividades\` ADD CONSTRAINT \`FK_728fc33b56c83b302953d57ea90\` FOREIGN KEY (\`GCF_ejes_codigo\`) REFERENCES \`GCF_ejes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`BPIN_actividades\` ADD CONSTRAINT \`FK_e790f3bfd4eaee80ebf02a0f512\` FOREIGN KEY (\`BPIN_objetivos_codigo\`) REFERENCES \`BPIN_objetivos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`BPIN_sub_actividades\` ADD CONSTRAINT \`FK_ced9d3d5dc826ae4eb6c57eee01\` FOREIGN KEY (\`BPIN_actividades_id\`) REFERENCES \`BPIN_actividades\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`BPIN_responsables\` ADD CONSTRAINT \`FK_aec4bc2bcbd4bb02305f79e5f43\` FOREIGN KEY (\`BPIN_producto_id\`) REFERENCES \`BPIN_productos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`BPIN_productos\` ADD CONSTRAINT \`FK_21c7b83b05af8a850de7d5f6880\` FOREIGN KEY (\`BPIN_subactividades_id\`) REFERENCES \`BPIN_sub_actividades\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`BPIN_productos_x_eje\` ADD CONSTRAINT \`FK_62d96ea6fa48d6e51e39295440f\` FOREIGN KEY (\`producto_id\`) REFERENCES \`BPIN_productos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`BPIN_productos_x_eje\` ADD CONSTRAINT \`FK_e2b6288ec092bb4b61de8c5e564\` FOREIGN KEY (\`eje_id\`) REFERENCES \`GCF_ejes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`GCF_ejes\` ADD CONSTRAINT \`FK_4829b08fac29efa0d6776764bba\` FOREIGN KEY (\`GCF_componentes_codigo\`) REFERENCES \`GCF_componentes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`GCF_ejes\` DROP FOREIGN KEY \`FK_4829b08fac29efa0d6776764bba\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_productos_x_eje\` DROP FOREIGN KEY \`FK_e2b6288ec092bb4b61de8c5e564\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_productos_x_eje\` DROP FOREIGN KEY \`FK_62d96ea6fa48d6e51e39295440f\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_productos\` DROP FOREIGN KEY \`FK_21c7b83b05af8a850de7d5f6880\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_responsables\` DROP FOREIGN KEY \`FK_aec4bc2bcbd4bb02305f79e5f43\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_sub_actividades\` DROP FOREIGN KEY \`FK_ced9d3d5dc826ae4eb6c57eee01\``);
        await queryRunner.query(`ALTER TABLE \`BPIN_actividades\` DROP FOREIGN KEY \`FK_e790f3bfd4eaee80ebf02a0f512\``);
        await queryRunner.query(`ALTER TABLE \`GCF_actividades\` DROP FOREIGN KEY \`FK_728fc33b56c83b302953d57ea90\``);
        await queryRunner.query(`ALTER TABLE \`GCF_subactividades\` DROP FOREIGN KEY \`FK_4c75c00d0b4e3ba1d271de283fb\``);
        await queryRunner.query(`DROP TABLE \`GCF_componentes\``);
        await queryRunner.query(`DROP TABLE \`GCF_ejes\``);
        await queryRunner.query(`DROP TABLE \`BPIN_productos_x_eje\``);
        await queryRunner.query(`DROP TABLE \`BPIN_productos\``);
        await queryRunner.query(`DROP TABLE \`BPIN_responsables\``);
        await queryRunner.query(`DROP TABLE \`BPIN_sub_actividades\``);
        await queryRunner.query(`DROP TABLE \`BPIN_actividades\``);
        await queryRunner.query(`DROP TABLE \`BPIN_objetivos\``);
        await queryRunner.query(`DROP TABLE \`GCF_actividades\``);
        await queryRunner.query(`DROP TABLE \`GCF_subactividades\``);
    }

}
