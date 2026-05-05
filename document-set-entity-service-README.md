### ++Document Set Entity Service++

#### ++Get Documents for Document Set++

Returns a list of all the Document entities contained within a specific Document Set entity.

Request takes no content, and on success returns a response containing a JSON Identifier List of all the Documents in the Document Set.

#### REST API cookbook

[Get Documents for Document Set](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Document_Set_Entity_Service/Get_Documents_for_Document_Set.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/documentsets/{documentSetId} 

#### Path parameters

**documentSetId** - The ID of the Document Set entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Identifier List of all the Documents in Document Set | application/json | - | Identifier List of Documents returned |

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


#### ++Get Document Set Metadata Properties++

Returns a list of the metadata properties for a specific Document Set entity.

Request takes no content, and on success returns a response containing a JSON Name/Value List (Properties Only) of all the metadata properties for the Document Set.

#### REST API cookbook

[ Get Document Set Metadata Properties](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Document_Set_Entity_Service/Get_Document_Set_Metadata_Properties.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/documentsets/{documentSetId}/metadata 

#### Path parameters

**documentSetId** - The ID of the Document Set entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Name/Value List (Properties Only) of properties for Document | application/json | - | Document entity properties successfully retrieved |


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

#### ++Update Document Set Metadata Properties++

Submits a request to update (and replace) the metadata properties for a specific Document Set entity in the Server.

Request takes a JSON Name/Value List as content (the Document Set ID and the new metadata properties), and on success returns a response containing the result of the request for update/replacement (“true”).

#### REST API cookbook

[Update Document Set Metadata Properties](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Document_Set_Entity_Service/Update_Document_Set_Metadata_Properties.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| PUT | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI
 	
/rest/serverengine/entity/documentsets/{documentSetId}/metadata

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

**documentSetId** - The ID of the Document Set entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | Result of request to update Document Set | text/plain | - | Update of Document Set metadata properties successfully requested (response of “true” for success) |


#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 500 Internal Server Error | - | - | - | Server error or Document ID mismatch in JSON. | 
