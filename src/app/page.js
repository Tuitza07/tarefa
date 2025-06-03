import Image from "next/image";
import styles from "./page.css";

export default function Home() {
  return (
    <div className={styles.page}>
      
      <h1 className="">Bem-vindo ao Sistema de Interações</h1>
      <p className="">
        Este é um sistema para gerenciar interações entre membros e igrejas.
      </p>
      <Image
        src="/images/igreja.png"
        alt="Igreja"
        width={500}
        height={300}
        className=""
      />
      <div className="">
        <a href="/login" className="">Login</a>
        <a href="/formulario" className="">Enviar Interação</a>
        <a href="/minhas_interacoes" className="">Minhas Interações</a>
        <a href="/admin" className="">Painel Administrativo</a>
      </div>
    </div>
  );
}
