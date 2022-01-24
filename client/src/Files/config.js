import pjson from '../../package.json';

export const SERVER_URL = prod ? '' : 'http://localhost:8143';
export const CLIENT_VERSION = pjson.version;
export const REACT_VERSION = pjson.dependencies.react;
