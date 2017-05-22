create table usuario (
	username varchar(50) primary key,
	nome varchar(100) not null,
	email varchar(100) not null,	
	pass varchar(10) not null,
	tipo boolean not null
);

--insert into usuario(username, nome, email, pass, tipo) values('gustavo', 'Gustavo Gomides', 'gustavo.gomides7@gmail.com', '123456789', true);
--insert into usuario(username, nome, email, pass, tipo) values('elaine', 'Elaine Melo', 'elaine@gmail.com', '123456789', false);
--insert into usuario(username, nome, email, pass, tipo) values('francis', 'Francis Ribeiro', 'francis@gmail.com', '123456789', false);

create table questao(
	id serial primary key,
	status varchar(7) not null,
	vezesApareceu int not null,
	area varchar(50) not null,
	feedback varchar(300) not null,
	pergunta varchar(300) not null
);

--insert into questao(status, vezesApareceu, area, feedback, pergunta) values('ativa', 5, 'gerência de projetos', 'tudo ok A', 'pergunta A');
--insert into questao(status, vezesApareceu, area, feedback, pergunta) values('inativa', 0, 'gerência de portifolio', 'tudo ok B', 'pergunta B');
--insert into questao(status, vezesApareceu, area, feedback, pergunta) values('ativa', 10, 'gerência de produto', 'tudo ok C', 'pergunta C');

create table alternativas(
	id serial primary key,
	alternativa varchar(300) not null,
	correta boolean not null,
	questao int not null,
	foreign key(questao) references questao(id)
);

--insert into alternativas(alternativa, correta, questao) values('letra a', false, 1);
--insert into alternativas(alternativa, correta, questao) values('letra b', true, 1);
--insert into alternativas(alternativa, correta, questao) values('letra c', false, 1);
--insert into alternativas(alternativa, correta, questao) values('letra d', false, 1);
--insert into alternativas(alternativa, correta, questao) values('letra a', false, 2);
--insert into alternativas(alternativa, correta, questao) values('letra b', false, 2);
--insert into alternativas(alternativa, correta, questao) values('letra c', false, 2);
--insert into alternativas(alternativa, correta, questao) values('letra d', true, 2);

create table simulado(
	id serial primary key,
	usuario varchar(50) not null,
	tempoExecucao time default '0:0',
	foreign key(usuario) references usuario(username) on delete cascade
);

--insert into simulado(usuario, tempoExecucao) values('gustavo', '05:02');
--insert into simulado(usuario, tempoExecucao) values('elaine', '10:00');
--insert into simulado(usuario) values('francis');

create table questoesSimulado(
	id serial primary key,
	simulado int not null,
	questao int not null,
	foreign key(simulado) references simulado(id),
	foreign key(questao) references questao(id)	
);

--insert into questoesSimulado(simulado, questao) values(1, 1);
--insert into questoesSimulado(simulado, questao) values(1, 3);
--insert into questoesSimulado(simulado, questao) values(2, 3);
--insert into questoesSimulado(simulado, questao) values(2, 3);
