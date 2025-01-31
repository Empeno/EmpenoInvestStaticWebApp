import azure.functions as func
import logging
import json

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="http_trigger")
def http_trigger(req: func.HttpRequest) -> func.HttpResponse:
    try:
        response_data = {
            "industries": {
                "technology": {
                    "companies": [
                        {
                            "name": "Apple Inc.",
                            "ticker": "AAPL",
                            "currentPrice": 150
                        },
                        {
                            "name": "Microsoft Corporation",
                            "ticker": "MSFT",
                            "currentPrice": 300
                        }
                    ]
                },
                "healthcare": {
                    "companies": [
                        {
                            "name": "Johnson & Johnson",
                            "ticker": "JNJ",
                            "currentPrice": 170
                        },
                        {
                            "name": "Pfizer Inc.",
                            "ticker": "PFE",
                            "currentPrice": 40
                        }
                    ]
                }
            }
        }
        
        response_json = json.dumps(response_data)
        logging.info(f"Response Data: {response_json}")
                
        return func.HttpResponse(
            response_json,
            status_code=200,
            mimetype="application/json"
        )
    except Exception as e:
        error_message = {
            "error": str(e)
        }
        logging.error(f"Error: {error_message}")
        return func.HttpResponse(
            json.dumps(error_message),
            status_code=500,
            mimetype="application/json"
        )