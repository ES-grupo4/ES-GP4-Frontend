import api from "./api.ts"

const login = (cpf : String,senha : String) => {
    return api.post("/auth/login", {
        cpf,
        senha,
      });
}

export default {
    login
}