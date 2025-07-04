import sqlite3
import time

from flask import Flask, render_template
from flaskwebgui import FlaskUI

app = Flask(__name__)

# Setup sqlite database for storage of collections
db = sqlite3.connect("mydb.sqlite", check_same_thread=False)
#db.execute('CREATE TABLE IF NOT EXISTS collection (id int PRIMARY KEY, name text);')
#db.execute('INSERT INTO collection values(1, "Skylanders");')

@app.route("/")
def home():
    return render_template("index.html")

@app.post("/click")
def click():
    time.sleep(5)
    cursor = db.cursor()
    cursor.execute("SELECT * FROM collection;")
    data = cursor.fetchall()
    cursor.close()
    return str(data)

@app.get("/skylanders")
def get_skylanders():
    cursor = db.cursor()
    cursor.execute("SELECT id FROM collection WHERE name='Skylanders';")
    data = cursor.fetchone()
    if data is not None:
        collection_id = data[0]
        cursor.execute("SELECT * FROM item WHERE collection_id='{}';".format(collection_id))
        item_data = cursor.fetchall()
        item_html = ""
        for item  in item_data:
            item_html += "<div><h2>Name: {}</h2><img src='{}' /></div>".format(item[1], item[2])
        
        return item_html
    else:
        cursor.close()
        return "No skylanders found"

if __name__ == "__main__":
    FlaskUI(app=app, server="flask").run()