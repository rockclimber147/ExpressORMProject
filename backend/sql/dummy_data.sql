INSERT INTO users (username, email, password) VALUES
('alice', 'alice@example.com', 'hashedpassword1'),
('bob', 'bob@example.com', 'hashedpassword2')
ON CONFLICT (email) DO NOTHING;