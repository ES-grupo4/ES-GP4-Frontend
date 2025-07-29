export const UrlRouter = {
    home: '/',
    login: '/login',
    administracao: {
        default: '/administracao',
        funcionarios: {
            index: '/administracao/funcionarios',
            novo: '/administracao/funcionarios/novo',
            editar: '/administracao/funcionarios/editar/:id',
        },
        historicoSistema: {
            index: '/administracao/historico-sistema',
        },
        informacoes: {
            index: '/administracao/informacoes',
        },
    },
    dashboard: {
        default: '/dashboard',
    },
    relatorio: {
        default: '/relatorio',
    },
    clientes: {
        default: '/clientes',
    },
    compras: {
        default: '/compras',
    },
} as const;