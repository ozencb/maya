SELECT au.id, au.created_at, au.username, r.code, array_agg(a.code)
FROM app_user au
    join user_role ur on au.id = ur.user_id
    join role r on ur.role_id = r.id
    left join role_authority ra on r.id = ra.role_id
    left join authority a on ra.authority_id = a.id
WHERE au.username = $1
GROUP BY au.id, au.created_at, au.username, r.code;