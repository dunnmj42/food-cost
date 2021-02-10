
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "meals" (
	"id" serial NOT NULL,
	"name" varchar(255),
	"description" TEXT,
	"image" varchar(255),
	"date" DATE,
	"user_id" int,
	CONSTRAINT "meals_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "ingredients" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" real NOT NULL,
	CONSTRAINT "ingredients_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "meals_ingredients" (
	"id" serial NOT NULL,
	"ingredient_id" int NOT NULL,
	"meal_id" int NOT NULL,
	"ingredient_qty" real NOT NULL,
	CONSTRAINT "meals_ingredients_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "meals" ADD CONSTRAINT "meals_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "meals_ingredients" ADD CONSTRAINT "meals_ingredients_fk0" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id");
ALTER TABLE "meals_ingredients" ADD CONSTRAINT "meals_ingredients_fk1" FOREIGN KEY ("meal_id") REFERENCES "meals"("id");