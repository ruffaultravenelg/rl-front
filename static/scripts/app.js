// Récupération des données de l'API
fetch("http://127.0.0.1:5000/api/stats/mmr/ab4bb6e8002a4d309d18debc667af4a6?playlist=Doubles%20(Ranked)")
    .then(response => response.json())
    .then(data => {
        // On trie les données par date croissante
        data.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Extraction des labels (dates) et des valeurs
        const dates = data.map(item => item.date);
        const mmrData = data.map(item => item.mmr);

        // Mapping pour convertir le rank en valeur numérique (plus la valeur est élevée, meilleur est le rank)
        const rankMapping = {
            "Platinum I": 1,
            "Platinum II": 2
        };
        const rankData = data.map(item => rankMapping[item.rank] || 0);

        // Création du graphique avec deux axes des ordonnées
        const ctx = document.getElementById('chart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                        label: 'MMR',
                        data: mmrData,
                        borderColor: 'red',
                        yAxisID: 'mmr',
                        fill: false,
                        tension: 0.1
                    },
                    {
                        label: 'Rank',
                        data: rankData,
                        borderColor: 'blue',
                        yAxisID: 'rank',
                        fill: false,
                        tension: 0.1
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    rank: {
                        type: 'linear',
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Rank'
                        },
                        ticks: {
                            // Réaffiche le label du rank à partir de la valeur numérique
                            callback: function (value) {
                                if (value === 1) return 'Platinum I';
                                if (value === 2) return 'Platinum II';
                                return value;
                            }
                        }
                    },
                    mmr: {
                        type: 'linear',
                        position: 'right',
                        title: {
                            display: true,
                            text: 'MMR'
                        },
                        grid: {
                            drawOnChartArea: false // Pour éviter la superposition des grilles
                        }
                    }
                }
            }
        });
    })
    .catch(error => console.error("Erreur lors de la récupération des données :", error));