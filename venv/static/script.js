const API_URL = 'http://localhost:5000/bibliotecas';
async function listarLivros() {
try {
  const response = await fetch(API_URL);
  const livros = await response.json();

  const listaLivros = document.getElementById('lista-livros');
  listaLivros.innerHTML = '';

  if (livros.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Nenhum livro encontrado.';
    listaLivros.appendChild(li);
  } else {
    livros.forEach(livro => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>ID:</strong> ${livro.id} | <strong>Título:</strong> ${livro.titulo} | <strong>Autor:</strong> ${livro.autor}`;
      listaLivros.appendChild(li);
    });
  }
} catch (error) {
  console.error('Erro ao buscar livros:', error);
}
}

// Carrega a lista ao abrir a página
window.onload = listarLivros;

  
// async function listarLivros() {
//   const resposta = await fetch(API_URL);
//   const livros = await resposta.json();

//   const lista = document.getElementById('lista-livros');
//   lista.innerHTML = '';
//   livros.forEach(livro => {
//     const item = document.createElement('li');
//     item.textContent = `ID: ${livro.id} | Título: ${livro.titulo} | Autor: ${livro.autor}`;
//     lista.appendChild(item);
//     alert(`ID: ${livro.id} | Título: ${livro.titulo} | Autor: ${livro.autor}`);
//   });
// }


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
