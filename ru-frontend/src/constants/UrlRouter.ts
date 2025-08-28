export const UrlRouter = {
    home: '/',
    login: '/',
    usuario: {
        default: '/user',
        administracao: {
            default: '/user/administracao',
            funcionarios: {
                index: '/user/administracao/funcionarios',
                adicionar: '/user/administracao/funcionarios/adicionar',
                editar: '/user/administracao/funcionarios/editar/:id',
            },
            administradores: {
                index: '/user/administracao/administradores',
                adicionar: '/user/administracao/administradores/adicionar',
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
        relatorios: {
            default: '/user/relatorios',
        },
        clientes: {
            default: '/user/clientes',
            adicionar: '/user/clientes/adicionar',
            detalhes: '/user/clientes/detalhes/:id',
            editar: '/user/clientes/editar/:id'
        },
        compras: {
            default: '/user/compras',
        },
    }
} as const;