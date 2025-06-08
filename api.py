# api para gestão de bibliotecas


from flask import Flask, request, jsonify

app = Flask(__name__)

bibliotecas = [
    {"id": 1, "titulo": "1984", "autor": "George Orwell"},
    {"id": 2, "titulo": "Dom Casmurro", "autor": "Machado de Assis"},
    {"id": 3, "titulo": "O Senhor dos Anéis", "autor": "J.R.R. Tolkien"}
]

# retornando todos os livros
@app.route('/bibliotecas', methods=['GET'])
def get_bibliotecas():
    return jsonify(bibliotecas)

# retornando todos os livros por id
@app.route('/bibliotecas/<int:id>', methods=['GET'])
def retorna_livro_id(id):
    for livro in bibliotecas:
        if livro['id'] == id:
            return livro
    return jsonify({'message': 'Livro não encontrado!'}), 404

# modificando um livro
@app.route('/bibliotecas/<int:id>', methods=['PUT'])
def alterar_livro_id(id):
    livro_modificado = request.get_json()

    # para todos os indices da lista enumerado, retorna o indice que contem o id
    for indice, livro in enumerate(bibliotecas):
        if livro.get('id') == id:
            # o livro daquele indice deve receber as modificações
            bibliotecas[indice].update(livro_modificado)
            return jsonify(bibliotecas)  # retorna o indice modificado
    return jsonify({'message': 'Livro não encontrado!'}), 404

# adicionando um novo livro
@app.route('/bibliotecas', methods=['POST'])
def adicionar_novo_livro():
    novo_livro = request.get_json()
    novo_livro['id'] = len(bibliotecas) + 1  # Atribui um novo ID
    bibliotecas.append(novo_livro)
    return jsonify(novo_livro)

# deletando um livro
@app.route('/bibliotecas/<int:id>', methods=['DELETE'])
def excluir_livro_id(id):
    for indice, livro in enumerate(bibliotecas):
        if livro['id'] == id:
            livro_excluido = bibliotecas[indice]
            del bibliotecas[indice]
            return jsonify({'message': f'Livro  ID: {livro_excluido.get('id')} excluído com sucesso!'})
    return jsonify({'message': 'Livro não encontrado!'}), 404


app.run(debug=True, host='localhost', port=5000)

