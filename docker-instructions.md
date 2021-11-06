

1. Abra um terminal, navegue até a pasta raiz do projeto e digite o seguinte comando </br>
`docker-compose up`, ou `docker-compose up -d` para executar em segundo plano e liberar o terminal.

- O docker vai criar as imagens e subir os conteiners.

2. Agora é preciso preparar o banco de dados. Em um terminal dentro do container da aplicação, rode: </br>
`npx sequelize-cli db:migrate` para criar as tabelas e `npx sequelize-cli db:seed:all` para inserir um "Manager" no BD.

3. Agora é possível acessar as rotas da aplicação.
Use as credenciais do Manager (você pode vê-las na pasta </br> src/app/database/seeders/) para fazer [login](http://localhost:8000/login)

- Para que seja possível cadastrar ou fazer qualquer operação com um Employee funcionário (remoção, atualização, etc) é necessário o token de autenticação recebido no login.
