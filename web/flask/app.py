from flask import Flask, request, jsonify, g
from gradio_client import Client
from flask_cors import CORS
import sqlite3
from time import time
import matplotlib.pyplot as plt
import base64
from io import BytesIO
import seaborn as sns

app = Flask(__name__)
CORS(app)


def plot_graph(x, y):
    # Generate your Matplotlib graph
    fig, ax = plt.subplots()

    # Plot the data
    ax.plot(x, y, color='black', marker=".",markersize=10)

    # Divide the plot into sections and give each section a different color
    # Section 1: from x=2 to x=3 with yellow color
    ax.axhspan(800, 1200, color='lightgray', alpha=0.3)
    # Section 2: from x=3 to x=4 with green color
    ax.axhspan(1200, 1400, color='lightblue', alpha=0.3)
    # Section 3: from x=4 to x=5 with red color
    ax.axhspan(1400, 1600, color='lightgreen', alpha=0.3)
    ax.set_ylim(800, 1600)

    # Customize the appearance
    ax.set_xlabel('Quiz Count')
    ax.set_ylabel('Score')

    # Add legend
    ax.legend()

    # Save the graph to a BytesIO object
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)

    # Encode the BytesIO object as a base64 string
    base64_image = base64.b64encode(buffer.getvalue()).decode('utf-8')

    plt.close()  # Close the plot to free up resources

    return base64_image
def bar_plot(x,y):
    sns.barplot(x=x,y=y)
    plt.ylabel('Question Solved')
    plt.xlabel('Latest Quizes')

    # Save the graph to a BytesIO object
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)

    # Encode the BytesIO object as a base64 string
    base64_image = base64.b64encode(buffer.getvalue()).decode('utf-8')

    plt.close()  # Close the plot to free up resources
    return base64_image

# Function to get a database connection
def get_db():
    if 'db' not in g:
        # Create a new database connection for each thread
        g.db = sqlite3.connect('studentRating.db')
    return g.db

# Function to get a cursor


def get_cursor():
    db = get_db()
    return db.cursor()


def create_table(cursor):
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS studentRating (
            studentId VARCHAR(30),
            rating INT,
            questionSolved INT,
            time INT,
            PRIMARY KEY(studentId, time)
        )
    ''')
    print("Table created successfully")


def insertRating(cursor, studentId, rating, questionSolved):
    try:
        timestamp = int(time())  # Convert current time to integer timestamp
        cursor.execute("INSERT INTO studentRating (studentId, rating,questionSolved, time) VALUES (?,?, ?, ?)",
                       (studentId, rating, questionSolved, timestamp))
        g.db.commit()
        return True
    except Exception as e:
        return str(e)


def selectRating(cursor, studentId):
    try:
        cursor.execute(
            "SELECT rating FROM studentRating WHERE studentId = ? ORDER BY time", (studentId,))
        rows = cursor.fetchall()
        data = [row[0] for row in rows]
        return data
    except Exception as e:
        return str(e)


def selectQuestionSolved(cursor, studentId):
    try:
        cursor.execute(
            "SELECT questionSolved FROM studentRating WHERE studentId = ? ORDER BY time", (studentId,))
        rows = cursor.fetchall()
        data = [row[0] for row in rows]
        if len(data) <= 10:
            return data
        else:
            return data[len(data)-10:]
    except Exception as e:
        return str(e)


@app.route('/')
def index():
    return 'Hello, World! This is my Flask app.'


@app.route('/textToNotes', methods=['POST'])
def textToNotes():
    if request.is_json:
        data = request.json
        print(data)
        client = Client("siddhantuniyal/aeravat-note-generation")
        result = client.predict(data["text"], api_name="/predict")
        print(result)
        return jsonify(result)
    else:
        return "Request body is not in JSON format", 400

@app.route('/getBooks')
def getBooks():
    studentId = "278418"
    client = Client("Tirath5504/aeravat-recommendation-engine")
    result = client.predict(
            studentId,	# str in 'Enter User ID' Textbox component
            api_name="/predict"
    )
    data = result['data']
    return jsonify({"responseStatus":"SUCCESS","data":data})


@app.route('/addRating', methods=['POST'])
def addRating():
    if request.is_json:
        data = request.json
        studentId = data.get('studentId')
        rating = data.get('rating')
        questionSolved = data.get('questionSolved')
        if not studentId or not rating or not questionSolved:
            return "Request Body Doesn't Contain Expected Data", 400
        cursor = get_cursor()
        res = insertRating(cursor, studentId, rating, questionSolved)
        cursor.close()  # Close the cursor after using it
        if res == True:
            return jsonify({"responseStatus": "SUCCESS"})
        else:
            return jsonify({"error": res})
    else:
        return "Request body is not in JSON format", 400


@app.route('/getRating/<studentId>')
def getRating(studentId):
    cursor = get_cursor()
    ratings = selectRating(cursor, studentId)
    questionSolved = selectQuestionSolved(cursor, studentId)
    cursor.close()  # Close the cursor after using it
    return jsonify({"responseStatus": "SUCCESS", "rating": ratings})


@app.route('/getProgress/<studentId>')
def getProgress(studentId):
    cursor = get_cursor()
    y = selectRating(cursor, studentId)
    y.insert(0, 0)
    x = range(0, len(y))
    ratingGraph = plot_graph(x, y)
    y = selectQuestionSolved(cursor,studentId)
    x = list(range(0,len(y)))
    cursor.close()  # Close the cursor after using it
    barGraph = bar_plot(x,y)
    return jsonify({"responseStatus": "SUCCESS", "ratingGraph": ratingGraph,"barGraph":barGraph})


# Clean up database connections after each request
@app.teardown_appcontext
def teardown_db(exception):
    db = g.pop('db', None)
    if db is not None:
        db.close()


if __name__ == '__main__':
    app.run(debug=True)
