import Image from "next/image";
import styles from "./page.css";

export default function Home() {
  return (
    <div className="main">
      
      <h1 className="title">Bem-vindo ao Sistema de Interações</h1>
      <p className="text">
      
        Este é um sistema para gerenciar interações entre membros e igrejas.
      </p>
      <Image
        src="/imgadv.png"
        alt="Igreja"
        width={300}
        height={300}
        className="logo"
      />
      <div className="divlinks">
        <a href="/login" className="meu-botao">login</a>
        <a href="/formulario" className="meu-botao">Enviar Interação</a>
        <a href="/minhas_interacoes" className="">Minhas Interações</a>
        <a href="/admin" className="">Painel Administrativo</a>
      </div>
    </div>
  );
}
