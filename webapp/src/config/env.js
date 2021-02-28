export const backendUrl = process.env.NODE_ENV === "development" ?
    "http://localhost:3000" :
    "DEPLOYMENT_URL";