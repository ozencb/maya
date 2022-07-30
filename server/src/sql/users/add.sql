INSERT INTO users(name, password)
VALUES($1, $2)
RETURNING *