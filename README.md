PT-BR:
# Bem-vindo ao meu projeto LL-Football Club!

Esclarecendo, LL significa Lucas Lopes!

Este projeto foi desenvolvido no curso de Desenvolvimento Web Full Stack da Trybe.

Neste projeto foi passada uma estrutura de um APP já com o FrontEnd pronto onde minha função era desenvolver todas as camadas de BackEnd para o funcionamento fluido do Front-End.

Metodologias aplicadas:
- TDD - Test Driven Development;
- POO - Programação Orientada a Objetos

As tecnologias empregadas neste projeto foram:
- TypeScript
- MySQL com Sequelize
- Node.JS com Express
- Docker
- JSON Web Token
- bcryptsJS
- para os testes foram utilizados: Chai, Chai-HTTP, Mocha e Sinon.

Rodando a aplicação em sua máquina:
- com Docker:
Utilizar o seguinte comando na raiz do projeto: npm run compose:up

- Com node (necessário ter o MySQL instalado na máquina e preencher o arquivo .env conforme .env.example):
Abra um terminal na pasta app/backend e outro terminal na pasta app/frontend.
Em cada um dos terminais abertos, execute o comando: npm start

Para acessar o FrontEnd, basta entrar em seu navegador em http://localhost:3000/login
Usuário válido: admin@admin.com
Senha válida: secret_admin

Para consultar a cobertura dos testes, execute o seguinte comando com o terminal na pasta app/backend:
npm run test:coverage

Aqui estão algumas fotos do aplicativo:

EN-US:
# Welcome to my LL-Football Club project!

To clarify, LL stands for Lucas Lopes!

This project was developed in Trybe's Full Stack Web Development course.

In this project, a structure of an APP with the FrontEnd ready was passed, where my role was to develop all the BackEnd layers for the smooth operation of the FrontEnd.

Applied methodologies:
- TDD - Test Driven Development;
- OOP - Object Oriented Programming

The technologies used in this project were:
- TypeScript
- MySQL with Sequelize
- Node.JS with Express
- Docker
- JSON Web Token
- bcryptsJS
- For the tests were used: Chai, Chai-HTTP, Mocha e Sinon.

Running the application on your machine:
- with Docker:
Use the following command in the root of the project: npm run compose:up

- With node (must have MySQL installed on the machine and fill in the .env file as .env.example):
Open a terminal in the app/backend folder and another terminal in the app/frontend folder.
In each of the open terminals, run the command: npm start

To access FrontEnd, just enter your browser at http://localhost:3000/login
Valid User: admin@admin.com
Valid password: secret_admin

To lookup the test coverage, run the following command with the terminal in the app/backend folder:
npm run test:coverage

Here are some pictures from the app:

![image](https://user-images.githubusercontent.com/102384823/204905483-3ba2679f-c5c2-43b0-abab-501c91b40330.png)
![image](https://user-images.githubusercontent.com/102384823/204905555-48d2892e-b368-4837-ba59-9152e984e84e.png)
![image](https://user-images.githubusercontent.com/102384823/204905621-f8b08665-bd55-42d6-b8d9-70687d476496.png)

Todas as pastas e arquivos foram desenvolvidos pela Trybe, com exceção das seguintes pastas e todos arquivos dentro delas que foram desenvolvidas por mim:
All folders and files were developed by Trybe, with the exception of the following folders and all files within them which were developed by me:
- app/backend/src/controllers
- app/backend/src/database/migrations e tudo dentro desta, exceto o arquivo 999999...
- app/backend/src/database/models
- app/backend/src/interfaces
- app/backend/src/middlewares
- app/backend/src/routers
- app/backend/src/services
- app/backend/src/tests
- app/backend/src/utils
