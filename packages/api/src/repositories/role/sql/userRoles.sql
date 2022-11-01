SELECT au.username,
       au.id         AS user_id,
       r.code        AS role,
       r.description AS role_description
FROM app_user au
         JOIN user_role ur ON au.id = ur.user_id
         JOIN role r ON r.id = ur.role_id;