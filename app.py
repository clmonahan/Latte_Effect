import os
import pandas as pd
import numpy as np
from flask import Flask, jsonify, render_template, request
import pymysql
from sqlalchemy import create_engine
# from flask.ext.sqlalchemy import sqlalchemy
from flask_sqlalchemy import SQLAlchemy
from secrets import username, password

pymysql.install_as_MySQLdb()

app = Flask(__name__)
db = SQLAlchemy(app)

rds_connection_string = f"{username}:{password}@127.0.0.1:3306"
engine = create_engine(f'mysql://{rds_connection_string}')
conn = engine.connect()

#################################################
# Database Setup
#################################################

@app.route("/macros")
def macrosData():
	macrosStuff = pd.read_sql("SELECT * FROM latte_effect.menu_items ORDER BY Item", conn)
	macrosStuff.set_index("Item",inplace = True)

	macrosData = macrosStuff.to_dict(orient = "index")
	
	return jsonify(macrosData)

@app.route("/exercise")
def exerciseData():
    exerciseStuff = pd.read_sql("SELECT * FROM exercise_raw.`Calories per Minute`", conn )
    exerciseStuff.set_index("Exercise", inplace = True)
    # print(exerciseStuff.columns)
    exerciseData = exerciseStuff.to_dict(orient = "index")

    return jsonify(exerciseData)
    # return jsonify(exercise_data)

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)

