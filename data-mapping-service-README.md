### ++Data mapping service++

#### ++Process Data Mapping (JSON)++

Submits a request to initiate a new Data Mapping operation.

Request takes a JSON Identifier (Managed File) of the data file's Managed File ID or Name as content, and on success returns a response containing additional headers that specify the ID of the new operation as well as link URLs that can be used to retrieve further information/cancel the operation.

#### REST API cookbook

[Process Data Mapping (JSON)](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Mapping_Service/Process_Data_Mapping_(JSON).html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/filestore/DataMiningConfig 

#### Request parameters

```
{
	identifier: __mananged file identifier__ number | string
}
```

#### Path parameters

**configid** - Managed File ID (or Name) of the Data Mapping configuration in File Store. number | string

#### Query parameters

**validate** - Only validate the Data Mapping operation to check for mapping errors ( default false). boolean

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 202 Accepted | - | - | &middot; **operationid** - Operation ID of new Data Mapping operation<br/>**Link** - Contains multiple link URLs that can be used to retrieve further information/cancel the operation | Creation of new operation successful |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 400 Bad Request | - | - | - | Data file or Data Mapping Configuration not found in File Store |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 500 Internal Server Error | - | - | - | JSON Identifier bad or missing. |

#### ++Create Content Set++

Submits a request to initiate a new Data Mapping operation.

The Data Mapping operation generates a Data Set, based on the provided data mapping configuration and PDF/PS/AFP/PCL data file, and a Content Set based on the Data Set.

The data file is consumed according to the data mapping configuration. The resulting data records are then used as background in Content Items. The Content Items are created without a template.

Request takes a JSON Identifier (for Content Creation), and on success returns a response containing additional headers that specify the ID of the new operation as well as link URLs that can be used to retrieve further information/cancel the operation.

#### REST API cookbook

[Create Content Set](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Mapping_Service/Create_Content_Set.html) 


| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/workflow/datamining/createcontentset/{dataFileID} 

#### Request parameters

```
{
	identifier: __file Store ID of the data mapping configuration__, number
	defaults?: {
		duplex: __whether the page sheet is duplex__, boolean
		tumble: __whether to duplex pages as in a calendar__, boolean
	}
	parameters?: { 
		name : value __runtime parameters__ number | string | boolean
	}
}
```

#### Path parameters

**dataFileID** -The ID of the PDF/PS/PCL/AFP data file in the File Store that will be consumed according to the data mapping configuration to create a Content Set. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 202 Accepted | - | - | &middot; **operationid** - Operation ID of new Data Mapping operation<br/>**Link** - Contains multiple link URLs that can be used to retrieve further information/cancel the operation | Creation of new operation successful |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 400 Bad Request | - | - | - | Data mapping configuration not made for PDF files. |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 404 Not Found | - | - | - | Data file or data mapping configuration not found in File Store. |

