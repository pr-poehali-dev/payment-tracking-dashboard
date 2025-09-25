import json
from typing import Dict, Any, List
from datetime import datetime, timedelta

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Business: Get merchant dashboard data including revenue, transactions, and analytics
    Args: event - dict with httpMethod, headers, queryStringParameters
          context - object with request_id, function_name attributes
    Returns: HTTP response with dashboard metrics and chart data
    """
    method = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'GET':
        # Generate sample transactions data
        transactions = [
            {
                'id': 'tx_12345678',
                'amount': 15000,
                'commission': 300,
                'status': 'success',
                'terminal': 'Терминал 1',
                'method': 'СБП',
                'created_at': '2024-09-25T10:30:00Z'
            },
            {
                'id': 'tx_87654321',
                'amount': 25000,
                'commission': 500,
                'status': 'success',
                'terminal': 'Терминал 2',
                'method': 'Карта',
                'created_at': '2024-09-25T09:15:00Z'
            },
            {
                'id': 'tx_11223344',
                'amount': 8500,
                'commission': 170,
                'status': 'success',
                'terminal': 'Терминал 3',
                'method': 'YooMoney',
                'created_at': '2024-09-24T16:45:00Z'
            },
            {
                'id': 'tx_55667788',
                'amount': 32000,
                'commission': 640,
                'status': 'success',
                'terminal': 'Терминал 1',
                'method': 'СБП',
                'created_at': '2024-09-23T14:20:00Z'
            }
        ]
        
        # Generate chart data for the last 15 days
        chart_data = []
        base_date = datetime.now() - timedelta(days=15)
        
        for i in range(15):
            current_date = base_date + timedelta(days=i)
            revenue = 25000 + (i * 2500) + (i % 4 * 4000)  # Updated growth pattern
            
            chart_data.append({
                'date': f"{current_date.day:02d}",
                'revenue': revenue
            })
        
        # Calculate payment method statistics
        payment_methods = [
            {'method': 'СБП', 'count': 12, 'color': '#8B5CF6'},
            {'method': 'Карта', 'count': 8, 'color': '#06B6D4'},
            {'method': 'YooMoney', 'count': 3, 'color': '#84CC16'}
        ]
        
        # Calculate summary metrics
        total_revenue = sum(tx['amount'] for tx in transactions)
        total_commission = sum(tx['commission'] for tx in transactions)
        successful_transactions = len([tx for tx in transactions if tx['status'] == 'success'])
        
        dashboard_data = {
            'transactions': transactions,
            'chartData': chart_data,
            'paymentMethods': payment_methods,
            'metrics': {
                'totalRevenue': total_revenue,
                'totalCommission': total_commission,
                'netIncome': total_revenue - total_commission,
                'successfulTransactions': successful_transactions,
                'revenueGrowth': '+15.3%',
                'incomeGrowth': '+11.7%'
            }
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps(dashboard_data)
        }
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }