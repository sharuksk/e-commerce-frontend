const backendDomain = "https://e-commerce-backend-k1yf.onrender.com/";

const SummaryApi = {
    signUp: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },
}

export default SummaryApi;