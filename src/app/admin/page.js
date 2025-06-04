'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../hooks/useAuth'
import { getInteracoesPorIgreja, atualizarStatusInteracao } from '../../utils/admin'

export default function PainelAdmin() {
    const { token } = useAuth()
    const router = useRouter()

    const [igrejaId] = useState(1) // exemplo fixo
    const [interacoes, setInteracoes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        carregarInteracoes()
    })

    async function carregarInteracoes() {
        setLoading(true)
        try {
            const data = await getInteracoesPorIgreja(igrejaId, token)
            setInteracoes(data.interacoes || [])
        } catch {
            alert('Erro ao carregar interações')
        } finally {
            setLoading(false)
        }
    }

    async function handleStatusUpdate(co_interacao, novoStatus, co_responsavel = 3) {
        try {
            await atualizarStatusInteracao(co_interacao, novoStatus, co_responsavel, token)
            alert('Status atualizado com sucesso!')
            carregarInteracoes()
        } catch {
            alert('Erro ao atualizar status')
        }
    }

    if (loading) return <p>Carregando interações da igreja...</p>

    return (
        <div>
            <div className="container">
        <h1>Acompanhamento Administrativo</h1>
        <form action="#" method="POST">
            <div className="form-group">
                <label forhtml="identificador">Nome ou Identificador</label>
                <input type="text" id="identificador" name="identificador" placeholder="Digite o nome ou identificador" required/>
            </div>

            <div className="form-group">
                <label forhtml="tipo_acao">Tipo de Ação</label>
                <input type="text" id="tipo_acao" name="tipo_acao" placeholder="Digite o tipo de ação" required/>
            </div>

            <div className="form-group">
                <label forhtml="resposta">Resposta</label>
                <input type="text" id="resposta" name="resposta" placeholder="Digite a resposta" required/>
            </div>

            <div className="form-group">
                <label forhtml="estado_acao">Estado da Ação</label>
                <input type="text" id="estado_acao" name="estado_acao" placeholder="Digite o estado da ação" required/>
            </div>

            <input type="submit" value="Salvar Acompanhamento"/>
        </form>
    </div>



            {/* Aqui os alunos devem criar o layout da lista de interações */}
            {/* Para cada interação, exibir nome, email, status, formularios, ações e menu de atualização */}

            {/* Exemplo (a ser transformado em HTML pelos alunos): */}
            {/* interacoes.map(...) */}
        </div>
    )
}
