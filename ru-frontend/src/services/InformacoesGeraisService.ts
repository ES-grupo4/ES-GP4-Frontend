import api from './api'

export const InformacoesGeraisService = {
  get: async (): Promise<any> => {
    const response = await api.get('/informacoes-gerais/')
    return response.data
  },
}
