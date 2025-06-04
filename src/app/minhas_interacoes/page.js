'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/navigation'
import { getInteracoesUsuario } from '../../utils/usuario'

export default function MinhasInteracoes() {
    const { token, user } = useAuth()
    const router = useRouter()
    const [interacoes, setInteracoes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getInteracoesUsuario(token, user?.id || user?.co_usuario || 1)
            .then((data) => setInteracoes(data.interacoes || []))
            .catch(() => alert('Erro ao buscar interações'))
            .finally(() => setLoading(false))
    })

    if (loading) return <p>Carregando suas interações...</p>
    if (interacoes.length === 0) return <p>Você ainda não enviou nenhuma interação.</p>

    return (
        <div>
            <div className="container">
                <h1>Acompanhamento do Usuário</h1>
                <form action="#" method="POST">
                    <div className="form-group">
                        <label forhtml="identificador">Nome ou Identificador</label>
                        <input type="text" id="identificador" name="identificador" placeholder="Digite o nome ou identificador" required />
                    </div>

                    <div className="form-group">
                        <label forhtml="tipo_acao">Tipo de Ação</label>
                        <input type="text" id="tipo_acao" name="tipo_acao" placeholder="Digite o tipo de ação" required />
                    </div>

                    <div className="form-group">
                        <label forhtml="resposta">Resposta</label>
                        <input type="text" id="resposta" name="resposta" placeholder="Digite a resposta" required />
                    </div>

                    <div className="form-group">
                        <label forhtml="estado_acao">Estado da Ação</label>
                        <input type="text" id="estado_acao" name="estado_acao" placeholder="Digite o estado da ação" required />
                    </div>

                    <input type="submit" value="Salvar Acompanhamento" />
                </form>
            </div>
              {/* Aqui os alunos devem exibir cada interação */ }
    {/* Com data, status, igreja, formulário e ações */ }
    {/* Exemplo: interacoes.map(...) com layout customizado */ }
        </div>


          
         )
}
