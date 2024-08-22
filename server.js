const express = require('express');
const cors = require('cors');  // Importa o middleware CORS
const fs = require('fs');      // Importa o módulo fs para manipulação de arquivos
const path = require('path');  // Importa o módulo path para manipulação de caminhos
const app = express();
const port = 3000;

// Middleware
app.use(cors());  // Adiciona o middleware CORS
app.use(express.json());

// Endpoint para receber os dados do formulário
app.post('/report-fire', (req, res) => {
    // Coleta os dados da requisição
    const { latitude, longitude, intensidade, dataFoco } = req.body;

    // Verifica se os dados são válidos
    if (!latitude || !longitude || !intensidade || !dataFoco) {
        return res.status(400).json({ message: 'Todos os campos são necessários.' });
    }

    // Dados a serem salvos
    const newData = {
        latitude,
        longitude,
        intensidade,
        dataFoco
    };

    // Caminho para o arquivo JSON
    const filePath = path.join(__dirname, '/bd.json');

    // Lê o arquivo JSON existente
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).json({ message: 'Erro ao ler o arquivo.' });
        }

        let jsonData = [];
        if (data) {
            jsonData = JSON.parse(data); // Se o arquivo não estiver vazio, parse os dados
        }

        // Adiciona os novos dados
        jsonData.push(newData);

        // Salva os dados atualizados de volta no arquivo
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao salvar os dados.' });
            }
            res.json({ message: 'Dados recebidos e salvos com sucesso.' });
        });
    });
});

// Endpoint para retornar os dados do arquivo JSON
app.get('/get-reports', (req, res) => {
    const filePath = path.join(__dirname, '/bd.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Se o arquivo não existir, retorna uma lista vazia
                return res.json([]);
            }
            return res.status(500).json({ message: 'Erro ao ler o arquivo.' });
        }

        try {
            const jsonData = JSON.parse(data); // Parse os dados do arquivo
            res.json(jsonData); // Envia os dados como resposta
        } catch (parseErr) {
            res.status(500).json({ message: 'Erro ao processar os dados.' });
        }
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
