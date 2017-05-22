create table usuarios (
	username varchar(50) primary key,
	name varchar(100) not null,
	email varchar(100) not null,	
	password varchar(100) not null,
	type varchar(20) not null
);

create table turma(
	id serial primary key,
	name varchar(50) not null,
	correta boolean not null,
	questao int not null,
	foreign key(questao) references questao(id)
);

create table questao(
	id serial primary key,
	status varchar(7) not null,
	vezesApareceu int not null,
	area varchar(50) not null,
	feedback varchar(300) not null,
	pergunta varchar(300) not null
);




create table simulado(
	id serial primary key,
	usuario varchar(50) not null,
	tempoExecucao time default '0:0',
	foreign key(usuario) references usuario(username) on delete cascade
);



create table questoesSimulado(
	id serial primary key,
	simulado int not null,
	questao int not null,
	foreign key(simulado) references simulado(id),
	foreign key(questao) references questao(id)	
);

