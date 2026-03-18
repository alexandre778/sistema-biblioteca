"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Book, Trash2 } from "lucide-react";
import NavBar from "@/components/NavBar";

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  dataLancamento?: string;
  anoLancamento?: string;
}

export default function ListaLivros() {
  const router = useRouter();
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);

  const [filtroAno, setFiltroAno] = useState("");
  const [filtroAutor, setFiltroAutor] = useState("");
  const [ordemAno, setOrdemAno] = useState<"asc" | "desc" | "">("");

  useEffect(() => {
    const carregarLivros = () => {
      const auth = localStorage.getItem("auth");
      if (!auth) {
        router.replace("/");
        return;
      }

      const dadosSalvos = localStorage.getItem("meus-livros");
      if (dadosSalvos) {
        setLivros(JSON.parse(dadosSalvos) as Livro[]);
      }

      setLoading(false);
    };

    carregarLivros();
  }, [router]);

  const excluirLivro = (id: number) => {
    const novaLista = livros.filter((livro) => livro.id !== id);
    setLivros(novaLista);
    localStorage.setItem("meus-livros", JSON.stringify(novaLista));
  };

  let livrosProcessados = [...livros];

  if (filtroAno) {
    livrosProcessados = livrosProcessados.filter(
      (livro) => livro.anoLancamento === filtroAno
    );
  }

  if (filtroAutor) {
    livrosProcessados = livrosProcessados.filter((livro) =>
      livro.autor.toLowerCase().includes(filtroAutor.toLowerCase())
    );
  }

  if (ordemAno === "asc") {
    livrosProcessados.sort(
      (a, b) => Number(a.anoLancamento) - Number(b.anoLancamento)
    );
  }

  if (ordemAno === "desc") {
    livrosProcessados.sort(
      (a, b) => Number(b.anoLancamento) - Number(a.anoLancamento)
    );
  }

  if (loading) return null;

  return (
    <div style={{ backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
      <NavBar />

      {/* BANNER */}
      <div style={bannerStyle}></div>

      <div style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1 style={{ color: "#2c3e50", marginBottom: "20px" }}>
          📚 Meus Livros
        </h1>

        {/* FILTROS */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <input
            type="number"
            placeholder="Filtrar por ano"
            value={filtroAno}
            onChange={(e) => setFiltroAno(e.target.value)}
            style={filterStyle}
          />

          <input
            type="text"
            placeholder="Filtrar por autor"
            value={filtroAutor}
            onChange={(e) => setFiltroAutor(e.target.value)}
            style={filterStyle}
          />

          <select
            value={ordemAno}
            onChange={(e) =>
              setOrdemAno(e.target.value as "asc" | "desc" | "")
            }
            style={filterStyle}
          >
            <option value="">Ordenar por ano</option>
            <option value="asc">Ano Crescente ↑</option>
            <option value="desc">Ano Decrescente ↓</option>
          </select>
        </div>

        {/* LISTA DE LIVROS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {livrosProcessados.length > 0 ? (
            livrosProcessados.map((livro) => (
              <div key={livro.id} style={cardStyle}>
                <Book size={32} color="#1e5bb8" />

                <div>
                  <h3 style={{ margin: "5px 0", color: "#000" }}>
                    {livro.titulo}
                  </h3>

                  <p style={{ color: "#666", fontSize: "0.9rem" }}>
                    👤 {livro.autor}
                  </p>

                  <p style={{ color: "#666", fontSize: "0.85rem" }}>
                    📅 {livro.dataLancamento || "Data não informada"}
                  </p>

                  <p style={{ color: "#666", fontSize: "0.85rem" }}>
                    📖 {livro.anoLancamento || "Ano não informado"}
                  </p>
                </div>

                <button
                  onClick={() => excluirLivro(livro.id)}
                  style={deleteButtonStyle}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: "#666" }}>Nenhum livro encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== Estilos =====
const bannerStyle: React.CSSProperties = {
  width: "100%",
  height: "400px",
  backgroundImage: "url('/banner-hq.jpg')",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundColor: "#000",
};

const filterStyle: React.CSSProperties = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  minWidth: "200px",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "1.5rem",
  borderRadius: "8px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  position: "relative",
};

const deleteButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "none",
  border: "none",
  color: "#e74c3c",
  cursor: "pointer",
};
