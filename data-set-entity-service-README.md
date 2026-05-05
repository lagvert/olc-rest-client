### ++Data Set Entity Service++

#### ++Get All Data Sets++

Returns a list of all the Data Set entities currently contained within the Server.

Request takes no content, and on success returns a response containing a JSON Identifier List of all the Data Sets.

#### REST API cookbook

[Get All Data Sets](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Set_Entity_Service/Get_All_Data_Sets.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/datasets

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Identifier List of all the Data Sets in Server | application/json | - | Identifier List of Data Sets returned |

#### Response JSON

```
{
	identifiers: __an array of data entity identifiers__ number[]
}
```

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 

#### ++Get Data Records for Data Set++

Returns a list of all the Data Record entities contained within a specific Data Set entity.

Request takes no content, and on success returns a response containing a JSON Identifier List of all the Data Records in the Data Set.

#### REST API cookbook

[Get Data Records for Data Set](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Set_Entity_Service/Get_Data_Records_for_Data_Set.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI
 	
/rest/serverengine/entity/datasets/{dataSetId} 

#### Path parameters

**dataSetId** - ID of the Data Set entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Identifier List of all the Data Records in Data Set | application/json | - | Identifier List of Data Records returned |

#### Response JSON

```
{
	identifiers: __an array of data entity identifiers__ number[]
}
```

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 


#### ++Delete Data Set Entity++

Submits a request for a specific Data Set entity to be marked for deletion from the Server.

Request takes no content, and on success returns a response containing the result of the request for deletion (“true” or “false”).

#### REST API cookbook

[Delete Data Set Entity](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Set_Entity_Service/Delete_Data_Set_Entity.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/datasets/{dataSetId}/delete 

#### Path parameters

**dataSetId** - ID of the Content Set entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | Result of request for Data Set removal | text/plain | - | Deletion of Data Set successfully requested from Server (response of “true” for success or “false” for failure) |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 

#### ++Get Data Set Properties++

Returns a list of the properties for a specific Data Set entity.

Request takes no content, and on success returns a response containing a JSON Name/Value List (Properties Only) of all the properties for the Data Set.

#### REST API cookbook

[Get Data Set Properties](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Set_Entity_Service/Get_Data_Set_Properties.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/datasets/{dataSetId}/properties 

#### Path parameters

**dataSetId** - ID of the Data Set entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Name/Value List (Properties Only) of properties for Data Set | application/json | - | Data Set entity properties successfully retrieved |

#### Response JSON

```
[
	{
	name: __the name of the property__, string
	value: __the value of the property__, string
	}
]
```

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 

#### ++Update Data Set Properties++

Submits a request to update (and replace) the properties for a specific Data Set entity in the Server.

Request takes a JSON Name/Value List as content (the Data Set ID and the new properties), and on success returns a response containing the result of the request for update/replacement (“true”).

#### REST API cookbook

[Update Data Set Properties](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Set_Entity_Service/Update_Data_Set_Properties.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| PUT | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/datasets/{dataSetId}/properties 

#### Request parameters

```
[
	id: __the data entity identifier__, number
	properties: [
		{
		name: __the name of the property__, string
		value: __the value of the property__, string
		}
	]
]
```

#### Path parameters

**dataSetId** - The ID of the Data Set entity in Server

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | Result of request to update Data Set | text/plain | - | Update of Data Set properties successfully requested (response of “true” for success) |


#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 500 Internal Server Error | - | - | - | Server error or Data Set ID mismatch in JSON. |
