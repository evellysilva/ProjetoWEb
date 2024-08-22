document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loadData').addEventListener('click', function () {
        fetch('http://localhost:3000/get-reports')  // Atualize para o URL correto do servidor
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    document.getElementById('data').innerHTML = '<p>Nenhum dado encontrado.</p>';
                } else {
                    let html = '<ul>';
                    data.forEach(item => {
                        html += `<li>Latitude: ${item.latitude}, Longitude: ${item.longitude}, Intensidade: ${item.intensidade}, Data: ${item.dataFoco}</li>`;
                    });
                    html += '</ul>';
                    document.getElementById('data').innerHTML = html;
                }
            })
            .catch(error => {
                console.error('Erro ao carregar os dados:', error);
                document.getElementById('data').innerHTML = '<p>Erro ao carregar os dados.</p>';
            });
    });
});
