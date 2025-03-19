// Constants
const TENSION = 0;

// Setup graphs
const graphs = [
    ["Rank", rankGraph],
    ["MMR", mmrGraph],
]


// Load graph checkbox
const graphs_section = document.getElementById('graphs');
var first = true;
for (graph of graphs) {
    const checkboxDiv = document.createElement('div');
    checkboxDiv.className = 'checkbox';

    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.id = graph[0];

    const checkboxLabel = document.createElement('label');
    checkboxLabel.htmlFor = graph[0];
    checkboxLabel.textContent = graph[0];

    checkboxDiv.addEventListener('click', (e) => {
        if (e.target != checkboxDiv) return;
        checkboxInput.click();
    });

    checkboxDiv.appendChild(checkboxInput);
    checkboxDiv.appendChild(checkboxLabel);

    graphs_section.appendChild(checkboxDiv);

    if (first) {
        checkboxInput.checked = true;
        first = false;
    }

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
        player_selector.value = data[0].epic_id;
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
        playlist_selector.value = data[0];
        refreshContent();
    });

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
                tension: TENSION
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
    const rankData = await get(url);
    /*
    Api result :    
    [{"date":"11/03/2025","rank":"Platinum II", division: 2}, ...]
    */

    // Ranks order
    const rankOrder = [
        "Bronze I",
        "Bronze II",
        "Bronze III",
        "Silver I",
        "Silver II",
        "Silver III",
        "Gold I",
        "Gold II",
        "Gold III",
        "Platinum I",
        "Platinum II",
        "Platinum III",
        "Diamond I",
        "Diamond II",
        "Diamond III",
        "Champion I",
        "Champion II",
        "Champion III",
        "Grand Champion I",
        "Grand Champion II",
        "Grand Champion III",
        "Supersonic Legend"
    ];

    const labels = rankData.map(item => item.date);
    const rankValues = rankData.map(item => rankOrder.indexOf(item.rank) + (item.division * 0.25 - 0.25));

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Rank par jour',
                data: rankValues,
                backgroundColor: '#4caf5083',
                borderColor: '#4CAF50',
                borderWidth: 1,
                fill: false,
                tension: TENSION
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value, index, values) {
                            return rankOrder[Math.round(value)];
                        },
                        stepSize: 1
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const rankIndex = Math.floor(context.parsed.y);
                            const division = Math.round((context.parsed.y - rankIndex) * 4 + 1);
                            return `${rankOrder[rankIndex]} Division ${division}`;
                        }
                    }
                }
            }
        }
    });

}