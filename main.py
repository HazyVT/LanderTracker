from flask import Flask, render_template
from flaskwebgui import FlaskUI

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.post("/click")
def click():
    return "Clicked!"

if __name__ == "__main__":
    FlaskUI(app=app, server="flask").run()