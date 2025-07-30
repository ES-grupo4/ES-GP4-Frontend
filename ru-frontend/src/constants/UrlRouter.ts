export const UrlRouter = {
    home: '/',
    login: '/',
    usuario: {
        default: '/user',
        administracao: {
            default: '/user/administracao',
            funcionarios: {
                index: '/user/administracao/funcionarios',
                novo: '/user/administracao/funcionarios/novo',
                editar: '/user/administracao/funcionarios/editar/:id',
            },
            administradores: {
                index: '/user/administracao/administradores',
                novo: '/user/administracao/administradores/novo',
                editar: '/user/administracao/administradores/editar/:id',
            },
            historicoSistema: {
                index: '/user/administracao/historico-sistema',
            },
            informacoes: {
                index: '/user/administracao/informacoes',
            },
        },

        dashboard: {
            default: '/user/dashboard',
        },
        relatorio: {
            default: '/user/relatorio',
        },
        clientes: {
            default: '/user/clientes',
        },
        compras: {
            default: '/user/compras',
        },
    }
} as const;