from washroomcatalog.config import configure
from flask import Flask
from flaskext.mysql import MySQL
from flask_cors import CORS
from pymysql.cursors import DictCursor

app = Flask(__name__)
mysql = MySQL(cursorclass=DictCursor)
configure(app)
mysql.init_app(app)
CORS(app)

from washroomcatalog import routes