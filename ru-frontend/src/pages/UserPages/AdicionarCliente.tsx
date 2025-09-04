import type { ChangeEvent, FormEvent, ReactElement } from 'react'
import { useState } from 'react'
import UploadIcon from '../../assets/IconAddFuncionario'
import routes from '../../services/routes'
import { type RowData, readExcelFile } from '../../utils/lerPlanilha'
import validarCPF from '../../utils/validarCpf'

export default function AdicionarCliente(): ReactElement {
  const [cpf, setCpf] = useState('')
  const [nome, setNome] = useState('')
  const [matricula, setMatricula] = useState('')
  const [tipo, setTipo] = useState('')
  const [tipoGraduacao, setTipoGraduacao] = useState('nenhuma')
  const [bolsista, setBolsista] = useState('Nao')

  const handleRegisterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (cpf === '' || nome === '' || matricula === '' || tipo === '') {
      alert('Preencha todos os campos!')
    } else if (!validarCPF(cpf)) {
      alert('Insira um CPF válido')
    } else {
      const graduando = !!(tipoGraduacao === 'graduacao' || tipoGraduacao === 'graduacao_e_pos')
      const pos_graduando = !!(
        tipoGraduacao === 'pos_graduacao' || tipoGraduacao === 'graduacao_e_pos'
      )
      const bolsa = bolsista === 'Sim'
      const response = await addCliente({
        cpf: cpf,
        nome: nome,
        matricula: matricula,
        tipo: tipo,
        graduando: graduando,
        pos_graduando: pos_graduando,
        bolsista: bolsa,
      })
      console.log(response)
      if (response.status === 201) {
        alert(`Cliente ${nome} registrado com sucesso!`)
      } else {
        alert(`Ocorreu um erro ao criar o cliente`)
      }
    }
  }

  const verifyCliente = (clienteData: Record<string, unknown>) => {
    if (
      clienteData.cpf === undefined ||
      clienteData.nome === undefined ||
      clienteData.matricula === undefined ||
      clienteData.tipo === undefined ||
      clienteData.tipoGraduacao === undefined ||
      clienteData.bolsista === undefined
    ) {
      return 'Campos obrigatórios faltando!'
    } else if (typeof clienteData.cpf === 'string' && !validarCPF(clienteData.cpf)) {
      return 'CPF inválido'
    }
    return 'OK'
  }

  const addCliente = async (data: {
    cpf: string
    nome: string
    matricula: string
    tipo: string
    graduando: boolean
    pos_graduando: boolean
    bolsista: boolean
  }): Promise<any> => {
    try {
      const response = await routes.criarCliente(data)
      return response
    } catch (e) {
      return e
    }
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const jsonData = await readExcelFile(file)
      await addClienteJson(jsonData)
    } catch (err) {
      console.error('Erro ao ler planilha:', err)
    }
  }

  const addClienteJson = async (jsonData: RowData[]) => {
    const errors: string[] = []

    for (const cliente of jsonData) {
      const msg = verifyCliente(cliente)

      if (msg === 'OK') {
        const graduando = !!(
          cliente.tipoGraduacao.toLowerCase() === 'graduação' ||
          cliente.tipoGraduacao.toLowerCase() === 'graduação e pós'
        )
        const pos_graduando = !!(
          cliente.tipoGraduacao.toLowerCase() === 'pós graduação' ||
          cliente.tipoGraduacao.toLowerCase() === 'graduação e pós'
        )
        const bolsa = cliente.bolsista.toLowerCase() === 'sim'
        const response = await addCliente({
          cpf: cliente.cpf,
          nome: cliente.nome,
          matricula: cliente.matricula,
          tipo: cliente.tipo.toLowerCase(),
          graduando: graduando,
          pos_graduando: pos_graduando,
          bolsista: bolsa,
        })

        console.log(response)

        if (response.status !== 201) {
          console.log(response.response.data.detail)
          errors.push(`${cliente.cpf}: ${response.response.data.detail}`)
        }
      } else {
        errors.push(`${cliente.cpf}: ${msg}`)
      }
    }

    console.log(errors)

    if (errors.length > 0) {
      alert(`Alguns clientes não foram cadastrados:\n${errors.join('\n')}`)
    } else {
      alert('Todos os clientes foram adicionados com sucesso!')
    }
  }

  return (
    <div className='p-4 sm:ml-64 min-h-screen font-sans'>
      <header className='group flex'>
        <h1 className='font-semibold font-sans text-6xl text-sky-900'>Adicionar Cliente</h1>
      </header>
      <div className='container md:p-8'>
        <main className='max-w-2xl space-y-8'>
          <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h2 className='text-lg font-semibold text-gray-800 mb-4'>
              Importar planilha de clientes:
            </h2>
            <div>
              <label
                htmlFor='file-upload'
                className='cursor-pointer bg-gray-100 border border-gray-300 rounded-md p-3 flex items-center justify-between text-gray-500 hover:bg-gray-200 transition-colors'
              >
                <span>Inserir planilha (.xlsx, .csv)</span>
                <UploadIcon />
              </label>
              <input
                id='file-upload'
                name='file-upload'
                type='file'
                className='sr-only'
                onChange={handleFileChange}
                accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
              />
            </div>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h2 className='text-lg font-semibold text-gray-800 mb-6'>Registrar Cliente:</h2>
            <form onSubmit={handleRegisterSubmit} className='space-y-5'>
              <div>
                <label htmlFor='cpf' className='block text-md font-medium text-gray-700 mb-1'>
                  CPF:
                </label>
                <input
                  type='text'
                  id='cpf'
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className='w-full p-3 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>
              <div>
                <label htmlFor='nome' className='block text-md font-medium text-gray-700 mb-1'>
                  Nome:
                </label>
                <input
                  type='text'
                  id='nome'
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className='w-full p-3 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>
              <div>
                <label htmlFor='matricula' className='block text-md font-medium text-gray-700 mb-1'>
                  Matrícula:
                </label>
                <input
                  type='matricula'
                  id='matricula'
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  className='w-full p-3 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>
              <div className='flex space-x-4'>
                <div className='inline-block relative w-32'>
                  <label
                    htmlFor='matricula'
                    className='block text-md font-medium text-gray-700 mb-1'
                  >
                    Tipo de Cliente:
                  </label>
                  <select
                    value={tipo}
                    onChange={(e) => {
                      if (e.target.value !== 'aluno') {
                        setTipoGraduacao('nenhuma')
                        setBolsista('Nao')
                      }
                      setTipo(e.target.value)
                    }}
                    className='block w-full px-4 py-2 pr-8 text-gray-700 bg-white border border-gray-300 rounded shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  >
                    <option key={-1} value={''}>
                      Selecionar
                    </option>
                    <option key={0} value={'aluno'}>
                      Aluno
                    </option>
                    <option key={1} value={'professor'}>
                      Professor
                    </option>
                    <option key={2} value={'tecnico'}>
                      Técnico
                    </option>
                  </select>
                  <div className='pointer-events-none absolute mt-8 inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                    ▼
                  </div>
                </div>
                {tipo === 'aluno' && (
                  <>
                    <div className='inline-block relative w-48'>
                      <label
                        htmlFor='matricula'
                        className='block text-md font-medium text-gray-700 mb-1'
                      >
                        Formação:
                      </label>
                      <select
                        value={tipoGraduacao}
                        onChange={(e) => {
                          setTipoGraduacao(e.target.value)
                        }}
                        className='block w-full px-4 py-2 pr-8 text-gray-700 bg-white border border-gray-300 rounded shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      >
                        <option key={0} value={'nenhuma'}>
                          Nenhuma
                        </option>
                        <option key={1} value={'pos_graduacao'}>
                          Pós Graduação
                        </option>
                        <option key={2} value={'graduacao_e_pos'}>
                          Graduação e Pós
                        </option>
                        <option key={3} value={'graduacao'}>
                          Graduação
                        </option>
                      </select>
                      <div className='pointer-events-none absolute mt-8 inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                        ▼
                      </div>
                    </div>
                    <div className='inline-block relative w-48'>
                      <label
                        htmlFor='matricula'
                        className='block text-md font-medium text-gray-700 mb-1'
                      >
                        Bolsista:
                      </label>
                      <select
                        value={bolsista}
                        onChange={(e) => setBolsista(e.target.value)}
                        className='block w-full px-4 py-2 pr-8 text-gray-700 bg-white border border-gray-300 rounded shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      >
                        <option key={0} value={'Nao'}>
                          Não
                        </option>
                        <option key={1} value={'Sim'}>
                          Sim
                        </option>
                      </select>
                      <div className='pointer-events-none absolute mt-8 inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                        ▼
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className='pt-2'>
                <button
                  type='submit'
                  className='bg-[#28a745] text-white font-bold py-2 px-6 rounded-md hover:bg-[#218838] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
