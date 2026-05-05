### ++Job Set Entity Service++

#### ++Get All Job Sets++

Returns a list of all the Job Set entities currently contained within the Server.

Request takes no content, and on success returns a response containing a JSON Identifier List of all the Job Sets.

#### REST API cookbook

[Get All Job Sets](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Set_Entity_Service/Get_All_Job_Sets.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI
 	
/rest/serverengine/entity/jobsets

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Identifier List of all the Job Sets in Server | application/json | - | Identifier List of job Sets returned |

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

#### ++Get Jobs for Job Set++

Returns a list of all the Job entities contained within a specific Job Set entity.

Request takes no content, and on success returns a response containing a JSON Identifier List of all the Jobs in the Job Set.

#### REST API cookbook

[Get jobs for Job Set](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Set_Entity_Service/Get_Jobs_for_Job_Set.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/jobsets/{jobSetId} 

#### Path parameters

**jobSetId** - ID of the Job Set entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Identifier List of all the Jobs in Job Set | application/json | - | Identifier List of Jobs returned |

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


#### ++Delete Job Set Entity++

Submits a request for a specific Job Set entity to be marked for deletion from the Server.

Request takes no content, and on success returns a response containing the result of the request for deletion (“true” or “false”).

#### REST API cookbook

[Delete Job Set Entity](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Set_Entity_Service/Delete_Job_Set_Entity.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/jobsets/{jobSetId}/delete 

#### Path parameters

**jobSetId** - The ID of the Job Set entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | Result of request for Job Set removal | text/plain | - | Deletion of Job Set successfully requested from Server (response of “true” for success or “false” for failure) |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 

#### ++Get Job Set Metadata Properties++

Returns a list of the metadata properties for a specific Job Set entity.

Request takes no content, and on success returns a response containing a JSON Name/Value List (Properties Only) of all the metadata properties for the Job Set.

#### REST API cookbook

[Get Job Set Metadata Properties](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Set_Entity_Service/Get_Job_Set_Metadata_Properties.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/jobsets/{jobSetId}/metadata 

#### Path parameters

**jobSetId** -  The ID of the Job Set entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Name/Value List (Properties Only) of metadata properties for Job Set | application/json | - |  	Job Set entity metadata properties successfully retrieved |

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

#### ++Update Job Set Metadata Properties++

Submits a request to update (and replace) the metadata properties for a specific Job Set entity in the Server.

Request takes a JSON Name/Value List as content (the Job Set ID and the new metadata properties), and on success returns a response containing the result of the request for update/replacement (“true”).

#### REST API cookbook

[Update Job Set Metadata Properties](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Set_Entity_Service/Update_Job_Set_Metadata_Properties.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| PUT | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/jobsets/{jobSetId}/metadata 

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

**jobSetId** - The ID of the Job Set entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | Result of request to update Job Set | text/plain | - | Update of Job Set properties successfully requested (response of “true” for success) |


#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 500 Internal Server Error | - | - | - | Server error or Job Set ID mismatch in JSON. | 

#### ++Get job Set Properties++

Returns a list of the properties for a specific Job Set entity.

Request takes no content, and on success returns a response containing a JSON Name/Value List (Properties Only) of all the properties for the Job Set.

#### REST API cookbook

[Get Job Set Properties](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Set_Entity_Service/Get_Job_Set_Properties.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/jobsets/{jobSetId}/properties 

#### Path parameters

**jobSetId** - The ID of the Job Set entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Name/Value List (Properties Only) of properties for Job Set | application/json | - | Job Set entity properties successfully retrieved |

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

#### ++Update Job Set Properties++

Submits a request to update (and replace) the properties for a specific Job Set entity in the Server.

Request takes a JSON Name/Value List as content (the Job Set ID and the new properties), and on success returns a response containing the result of the request for update/replacement (“true”).

#### REST API cookbook

[Update Job Set Properties](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Set_Entity_Service/Update_Job_Set_Properties.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| PUT | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/jobsets/{jobSetId}/properties

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

**jobSetId** - The ID of the Job Set entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | Result of request to update Job Set | text/plain | - | Update of Job Set properties successfully requested (response of “true” for success) |


#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 500 Internal Server Error | - | - | - | Server error or Job Set ID mismatch in JSON. | 
