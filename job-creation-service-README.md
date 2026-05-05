### ++Job creation service++

#### ++Get Result of Operation++

Retrieves the final result of a completed Job Creation operation of a specific operation ID.

Request takes no content, and on success returns a response containing the ID of the Job Set produced.

#### REST API cookbook

[Get Result of Operation](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Creation_Service/Get_Result_of_Operation.html)


| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/workflow/jobcreation/getResult/{operationId} 

#### Path parameters

**operationId** - Operation ID of Job Creation operation. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 Okay | job Set ID | text/plain | - | Result of completed operation successfully retrieved |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 403 Unauthorized | Error message | - | - | Server authentication has failed.<br/>Response when the authorization token specified in the request headers has now expired. | 
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 404 Not Found | - | - | - | Job Creation Preset or Content Set entity not found in File Store/Server. |

#### ++Process Job Creation (JSON)++

Submits a request to initiate a new Job Creation operation.

Request takes a JSON Identifier List of Content Set IDs as content, and on success returns a response containing additional headers that specify the ID of the new operation as well as link URLs that can be used to retrieve further information/cancel the operation.

The request can also take an optionzal subset of rumtime parameters.

#### REST API cookbook

[Process Job Creation (By Content Set) (Runtime Parameters)(JSON)](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Creation_Service/Process_Job_Creation_(By_Content_Set)_(RuntimeParameters)_(JSON).html)


| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/workflow/jobcreation/{configId} 

#### Request parameters

```
{
	identifiers: __an array of data entity identifiers__ number[],
	parameters?: { 
		name : value __runtime parameters__ number | string | boolean
	}
}
```

#### Path parameters

**configid** - Managed File ID (or Name) of the Job Creation Preset in File Store. number | string

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 202 Accepted | - | - | &middot; **operationid** - Operation ID of new Data Mapping operation<br/>**Link** - Contains multiple link URLs that can be used to retrieve further information/cancel the operation | Creation of new operation successful |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 404 Not Found | - | - | - | Job Creation Preset or Content Set entity not found in File Store/Server. |
