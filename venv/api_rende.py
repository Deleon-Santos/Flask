
from flask import Flask, render_template



app = Flask(__name__)



# Retorna todos os livros
@app.route('/')
def get_livros():
   
    return render_template('index.html')

app.run(debug=True)
