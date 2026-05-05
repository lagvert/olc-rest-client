### ++Data Record Entity Service++

#### ++Add Data Records++

Submits a request to add one or more Data Record entities to one or more entities in the Server as either:

&middot; a Data Record of an existing Data Set entity in the Server, or
&middot; a nested Data Record in a Data Table of an existing Data Record entity in the Server

Request takes JSON New Record Lists as content (each with the Data Set/Data Record ID, Data Table and the new records/values), and on success returns a response containing no content.

#### REST API cookbook

[Add Data Records](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Record_Entity_Service/Add_Data_Records.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/datarecords 

#### Request parameters

##### Non tabular

```
[
	{
		datasetid: __the data entity identifier__, number
		records: [
					{
						{
						name: __the name of the property__, string
						value: __the value of the property__, string
						}
					}
				]
	}
]
```

##### Tabular

```
[
	{
		recordid: __the data entity identifier__, number
		table: "detail",
		records: [
					{
						fields: [
									{
									name: __the name of the property__, string
									value: __the value of the property__, string
									}
								]
					}
				]
	}
]
```

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | - | - | - | Data Records for Data Set/Data Record entities successfully added |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. |
| 500 Internal Serve Error | - | - | - | JSON New Record Lists invalid or missing required structure | 

#### ++Get Data Record Values++

Returns a list of the values for a specific Data Record entity, and potentially the values of any nested Data Records (if recursive).

Request takes no content, and on success returns a response containing either:

&middot; JSON Record Content List of all the values for the Data Record
&middot; JSON Record Content List (Explicit Types) of all the values and data types for the Data Record

#### REST API cookbook

[Get Data Record Values](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Record_Entity_Service/Get_Data_Record_Values.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/datarecords/{dataRecordId}/values 

#### Path parameters

**dataRecordId** - ID of the Data Record entity in Server. string

#### Query parameters

**recursive** - Recurse all Data Tables within the Data Record and retrieve the values of any nested Data Records (default false) boolean<br/>
**explicitTypes** - Retrieve both values and data types of the Data Record (default false) boolean

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Record Content List of the values for Data Record | application/json | - | Data Record entity values successfully retrieved |
| 200 OK | JSON Record Content List (Explicit Types) of the values and data types for Data Record   | application/json | - | Data Record entity values and data types successfully retrieved |

#### Response JSON

##### ++JSON record content list++

```
{	
	id: __the data record entity identifier __ , number
	table: __the data record entity data table name__, string
	boundaries?: {
		start: __the starting boundary value for the data record__, number
		end: __the ending boundary value for the data record__ number
	},
	datasetid?: __the data set entity identifier of parent entity__, number
	fields: [
		{
			name: __the name of the media__. string
			value: __the size of the media__. string
		}
	],
	records?: [
		{
			id: __the data record entity identifier __ , number
			table: __the data record entity data table name__, string
			parentrecordid: __the data record entity identifier of parent entity__, number,
			fields: [
				{
					name: __the name of the media__. string
					value: __the size of the media__. string
				}
			]
		}
	]
}
```

##### JSON record content list (Explicit Types)


```
{	
	schema: {
		columns: {
			name: __the data type BOOLEAN | STRING | HTMLSTRING | INTEGER | FLOAT | DATETIME | CURRENCY__ string
		}
	}
	id: __the data record entity identifier __ , number
	datasetid: __the data set entity identifier of parent entity__, number
	fields: [
		{
			name: __the name of the media__. string
			value: __the size of the media__. string
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
| 500 Internal Server Error | - | - | - | Server error or invalid Data Record ID specified. | 

#### ++Get Multiple Data Record Values++

Returns a list of the values for one or more Data Record entities, and potentially the values of any nested Data Records (if recursive).

Request takes no content, and on success returns a response containing JSON Record Content Lists of all the values for each Data Record. 

#### REST API cookbook

[Get Multiple Data Record Values](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Record_Entity_Service/Get_Multiple_Data_Record_Values.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/datarecords/values 

#### Path parameters

**id** - ID of each Data Record entity in Server<br/>
**recursive** - Recurse all Data Tables within the Data Record and retrieve the values of any nested Data Records (default false) boolean

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Record Content Lists of the values for each Data Record | application/json | - | Data Record entity values successfully retrieved |

#### Response JSON

```
[
	{	
		id: __the data record entity identifier __ , number
		table: __the data record entity data table name__, string
		boundaries?: {
			start: __the starting boundary value for the data record__, number
			end: __the ending boundary value for the data record__ number
		},
		datasetid?: __the data set entity identifier of parent entity__, number
		fields: [
			{
				name: __the name of the media__. string
				value: __the size of the media__. string
			}
		],
		records?: [
			{
				id: __the data record entity identifier __ , number
				table: __the data record entity data table name__, string
				parentrecordid: __the data record entity identifier of parent entity__, number,
				fields: [
					{
						name: __the name of the media__. string
						value: __the size of the media__. string
					}
				]
			}
		]
	},
	{	
		id: __the data record entity identifier __ , number
		table: __the data record entity data table name__, string
		boundaries?: {
			start: __the starting boundary value for the data record__, number
			end: __the ending boundary value for the data record__ number
		},
		datasetid?: __the data set entity identifier of parent entity__, number
		fields: [
			{
				name: __the name of the media__. string
				value: __the size of the media__. string
			}
		],
		records?: [
			{
				id: __the data record entity identifier __ , number
				table: __the data record entity data table name__, string
				parentrecordid: __the data record entity identifier of parent entity__, number,
				fields: [
					{
						name: __the name of the media__. string
						value: __the size of the media__. string
					}
				]
			}
		]
	},
]
```

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 500 Internal Server Error | - | - | - | Server error or invalid Data Record ID specified. | 

#### ++Get Multiple Data Record Values (JSON)++

Returns a list of the values for one or more Data Record entities, and potentially the values of any nested Data Records (if recursive).

Request takes a JSON Data Record Identifier List (with Parameters) of the Data Record IDs as content, and on success returns a response containing either:

&middot; JSON Record Content List of all the values for the Data Record
&middot; JSON Record Content List (Explicit Types) of all the values and data types for each Data Record

#### REST API cookbook

[Get Multiple Data Record Values (JSON)](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Record_Entity_Service/Get_Multiple_Data_Record_Values_(JSON).html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/datarecords/values 

#### Request parameters

```
{
	recordids: __an array of data record entity identifiers__, number[]
	recursive: __parameter to specify if all data tables within each data record should be recursed and the values of any nested data records retrieved also__ , boolean
	explicitTypes: __parameter to specify if both data record values and data types are to be retrieved__ , boolean,
	optimized: __parameter to specify whether the method can retrieve items in an optimized way__. boolean,
	batchsize: __parameter to specify a custom batch siz__. number
}
```

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Record Content List of the values for each Data Record | application/json | - | Data Record entity values successfully retrieved |
| 200 OK | JSON Record Content Lists (Explicit Types) of the values and data types for each Data Record   | application/json | - | Data Record entity values and data types successfully retrieved |

#### Response JSON

##### JSON record content list

```
[
	{	
		id: __the data record entity identifier __ , number
		table: __the data record entity data table name__, string
		boundaries?: {
			start: __the starting boundary value for the data record__, number
			end: __the ending boundary value for the data record__ number
		},
		datasetid?: __the data set entity identifier of parent entity__, number
		fields: [
			{
				name: __the name of the media__. string
				value: __the size of the media__. string
			}
		],
		records?: [
			{
				id: __the data record entity identifier __ , number
				table: __the data record entity data table name__, string
				parentrecordid: __the data record entity identifier of parent entity__, number,
				fields: [
					{
						name: __the name of the media__. string
						value: __the size of the media__. string
					}
				]
			}
		]
	},
	{	
		id: __the data record entity identifier __ , number
		table: __the data record entity data table name__, string
		boundaries?: {
			start: __the starting boundary value for the data record__, number
			end: __the ending boundary value for the data record__ number
		},
		datasetid?: __the data set entity identifier of parent entity__, number
		fields: [
			{
				name: __the name of the media__. string
				value: __the size of the media__. string
			}
		],
		records?: [
			{
				id: __the data record entity identifier __ , number
				table: __the data record entity data table name__, string
				parentrecordid: __the data record entity identifier of parent entity__, number,
				fields: [
					{
						name: __the name of the media__. string
						value: __the size of the media__. string
					}
				]
			}
		]
	},
]
```

##### JSON record content list (Explicit Types)


```
[
	{	
		schema: {
			columns: {
				name: __the data type BOOLEAN | STRING | HTMLSTRING | INTEGER | FLOAT | DATETIME | CURRENCY__ string
			}
		}
		id: __the data record entity identifier __ , number
		datasetid: __the data set entity identifier of parent entity__, number
		fields: [
			{
				name: __the name of the media__. string
				value: __the size of the media__. string
			}
		]
	},
	{	
		schema: {
			columns: {
				name: __the data type BOOLEAN | STRING | HTMLSTRING | INTEGER | FLOAT | DATETIME | CURRENCY__ string
			}
		}
		id: __the data record entity identifier __ , number
		datasetid: __the data set entity identifier of parent entity__, number
		fields: [
			{
				name: __the name of the media__. string
				value: __the size of the media__. string
			}
		]
	},
	
]
```

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 500 Internal Server Error | - | - | - | Server error or invalid Data Record ID specified. | 

#### ++Update Data Record Values++

Submits a request to update one or more values for a specific Data Record entity in the Server.

Request takes a JSON Record Content List (Fields Only) as content (the Data Record ID and the new values), and on success returns a response containing no content.

#### REST API cookbook

[Update Data Record Values](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Record_Entity_Service/Update_Data_Record_Values.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| PUT | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/datarecords/{dataRecordId}/values 

#### Request parameters

```
{
	id: __the data record entity identifier_, number
	records: [
		{
			name: __the name of the data field__, string
			value: __the value of the data field__, string
		}
	]
}
```

#### Path parameters

**dataRecordId** - ID of the Data Record entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | - | - | - | Data Record entity values successfully updated |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 500 Internal Server Error | - | - | - | Server error or Data Record ID mismatch in JSON. | 

#### ++Update Multiple Data Record Values++

Submits a request to update one or more values for one or more Data Record entities in the Server.

Request takes JSON Record Content Lists (Fields Only) as content (each with the Data Record ID and the new values), and on success returns a response containing no content.

#### REST API cookbook

[Update Multiple Data Record Values](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Record_Entity_Service/Update_Multiple_Data_Record_Values.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| PUT | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI 

/rest/serverengine/entity/datarecords 

#### Request parameters

```
[
	{
		id: __the data record entity identifier_, number
		records: [
			{
				name: __the name of the data field__, string
				value: __the value of the data field__, string
			}
		]
	},
	{
		id: __the data record entity identifier_, number
		records: [
			{
				name: __the name of the data field__, string
				value: __the value of the data field__, string
			}
		]
	}
]
```

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | - | - | - | Data Record entity values successfully updated |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 

#### ++Get Data Record Properties++

Returns a list of the properties for a specific Data Record entity.

Request takes no content, and on success returns a response containing a JSON Name/Value List (Properties Only) of all the properties for the Data Record.

#### REST API cookbook

[Get Data Record Properties](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Record_Entity_Service/Get_Data_Record_Properties.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/datarecords/{dataRecordId}/properties 

#### Path parameters

**dataRecordtId** - The ID of the Data Record entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Name/Value List (Properties Only) of properties for Data Record | application/json | - | Data Record entity properties successfully retrieved |

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

#### ++Update Data Record Properties++

Submits a request to update (and replace) the properties for a specific Data Record entity in the Server.

Request takes a JSON Name/Value List as content (the Data Record ID and the new properties), and on success returns a response containing the result of the request for update/replacement (“true”).

#### REST API cookbook

[Update Data Record Properties](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Record_Entity_Service/Update_Data_Record_Properties.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| PUT | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/datarecords/{dataRecordId}/properties 

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

**dataRecordtId** - The ID of the Data Record entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | Result of request to update Data Record | text/plain | - | Update of Data Record properties successfully requested (response of “true” for success) |


#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 500 Internal Server Error | - | - | - | Server error or Data Record ID mismatch in JSON. | 

#### ++Update Multiple Data Record Properties++

Submits a request to update one or more properties for one or more Data Record entities in the Server.

Request takes JSON Name/Value Lists as content (each with the Data Record ID and the new properties), and on success returns a response containing no content.

#### REST API cookbook

[Update Data Record Properties](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Record_Entity_Service/Update_Data_Record_Properties.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| PUT | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/datarecords/{dataRecordId}/properties 

#### Request parameters

```
[
	[
		id: __the data entity identifier__, number
		properties: [
			{
			name: __the name of the property__, string
			value: __the value of the property__, string
			}
		]
	],
	[
		id: __the data entity identifier__, number
		properties: [
			{
			name: __the name of the property__, string
			value: __the value of the property__, string
			}
		]
	]
]
```

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | - | - | - | Properties of Data Record entities successfully updated |


#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
