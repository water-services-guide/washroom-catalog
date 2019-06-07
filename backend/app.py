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


def getObjects(table, attributes):
    connect = mysql.connect()
    cursor = connect.cursor()
    cursor.execute('SELECT ' + ', '.join(attributes) + ' FROM ' + table)
    result = []

    for row in cursor:
        rowObject = {}
        for attribute, data in zip(attributes, row):
            rowObject[attribute] = data
        result.append(rowObject)

    cursor.close()
    connect.close()
    return result


def getUsers():
    return getObjects('User', ['User_id', 'Username', 'Password'])


def getNecessities():
    return getObjects('Necessity', ['Necessity_id', 'Status', 'Building_id'])


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
