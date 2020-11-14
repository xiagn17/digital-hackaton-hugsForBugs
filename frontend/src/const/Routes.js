import _ from 'lodash';
import UserRoles from '../const/UserRoles';

const roleResolver = (role1, role2) => _.isEqual(role1, role2);

const ROUTE_ROLES = {
    authNone: [],
    authOnlyUser: [UserRoles.user],
    authOnlyAdmin: [UserRoles.admin],
};

const routes = {
    home: { path: '/home', routeRole: ROUTE_ROLES.authOnlyUser },
    task: { path: '/task', routeRole: ROUTE_ROLES.authOnlyUser },
    login: { path: '/' },
    test: { path: '/test', routeRole: ROUTE_ROLES.authOnlyUser },
    admin: { path: '/admin', routeRole: ROUTE_ROLES.authOnlyAdmin },
};

export const isAuthNone = (routeRole) =>
    roleResolver(routeRole, ROUTE_ROLES.authNone);
export const isAuthOnlyUser = (routeRole) =>
    roleResolver(routeRole, ROUTE_ROLES.authOnlyUser);
export const isAuthOnlyAdmin = (routeRole) =>
    roleResolver(routeRole, ROUTE_ROLES.authOnlyAdmin);

export default routes;
