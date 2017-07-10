const ROOT_URL = process.env.NODE_ENV == "production" ? '' : 'http://localhost:3090';

export default {
    AUTH_ROOT: ROOT_URL,
    AUTH_SIGNIN: `${ROOT_URL}/signin`,
    AUTH_SIGNUP: `${ROOT_URL}/signup`,
    AUTH_CHECK_TOKEN: `${ROOT_URL}/check_token`,

    MARKERS: `${ROOT_URL}/markers`,
    MARKERS_BY_CATEGORY: `${ROOT_URL}/markers_by_category`
}