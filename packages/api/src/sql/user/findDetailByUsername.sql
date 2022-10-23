SELECT au.id,
       au.created_at,
       au.username,
       r.code            AS role,
       ARRAY_AGG(a.code) AS authorities
FROM app_user au
         JOIN user_role ur ON au.id = ur.user_id
         JOIN role r ON ur.role_id = r.id
         LEFT JOIN role_authority ra ON r.id = ra.role_id
         LEFT JOIN authority a ON ra.authority_id = a.id
WHERE au.username = $1
GROUP BY au.id, au.created_at, au.username, r.code;