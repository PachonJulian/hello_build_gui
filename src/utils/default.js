const apiURL=`${process.env.REACT_APP_AUTH_API_URL}`

export const apiRoute={
    signUp: `${apiURL}/signUp`,
    login: `${apiURL}/login`,
    getInfoGithub: `${apiURL}/getInfoGithub`,
    saveFavorite: `${apiURL}/saveFavorite`
}