import json
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Handle user authentication (login/register)
    Args: event with httpMethod, body containing email/password/name
    Returns: HTTP response with user data and JWT token
    '''
    
    # Always return properly formatted response
    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'isBase64Encoded': False,
        'body': ''
    }
    
    method = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        response['body'] = ''
        return response
    
    if method != 'POST':
        response['statusCode'] = 405
        response['body'] = json.dumps({'error': 'Method not allowed'})
        return response
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        action = body_data.get('action', 'login')
        email = body_data.get('email', '').strip().lower()
        password = body_data.get('password', '')
        
        if not email or not password:
            response['statusCode'] = 400
            response['body'] = json.dumps({'error': 'Email and password are required'})
            return response
        
        # Mock authentication for testing
        if action == 'login':
            if email == 'admin@example.com' and password == 'admin123':
                user_data = {
                    'id': '1',
                    'name': 'Admin User',
                    'email': 'admin@example.com',
                    'createdAt': '2024-09-24T10:00:00.000Z'
                }
                
                response['body'] = json.dumps({
                    'user': user_data,
                    'token': 'mock-jwt-token-12345',
                    'message': 'Login successful'
                })
                return response
            else:
                response['statusCode'] = 401
                response['body'] = json.dumps({'error': 'Invalid email or password'})
                return response
        
        elif action == 'register':
            name = body_data.get('name', '').strip()
            if not name:
                response['statusCode'] = 400
                response['body'] = json.dumps({'error': 'Name is required'})
                return response
                
            # Check if user already exists (mock)
            if email == 'admin@example.com':
                response['statusCode'] = 409
                response['body'] = json.dumps({'error': 'User with this email already exists'})
                return response
            
            # Create new user (mock)
            user_data = {
                'id': '2',
                'name': name,
                'email': email,
                'createdAt': '2024-09-24T10:00:00.000Z'
            }
            
            response['statusCode'] = 201
            response['body'] = json.dumps({
                'user': user_data,
                'token': 'mock-jwt-token-67890',
                'message': 'Registration successful'
            })
            return response
            
        else:
            response['statusCode'] = 400
            response['body'] = json.dumps({'error': 'Invalid action'})
            return response
    
    except Exception as e:
        response['statusCode'] = 500
        response['body'] = json.dumps({'error': f'Server error: {str(e)}'})
        return response