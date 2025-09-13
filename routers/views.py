import hashlib
import json
import base64
import requests
import uuid
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# WARNING: @csrf_exempt decorator is used here for testing purposes.
# In a production environment, you should implement proper CSRF token validation
# or use a webhook handler that doesn't require it for a secure callback.
@csrf_exempt
def phonepe_redirect(request):
    if request.method == 'POST':
        try:
            # 1. Frontend से पेमेंट डेटा प्राप्त करें
            data = json.loads(request.body)
            amount = data.get('amount')
            
            # Backend में एक अद्वितीय (unique) ट्रांजेक्शन ID बनाएं।
            # यह सुरक्षा के लिए एक महत्वपूर्ण कदम है।
            transaction_id = "TXN" + str(uuid.uuid4())
            
            # इनपुट डेटा को सत्यापित करें
            if not amount or amount <= 0:
                return JsonResponse({'success': False, 'message': 'Invalid amount provided.'}, status=400)

            # भविष्य के लिए: आप ट्रांजेक्शन ID और अन्य विवरण को डेटाबेस में सहेज सकते हैं
            # इससे आप वेबहुक से प्राप्त डेटा के साथ बाद में इसका मिलान कर सकते हैं।
            # Example: YourTransactionModel.objects.create(transaction_id=transaction_id, amount=amount, status='PENDING')

        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'success': False, 'message': f'An error occurred: {str(e)}'}, status=400)

        # 2. PhonePe के लिए पेमेंट पेलोड बनाएं
        payload = {
            "merchantId": settings.PHONEPE_MERCHANT_ID,
            "merchantTransactionId": transaction_id, 
            "amount": amount, 
            "redirectUrl": settings.PHONEPE_REDIRECT_URL,
            "redirectMode": "REDIRECT",
            "callbackUrl": settings.PHONEPE_CALLBACK_URL,
            "paymentInstrument": {
                "type": "PAY_PAGE"
            }
        }
        
        
        encoded_payload = base64.b64encode(json.dumps(payload).encode()).decode()
        
        
        salt_key = settings.PHONEPE_SALT_KEY
        salt_index = settings.PHONEPE_SALT_INDEX
        sha256_hash = hashlib.sha256(f"{encoded_payload}/pg/v1/pay{salt_key}".encode()).hexdigest()
        x_verify = f"{sha256_hash}###{salt_index}"
        
        headers = {
            "Content-Type": "application/json",
            "X-VERIFY": x_verify,
            "Accept": "application/json"
        }

        
        try:
            response = requests.post(
                "https://api.phonepe.com/apis/hermes/pg/v1/pay", 
                headers=headers,
                json={"request": encoded_payload}
            )
            response.raise_for_status() 
        
        except requests.exceptions.RequestException as e:
            
            return JsonResponse({'success': False, 'message': f'Network error: {str(e)}'}, status=500)

        response_data = response.json()

        
        if response_data.get('success'):
            redirect_url = response_data['data']['instrumentResponse']['redirectInfo']['url']
            return JsonResponse({'success': True, 'redirect_url': redirect_url})
        else:
            
            return JsonResponse({'success': False, 'message': response_data.get('message', 'Payment initiation failed')}, status=400)

    
    return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=405)