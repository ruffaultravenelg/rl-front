-- DB for testing purposes

-- Player table
DROP TABLE IF EXISTS PLAYER;
CREATE TABLE PLAYER (
    epic_id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL
);

INSERT INTO PLAYER VALUES ('ab4bb6e8002a4d309d18debc667af4a6', 'OnimOff');

-- Rank table
DROP TABLE IF EXISTS RANK;
CREATE TABLE RANK (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    epic_id TEXT,
    playlist TEXT,
    rank TEXT,
    division INTEGER,
    mmr INTEGER,
    streak INTEGER,
    date DATE DEFAULT (DATE('now')),
    FOREIGN KEY (epic_id) REFERENCES PLAYER (epic_id),
    UNIQUE(epic_id, playlist, date)
);

-- Day 1 (2025-03-01)
INSERT INTO RANK (epic_id, playlist, rank, division, mmr, streak, date) VALUES
('ab4bb6e8002a4d309d18debc667af4a6', 'Duel (Ranked)', 'Gold II', 4, 560, -3, '2025-03-01'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Doubles (Ranked)', 'Platinum I', 1, 710, 1, '2025-03-01'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Standard (Ranked)', 'Gold I', 2, 535, -2, '2025-03-01'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Hoops', 'Gold III', 3, 465, 0, '2025-03-01'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Rumble', 'Gold II', 2, 580, -1, '2025-03-01'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Dropshot', 'Unranked', 1, 485, 0, '2025-03-01'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Snow Day', 'Unranked', 1, 420, 0, '2025-03-01');

-- Day 2 (2025-03-02)
INSERT INTO RANK (epic_id, playlist, rank, division, mmr, streak, date) VALUES
('ab4bb6e8002a4d309d18debc667af4a6', 'Duel (Ranked)', 'Gold II', 4, 550, -4, '2025-03-02'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Doubles (Ranked)', 'Platinum II', 2, 725, 0, '2025-03-02'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Standard (Ranked)', 'Gold II', 2, 540, -1, '2025-03-02'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Hoops', 'Gold I', 2, 450, -1, '2025-03-02'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Rumble', 'Gold III', 3, 590, -2, '2025-03-02'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Dropshot', 'Unranked', 1, 480, -1, '2025-03-02'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Snow Day', 'Unranked', 1, 430, 0, '2025-03-02');

-- Day 3 (2025-03-03)
INSERT INTO RANK (epic_id, playlist, rank, division, mmr, streak, date) VALUES
('ab4bb6e8002a4d309d18debc667af4a6', 'Duel (Ranked)', 'Gold II', 4, 570, -2, '2025-03-03'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Doubles (Ranked)', 'Platinum II', 2, 730, 1, '2025-03-03'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Standard (Ranked)', 'Gold I', 2, 515, -2, '2025-03-03'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Hoops', 'Gold III', 3, 475, 1, '2025-03-03'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Rumble', 'Gold II', 2, 585, -1, '2025-03-03'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Dropshot', 'Unranked', 1, 490, 1, '2025-03-03'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Snow Day', 'Unranked', 1, 440, -1, '2025-03-03');

-- Day 4 (2025-03-04)
INSERT INTO RANK (epic_id, playlist, rank, division, mmr, streak, date) VALUES
('ab4bb6e8002a4d309d18debc667af4a6', 'Duel (Ranked)', 'Gold II', 4, 560, -3, '2025-03-04'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Doubles (Ranked)', 'Platinum I', 1, 715, 0, '2025-03-04'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Standard (Ranked)', 'Gold II', 2, 525, -1, '2025-03-04'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Hoops', 'Gold II', 2, 460, -1, '2025-03-04'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Rumble', 'Gold III', 3, 600, -2, '2025-03-04'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Dropshot', 'Unranked', 1, 485, -1, '2025-03-04'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Snow Day', 'Unranked', 1, 420, -1, '2025-03-04');

-- Day 5 (2025-03-05)
INSERT INTO RANK (epic_id, playlist, rank, division, mmr, streak, date) VALUES
('ab4bb6e8002a4d309d18debc667af4a6', 'Duel (Ranked)', 'Gold III', 3, 590, 1, '2025-03-05'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Doubles (Ranked)', 'Platinum II', 2, 735, -1, '2025-03-05'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Standard (Ranked)', 'Gold II', 2, 545, -1, '2025-03-05'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Hoops', 'Gold III', 3, 480, 1, '2025-03-05'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Rumble', 'Gold II', 2, 590, -1, '2025-03-05'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Dropshot', 'Unranked', 1, 490, 1, '2025-03-05'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Snow Day', 'Unranked', 1, 430, 0, '2025-03-05');

-- Day 6 (2025-03-06)
INSERT INTO RANK (epic_id, playlist, rank, division, mmr, streak, date) VALUES
('ab4bb6e8002a4d309d18debc667af4a6', 'Duel (Ranked)', 'Gold II', 4, 580, -2, '2025-03-06'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Doubles (Ranked)', 'Platinum I', 1, 720, 0, '2025-03-06'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Standard (Ranked)', 'Gold II', 2, 530, -3, '2025-03-06'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Hoops', 'Gold II', 2, 470, -1, '2025-03-06'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Rumble', 'Gold III', 3, 610, 1, '2025-03-06'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Dropshot', 'Unranked', 1, 495, 1, '2025-03-06'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Snow Day', 'Unranked', 1, 440, 0, '2025-03-06');

-- Day 7 (2025-03-07)
INSERT INTO RANK (epic_id, playlist, rank, division, mmr, streak, date) VALUES
('ab4bb6e8002a4d309d18debc667af4a6', 'Duel (Ranked)', 'Gold II', 4, 570, -1, '2025-03-07'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Doubles (Ranked)', 'Platinum II', 2, 725, 1, '2025-03-07'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Standard (Ranked)', 'Gold II', 2, 550, -1, '2025-03-07'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Hoops', 'Gold III', 3, 485, 0, '2025-03-07'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Rumble', 'Gold II', 2, 600, -1, '2025-03-07'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Dropshot', 'Unranked', 1, 485, 0, '2025-03-07'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Snow Day', 'Unranked', 1, 450, 0, '2025-03-07');

-- Day 8 (2025-03-08)
INSERT INTO RANK (epic_id, playlist, rank, division, mmr, streak, date) VALUES
('ab4bb6e8002a4d309d18debc667af4a6', 'Duel (Ranked)', 'Gold III', 3, 600, 2, '2025-03-08'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Doubles (Ranked)', 'Platinum I', 1, 710, 0, '2025-03-08'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Standard (Ranked)', 'Gold II', 2, 560, 1, '2025-03-08'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Hoops', 'Gold III', 3, 490, -2, '2025-03-08'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Rumble', 'Gold III', 3, 615, 0, '2025-03-08'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Dropshot', 'Unranked', 1, 500, 1, '2025-03-08'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Snow Day', 'Unranked', 1, 460, 0, '2025-03-08');

-- Day 9 (2025-03-09)
INSERT INTO RANK (epic_id, playlist, rank, division, mmr, streak, date) VALUES
('ab4bb6e8002a4d309d18debc667af4a6', 'Duel (Ranked)', 'Gold II', 4, 580, -3, '2025-03-09'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Doubles (Ranked)', 'Platinum II', 2, 725, 0, '2025-03-09'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Standard (Ranked)', 'Gold II', 2, 550, -1, '2025-03-09'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Hoops', 'Gold III', 3, 480, -2, '2025-03-09'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Rumble', 'Gold II', 2, 605, -1, '2025-03-09'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Dropshot', 'Unranked', 1, 495, 1, '2025-03-09'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Snow Day', 'Unranked', 1, 440, 0, '2025-03-09');

-- Day 10 (2025-03-10)
INSERT INTO RANK (epic_id, playlist, rank, division, mmr, streak, date) VALUES
('ab4bb6e8002a4d309d18debc667af4a6', 'Duel (Ranked)', 'Gold III', 3, 590, 1, '2025-03-10'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Doubles (Ranked)', 'Platinum II', 2, 730, 0, '2025-03-10'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Standard (Ranked)', 'Gold II', 2, 545, 0, '2025-03-10'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Hoops', 'Gold II', 2, 460, -1, '2025-03-10'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Rumble', 'Gold III', 3, 605, -2, '2025-03-10'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Dropshot', 'Unranked', 1, 485, 0, '2025-03-10'),
('ab4bb6e8002a4d309d18debc667af4a6', 'Snow Day', 'Unranked', 1, 450, 1, '2025-03-10');
