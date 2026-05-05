### ++All-in-One++

The method submits a request to initiate a new All-In-One operation.

Request takes a JSON All-In-One Configuration as content, and on success returns a response containing additional headers that specify the ID of the new operation as well as link URLs that can be used to retrieve further information/cancel the operation.

#### REST API cookbook

[Process All-In-One (JSON)](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/All-In-One_Service/Process_All-In-One_(JSON).html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/workflow/print/submit

#### Request parameters

```
{
	datamining: {
		config: __data mapping configuration__, number | string
		identifier: __data file__, number | string
		persistDataset: __data record persistence during data mapping__, boolean
		parameters?: { 
			name : value __runtime parameters__ number | string | boolean
		}
	},
	contentcreation: {
		config: __input template__, number | string
		parameters?: { 
			name : value __runtime parameters__ number | string | boolean
		}
	},
	jobcreation: {
		config?: __job creation preset__, number | string
		parameters?: { 
			name : value __runtime parameters__ number | string | boolean
		}
	},
	outputcreation: {
		config: __output creation preset__, number | string
		createOnly: __ output only created on server, no final destination__ boolean
	}
}
```

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 202 Accepted | - | - | &middot; **operationId** - Operation ID of new All-In-One operation <br/> &middot; **Link** – Contains multiple link URLs that can be used to retrieve further information/cancel the operation | Creation of new operation successful |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 400 Bad Request | - | - | - | Required Input resource/file not found in File Store |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. |
| 500 Internal Server Error | - | - | - | General error with running the All-In-One Process or a specific error relating to an individual workflow process (see error description). |
