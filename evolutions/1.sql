CREATE TABLE public."users" (
  "id" varchar NOT NULL
);

ALTER TABLE ONLY public."users"
  ADD CONSTRAINT "PK_users" PRIMARY KEY (id);

#DOWN

DROP TABLE public."users";