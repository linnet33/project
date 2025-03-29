import smtplib

sender_email = "e980ae3a0c3581"
sender_password = "37d2ba87e130bb"
receiver_email = "linnetgithinji42@gmail.com"

message = """\
Subject: Test Email
This is a test email sent via Mailtrap."""

try:
    with smtplib.SMTP('smtp.mailtrap.io', 2525) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, receiver_email, message)
    print("Email sent successfully!")
except Exception as e:
    print(f"Failed to send email: {e}")