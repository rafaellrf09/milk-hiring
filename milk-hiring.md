# Projeto Milk Hiring

Este projeto implementa um sistema de gerenciamento de fazendas leiteiras, incluindo operações CRUD para produtores rurais (farmers), fazendas (farms) e produções de leite (milk productions). Além disso, fornece endpoints para calcular o preço do leite.

## Estrutura de Rotas

### Endpoints para Produtores Rurais (Farmers)

1. **Criar um novo produtor**
   - **Rota:** `POST /farmers`
   - **Descrição:** Cria um novo registro de produtor rural.
   - **Controller:** `FarmerController.createFarmer`

2. **Listar todos os produtores**
   - **Rota:** `GET /farmers`
   - **Descrição:** Retorna todos os produtores cadastrados.
   - **Controller:** `FarmerController.getAllFarmers`

3. **Buscar um produtor específico**
   - **Rota:** `GET /farmers/:id`
   - **Descrição:** Retorna um produtor específico pelo `id`.
   - **Controller:** `FarmerController.getFarmerById`

4. **Atualizar um produtor**
   - **Rota:** `PUT /farmers/:id`
   - **Descrição:** Atualiza as informações de um produtor específico.
   - **Controller:** `FarmerController.updateFarmer`

5. **Deletar um produtor**
   - **Rota:** `DELETE /farmers/:id`
   - **Descrição:** Remove um produtor específico do sistema.
   - **Controller:** `FarmerController.deleteFarmer`

6. **Listar fazendas de um produtor**
   - **Rota:** `GET /farmers/:id/farms`
   - **Descrição:** Retorna todas as fazendas associadas a um produtor específico.
   - **Controller:** `FarmerController.getFarmsByFarmerId`

### Endpoints para Fazendas (Farms)

1. **Criar uma nova fazenda**
   - **Rota:** `POST /farms`
   - **Descrição:** Cria uma nova fazenda.
   - **Controller:** `FarmController.createFarm`

2. **Listar todas as fazendas**
   - **Rota:** `GET /farms`
   - **Descrição:** Retorna todas as fazendas cadastradas.
   - **Controller:** `FarmController.getAllFarms`

3. **Buscar uma fazenda específica**
   - **Rota:** `GET /farms/:id`
   - **Descrição:** Retorna uma fazenda específica pelo `id`.
   - **Controller:** `FarmController.getFarmById`

4. **Atualizar uma fazenda**
   - **Rota:** `PUT /farms/:id`
   - **Descrição:** Atualiza os dados de uma fazenda específica.
   - **Controller:** `FarmController.updateFarm`

5. **Deletar uma fazenda**
   - **Rota:** `DELETE /farms/:id`
   - **Descrição:** Remove uma fazenda do sistema.
   - **Controller:** `FarmController.deleteFarm`

### Endpoints para Produção de Leite (Milk Production)

1. **Registrar produção de leite**
   - **Rota:** `POST /milk-productions`
   - **Descrição:** Cria um novo registro de produção de leite.
   - **Controller:** `MilkProductionController.create`

2. **Buscar produções de leite por fazenda**
   - **Rota:** `GET /milk-productions/:farmId`
   - **Descrição:** Retorna as produções de leite associadas a uma fazenda específica.
   - **Controller:** `MilkProductionController.getByFarm`

3. **Buscar produção de leite por fazenda e mês**
   - **Rota:** `GET /milk-productions/:farmId/month`
   - **Descrição:** Retorna as produções de leite de uma fazenda específica por mês.
   - **Controller:** `MilkProductionController.getByFarmAndMonth`

4. **Calcular preço do leite por fazenda**
   - **Rota:** `GET /milk-price/:farmId`
   - **Descrição:** Calcula o preço do leite de uma fazenda específica.
   - **Controller:** `MilkProductionController.calculateMilkPrice`

5. **Calcular preço do leite anual por fazenda**
   - **Rota:** `GET /milk-price/yearly/:farmId`
   - **Descrição:** Calcula o preço do leite para o ano de uma fazenda específica.
   - **Controller:** `MilkProductionController.calculateYearlyMilkPrice`

6. **Atualizar produção de leite**
   - **Rota:** `PUT /milk-productions/:id`
   - **Descrição:** Atualiza um registro específico de produção de leite.
   - **Controller:** `MilkProductionController.update`

7. **Deletar produção de leite**
   - **Rota:** `DELETE /milk-productions/:id`
   - **Descrição:** Remove um registro específico de produção de leite.
   - **Controller:** `MilkProductionController.delete`

## Estrutura do Projeto

- **Controllers:** Localizados na pasta `controllers/`, onde cada controlador define a lógica das rotas relacionadas.
- **Routes:** As rotas são definidas no arquivo `routes/`, que exporta o roteador principal do projeto.

## Instalação

### Pré-requisitos

Para que o projeto funcione, é necessário ter o [Node.js](https://nodejs.org/) e o [MongoDB](https://www.mongodb.com/) instalados em sua máquina.

### Instalando o Node.js

1. **Download:** Acesse a página oficial do Node.js: [nodejs.org](https://nodejs.org/).
2. **Escolha a versão:** Você pode escolher entre a versão LTS (Long Term Support) e a versão atual. Para a maioria dos casos, é recomendável a versão LTS.
3. **Instalação:**
   - **Windows:** Execute o instalador .msi e siga as instruções.
   - **macOS:** Você pode usar o instalador .pkg ou Homebrew:
     ```bash
     brew install node
     ```
   - **Linux:** Use o gerenciador de pacotes apropriado. Por exemplo, no Ubuntu:
     ```bash
     sudo apt update
     sudo apt install nodejs npm
     ```

### Instalando o MongoDB

1. **Download:** Acesse a página oficial do MongoDB: [mongodb.com](https://www.mongodb.com/try/download/community).
2. **Escolha a versão:** Selecione a versão mais recente do MongoDB Community Server.
3. **Instalação:**
   - **Windows:** Execute o instalador e siga as instruções. Certifique-se de adicionar o MongoDB ao PATH durante a instalação.
   - **macOS:** Use o Homebrew:
     ```bash
     brew tap mongodb/brew
     brew install mongodb-community
     ```
   - **Linux:** Use o gerenciador de pacotes apropriado. Por exemplo, no Ubuntu:
     ```bash
     sudo apt update
     sudo apt install -y mongodb
     ```

4. **Iniciando o MongoDB:**
   - **Windows e macOS:** O MongoDB pode ser iniciado como um serviço.
   - **Linux:** Para iniciar o MongoDB, execute:
     ```bash
     sudo systemctl start mongodb
     ```

## Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **MongoDB** (ou outra base de dados, dependendo da configuração)

---

Este projeto tem como objetivo facilitar o gerenciamento das operações diárias de fazendas leiteiras, com um enfoque nas produções de leite e no gerenciamento de preços.
