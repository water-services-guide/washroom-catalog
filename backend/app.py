import lists
from config import configure
from flask import Flask
from flaskext.mysql import MySQL

app = Flask(__name__)
mysql = MySQL()
configure(app)
mysql.init_app(app)


@app.route('/UserList')
def userList():
    return lists.getUsers()


@app.route('/NecessityList')
def necessityList():
    return lists.getNecessities()


@app.route('/')
def main():
    return 'Welcome to Washroom Catalog'


if __name__ == '__main__':
    app.run(host='0.0.0.0')
