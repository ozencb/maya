INSERT INTO app_user(username, password)
VALUES($1, $2)
RETURNING *;