import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-project-ac320.firebaseio.com/' // when we add authentication, we'll also use a diff URL so no need to set this one as global
});

export default instance;