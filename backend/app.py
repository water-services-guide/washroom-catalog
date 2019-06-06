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
    cursor.execute('SELECT User_id, Username, Password FROM User')
    results = [{'User_id': User_id,
                'Username': Username,
                'Password': Password} for (User_id, Username, Password,) in cursor]
    cursor.close()
    connect.close()

    return results


def getNecessities():
    connect = mysql.connect()
    cursor = connect.cursor()
    cursor.execute('SELECT Necessity_id, Status, Building_id FROM Necessity')
    results = [{'Necessity_id': Necessity_id,
                'Status': Status,
                'Building_id': Building_id} for (Necessity_id, Status, Building_id) in cursor]
    cursor.close()
    connect.close()

    return results


@app.route('/UserList')
def userList():
    return json.dumps(getUsers())


@app.route('/NecessityList')
def necessityList():
    return json.dumps(getNecessities())


@app.route('/')
def main():
    return 'Welcome to Washroom Catalog'


if __name__ == '__main__':
    app.run(host='0.0.0.0')
