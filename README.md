## TeamSoft

- Tecnologias usadas: NodeJS, Typescript, AdonisJS, LucidORM, MySQL e RESTful API

- Configuração:
  - Tire o ``.example`` do arquivo ``.env.example``
  - Abra o MySQL server (Recomendação: use o Laragon para isso)
  - Vá no ``.env`` e coloque os devidos valores para as variáveis de ambiente ``MYSQL_PORT``, ``MYSQL_USER``, ``MYSQL_PASSWORD`` e ``MYSQL_DB_NAME``
  - Abra o terminal e acesse a pasta do projeto
  - Digite ``node ace migration:run`` no terminal e aperte enter para criar as tabelas no banco de dados
  - Digite ``node ace serve --watch`` para rodar a API

- Rotas:
  - /api/clientes --> ``post`` ``get``
  - /api/clientes/:id ---> ``get`` ``put/patch`` ``delete``
  - /api/clientes/:id/endereco --> ``post`` ``get``
  - /api/clientes/:id/endereco/:id ---> ``get`` ``put/patch`` ``delete``
  - OBS: ao remover um cliente, todos os endereços ligados a ele serão removidos também.

- Estruturas json com tipos para ``post`` e ``put/patch``
  - Clientes:
  ```
  {
    "cnpj": BIGINT,
    "razao_social": STRING,
    "nome_do_contato": STRING,
    "telefone": BIGINT,
  }
  ```
  - Endereços:
  ```
  {
    "logradouro": STRING,
    "numero": INTEGER,
    "complemento": STRING,
    "bairro": STRING,
    "cidade": STRING,
    "estado": STRING,
    "cep": BIGINT,
  }
  ```