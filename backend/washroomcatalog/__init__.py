from washroomcatalog.config import configure
from flask import Flask
from flaskext.mysql import MySQL
from flask_cors import CORS
from pymysql.cursors import DictCursor
import logging

app = Flask(__name__)
mysql = MySQL(cursorclass=DictCursor)
configure(app)
mysql.init_app(app)
CORS(app, support_credentials=True, resources={r"/*": {"origins": "*"}})
logging.getLogger('flask_cors').level = logging.DEBUG
from washroomcatalog import routes