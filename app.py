from flask import Flask, jsonify, abort, render_template, request
import sqlite3
from dotenv import load_dotenv
import os

load_dotenv()

db_path = os.getenv('SQLITE_DB')

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()
        cur.execute("SELECT epic_id, username FROM PLAYER")
        players = cur.fetchall()
        conn.close()

        # Transformation des tuples en dictionnaires
        users = [{"epic_id": epic_id, "username": username} for epic_id, username in players]
        return jsonify(users)
    except Exception as e:
        abort(500, description=str(e))

@app.route('/api/playlists', methods=['GET'])
def get_playlists():
    try:
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()
        # Récupérer les playlists distinctes
        cur.execute("SELECT DISTINCT playlist FROM RANK")
        playlists = [row[0] for row in cur.fetchall()]
        playlists.sort(key=lambda x: (0 if "Ranked" in x else 1, x))
        conn.close()
        return jsonify(playlists)
    except Exception as e:
        abort(500, description=str(e))

@app.route('/mmr', methods=['GET'])
def get_mmr():
    # Récupération des paramètres de la requête (epic_id et playlist)
    user = request.args.get('user')
    playlist = request.args.get('playlist')
    if not user or not playlist:
        abort(400, description="Les paramètres 'user' et 'playlist' sont obligatoires")

    try:
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()
        # On récupère la date et le mmr, triés par date pour avoir un graphique chronologique
        cur.execute("""
            SELECT date, mmr 
            FROM RANK 
            WHERE epic_id = ? AND playlist = ?
            ORDER BY date ASC
        """, (user, playlist))
        data = cur.fetchall()
        conn.close()

        # Transformation des résultats en liste de dictionnaires
        mmr_data = [{"date": "/".join(date.split("-")[::-1]), "mmr": mmr} for date, mmr in data]
        return jsonify(mmr_data)
    except Exception as e:
        abort(500, description=str(e))


@app.route('/rank', methods=['GET'])
def get_rank():
    """
    Cet endpoint retourne une liste d'objets contenant la date et une valeur 'rank',
    obtenue en concaténant le champ 'rank' et 'division' avec " - ".
    Par exemple : "Platinum I - 3".
    """
    user = request.args.get('user')
    playlist = request.args.get('playlist')
    if not user or not playlist:
        abort(400, description="Les paramètres 'user' et 'playlist' sont obligatoires")
    
    try:
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()
        cur.execute("""
            SELECT date, rank, division 
            FROM RANK 
            WHERE epic_id = ? AND playlist = ?
            ORDER BY date ASC
        """, (user, playlist))
        data = cur.fetchall()
        conn.close()

        rank_data = [
            {"date": "/".join(date.split("-")[::-1]), "rank": rank, "division": division}
            for date, rank, division in data
        ]
        return jsonify(rank_data)
    except Exception as e:
        abort(500, description=str(e))

if __name__ == '__main__':
    app.run(debug=True)

