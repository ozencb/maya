INSERT INTO user_role(user_id, role_id)
VALUES ($1, (SELECT id FROM role WHERE code = $2));