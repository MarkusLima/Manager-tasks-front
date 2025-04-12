# Manager Tasks Frontend

Este é o frontend do projeto **Manager Tasks**, desenvolvido utilizando [Next.js](https://nextjs.org). O objetivo do projeto é gerenciar tarefas de forma eficiente, com uma interface moderna e responsiva.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor e geração de sites estáticos.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e consistente.
- **PostCSS**: Ferramenta para transformar CSS com plugins.
- **Context**: Armazenamento dinâmico do contexto da aplicação.
- **Cookies**: Armezenar em memoria token usuário.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou outro gerenciador de pacotes como Yarn, pnpm ou Bun.

## Como Configurar o Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/manager-tasks-frontend.git
   cd manager-tasks-frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. Configure as variáveis de ambiente:

   - Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`.
   - Preencha as variáveis necessárias, como URLs de APIs e chaves de acesso.

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

5. Abra [http://localhost:3000](http://localhost:3000) no navegador para visualizar o projeto.
5.1. Utilize o projeto  https://github.com/MarkusLima/Manager-tasks como back-end

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera a build de produção.
- `npm run start`: Inicia o servidor em modo de produção.
- `npm run lint`: Analisa o código em busca de problemas.

## Estrutura do Projeto

```plaintext
src/
├── app/               # Diretório principal do Next.js App Router
├── contexts/          # Contextos globais da aplicação
├── pages/             # Rotas tradicionais do Next.js
├── services/          # Serviços e chamadas à API
public/                # Arquivos estáticos
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).



------------------------------------------------------------------------------------------------------------




# Manager Tasks Frontend

This is the frontend of the **Manager Tasks** project, developed using [Next.js](https://nextjs.org). The goal of the project is to efficiently manage tasks with a modern and responsive interface.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: A superset of JavaScript that adds static typing to the code.
- **Tailwind CSS**: A utility-first CSS framework for fast and consistent styling.
- **PostCSS**: A tool to transform CSS with plugins.
- **Context**: Dynamic storage for the application context.
- **Cookies**: Used to store user tokens in memory.

## Prerequisites

Before starting, make sure you have installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or another package manager like Yarn, pnpm, or Bun.

## How to Set Up the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/manager-tasks-frontend.git
   cd manager-tasks-frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Configure the environment variables:

   - Create a `.env` file in the root of the project based on the `.env.example` file.
   - Fill in the required variables, such as API URLs and access keys.

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
5.1. Use the https://github.com/MarkusLima/Manager-tasks project as a backend

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run start`: Starts the server in production mode.
- `npm run lint`: Analyzes the code for issues.

## Project Structure

```plaintext
src/
├── app/               # Main directory for Next.js App Router
├── contexts/          # Global application contexts
├── pages/             # Traditional Next.js routes
├── services/          # API services and calls
public/                # Static files
```

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
