import { Document, Page, PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: 'Helvetica' },
  header: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: { marginBottom: 15 },
  title: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: 'bold',
    borderBottom: '1px solid #000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  subRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20, // desloca as subcategorias
    marginBottom: 4,
  },
})

const RelatorioTemplate = ({ data }: { data: any }) => (
  <PDFViewer style={{ width: '100%', height: '100vh' }}>
    <Document title={`RelatorioRU-[mesSelecionado][anoSelecionado].pdf`}>
      <Page size='A4' style={styles.page}>
        <Text style={styles.header}>Relatório – Restaurante Universitário</Text>

        <View style={styles.section}>
          <Text style={styles.title}>Informações Gerais</Text>
          <View style={styles.row}>
            <Text>Nome da empresa/instituição:</Text>
            <Text>{data.nome_empresa}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Dados do Relatório</Text>
          <View style={styles.row}>
            <Text>Relatório referente ao período de:</Text>
            <Text>{data.periodStr}</Text>
          </View>
          <View style={styles.row}>
            <Text>Relatório gerado em:</Text>
            <Text>
              {new Date().toLocaleString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
          <View style={styles.row}>
            <Text>Relatório gerado através do funcionário de CPF:</Text>
            <Text>{data.cpf}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Indicadores-Chave</Text>
          <View style={styles.row}>
            <Text>Total de clientes registrados:</Text>
            <Text>{data.clientes_registrados.total}</Text>
          </View>
          <View style={styles.row}>
            <Text>Total de funcionários ativos:</Text>
            <Text>{data.funcionarios_ativos}</Text>
          </View>
          <View style={styles.row}>
            <Text>Total de refeições vendidas no mês:</Text>
            <Text>{data.compras_por_tipo.total}</Text>
          </View>
          <View style={styles.row}>
            <Text>Faturamento bruto no mês (R$):</Text>
            <Text>{(data.faturamento_bruto_mensal / 100).toFixed(2).replace('.', ',')}</Text>
          </View>
        </View>
      </Page>
      <Page size='A4' style={styles.page}>
        <Text style={styles.header}>Detalhamento</Text>

        <View style={styles.section}>
          <Text style={styles.title}>Clientes</Text>
          <View style={styles.row}>
            <Text>Total cadastrados:</Text>
            <Text>{data.clientes_registrados.total}</Text>
          </View>
          <View style={styles.row}>
            <Text>Nº de alunos bolsistas cadastrados:</Text>
            <Text>{data.clientes_registrados.alunos.bolsistas}</Text>
          </View>
          <Text>Nº de clientes alunos cadastrados por categoria:</Text>
          <View style={styles.subRow}>
            <Text>- Em Graduação:</Text>
            <Text>{data.clientes_registrados.alunos.em_graduacao}</Text>
          </View>
          <View style={styles.subRow}>
            <Text>- Em Pós-Graduação:</Text>
            <Text>{data.clientes_registrados.alunos.pos_graduacao}</Text>
          </View>
          <View style={styles.subRow}>
            <Text>- Em Graduação e Pós:</Text>
            <Text>{data.clientes_registrados.alunos.ambos}</Text>
          </View>

          <Text>Nº de cadastrados por tipo:</Text>
          <View style={styles.subRow}>
            <Text>- Alunos:</Text>
            <Text>{data.clientes_registrados.alunos.total}</Text>
          </View>
          <View style={styles.subRow}>
            <Text>- Professores:</Text>
            <Text>{data.clientes_registrados.professores}</Text>
          </View>
          <View style={styles.subRow}>
            <Text>- Técnicos/Servidores:</Text>
            <Text>{data.clientes_registrados.tecnicos}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Funcionários</Text>
          <View style={styles.row}>
            <Text>Total de funcionários ativos:</Text>
            <Text>{data.funcionarios_ativos}</Text>
          </View>
          <View style={styles.row}>
            <Text>Total de funcionários administradores:</Text>
            <Text>{data.administradores_ativos}</Text>
          </View>
          <View style={styles.row}>
            <Text>Total de funcionários desativados:</Text>
            <Text>{data.desativados}</Text>
          </View>
          <View style={styles.row}>
            <Text>Quantidade de novos funcionários no mês:</Text>
            <Text>{data.funcionarios_adicionados_mes}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.title}>Refeições</Text>
          <View style={styles.row}>
            <Text>Quantidade de refeições subsidiadas (bolsistas):</Text>
            <Text>{data.compras_por_tipo.alunos.bolsistas}</Text>
          </View>
          <Text>
            Quantidade de refeições adquiridas no mês por categoria de graduação dos clientes
            alunos:
          </Text>
          <View style={styles.subRow}>
            <Text>- Em Graduação:</Text>
            <Text>{data.compras_por_tipo.alunos.em_graduacao}</Text>
          </View>
          <View style={styles.subRow}>
            <Text>- Em Pós-Graduação:</Text>
            <Text>{data.compras_por_tipo.alunos.pos_graduacao}</Text>
          </View>
          <View style={styles.subRow}>
            <Text>- Em Graduação e Pós:</Text>
            <Text>{data.compras_por_tipo.alunos.ambos}</Text>
          </View>
          <Text>Quantidade de refeições adquiridas no mês por tipo de cliente:</Text>
          <View style={styles.subRow}>
            <Text>- Alunos:</Text>
            <Text>{data.compras_por_tipo.alunos.total}</Text>
          </View>
          <View style={styles.subRow}>
            <Text>- Professores:</Text>
            <Text>{data.compras_por_tipo.professores}</Text>
          </View>
          <View style={styles.subRow}>
            <Text>- Técnicos:</Text>
            <Text>{data.compras_por_tipo.tecnicos}</Text>
          </View>
          <View style={styles.subRow}>
            <Text>- Externos:</Text>
            <Text>{data.compras_por_tipo.externos}</Text>
          </View>
        </View>
      </Page>
    </Document>
  </PDFViewer>
)

export default RelatorioTemplate
