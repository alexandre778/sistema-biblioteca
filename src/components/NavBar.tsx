"use client";
import { useRouter } from "next/navigation";
import { PlusCircle, Book, LogOut } from "lucide-react";

export default function NavBar() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove o acesso e manda para a raiz (onde agora mora o Login)
    localStorage.removeItem('auth');
    router.replace('/'); 
  };

  return (
    <nav style={navStyle}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>AGM // SOFTWARE</div>
      <div style={{ display: 'flex', gap: '15px' }}>
        {/* Agora aponta para /livros */}
        <button onClick={() => router.push('/livros')} style={navButtonStyle}>
          <Book size={18} /> Livros
        </button>
        
        {/* Mantém /novo */}
        <button onClick={() => router.push('/novo')} style={navButtonStyle}>
          <PlusCircle size={18} /> Novo
        </button>
        
        {/* Logout volta para o Login na raiz / */}
        <button onClick={handleLogout} style={navButtonStyle}>
          <LogOut size={18} /> Sair
        </button>
      </div>
    </nav>
  );
}

const navStyle: React.CSSProperties = { 
  backgroundColor: '#1e5bb8', 
  color: 'white', 
  padding: '1rem 2rem', 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)' 
};

const navButtonStyle: React.CSSProperties = { 
  background: 'none', 
  border: 'none', 
  color: 'white', 
  display: 'flex', 
  alignItems: 'center', 
  gap: '5px', 
  cursor: 'pointer',
  fontWeight: '500'
};