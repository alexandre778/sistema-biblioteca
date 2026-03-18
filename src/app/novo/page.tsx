"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import NavBar from "@/components/NavBar";

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  dataLancamento?: string;
  anoLancamento?: string;
}

export default function CadastroLivro() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [dataLancamento, setDataLancamento] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) router.replace("/");
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (anoLancamento.length !== 4 || isNaN(Number(anoLancamento))) {
      alert("Digite um ano válido com 4 números.");
      return;
    }

    const livrosSalvos = JSON.parse(localStorage.getItem("meus-livros") || "[]") as Livro[];

    const novoLivro: Livro = {
      id: Date.now(),
      titulo,
      autor,
      dataLancamento,
      anoLancamento,
    };

    const novaLista = [...livrosSalvos, novoLivro];
    localStorage.setItem("meus-livros", JSON.stringify(novaLista));

    alert("Livro salvo com sucesso!");
    router.push("/livros");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      <NavBar />
      <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
        <button onClick={() => router.push("/livros")} style={backButtonStyle}>
          <ArrowLeft size={20} /> Voltar para a Lista
        </button>

        <form onSubmit={handleSubmit} style={formStyle}>
          <h2 style={{ marginBottom: "20px", color: "#333" }}>Cadastrar Novo Livro</h2>

          <div style={{ marginBottom: "15px" }}>
            <label style={labelStyle}>Título</label>
            <input
              style={inputStyle}
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              placeholder="Ex: O Pequeno Príncipe"
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={labelStyle}>Autor</label>
            <input
              style={inputStyle}
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              required
              placeholder="Ex: Antoine de Saint-Exupéry"
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={labelStyle}>Data de Lançamento</label>
            <input
              type="date"
              style={inputStyle}
              value={dataLancamento}
              onChange={(e) => setDataLancamento(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={labelStyle}>Ano de Lançamento</label>
            <input
              type="number"
              style={inputStyle}
              value={anoLancamento}
              onChange={(e) => setAnoLancamento(e.target.value)}
              required
              placeholder="Ex: 1943"
            />
          </div>

          <button type="submit" style={saveButtonStyle}>
            <Save size={20} /> Salvar Livro
          </button>
        </form>
      </div>
    </div>
  );
}

// ------------------------
// Estilos
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  color: "#000",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "bold",
  color: "#333",
};

const formStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
};

const backButtonStyle: React.CSSProperties = {
  border: "none",
  background: "none",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  cursor: "pointer",
  marginBottom: "20px",
  color: "#666",
};

const saveButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#1e5bb8",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  fontWeight: "bold",
};
