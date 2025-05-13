INSERT INTO users (name, email, password, role)
VALUES ('john doe', 'john@example.com', 'hashed_password', 'patient');

CREATE TABLE users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(255) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  role        ENUM('patient', 'doctor', 'admin') NOT NULL DEFAULT 'patient',
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);
