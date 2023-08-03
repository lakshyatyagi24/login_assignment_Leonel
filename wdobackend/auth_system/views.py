from django.http import HttpResponse

def domain_verification(request, verification_file):
    # Path to the verification file
    file_path = f'.well-known/{verification_file}'

    try:
        # Read the verification file
        with open(file_path, 'r') as f:
            verification_content = f.read()
            return HttpResponse(verification_content, content_type='text/plain')
    except FileNotFoundError:
        return HttpResponse('Verification file not found.', status=404)
