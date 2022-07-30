INSERT INTO logs(created_at, created_by, action, level, error, payload)
VALUES($1, $2, $3, $4, $5, $6)
RETURNING *