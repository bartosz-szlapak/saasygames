insert into role (id, name)
values (1, 'administrator'),
       (2, 'user');

insert into user_status (id, name)
values (1, 'Active'),
       (2, 'Banned');


insert into user (passwordHash, roleId, statusId, userName)
values ('$2b$12$/6R4GQCBv5irPDf141C4BObyLeM.Qn3kEDs9OHa06IunQk6pc9RHO', 2, 1, 'user1'),
       ('$2b$12$/6R4GQCBv5irPDf141C4BObyLeM.Qn3kEDs9OHa06IunQk6pc9RHO', 2, 1, 'user2'),
       ('$2b$12$/6R4GQCBv5irPDf141C4BObyLeM.Qn3kEDs9OHa06IunQk6pc9RHO', 2, 1, 'user3'),
       ('$2b$12$/6R4GQCBv5irPDf141C4BObyLeM.Qn3kEDs9OHa06IunQk6pc9RHO', 2, 1, 'user4'),
       ('$2b$12$/6R4GQCBv5irPDf141C4BObyLeM.Qn3kEDs9OHa06IunQk6pc9RHO', 1, 1, 'admin');

insert into difficulty (id, name)
values (1, 'Easy'),
       (2, 'Medium'),
       (3, 'Hard');


insert into match_status (id, name)
values (1, 'In progress'),
       (2, 'Finished'),
       (3, 'Cancelled'),
       (4, 'Pending');

insert into game(name, minPlayers, maxPlayers, maxMoveTime)
values ('Tic tac toe', 1, 2, 300);
