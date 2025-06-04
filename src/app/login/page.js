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
            if (res.usuario.co_perfil === 1) {
                router.push('/admin')
            } else {
                router.push('/minhas_interacoes')
            }
        } catch (err) {
            alert('Erro ao fazer login')
        }
    }

    return (
        <div>
            <div className="login-container">
        <h1>Login</h1>
        <form action="#" method="POST">
            <div className="input-group">
                <label forhtml="username">Usuário</label>
                <input type="text" id="username" name="username" placeholder="Digite seu usuário" required/>
            </div>
            <div className="input-group">
                <label forhtml="password">Senha</label>
                <input type="password" id="password" name="password" placeholder="Digite sua senha" required/>
            </div>
            <div className="input-group">
                <button type="submit" class="btn">Entrar</button>
            </div>
        </form>
    </div>
            <button onClick={handleLogin}>Entrar</button>
        </div>
    )
}
