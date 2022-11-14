CREATE TABLE public.users(
	ID serial NOT NULL, 
	name varchar(100),
	lastname varchar(100),
	email varchar(100) unique,
	password varchar(100) not null,
	role character varying(10) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    Primary Key(ID)
);

CREATE TABLE public.student(
	ID serial NOT NULL, 
	userID integer,
    student_no varchar(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)	
);

CREATE TABLE public.lecture(
	ID serial NOT NULL, 
	userID integer,
    stuff_no varchar(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)	
);

CREATE TABLE public.office(
	ID serial NOT NULL, 
	lectureID integer,
    phone_number varchar(15),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)	
);

CREATE TABLE public.application(
	ID serial NOT NULL, 
	studentID integer,
    lectureID integer,
    employee_letter varchar(200),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)	
);

ALTER TABLE public.student
    ADD FOREIGN KEY (userID)
    REFERENCES public.users (ID)
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE public.lecture
    ADD FOREIGN KEY (userID)
    REFERENCES public.users (ID)
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE public.office
    ADD FOREIGN KEY (lectureID)
    REFERENCES public.lecture (ID)
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE public.application
    ADD FOREIGN KEY (studentID)
    REFERENCES public.student (ID)
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE public.application
    ADD FOREIGN KEY (lectureID)
    REFERENCES public.lecture (ID)
    ON DELETE CASCADE
    NOT VALID;