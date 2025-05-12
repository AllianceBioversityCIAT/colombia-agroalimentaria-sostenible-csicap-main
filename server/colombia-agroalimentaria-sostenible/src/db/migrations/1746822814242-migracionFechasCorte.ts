import { MigrationInterface, QueryRunner } from "typeorm";

export class MigracionFechasCorte1746822814242 implements MigrationInterface {
    name = 'MigracionFechasCorte1746822814242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`fechas_corte\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`fecha_inicio\` date NULL, \`fecha_fin\` date NULL, \`tipo_usuario\` enum ('SOCIO', 'COORDINADOR', 'ADMINISTRADOR') NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`fechas_corte\``);
    }

}
