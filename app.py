from flask import Flask, jsonify, abort, render_template, request
import sqlite3
from dotenv import load_dotenv
import os

# Charger les variables d'environnement à partir du fichier .env
load_dotenv()

# Exemple d'utilisation d'une variable d'environnement
db_path = os.getenv('SQLITE_DB')

# Initialisation de l'application Flask
app = Flask(__name__)

# Fonction pour se connecter à la base de données SQLite
def get_db_connection():
    conn = sqlite3.connect(db_path)  # Remplace 'database.db' par le chemin de ta base de données
    conn.row_factory = sqlite3.Row  # Permet d'accéder aux colonnes par leur nom
    return conn

# Route pour récupérer la liste des utilisateurs
@app.route('/api/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT username, epic_id FROM PLAYER")
    users = cursor.fetchall()  # Récupère tous les utilisateurs
    conn.close()
    
    # Transforme le résultat en liste de dictionnaires
    user_list = [{"username": user["username"], "epic_id": user["epic_id"]} for user in users]
    
    return jsonify(user_list)

# Route pour récupérer les statistiques MMR d'un utilisateur
@app.route('/api/stats/mmr/<epic_id>', methods=['GET'])
def get_mmr_stats(epic_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Récupération de l'argument de la requête
    playlist = request.args.get('playlist')
    
    # Vérification si l'argument 'playlist' est fourni
    if not playlist:
        abort(400, description="Missing 'playlist' query parameter")
    
    # Exécution de la requête pour récupérer les stats MMR de l'utilisateur
    cursor.execute("""
        SELECT date, rank, division, mmr, streak
        FROM RANK 
        WHERE epic_id = ? AND playlist = ?
        ORDER BY date DESC
    """, (epic_id, playlist))
    
    stats = cursor.fetchall()  # Récupère toutes les lignes de résultats
    conn.close()
    
    # Si l'utilisateur n'a pas de données
    if not stats:
        abort(404, description="User not found or no stats available")
    
    # Transforme le résultat en liste d'objets
    stats_list = [{
        "date": stat["date"],
        "rank": stat["rank"],
        "division": stat["division"],
        "mmr": stat["mmr"],
        "streak": stat["streak"]
    } for stat in stats]
    
    return jsonify(stats_list)

# Gestion des erreurs 404
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": str(error)}), 404

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
