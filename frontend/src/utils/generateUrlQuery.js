export const generateUrlQuery = ({ queries = {} }) => {
    const search = new URLSearchParams(queries);
    const queryString = search.toString();
    return queryString.length ? `?${queryString}` : '';
};
