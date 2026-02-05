from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return 'Forex Broker Platform API'

if __name__ == '__main__':
    app.run(port=3000)

