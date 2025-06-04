'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { criarFormulario } from '../../utils/formulario'
import { useAuth } from '../../hooks/useAuth'

export default function Formulario() {
    const { user, token } = useAuth()
    const router = useRouter()

    const [formData, setFormData] = useState({
        espiritual: {
            oracao: '',
            desafios: '',
            apoio: '3',
        },
        feedback: {
            notaCultos: '3',
            detalhes: '',
        },
        // outras categorias podem ser adicionadas aqui
    })

    function limparCamposVazios(lista) {
        return lista.filter((item) => item.resposta && item.resposta.trim() !== '')
    }

    async function handleSubmit() {
        const payload = {
            co_igreja: 1,
            usuario: {
                no_solicitante: user?.no_solicitante || 'Anônimo',
                no_email: user?.no_email || '',
                no_telefone: user?.no_telefone || '',
            },
            formularios: [
                {
                    categoria: 'Espiritual',
                    detalhes: limparCamposVazios([
                        {
                            co_tipo_pergunta: 'Pelo que posso orar por você?',
                            resposta: formData.espiritual.oracao,
                        },
                        {
                            co_tipo_pergunta: 'Desafios espirituais',
                            resposta: formData.espiritual.desafios,
                        },
                        {
                            co_tipo_pergunta: 'Apoio espiritual',
                            resposta: formData.espiritual.apoio,
                        },
                    ]),
                },
                {
                    categoria: 'Feedback',
                    detalhes: limparCamposVazios([
                        { co_tipo_pergunta: 'Nota cultos', resposta: formData.feedback.notaCultos },
                        {
                            co_tipo_pergunta: 'Detalhes feedback',
                            resposta: formData.feedback.detalhes,
                        },
                    ]),
                },
            ],
        }

        try {
            const res = await criarFormulario(payload, token)
            alert(res.mensagem)
            router.push('/minhas-interacoes')
        } catch (error) {
            alert('Erro ao enviar formulário.')
        }
    }

    return (
        <div>
            <div className="container">
        <h1>Formulário de Apoio e Feedback</h1>
        <form action="#" method="POST">

          
            <fieldset>
                <legend>1.0 ESPIRITUAIS</legend>
                <label forhtml="orar">1.1 Pelo que posso orar por você?</label>
                <textarea id="orar" name="orar" placeholder="Compartilhe seu pedido de oração" required></textarea>

                <label forhtml="desafios">1.2 Quais desafios você enfrenta na sua caminhada espiritual?</label>
                <textarea id="desafios" name="desafios" placeholder="Descreva seus desafios espirituais" required></textarea>

                <label forhtml="apoiado">1.3 Você se sente apoiado espiritualmente pela igreja?</label>
                <input type="text" id="apoiado" name="apoiado" placeholder="Sim/Não" required/>
            </fieldset>

          
            <fieldset>
                <legend>2.0 EMOCIONAIS E DE APOIO</legend>
                <label forhtml="visita">2.1 Gostaria de uma visita pastoral?</label>
                <input type="text" id="visita" name="visita" placeholder="Sim/Não" required/>
            </fieldset>

            <fieldset>
                <legend>3.0 SOCIAIS E DE CONEXÃO</legend>
                <label forhtml="inclusao">3.1 O que poderia melhorar para que você se sinta mais incluído?</label>
                <textarea id="inclusao" name="inclusao" placeholder="Sugestões para inclusão" required></textarea>

                <label forhtml="atividades">3.2 Que tipo de atividades ou ministérios você gostaria de participar na igreja?</label>
                <textarea id="atividades" name="atividades" placeholder="Atividades ou ministérios de interesse" required></textarea>
            </fieldset>

     
            <fieldset>
                <legend>4.0 MATERIAIS E PRÁTICA</legend>
                <label forhtml="apoio">4.1 Você precisa de algum apoio material?</label>
                <input type="text" id="apoio" name="apoio" placeholder="Sim/Não" required/>
            </fieldset>

           
            <fieldset>
                <legend>5.0 Feedback dos Cultos</legend>
                <label forhtml="feedback">Pode nos dar um feedback dos cultos da igreja da FAP?</label>
                <textarea id="feedback" name="feedback" placeholder="Compartilhe sua opinião sobre os cultos" required></textarea>
            </fieldset>

            <button type="submit">Enviar</button>
        </form>
    </div>

</div>

             {/* seus alunos implementam os inputs com setFormData aqui */}
            <button onClick={handleSubmit}>Enviar</button>

            )


}
