const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/cnpj/:cnpj', async (req, res) => {
  const cnpj = req.params.cnpj.replace(/\D/g, '');
  if (cnpj.length !== 14) {
    return res.status(400).json({ error: 'CNPJ inválido' });
  }

  try {
    const response = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar ReceitaWS', detail: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});