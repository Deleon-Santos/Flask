const API_URL = 'http://localhost:5000/bibliotecas';

async function listarLivros() {
  const resposta = await fetch(API_URL);
  const livros = await resposta.json();

  const lista = document.getElementById('lista-livros');
  lista.innerHTML = '';
  livros.forEach(livro => {
    const item = document.createElement('li');
    item.textContent = `ID: ${livro.id} | Título: ${livro.titulo} | Autor: ${livro.autor}`;
    lista.appendChild(item);
    alert(`ID: ${livro.id} | Título: ${livro.titulo} | Autor: ${livro.autor}`);
  });
}

async function adicionarLivro() {
  const titulo = document.getElementById('titulo').value;
  const autor = document.getElementById('autor').value;

  if (!titulo || !autor) {
    alert('Preencha todos os campos.');
    return;
  }

  await fetch(API_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({titulo, autor})
  });

  listarLivros();
}

async function atualizarLivro() {
  const id = document.getElementById('id-atualizar').value;
  const titulo = document.getElementById('titulo-atualizar').value;
  const autor = document.getElementById('autor-atualizar').value;

  if (!id || !titulo || !autor) {
    alert('Preencha todos os campos.');
    return;
  }

  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({titulo, autor})
  });
  alert('Livro enviado com sucesso!');
  // listarLivros();
}

async function deletarLivro() {
  const id = document.getElementById('id-deletar').value;
  if (!id) {
    alert('Preencha o ID.');
    return;
  }

  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

  listarLivros();
}

async function buscarLivroPorId() {
  const id = document.getElementById('id-buscar').value;
  if (!id) {
    alert('Preencha o ID.');
    return;
  }

  const resposta = await fetch(`${API_URL}/${id}`);
  const resultado = document.getElementById('resultado-busca');

  if (resposta.ok) {
    const livro = await resposta.json();
    resultado.textContent = `ID: ${livro.id} | Título: ${livro.titulo} | Autor: ${livro.autor}`;
  } else {
    resultado.textContent = 'Livro não encontrado!';
  }
}

// Carregar lista inicial
listarLivros();
