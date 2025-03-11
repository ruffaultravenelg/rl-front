let mmrChart, otherChart;

const playerSelect = document.getElementById('playerSelect');

document.addEventListener('DOMContentLoaded', loadUsers);
playerSelect.addEventListener('change', () => loadPlayerCharts(playerSelect.value));

function loadUsers() {
    fetch("http://127.0.0.1:5000/api/users")
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.epic_id;
                option.textContent = user.username;
                playerSelect.appendChild(option);
            });
            if (users.length > 0) loadPlayerCharts(users[0].epic_id);
        })
        .catch(error => console.error("Error loading users:", error));
}

function loadPlayerCharts(epicId) {
    loadMMRChart(epicId);
}

function loadMMRChart(epicId) {
    fetch(`http://127.0.0.1:5000/api/stats/mmr/${epicId}?playlist=Doubles%20(Ranked)`)
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => new Date(a.date) - new Date(b.date));

            const dates = data.map(item => item.date);
            const mmrData = data.map(item => item.mmr);

            // Crée un nouveau graphique
            const ctx = document.getElementById('mmr').getContext('2d');

            if (mmrChart) mmrChart.destroy(); // Détruit l'ancien graphique si existant

            mmrChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'MMR',
                        data: mmrData,
                        borderColor: 'red',
                        fill: false,
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            ticks: { color: '#bbbbbb' },
                            grid: { color: '#444444' },
                            title: { display: true, text: 'Date', color: '#bbbbbb' }
                        },
                        y: {
                            ticks: { color: '#bbbbbb' },
                            grid: { color: '#444444' },
                            title: { display: true, text: 'MMR', color: '#bbbbbb' }
                        }
                    }
                }
            });
        })
        .catch(error => console.error("Error loading MMR data:", error));
}

