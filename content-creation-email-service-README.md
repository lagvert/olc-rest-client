### ++Content Creation (Email) Service++

#### ++Process Content Creation (By Data Record) (JSON)++

Submits a request to initiate a new Content Creation (Email) operation.

Request takes a JSON Identifier List (with Email Parameters) of Data Record IDs as content, and on success returns a response containing additional headers that specify the ID of the new operation as well as link URLs that can be used to retrieve further information/cancel the operation.

#### REST API cookbook

[Process Content Creation (By Data Record) (JSON)](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_(Email)_Service/Process_Content_Creation_(By_Data_Record)_(JSON).html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/workflow/contentcreation/email/{templateId} 

#### Request parameters

```
{
	identifiers: __an array of data recordentity identifiers__, number[]
	parameters?: { 
		name : value __runtime parameters__ number | string | boolean
	},
	attachPdfpage?: __parameter to specify if a PDF file of the Print context should also be created and attached to the email output__, boolean
	attachWebPage?: __parameter to specify if HTML files of the enabled sections (a single section by default) in the Web context should also be created and attached to the email output__, boolean
	host?: __the network address or name of the SMTP mail server through which emails will be sent. If required, a server port value can also be specified__, string
	useAuth?: __parameter to specify if authentication is to be used with the mail server__ , boolean
	user?: __the user name to authenticate with__, string
	password?: __the password to authenticate with__, string
	useStartTLS?: __parameter to specify if Transport Layer Security (TLS) is to be opportunistically used when sending emails__ , boolean
	eml?: __parameter to specify if an EML (E-Mail Message) file of the email for each record should be created in the email output__ , boolean
	sender?: __the email address to be shown as the sender in the email output__ string,
	senderName?: __the name to be shown as the sender in the email output__ string,
	useSender?: __parameter to specify if the sender address will be used as the receiver address for all emails in the output__ boolean
}
```

#### Path parameters

**templateId** - The Managed File ID (or Name) of the template in File Store. number | string

#### Query parameters

**section** - The Section of the Email context to export (default section in template). string

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
| 404 Not Found | - | - | - | Template or Data Record entity not found in File Store/Server. | 

#### ++Process Content Creation (By Data) (JSON)++

Submits a request to initiate a new Content Creation (Email) operation.

Request takes a JSON Record Data List (with Email Parameters) of the data values for one or more Data Records as content, and on success returns a response containing additional headers that specify the ID of the new operation as well as link URLs that can be used to retrieve further information/cancel the operation.
#### REST API cookbook

[Process Content Creation (By Data) (JSON)](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_(Email)_Service/Process_Content_Creation_(By_Data)_(JSON).html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/workflow/contentcreation/email/{templateId} 

#### Request parameters

```
{
	parameters?: { 
		name : value __runtime parameters__ number | string | boolean
	},
	attachPdfpage?: __parameter to specify if a PDF file of the Print context should also be created and attached to the email output__, boolean
	attachWebPage?: __parameter to specify if HTML files of the enabled sections (a single section by default) in the Web context should also be created and attached to the email output__, boolean
	host?: __the network address or name of the SMTP mail server through which emails will be sent. If required, a server port value can also be specified__, string
	useAuth?: __parameter to specify if authentication is to be used with the mail server__ , boolean
	user?: __the user name to authenticate with__, string
	password?: __the password to authenticate with__, string
	useStartTLS?: __parameter to specify if Transport Layer Security (TLS) is to be opportunistically used when sending emails__ , boolean
	eml?: __parameter to specify if an EML (E-Mail Message) file of the email for each record should be created in the email output__ , boolean
	sender?: __the email address to be shown as the sender in the email output__ string,
	senderName?: __the name to be shown as the sender in the email output__ string,
	useSender?: __parameter to specify if the sender address will be used as the receiver address for all emails in the output__ boolean
}
```

#### Path parameters

**templateId** - The Managed File ID (or Name) of the template in File Store. number | string

#### Query parameters

**section** - The Section of the Email context to export (default section in template). string

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
| 404 Not Found | - | - | - | Template not found in File Store/Server. | 
