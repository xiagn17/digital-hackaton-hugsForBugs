const ROLES = {
    admin: 'ADMIN',
    user: 'USER',
};

export default ROLES;

function roleResolver(role1, role2) {
    return Boolean(
        role1 && role2 && role1.toLowerCase() === role2.toLowerCase(),
    );
}
export function isAdmin(userRole) {
    return roleResolver(userRole, ROLES.admin);
}

export function isUser(userRole) {
    return roleResolver(userRole, ROLES.user);
}
