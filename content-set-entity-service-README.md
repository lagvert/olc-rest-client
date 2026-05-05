## ++Content Set Entity Servivce++

#### ++Get All Content Sets++

Returns a list of all the Content Set entities currently contained within the Server.

Request takes no content, and on success returns a response containing a JSON Identifier List of all the Content Sets.

#### REST API cookbook

[Get All Content Sets](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Set_Entity_Service/Get_All_Content_Sets.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/contentsets 

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Identifier List of all the Content Sets in Server | application/json | - | Identifier List of Content Sets returned |

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

#### ++Get Content Items for Content Set++

Returns a list of all the Content Item entities (and their corresponding Data Record entities) contained within a specific Content Set entity.

Request takes no content, and on success returns a response containing a JSON Content Item Identifier List of all the Content Items in the Content Set.

#### REST API cookbook

[Get Content Items for Content Set](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Set_Entity_Service/Get_Content_Items_for_Content_Set.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/contentsets/{contentSetId} 

#### Path parameters

**contentSetId** - ID of the Content Set entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Content Item Identifier List of all the Content Items in Content Set | application/json | - | Content Item Identifier List returned |

#### Response JSON

```
{
	identifiers: [
		{
			item: __the content item entity identifier__ . number
			record: __the data record entity identifier__ number
		}
	]
}
```

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 


#### ++Get Page Details for Content Set++

Returns the page details for a specific Content Set entity, as either a summary or a list (broken down by Content Item entity).

Request takes no content, and on success returns a response containing either:

&middot; JSON Page Details Summary of the page details for the Content Set
&middot; JSON Page Details List of the page details for each Content Item in the Content Set

#### REST API cookbook

[Get Page Details for Content Set](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Set_Entity_Service/Get_Page_Details_for_Content_Set.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/contentsets/{contentSetId}/pages 

#### Path parameters

**contentSetId** - ID of the Content Set entity in Server. number

#### Query parameters

**detail** - Return a list of details for each Content Item in the Content Set instead of a summary (default false) boolean

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Page Details Summary containing page details for Content Set | application/json | - | Content Set entity page details successfully retrieved |
| 200 OK | JSON Page Details List containing page details for each Content Item in Content Set  | application/json | - | Content Set entity page details successfully retrieved |

#### Response JSON

##### JSON page details summary

```
{
	pages: [
		{
			count: __the number of pages using the specific media__ . number
			media: {
				name: __the name of the media__. string
				size: __the size of the media__. string
				width: __the width of the media__. string
				height: __the height of the media__. string
			}
		}
	]
}
```

##### JSON page details list


```
[
	{
		id: __the content item entity identifier__, number
		pages: [
			{
				count: __the number of pages using the specific media__ . number
				media: {
					name: __the name of the media__. string
					size: __the size of the media__. string
					width: __the width of the media__. string
					height: __the height of the media__. string
				}
			}
		]
	}
]
```

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 

#### ++Delete Content Set Entity++

Submits a request for a specific Content Set entity to be marked for deletion from the Server.

Request takes no content, and on success returns a response containing the result of the request for deletion (“true” or “false”).

#### REST API cookbook

[Delete Content Set Entity](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Set_Entity_Service/Delete_Content_Set_Entity.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/contentsets/{contentSetId}/delete

#### Path parameters

**contentSetId** - ID of the Content Set entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | Result of request for Content Set removal | text/plain | - | Deletion of Content Set successfully requested from Server (response of “true” for success or “false” for failure) |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 

#### Get Content Set Properties

Returns a list of the properties for a specific Content Set entity.

Request takes no content, and on success returns a response containing a JSON Name/Value List (Properties Only) of all the properties for the Content Set.

#### REST API cookbook

[Get Content Set Properties](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Set_Entity_Service/Get_Content_Set_Properties.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/contentsets/{contentSetId}/properties 

#### Path parameters

**contentSetId** - ID of the Content Set entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Name/Value List (Properties Only) of properties for Content Set | application/json | - | Content Set entity properties successfully retrieved |

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

#### ++Update Content Set Properties++

Submits a request to update (and replace) the properties for a specific Content Set entity in the Server.

Request takes a JSON Name/Value List as content (the Content Set ID and the new properties), and on success returns a response containing the result of the request for update/replacement (“true”).

#### REST API cookbook

[Update Content Set Properties](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Set_Entity_Service/Update_Content_Set_Properties.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| PUT | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/contentsets/{contentSetId}/properties 

#### Request parameters

```
{
	id: __the data entity identifier__, number
	properties: [
		{
		name: __the name of the property__, string
		value: __the value of the property__, string
		}
	]
}
```

#### Path parameters

**contentSetId** - ID of the Content Set entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | Result of request to update Content Set | text/plain | - | Update of Content Set properties successfully requested (response of “true” for success) |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. |
| 500 Internal Serve Error | - | - | - | Server error or Content Set ID mismatch in JSON | 
