import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDataModelClarisaModel1741703636714
  implements MigrationInterface
{
  name = 'UpdateDataModelClarisaModel1741703636714';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`clarisa_institution_types\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`code\` bigint NOT NULL, \`name\` text NULL, \`description\` text NULL, \`parent_code\` bigint NULL, PRIMARY KEY (\`code\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`clarisa_institutions\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`code\` bigint NOT NULL, \`name\` text NULL, \`acronym\` text NULL, \`websiteLink\` text NULL, \`added\` timestamp NULL, \`institution_type_id\` bigint NULL, PRIMARY KEY (\`code\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`clarisa_institution_locations\` (\`code\` bigint NOT NULL, \`name\` text NULL, \`institution_id\` bigint NOT NULL, \`isoAlpha2\` varchar(3) NOT NULL, \`isHeadquarter\` tinyint NULL, PRIMARY KEY (\`code\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`clarisa_countries\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`isoAlpha2\` varchar(3) NOT NULL, \`isoAlpha3\` varchar(4) NULL, \`name\` text NULL, \`longitude\` decimal(8,4) NULL, \`latitude\` decimal(8,4) NULL, PRIMARY KEY (\`isoAlpha2\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`clarisa_sub_nationals\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL, \`code\` text NULL, \`name\` text NULL, \`other_names\` json NULL, \`country_iso_alpha_2\` varchar(3) NULL, \`language_iso_2\` varchar(3) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`clarisa_levers\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL, \`short_name\` text NOT NULL, \`full_name\` text NULL, \`other_names\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`clarisa_languages\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL, \`name\` text NULL, \`iso_alpha_2\` text NULL, \`iso_alpha_3\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`clarisa_regions\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`um49Code\` bigint NOT NULL, \`name\` text NULL, PRIMARY KEY (\`um49Code\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`clarisa_geo_scope\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`deleted_at\` timestamp NULL, \`code\` bigint NOT NULL, \`name\` text NULL, \`definition\` text NULL, PRIMARY KEY (\`code\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clarisa_institution_types\` ADD CONSTRAINT \`FK_5bb4b590a7a2fa58ebd39e6289d\` FOREIGN KEY (\`parent_code\`) REFERENCES \`clarisa_institution_types\`(\`code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clarisa_institutions\` ADD CONSTRAINT \`FK_c487f2dfe9069367da65076d0c4\` FOREIGN KEY (\`institution_type_id\`) REFERENCES \`clarisa_institution_types\`(\`code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clarisa_institution_locations\` ADD CONSTRAINT \`FK_d7c26dfa9cf787a34975ea68d32\` FOREIGN KEY (\`institution_id\`) REFERENCES \`clarisa_institutions\`(\`code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clarisa_institution_locations\` ADD CONSTRAINT \`FK_8332e9b7269d91b8db571094096\` FOREIGN KEY (\`isoAlpha2\`) REFERENCES \`clarisa_countries\`(\`isoAlpha2\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clarisa_sub_nationals\` ADD CONSTRAINT \`FK_182bec9487d08d6779c7004443e\` FOREIGN KEY (\`country_iso_alpha_2\`) REFERENCES \`clarisa_countries\`(\`isoAlpha2\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`clarisa_sub_nationals\` DROP FOREIGN KEY \`FK_182bec9487d08d6779c7004443e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`clarisa_institution_locations\` DROP FOREIGN KEY \`FK_8332e9b7269d91b8db571094096\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`clarisa_institution_locations\` DROP FOREIGN KEY \`FK_d7c26dfa9cf787a34975ea68d32\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`clarisa_institutions\` DROP FOREIGN KEY \`FK_c487f2dfe9069367da65076d0c4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`clarisa_institution_types\` DROP FOREIGN KEY \`FK_5bb4b590a7a2fa58ebd39e6289d\``,
    );
    await queryRunner.query(`DROP TABLE \`clarisa_geo_scope\``);
    await queryRunner.query(`DROP TABLE \`clarisa_regions\``);
    await queryRunner.query(`DROP TABLE \`clarisa_languages\``);
    await queryRunner.query(`DROP TABLE \`clarisa_levers\``);
    await queryRunner.query(`DROP TABLE \`clarisa_sub_nationals\``);
    await queryRunner.query(`DROP TABLE \`clarisa_countries\``);
    await queryRunner.query(`DROP TABLE \`clarisa_institution_locations\``);
    await queryRunner.query(`DROP TABLE \`clarisa_institutions\``);
    await queryRunner.query(`DROP TABLE \`clarisa_institution_types\``);
  }
}
