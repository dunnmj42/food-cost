-- Create database: "foodCost"

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
	"image" varchar(1000),
	"date" DATE,
	"user_id" int,
	"portions" int NOT NULL,
	"cost_per_meal" real,
	CONSTRAINT "meals_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ingredients" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" real NOT NULL,
	"ingredient_qty" real NOT NULL,
	"meal_id" int NOT NULL,
	CONSTRAINT "ingredients_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "meals" ADD CONSTRAINT "meals_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_fk0" FOREIGN KEY ("meal_id") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
