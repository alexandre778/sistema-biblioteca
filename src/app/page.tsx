"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if ((usuario === "usuario" || usuario === "admin") && senha === "123") {
      localStorage.setItem("auth", "true");
      localStorage.setItem("user", usuario);

      router.push("/livros");
    } else {
      setErro("Usuário ou senha inválidos!");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f3f4f6",
      }}
    >
      <nav style={navBarStyle}>
        <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          AGM // SOFTWARE
        </div>

        <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          MARVEL_universe
        </div>
      </nav>

      <main style={mainStyle}>
        <form onSubmit={handleLogin} style={formStyle}>
          <h2 style={{ textAlign: "center", color: "#2c3e50", margin: 0 }}>
            Login
          </h2>

          {erro && (
            <p style={{ color: "red", textAlign: "center", margin: 0 }}>
              {erro}
            </p>
          )}

          <div>
            <label style={labelStyle}>Usuário</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Digite seu usuário"
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
              style={inputStyle}
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Entrar no Sistema
          </button>
        </form>
      </main>
    </div>
  );
}

const navBarStyle: React.CSSProperties = {
  backgroundColor: "#1e5bb8",
  color: "white",
  padding: "0.8rem 2rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const mainStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
};

const formStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "2.5rem",
  borderRadius: "12px",
  width: "100%",
  maxWidth: "400px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
};

const labelStyle = {
  display: "block",
  marginBottom: "0.5rem",
  color: "#4b5563",
  fontWeight: "500",
};

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  color: "#000",
};

const buttonStyle = {
  backgroundColor: "#1e5bb8",
  color: "white",
  border: "none",
  padding: "0.8rem",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
};