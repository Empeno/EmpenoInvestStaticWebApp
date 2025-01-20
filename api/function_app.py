import azure.functions as func
import logging
import json

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="http_trigger")
def http_trigger(req: func.HttpRequest) -> func.HttpResponse:
    try:        
        response_data = {
            "user": {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "portfolio": [
                    {
                        "stock": "Danske Bank",
                        "ticker": "DANSKE",
                        "quantity": 150,
                        "purchasePrice": 100,
                        "currentPrice": 103
                    },
                    {
                        "stock": "Novo Nordisk",
                        "ticker": "NOVO-B",
                        "quantity": 50,
                        "purchasePrice": 940,
                        "currentPrice": 960
                    }
                ]
            }
        }
        
        response_json = json.dumps(response_data)
                
        return func.HttpResponse(
            response_json,
            status_code=200,
            mimetype="application/json"
        )
    except Exception as e:
        error_message = {
            "error": str(e)
        }
        return func.HttpResponse(
            json.dumps(error_message),
            status_code=500,
            mimetype="application/json"
        )




    # logging.info('Python HTTP trigger function processed a request.')

    # name = req.params.get('name')
    # if not name:
    #     try:
    #         req_body = req.get_json()
    #     except ValueError:
    #         pass
    #     else:
    #         name = req_body.get('name')

    # if name:
    #     return func.HttpResponse(f"Hello, {name}. This HTTP triggered function executed successfully.")
    # else:
    #     return func.HttpResponse(
    #          "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.",
    #          status_code=200
    #     )