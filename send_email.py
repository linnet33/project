import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

def send_verification_email(email, token):
    # Get credentials from environment variables
    sender_email = os.getenv("EMAIL_ADDRESS")  # Use any placeholder email address
    sender_password = os.getenv("EMAIL_PASSWORD")

    # Replace with your domain or localhost for testing
    verification_link = f"http://localhost:5000/verify?token={token}"

    # Create the email content
    subject = "Email Verification"
    body = f"Please click the link below to verify your email:\n\n{verification_link}"
    message = MIMEText(body)
    message['Subject'] = subject
    message['From'] = sender_email
    message['To'] = email

    try:
        # Connect to the Mailtrap SMTP server and send the email
        with smtplib.SMTP('sandbox.smtp.mailtrap.io', 465) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(message)
        print(f"Verification email sent to {email}")
    except Exception as e:
        print(f"Failed to send email: {e}")