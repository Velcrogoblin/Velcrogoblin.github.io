// ***** Global requires *****
const path = require("path");
const fs = require("fs");
const { response } = require("express");


//NOTION VALUES
const NOTION_TOKEN = process.env.NOTION_TOKEN
const NOTION_DB = process.env.NOTION_DB

// ***** Database folder *****
const usersFilePath = path.join(__dirname, "../db/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));


const mainService = {
    async returnUserData(store_id) {
        let response_object = {}

        let resultObject = await users.find(obj => obj.store_id === store_id)

        // Check if an object was found
        if (resultObject) {
            console.log("Object found:", resultObject);
            response_object = resultObject
        } else {
            console.log("Object not found with store_id: ", store_id);
            response_object = {
                "error": "Store_id not found"
            }
        }
        return response_object
    },
    async newUser(access_token,store_id,product_id,variant_id,store_name) {

        let response_object

        let json_to_notion = {
            "parent": {
                "database_id": NOTION_DB
            },
            "properties": {
                "access_token": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": access_token.toString()
                            }
                        }
                    ]
                },
                "store_id": {
                    "title": [
                        {
                            "text": {
                                "content": store_id.toString()
                            }
                        }
                    ]
                },
                "store_name": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": store_name
                            }
                        }
                    ]
                },
                "product_id": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": product_id.toString()
                            }
                        }
                    ]
                },
                "variant_id": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": variant_id.toString()
                            }
                        }
                    ]
                }
            },
            "children": [
                {
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {
                        "rich_text": [
                            {
                                "type": "text",
                                "text": {
                                    "content": "store_name: " + store_name
                                }
                            }
                        ]
                    }
                },
                {
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {
                        "rich_text": [
                            {
                                "type": "text",
                                "text": {
                                    "content": "store_id: "+ store_id.toString()
                                }
                            }
                        ]
                    }
                },
                {
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {
                        "rich_text": [
                            {
                                "type": "text",
                                "text": {
                                    "content": "access_token: " + access_token.toString()
                                }
                            }
                        ]
                    }
                },
                {
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {
                        "rich_text": [
                            {
                                "type": "text",
                                "text": {
                                    "content": "product_id: " + product_id.toString()
                                }
                            }
                        ]
                    }
                },
                {
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {
                        "rich_text": [
                            {
                                "type": "text",
                                "text": {
                                    "content": "variant_id: " + variant_id.toString()
                                }
                            }
                        ]
                    }
                }
            ]
        }

        console.log("json_to_notion")
        console.log(JSON.stringify(json_to_notion))
        console.log("json_to_notion")

          var post_options = {
            method: 'POST',
            headers: {
              "Authorization": "Bearer " + NOTION_TOKEN,
              "Content-Type": "application/json",
              'Notion-Version': '2022-02-22',
            },
            body: JSON.stringify(json_to_notion),
            redirect: 'follow'
          };
 

          await fetch("https://api.notion.com/v1/pages/",post_options)
            .then(async response =>  {
                // Check if the request was successful (status code 2xx)
                console.log("response notion api")
                console.log(await response.json())
                console.log("response notion api")

                if (response.ok) {
                // Get the status code
                const status = response.status;
                console.log(`Request successful. Status Code: ${status}`);
                } else {
                // If the response status is not in the 2xx range, handle the error
                console.error(`Request failed. Status Code: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Process the response data
                console.log(data);
                response_object = {
                    "status": "OK",
                    "message": "Data saved correctly",
                    store_name,
                    store_id,
                    product_id,
                    variant_id
                }
                return response_object
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                console.error('Fetch error:', error);
                response_object = {
                    "error": {
                        "code": "ERROR_WHILE_SAVING_DATA",
                        "message":"There was an error while saving data.",
                        error
                    }
                }
            });   

          return response_object


    },
    async createProduct(store_id, access_token) {
        console.log("createProduct")
        //Funcion reusable para crear el producto de Bono Ambiental en la tienda del usuario. 
        let response_object
        let json_to_tn = {
            "images": [
                {
                    "src": "https://ecommitment-634117e74352.herokuapp.com/images/only_logo.png"
                }
            ],
            "name": {
                "en": "Km recorridos de envío",
                "es": "Km recorridos de envío",
                "pt": "Km recorridos de envío"
            },
            "handle": {
                "en": "ecomm-bono-ambiental",
                "es": "ecomm-bono-ambiental",
                "pt": "ecomm-bono-ambiental"
            },
            "requires_shipping": false,
            "variants": [
                {
                    "price": "4.00",
                    "sku": "ECOMM1234ABC"
                }
            ]
        }
        console.log("json_to_tn")
        console.log(json_to_tn)
        console.log("json_to_tn")

        url = "https://api.tiendanube.com/v1/" + store_id + "/products"

        var POSTrequestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authentication": "bearer" + access_token,
                "User-Agent": "Ecommitment"
            },
            body: JSON.stringify(json_to_tn),
            redirect: 'follow'
        };


        try {
            var tn_response = await fetch(url, POSTrequestOptions)
            let tn_response_json = await tn_response.json();

            console.log("tn_response_json")
            console.log(tn_response_json)
            console.log("tn_response_json")

            console.log("tn_response")
            console.log(tn_response)
            console.log("tn_response")

            if (tn_response.status === 201) {
                // Process the data when the status code is 200
                let product_id = tn_response_json["id"]
                let variant_id = tn_response_json["variants"][0]["id"]
                response_object = {
                    "status": "success",
                    store_id,
                    product_id,
                    variant_id

                }
            } else {
                console.log(tn_response)
                response_object = data
            }

        } catch (error) {
            response_object = {
                "error": {
                    "type": "UNABLE_TO_CREATE_PRODUCT",
                    "message": "It was not possible to create the ecomm product"
                }
            }

        }

        console.log("response_object")
        console.log(response_object)
        console.log("response_object")

        return response_object

    },
    async addScript(store_id, access_token, script_url) {
        console.log("addScript")

        let response_object
        let json_to_tn = {
            "event": "onfirstinteraction",
            "src": script_url,
           // "src": "https://juanseferrari.github.io/ecommitment/public/js/ecommitment-v2.js",
            "where": "checkout"
    }
        console.log("json_to_tn")
        console.log(json_to_tn)
        console.log("json_to_tn")

        url = "https://api.tiendanube.com/v1/" + store_id + "/scripts"

        var POSTrequestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authentication": "bearer" + access_token,
                "User-Agent": "Ecommitment"
            },
            body: JSON.stringify(json_to_tn),
            redirect: 'follow'
        };


        try {
            var tn_response = await fetch(url, POSTrequestOptions)
            let tn_response_json = await tn_response.json();

            console.log("tn_response_json")
            console.log(tn_response_json)
            console.log("tn_response_json")

            console.log("tn_response")
            console.log(tn_response)
            console.log("tn_response")

            if (tn_response.status === 201) {
                // Process the data when the status code is 200
                response_object = {
                    "status": "success",
                    "status_code": tn_response.status,
                    "script_url": tn_response_json.src
                }
            } else {
                response_object = tn_response
            }

        } catch (error) {
            response_object = {
                "error": {
                    "type": "UNABLE_TO_CONFIGURE_SCRIPT",
                    "message": "It was not possible to configure the ecommitment script."
                }
            }

        }

        console.log("response_object")
        console.log(response_object)
        console.log("response_object")

        return response_object


    },
    async getLocation(store_id, access_token) {
        console.log("getLocation")

        let response_object


        url = "https://api.tiendanube.com/v1/" + store_id + "/locations"

        var GETrequestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authentication": "bearer" + access_token,
                "User-Agent": "Ecommitment"
            },
            redirect: 'follow'
        };


        try {
            var tn_response = await fetch(url, GETrequestOptions)
            let tn_response_json = await tn_response.json();

            console.log("tn_response_json")
            console.log(tn_response_json)
            console.log("tn_response_json")

            console.log("tn_response")
            console.log(tn_response)
            console.log("tn_response")

            if (tn_response.status === 200) {
                // Process the data when the status code is 200
                response_object = {
                    "status": "success",
                    "status_code": tn_response.status,
                }
            } else {
                response_object = tn_response
            }

        } catch (error) {
            response_object = {
                "error": {
                    "type": "UNABLE_TO_GET_LOCATION",
                    "message": "It was not possible to get the information of the store location."
                }
            }

        }

        console.log("response_object")
        console.log(response_object)
        console.log("response_object")

        return response_object


    }



};

module.exports = mainService;