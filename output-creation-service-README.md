### ++Output creation service++

#### ++Process Output Creation (By Job Set) (JSON)++

Submits a request to initiate a new Output Creation operation.

Request takes a JSON Identifier (with Output Parameters) of the Job Set ID as content, and on success returns a response containing additional headers that specify the ID of the new operation as well as link URLs that can be used to retrieve further information/cancel the operation.

#### REST API cookbook

[Process Output Creation (JSON)](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Output_Creation_Service/Process_Output_Creation_(By_Job_Set)_(JSON).html)


| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI
 	
/rest/serverengine/workflow/outputcreation/{configId} 

#### Request parameters

```
{
	identifier: __the job set entity identifier__, number
	createOnly: __parameter to specify if output is to be only created in the server, no final destination__ boolean
}
```

#### Path parameters

**configId** - Managed File ID (or Name) of the Data Mapping configuration in File Store. number | string

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 202 Accepted | - | - | &middot; **operationid** - Operation ID of new Data Mapping operation<br/>**Link** - Contains multiple link URLs that can be used to retrieve further information/cancel the operation | Creation of new operation successful |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 404 Not Found | - | - | - | Output Creation Preset or Job Set entity not found in File Store/Server. |
| 500 Internal Server Error | - | - | - | JSON Identifier invalid or missing required structure. |

#### ++Process Output Creation (By Job) (JSON)++

Submits a request to initiate a new Output Creation operation.

Request takes a JSON Identifier List (with Output Parameters) of the Job IDs as content, and on success returns a response containing additional headers that specify the ID of the new operation as well as link URLs that can be used to retrieve further information/cancel the operation.

#### REST API cookbook

[Process Output Creation (By Job) (JSON)](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Output_Creation_Service/Process_Output_Creation_(By_Job)_(JSON).html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/workflow/outputcreation/{configId}/jobs 

#### Request parameters

```
{
	identifiers: __an array of job entity identifiers__, number[]
	createOnly: __parameter to specify if output is to be only created in the server, no final destination__ boolean
}
```

#### Path parameters

**configId** - Managed File ID (or Name) of the Data Mapping configuration in File Store. number | string

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 202 Accepted | - | - | &middot; **operationid** - Operation ID of new Data Mapping operation<br/>**Link** - Contains multiple link URLs that can be used to retrieve further information/cancel the operation | Creation of new operation successful |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 404 Not Found | - | - | - | Output Creation Preset or Job Set entity not found in File Store/Server. |
| 500 Internal Server Error | - | - | - | JSON Identifier invalid or missing required structure. |
