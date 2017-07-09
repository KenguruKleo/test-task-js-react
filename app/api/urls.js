const AUTH_ROOT_URL = 'http://localhost:3090';

export default {
    AUTH_ROOT: AUTH_ROOT_URL,
    AUTH_SIGNIN: `${AUTH_ROOT_URL}/signin`,
    AUTH_SIGNUP: `${AUTH_ROOT_URL}/signup`,
    AUTH_CHECK_TOKEN: `${AUTH_ROOT_URL}/check_token`,

    MARKERS: `${AUTH_ROOT_URL}/markers`,
    MARKERS_BY_CATEGORY: `${AUTH_ROOT_URL}/markers_by_category`
}