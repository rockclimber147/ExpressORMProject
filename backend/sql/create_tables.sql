CREATE TABLE IF NOT EXISTS user_friends (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id),
    receiver_id INTEGER REFERENCES users(id),
    request_time TIMESTAMP DEFAULT NOW(),
    accepted BOOLEAN DEFAULT FALSE,
    UNIQUE(sender_id, receiver_id)
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);