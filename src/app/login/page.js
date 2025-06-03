'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../hooks/useAuth'
import { loginUsuario } from '@/utils/auth'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const { login, user } = useAuth(false)
    const router = useRouter()

    async function handleLogin() {
        try {
            const res = await loginUsuario(email, senha)
            login(res.usuario, res.token)
            router.push('/minhas_interacoes')
        } catch (err) {
            alert('Erro ao fazer login')
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <button onClick={handleLogin}>Entrar</button>
        </div>
    )
}
