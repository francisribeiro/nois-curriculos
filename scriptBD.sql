create table usuarios (
	username varchar(50) primary key,
	name varchar(100) not null,
	email varchar(100) not null,	
	password varchar(100) not null,
	type varchar(20) not null
);