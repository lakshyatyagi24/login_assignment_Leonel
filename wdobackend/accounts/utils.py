import requests
from django.core.mail import EmailMessage

class Util:
    @staticmethod
    def send_email(data):
        api_key = '2C9C8BBFD3DC6AA087A129246E8BA853347334734CB4A3485443B63FB9954A8F0AAE9511132E84239CDA40B05079D2AF'
        sender = 'kanedakenji646@gmail.com'
        recipient = data['to_email']
        subject = subject=data['email_subject']
        body = data['email_body']

        payload = {
            'apikey': api_key,
            'from': sender,
            'to': recipient,
            'subject': subject,
            'bodyHtml': body
        }

        response = requests.post('https://api.elasticemail.com/v2/email/send', data=payload)

        if response.status_code == 200:
            return True
        return False
