import json
import hashlib
import secrets
import jwt
import os
import psycopg2
from typing import Dict, Any, Optional
from datetime import datetime, timedelta

def hash_password(password: str) -> str:
    """Hash password using SHA-256 with salt"""
    salt = secrets.token_hex(16)
    password_hash = hashlib.sha256((password + salt).encode()).hexdigest()
    return f"{salt}:{password_hash}"

def verify_password(password: str, stored_hash: str) -> bool:
    """Verify password against stored hash"""
    try:
        salt, password_hash = stored_hash.split(':')
        return hashlib.sha256((password + salt).encode()).hexdigest() == password_hash
    except ValueError:
        return False

def generate_jwt_token(user_id: str, email: str) -> str:
    """Generate JWT token"""
    payload = {
        'user_id': user_id,
        'email': email,
        'exp': datetime.utcnow() + timedelta(days=7)
    }
    return jwt.encode(payload, 'your-secret-key', algorithm='HS256')

def get_db_connection():
    """Get database connection"""
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise Exception('DATABASE_URL not found')
    return psycopg2.connect(database_url)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Handle user authentication (login/register)
    Args: event with httpMethod, body containing email/password/name
    Returns: HTTP response with user data and JWT token
    '''
    method = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400',
                'Content-Type': 'application/json'
            },
            'isBase64Encoded': False,
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        action = body_data.get('action', 'login')  # login or register
        email = body_data.get('email', '').strip().lower()
        password = body_data.get('password', '')
        
        if not email or not password:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Email and password are required'})
            }
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        if action == 'register':
            name = body_data.get('name', '').strip()
            if not name:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'Name is required'})
                }
            
            # Check if user exists
            cursor.execute('SELECT id FROM users WHERE email = %s', (email,))
            if cursor.fetchone():
                return {
                    'statusCode': 409,
                    'headers': {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'User with this email already exists'})
                }
            
            # Create new user
            password_hash = hash_password(password)
            cursor.execute(
                'INSERT INTO users (name, email, password_hash) VALUES (%s, %s, %s) RETURNING id, created_at',
                (name, email, password_hash)
            )
            user_id, created_at = cursor.fetchone()
            conn.commit()
            
            # Generate token
            token = generate_jwt_token(str(user_id), email)
            
            user_data = {
                'id': str(user_id),
                'name': name,
                'email': email,
                'createdAt': created_at.isoformat()
            }
            
            return {
                'statusCode': 201,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'isBase64Encoded': False,
                'body': json.dumps({
                    'user': user_data,
                    'token': token,
                    'message': 'Registration successful'
                })
            }
        
        else:  # login
            cursor.execute(
                'SELECT id, name, email, password_hash, created_at FROM users WHERE email = %s',
                (email,)
            )
            user_row = cursor.fetchone()
            
            if not user_row or not verify_password(password, user_row[3]):
                return {
                    'statusCode': 401,
                    'headers': {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'Invalid email or password'})
                }
            
            user_id, name, user_email, _, created_at = user_row
            
            # Generate token
            token = generate_jwt_token(str(user_id), user_email)
            
            user_data = {
                'id': str(user_id),
                'name': name,
                'email': user_email,
                'createdAt': created_at.isoformat()
            }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'isBase64Encoded': False,
                'body': json.dumps({
                    'user': user_data,
                    'token': token,
                    'message': 'Login successful'
                })
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': f'Server error: {str(e)}'})
        }
    
    finally:
        if 'conn' in locals():
            conn.close()