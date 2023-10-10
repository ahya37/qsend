# Saldo API Spec

## Create Saldo API

Endpoint : POST /api/saldo

Headers :
- Authorization : token

Request Body : 

```json
{
    "amount": 1000000,
    "user_id" : 1
}
```

Response Body Success :

```json
{
    "data":{
        "ammount": 1000000,
        "balance":1000000,
        "last_balance":1000000
    },
    "message":"saldo create successfully!"
}

Response Body Error :

```json
{
    "message" : "Gagal tambah saldo!"
}
```