import json
from typing import Dict, List

from flask import Flask, request
from flaskext.mysql import MySQL

app = Flask(__name__)
mysql = MySQL()

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_HOST'] = 'db'
app.config['MYSQL_DATABASE_PORT'] = 3306
app.config['MYSQL_DATABASE_DB'] = 'WashroomCatalog'
mysql.init_app(app)


def getUsers():
    connect = mysql.connect()
    cursor = connect.cursor()
    cursor.execute('SELECT name, passwrd FROM User')
    results = [{name: passwrd} for (name, passwrd) in cursor]
    cursor.close()
    connect.close()

    return results


@app.route('/')
def index():
    return json.dumps({'Users': getUsers()})


if __name__ == '__main__':
    app.run(host='0.0.0.0')
