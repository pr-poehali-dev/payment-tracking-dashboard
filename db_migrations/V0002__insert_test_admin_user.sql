-- Insert test admin user
INSERT INTO users (name, email, password_hash) 
VALUES ('Admin User', 'admin@example.com', 'a1b2c3d4e5f6:7d82bc0b5e5b7b8f4b8e6f2a7c5d8e9f3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e') 
ON CONFLICT (email) DO NOTHING;