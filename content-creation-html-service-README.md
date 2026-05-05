### ++Content Creation (HTML) Service++

#### ++Process Content Creation (By Data) (JSON)++

Submits a request to create new HTML content for the Web context.

Request takes a JSON Record Data List of the data values for the Data Record as content, and on success returns a response containing the HTML output produced, specific to the record data and parameters specified.
#### REST API cookbook

[Process Content Creation (By Data) (JSON)](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_(HTML)_Service/Process_Content_Creation_(By_Data)_(JSON).html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/workflow/contentcreation/html/{templateId} 

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

#### Query parameters

**section** - The Section of the Email context to export (default section in template). string<br/>
**inline** -  The inline mode to be used in the creation of content. Possible values ( NONE - no inlining | CSS - converts style rules to inline styles on elements | ALL - inline all resources | LOCAL - inline local resources; remote resources remain external ). string <br/>
**cssSelector?** - A CSS selector for the creation of only a specific HTML element within the template. string

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 Okay | The entire HTML output for the Data Record, or the inner HTML of the first element that matches the given CSS selector, or an empty string if the CSS selector produced no results | text/html | - | Output created successfully |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 400 Bad Request | - | - | - | Web context not found / Web section not found. |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 404 Not Found | - | - | - | Template not found in File Store/Server. | 
| 500 Internal Server Error | - | - | - | Content Creation Error: Web context in template not found / Invalid CSS selector. | 

#### Process Content Creation (By Data Record) (JSON)

Submits a request to create new HTML content for the Web context.

Request takes a JSON HTML Parameters as content, and on success returns a response containing the HTML output produced, specific to the Data Record and parameters specified.

#### REST API cookbook

[Process Content Creation (By Data Record) (JSON)]( https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_(HTML)_Service/Process_Content_Creation_(By_Data_Record)_(JSON).html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/workflow/contentcreation/html/{templateId}/{dataRecordId: [0-9]+} 

#### Request parameters

```
{
	section: __the section within the Web context of the template to use__ , string
	inline: __The inline mode to be used in the creation of content. Possible values ( NONE - no inlining | CSS - converts style rules to inline styles on elements | ALL - inline all resources | LOCAL - inline local resources; remote resources remain external )__ , string
	cssSelector: __a CSS selector for the creation of only a specific HTML element within the template__ string
}
```

#### Path parameters

**templateId** - The Managed File ID (or Name) of the template in File Store. number | string<br/>
**dataRecordId** - The ID of the Data Record entity in Server. number


#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 Okay | The entire HTML output for the Data Record, or the inner HTML of the first element that matches the given CSS selector, or an empty string if the CSS selector produced no results | text/html | - | Output created successfully |


#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 400 Bad Request | - | - | - | Web context not found / Web section not found. |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 404 Not Found | - | - | - | Template not found in File Store/Server. | 
| 500 Internal Server Error | - | - | - | Content Creation Error: Web context in template not found / Invalid CSS selector. | 

#### Get Template Resource

Submits a request to retrieve a resource from a template stored in the File Store.

Request takes no content, and on success returns a response containing the resource from the template.

#### REST API cookbook

[Get Template Resource](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_(HTML)_Service/Get_Template_Resource.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/workflow/contentcreation/html/{templateId}/{relPath: .+} 

#### Path parameters

**templateId** - The Managed File ID (or Name) of the template in File Store. number | string<br/>
**relPath** - The relative path to the resource within the template. string


#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 Okay | Resource located at the relative path within template | (Depends on Resource requested) | - | Resource successfully retrieved |


#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 400 Bad Request | - | - | - | Unable to open resource within template or resource doesn’t exist. |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 404 Not Found | - | - | - | Template not found in File Store. | 
| 500 Internal Server Error | - | - | - | Unable to open template or template doesn’t exist. | 
