// Fetch users
const player_selector = document.getElementById('player_selector');
player_selector.innerHTML = '';
fetch('/api/users')
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            const option = document.createElement('option');
            option.value = user.epic_id;
            option.text = user.username;
            player_selector.appendChild(option);
        });
    });

// Fetch playlist
const playlist_selector = document.getElementById('playlist_selector');
playlist_selector.innerHTML = '';
fetch('/api/playlists')
    .then(response => response.json())
    .then(data => {
        data.forEach(playlist => {
            const option = document.createElement('option');
            option.value = playlist;
            option.text = playlist;
            playlist_selector.appendChild(option);
        });
    });

// Setup graphs
const graphs = [
    ["MMR", mmrGraph],
    ["Rank", rankGraph]
]


// Load graph checkbox
const graphs_section = document.getElementById('graphs');
for (graph of graphs) {
    const checkboxDiv = document.createElement('div');
    checkboxDiv.className = 'checkbox';

    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.id = graph[0];

    const checkboxLabel = document.createElement('label');
    checkboxLabel.htmlFor = graph[0];
    checkboxLabel.textContent = graph[0];

    checkboxDiv.addEventListener('click', (e)=>{
        if (e.target != checkboxDiv) return;
        checkboxInput.click();
    });

    checkboxDiv.appendChild(checkboxInput);
    checkboxDiv.appendChild(checkboxLabel);

    graphs_section.appendChild(checkboxDiv);
}

// Set refresh action for each input in nav
const nav = document.getElementsByTagName('nav')[0];
nav.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('change', refreshContent);
});

// Refresh content
const main = document.getElementsByTagName('main')[0];

function refreshContent() {

    // Content
    main.innerHTML = '';

    // Fetch data
    const epic_id = player_selector.value;
    const playlist = playlist_selector.value;

    // Get all neeeded graphs
    graphs_section.querySelectorAll('input').forEach(checkbox => {
        if (checkbox.checked) {

            // Create container
            const container = document.createElement('div');
            container.className = 'graph-container';
            main.appendChild(container);

            // Add title
            const title = document.createElement('h2');
            title.textContent = checkbox.id;
            container.appendChild(title);

            // Call graph function
            graphs.find(graph => graph[0] == checkbox.id)[1](container, epic_id, playlist);

        }
    });

}

// GET call
async function get(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
    }
    return response.json();
}

// MMR graph
async function mmrGraph(container, epic_id, playlist) {

    // Create canvas
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    const url = `/mmr?user=${encodeURIComponent(epic_id)}&playlist=${encodeURIComponent(playlist)}`;

    const data = await get(url);
    const labels = data.map(item => item.date);
    const mmrData = data.map(item => item.mmr);
   
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'MMR par jour',
                data: mmrData,
                backgroundColor: '#2d4aca83',
                borderColor: '#2D4ACA',
                borderWidth: 1,
                fill: false,
                tension: 0.2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

}

// Rank graph
async function rankGraph(container, epic_id, playlist) {

    // Create canvas
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    const url = `/rank?user=${encodeURIComponent(epic_id)}&playlist=${encodeURIComponent(playlist)}`;
    /*
    Api result :    
    [{"date":"11/03/2025","rank":"Platinum II - 1"},{"date":"12/03/2025","rank":"Platinum II - 1"},{"date":"13/03/2025","rank":"Platinum II - 2"},{"date":"14/03/2025","rank":"Platinum III - 2"},{"date":"15/03/2025","rank":"Platinum III - 2"},{"date":"16/03/2025","rank":"Platinum II - 4"},{"date":"17/03/2025","rank":"Platinum III - 3"},{"date":"18/03/2025","rank":"Platinum III - 3"}]    */

    const rankData = await get(url);
    
    // Définition d'un ordre numérique pour les ranks
    const rankOrder = {
        "Bronze I": 1, "Bronze II": 2, "Bronze III": 3,
        "Silver I": 4, "Silver II": 5, "Silver III": 6,
        "Gold I": 7, "Gold II": 8, "Gold III": 9,
        "Platinum I": 10, "Platinum II": 11, "Platinum III": 12,
        "Diamond I": 13, "Diamond II": 14, "Diamond III": 15,
        "Champion I": 16, "Champion II": 17, "Champion III": 18,
        "Grand Champion I": 19, "Grand Champion II": 20, "Grand Champion III": 21,
        "Supersonic Legend": 22
      };
  
      // Transformation des données pour Chart.js
      const labels = rankData.map(entry => entry.date);
      const values = rankData.map(entry => {
        const [rank, division] = entry.rank.split(" - ");
        return rankOrder[rank] * 4 + parseInt(division); // On pondère avec les divisions
      });
  
      // Création du graphique
      const ctx = canvas.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Évolution du Rank',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              ticks: {
                callback: function(value) {
                  // Conversion inverse du nombre vers un label de rank
                  const rankEntries = Object.entries(rankOrder);
                  for (let i = rankEntries.length - 1; i >= 0; i--) {
                    const [rank, baseValue] = rankEntries[i];
                    if (value >= baseValue * 4 && value < (baseValue + 1) * 4) {
                      return rank + " - " + (value % 4 || 4);
                    }
                  }
                  return value;
                }
              }
            }
          }
        }
      });
}