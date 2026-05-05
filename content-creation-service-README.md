### ++Content Creation Service++

#### ++Create Preview PDF (By Data) (JSON)++

Submits a request to create a preview PDF of the print output for a single data record.

Request takes a JSON Record Data List of the data values for the Data Record as content, and on success returns a response containing the Managed File ID for the newly created preview PDF file.
#### REST API cookbook

[Create Preview PDF (By Data) (JSON)](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_Service/Create_Preview_PDF_(By_Data)_(JSON).html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/workflow/contentcreation/pdfpreview/{templateId} 

#### Request parameters

```
{
	data: {	
		schema: {
			columns: {
				name: __the data type BOOLEAN | STRING | HTMLSTRING | INTEGER | FLOAT | DATETIME | CURRENCY__ string
			}
		}
		fields: [
			{
				name: __the name of the media__. string
				value: __the size of the media__. string
			}
		]
	}
}
```

#### Path parameters

**templateId** - The Managed File ID (or Name) of the template in File Store. number | string

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 Okay | Managed File ID | text/plain | - | Creation of preview PDF in File Store successful |


#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 400 Bad Request | - | - | - | Unable to open resource within template or resource doesn’t exist / Context not found / Section not found. |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 404 Not Found | - | - | - | Template not found in File Store. | 

#### +=Create Preview PDF (By Data Record)++

Submits a request to create a preview PDF of the print output for a single data record.

Request takes a JSON Record Data List of the data values for the Data Record as content, and on success returns a response containing the Managed File ID for the newly created preview PDF file.

#### REST API cookbook

[Create Preview PDF (By Data Record)](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_Service/Create_Preview_PDF_(By_Data_Record).html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/workflow/contentcreation/pdfpreviewdirect 

#### Query parameters

**templateId** - The Managed File ID (or Name) of the template in File Store  number | string <br/>
**dataRecordId** - The ID of the Data Record entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 Okay | Managed File ID | text/plain | - | Creation of preview PDF in File Store successful |


#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 400 Bad Request | - | - | - | Unable to open resource within template or resource doesn’t exist / Context not found / Section not found. |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 404 Not Found | - | - | - | Template not found in File Store. | 

#### ++Create Preview PDF (By Data)++

Submits a request to create a preview PDF of the print output for a single data record.

Request takes binary file data as content, and on success returns a response containing the Managed File ID for the newly created preview PDF file.

#### REST API cookbook

[Create Preview PDF (By Data)](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_Service/Create_Preview_PDF_(By_Data).html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/octet-stream | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/workflow/contentcreation/pdfpreview/{templateId}/{dmConfigId} 

#### Path parameters

**templateId** - The Managed File ID (or Name) of the template in File Store. number | string<br/>
**dmConfigId** - The Managed File ID (or Name) of the Data Mapping configuration in File Store.  number | string

#### Query parameters

**persist** - Whether the Data Record produced will be persisted in Server (default true). boolean

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 Okay | Managed File ID | text/plain | - | Creation of preview PDF in File Store successful |


#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 400 Bad Request | - | - | - | Unable to open resource within template or resource doesn’t exist / Context not found / Section not found. |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 404 Not Found | - | - | - | Template, Data Mapping configuration or Data Record entity not found in File Store/Server. | 

#### +=Process Content Creation (By Data Set)++

Submits a request to initiate a new Content Creation operation.

Request takes a JSON Parameters object, and on success returns a response containing additional headers that specify the ID of the new operation as well as link URLs that can be used to retrieve further information/cancel the operation.

#### REST API cookbook

[Process Content Creation (By Data Set)](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_Service/Process_Content_Creation_(By_Data_Set).html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/octet-stream | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/workflow/contentcreation/{templateId}/{dataSetId}

#### Request parameters

```
{
	identifiers: __an array of data entity identifiers__ number[]
}
```

#### Path parameters

**templateId** - The Managed File ID (or Name) of the template in File Store. number | string <br/>
**dataSetId** -  The ID of the Data Set entity in Server. number


#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 202 Accepted | - | - | &middot; - **operationid** - Operation ID of new Content Creation (Email) operation<br/>&middot; - **Link** - Contains multiple link URLs that can be used to retrieve further information/cancel the operation | Creation of new operation successful |


#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 404 Not Found | - | - | - | Template or Data Set entity not found in File Store/Server. | 

#### ++Process Content Creation (By Data Record) (JSON)++

Submits a request to initiate a new Content Creation operation.

Request takes a JSON Identifier List (with Runtime Parameters) of Data Record IDs as content, and on success returns a response containing additional headers that specify the ID of the new operation as well as link URLs that can be used to retrieve further information/cancel the operation.

#### REST API cookbook

[Process Content Creation (By Data Record)](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_Service/Process_Content_Creation_(By_Data_Record)_(JSON).html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/octet-stream | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/workflow/contentcreation/{templateId} 

#### Request parameters

```
{
	identifiers: __an array of data entity identifiers__ number[]
}
```

#### Path parameters

**templateId** - The Managed File ID (or Name) of the template in File Store. number | string


#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 202 Accepted | - | - | &middot; - **operationid** - Operation ID of new Content Creation (Email) operation<br/>&middot; - **Link** - Contains multiple link URLs that can be used to retrieve further information/cancel the operation | Creation of new operation successful |


#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 404 Not Found | - | - | - | Template not found in File Store. | 

#### ++Process Content Creation (By Data) (JSON)++

Submits a request to initiate a new Content Creation operation.

Request takes a JSON Record Data List of the data values for one or more Data Records as content, and on success returns a response containing additional headers that specify the ID of the new operation as well as link URLs that can be used to retrieve further information/cancel the operation.

#### REST API cookbook

[Process Content Creation (By Data) (JSON)](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_Service/Process_Content_Creation_(By_Data)_(JSON).html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/octet-stream | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/workflow/contentcreation/{templateId} 

#### Request parameters

```
{
	data: {	
		schema: {
			columns: {
				name: __the data type BOOLEAN | STRING | HTMLSTRING | INTEGER | FLOAT | DATETIME | CURRENCY__ string
			}
		}
		fields: [
			{
				name: __the name of the media__. string
				value: __the size of the media__. string
			}
		]
	}
}
```

#### Path parameters

**templateId** - The Managed File ID (or Name) of the template in File Store. number | string


#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 202 Accepted | - | - | &middot; - **operationid** - Operation ID of new Content Creation (Email) operation<br/>&middot; - **Link** - Contains multiple link URLs that can be used to retrieve further information/cancel the operation | Creation of new operation successful |


#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 404 Not Found | - | - | - | Template not found in File Store. | 
