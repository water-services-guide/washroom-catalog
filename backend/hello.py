from flask import Flask, request
from flaskext.mysql import MySQL

app = Flask(__name__)
mysql = MySQL()

app.config['MYSQL_DATABASE_USER'] = 'j7vjOlf4zp'
app.config['MYSQL_DATABASE_PASSWORD'] = 'pEw497Ul6k'
app.config['MYSQL_DATABASE_DB'] = 'j7vjOlf4zp'
app.config['MYSQL_DATABASE_HOST'] = 'remotemysql.com'
mysql.init_app(app)


@app.route("/")
def main():
    connect = mysql.connect()
    return "Connected to the database"


if __name__ == "__main__":
    app.run()
