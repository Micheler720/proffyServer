import express from 'express';
import cors from 'cors';
import routes from './Routes/index';
import './database';

const app = express();
app.use(cors());
app.use(express.json());

// GET: bUSCAR iNFORMAÇÃO
// POST: Criar alguma informação
// PUT: ATUALIZAR INFORMAÇÃO
// Delete: Deletar informação

// Corpo (Request Body): dados para criação ou atualização de registros.
// Route Params : Identificar um recurso na rota. Atualizar ou deletar
// Query  Params (query) : Dados para filtro

app.use(routes);

app.listen(3333);
