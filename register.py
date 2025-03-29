import mysql.connector
import uuid
from flask import Flask, request, jsonify
from send_email import send_verification_email  

app = Flask(__name__)

# Connect to the MySQL database
db = mysql.connector.connect(
     host="localhost",       
    user="root",   
    password="Max051*#",  
    database="lapet"   
)
cursor = db.cursor(dictionary=True)  # Use dictionary=True to get results as dictionaries

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Check if the email is already registered
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    if cursor.fetchone():
        return jsonify({"error": "Email is already registered"}), 400

    # Generate a unique verification token
    verification_token = str(uuid.uuid4())
    print(f"Generated token: {verification_token}")  # Debugging

    # Insert the new user into the database
    try:
        cursor.execute(
            "INSERT INTO users (email, password, is_verified, verification_token) VALUES (%s, %s, %s, %s)",
            (email, password, False, verification_token)
        )
        db.commit()
        print("User successfully inserted into the database")  # Debugging
    except Exception as e:
        print(f"Database error: {e}")  # Debugging
        return jsonify({"error": "Failed to register user"}), 500

    # Send the verification email
    try:
        send_verification_email(email, verification_token)
    except Exception as e:
        print(f"Failed to send email: {e}")  # Debugging
        return jsonify({"error": "Failed to send verification email"}), 500

    return jsonify({"message": "Registration successful! Please check your email to verify your account."}), 201
if __name__ == '__main__':
    app.run(debug=True)