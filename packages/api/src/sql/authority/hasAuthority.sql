SELECT EXISTS(
               SELECT a.id
               FROM user_role ur
                        JOIN role r ON ur.role_id = r.id
                        JOIN role_authority ra ON r.id = ra.role_id
                        JOIN authority a ON ra.authority_id = a.id
               WHERE ur.user_id = $1
                 AND a.code = $2 OR a.code = 'ELEVATED_PRIVILEGES'
           );