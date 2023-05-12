import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1683899289808 implements MigrationInterface {
    name = 'CreateTables1683899289808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(45) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "real_estate" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sold" boolean NOT NULL DEFAULT (0), "value" decimal NOT NULL DEFAULT (0), "size" integer NOT NULL, "createdAt" date NOT NULL DEFAULT (datetime('now')), "updatedAt" date NOT NULL DEFAULT (datetime('now')), "addressId" integer, "categoryId" integer, CONSTRAINT "REL_44ae17efa35575b6a6f83b35ee" UNIQUE ("addressId"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "street" varchar(45) NOT NULL, "zipCode" varchar(8) NOT NULL, "number" varchar(7), "city" varchar(20) NOT NULL, "state" varchar(2) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(45) NOT NULL, "email" varchar(45) NOT NULL, "admin" boolean NOT NULL DEFAULT (0), "password" varchar(120) NOT NULL, "createdAt" date NOT NULL DEFAULT (datetime('now')), "updatedAt" date NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "schedules" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" date NOT NULL, "hour" time NOT NULL, "realEstateId" integer, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_real_estate" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sold" boolean NOT NULL DEFAULT (0), "value" decimal NOT NULL DEFAULT (0), "size" integer NOT NULL, "createdAt" date NOT NULL DEFAULT (datetime('now')), "updatedAt" date NOT NULL DEFAULT (datetime('now')), "addressId" integer, "categoryId" integer, CONSTRAINT "REL_44ae17efa35575b6a6f83b35ee" UNIQUE ("addressId"), CONSTRAINT "FK_44ae17efa35575b6a6f83b35ee5" FOREIGN KEY ("addressId") REFERENCES "addresses" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_e64472d578faf91bee90a06ecc0" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_real_estate"("id", "sold", "value", "size", "createdAt", "updatedAt", "addressId", "categoryId") SELECT "id", "sold", "value", "size", "createdAt", "updatedAt", "addressId", "categoryId" FROM "real_estate"`);
        await queryRunner.query(`DROP TABLE "real_estate"`);
        await queryRunner.query(`ALTER TABLE "temporary_real_estate" RENAME TO "real_estate"`);
        await queryRunner.query(`CREATE TABLE "temporary_schedules" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" date NOT NULL, "hour" time NOT NULL, "realEstateId" integer, "userId" integer, CONSTRAINT "FK_ac3131bb922483053abebc5e9ff" FOREIGN KEY ("realEstateId") REFERENCES "real_estate" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_19c54f24597b318be3892114c75" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_schedules"("id", "date", "hour", "realEstateId", "userId") SELECT "id", "date", "hour", "realEstateId", "userId" FROM "schedules"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
        await queryRunner.query(`ALTER TABLE "temporary_schedules" RENAME TO "schedules"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" RENAME TO "temporary_schedules"`);
        await queryRunner.query(`CREATE TABLE "schedules" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" date NOT NULL, "hour" time NOT NULL, "realEstateId" integer, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "schedules"("id", "date", "hour", "realEstateId", "userId") SELECT "id", "date", "hour", "realEstateId", "userId" FROM "temporary_schedules"`);
        await queryRunner.query(`DROP TABLE "temporary_schedules"`);
        await queryRunner.query(`ALTER TABLE "real_estate" RENAME TO "temporary_real_estate"`);
        await queryRunner.query(`CREATE TABLE "real_estate" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sold" boolean NOT NULL DEFAULT (0), "value" decimal NOT NULL DEFAULT (0), "size" integer NOT NULL, "createdAt" date NOT NULL DEFAULT (datetime('now')), "updatedAt" date NOT NULL DEFAULT (datetime('now')), "addressId" integer, "categoryId" integer, CONSTRAINT "REL_44ae17efa35575b6a6f83b35ee" UNIQUE ("addressId"))`);
        await queryRunner.query(`INSERT INTO "real_estate"("id", "sold", "value", "size", "createdAt", "updatedAt", "addressId", "categoryId") SELECT "id", "sold", "value", "size", "createdAt", "updatedAt", "addressId", "categoryId" FROM "temporary_real_estate"`);
        await queryRunner.query(`DROP TABLE "temporary_real_estate"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "real_estate"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
