### Link do app no Heroku: https://ssys-teste.herokuapp.com/

#### Rotas:

POST: login/
> Tive algumas dúvidas na implementação quanto a autenticação. Há uma tabela "Manager" no Banco de Dados com um usuário pré-cadastrado que pode realizar 
> qualquer operação sobre "employee". As rotas abaixo requerem o token de autenticação recebido como resposta dessa requisição. Use as credenciais de email e senha em src/app/database/seeders/

GET: employees/

POST: employees/

UPDATE: employees/:id

DELETE: employees/:id

GET: employees/:id


GET: reports/employees/salary

GET reports/employees/age
