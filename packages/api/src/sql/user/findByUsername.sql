SELECT id, username, password
FROM app_user
WHERE username = $1;