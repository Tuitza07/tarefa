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
            <h1>Painel Administrativo</h1>

            {/* Aqui os alunos devem criar o layout da lista de interações */}
            {/* Para cada interação, exibir nome, email, status, formularios, ações e menu de atualização */}

            {/* Exemplo (a ser transformado em HTML pelos alunos): */}
            {/* interacoes.map(...) */}
        </div>
    )
}
