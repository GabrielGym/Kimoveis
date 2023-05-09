import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1683589184818 implements MigrationInterface {
    name = 'CreateTables1683589184818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "street" varchar(45) NOT NULL, "zipCode" varchar(8) NOT NULL, "number" varchar(7), "city" varchar(20) NOT NULL, "state" varchar(2) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "real_estate" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sold" boolean NOT NULL DEFAULT (0), "value" decimal NOT NULL DEFAULT (0), "size" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "categoryIdId" integer)`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(45) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(45) NOT NULL, "email" varchar(45) NOT NULL, "admin" boolean NOT NULL DEFAULT (0), "password" varchar(120) NOT NULL, "createdAt" date NOT NULL DEFAULT (datetime('now')), "updatedAt" date NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "schedules" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" date NOT NULL, "hour" time NOT NULL, "realEstateIdId" integer, "userIdId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_real_estate" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sold" boolean NOT NULL DEFAULT (0), "value" decimal NOT NULL DEFAULT (0), "size" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "categoryIdId" integer, CONSTRAINT "FK_37a2aa37f1c62797ed4583c87d8" FOREIGN KEY ("categoryIdId") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_real_estate"("id", "sold", "value", "size", "createdAt", "updatedAt", "categoryIdId") SELECT "id", "sold", "value", "size", "createdAt", "updatedAt", "categoryIdId" FROM "real_estate"`);
        await queryRunner.query(`DROP TABLE "real_estate"`);
        await queryRunner.query(`ALTER TABLE "temporary_real_estate" RENAME TO "real_estate"`);
        await queryRunner.query(`CREATE TABLE "temporary_schedules" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" date NOT NULL, "hour" time NOT NULL, "realEstateIdId" integer, "userIdId" integer, CONSTRAINT "FK_fbf218812039f56de7597d65fdc" FOREIGN KEY ("realEstateIdId") REFERENCES "real_estate" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_39a75f0ad7d19e3f1238d6a4e9a" FOREIGN KEY ("userIdId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_schedules"("id", "date", "hour", "realEstateIdId", "userIdId") SELECT "id", "date", "hour", "realEstateIdId", "userIdId" FROM "schedules"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
        await queryRunner.query(`ALTER TABLE "temporary_schedules" RENAME TO "schedules"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" RENAME TO "temporary_schedules"`);
        await queryRunner.query(`CREATE TABLE "schedules" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" date NOT NULL, "hour" time NOT NULL, "realEstateIdId" integer, "userIdId" integer)`);
        await queryRunner.query(`INSERT INTO "schedules"("id", "date", "hour", "realEstateIdId", "userIdId") SELECT "id", "date", "hour", "realEstateIdId", "userIdId" FROM "temporary_schedules"`);
        await queryRunner.query(`DROP TABLE "temporary_schedules"`);
        await queryRunner.query(`ALTER TABLE "real_estate" RENAME TO "temporary_real_estate"`);
        await queryRunner.query(`CREATE TABLE "real_estate" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sold" boolean NOT NULL DEFAULT (0), "value" decimal NOT NULL DEFAULT (0), "size" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "categoryIdId" integer)`);
        await queryRunner.query(`INSERT INTO "real_estate"("id", "sold", "value", "size", "createdAt", "updatedAt", "categoryIdId") SELECT "id", "sold", "value", "size", "createdAt", "updatedAt", "categoryIdId" FROM "temporary_real_estate"`);
        await queryRunner.query(`DROP TABLE "temporary_real_estate"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "real_estate"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
