### ++File Store Service++

#### ++Download managed file or directory++

Obtains an existing file or directory of a specific Managed File ID (or Name) from the File Store.

Request takes no content, and on success returns a response containing the file or directory data (as zipped file).

#### REST API cookbook

[Download Managed File or Directory](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/File_Store_Service/Download_Managed_File_or_Directory.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/filestore/file/{fileId}

#### Path parameters

**fileid** -  The Managed File ID (or Name) of the file or directory in File Store. number | string

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 Okay | File | application/octet-stream | &middot; **Content-Disposition** - Filename of the Managed File<br/>Example: "attachment; filename=Promo-EN.OL-datamapper" | File successfully downloaded from File Store. |
| 200 Okay | Directory(zipped) | application/zip | &middot; **Content-Disposition** - Filename of the Managed Directory<br/>Example: "attachment; filename=letter-ol.zip" | Directory successfully downloaded from File Store. |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. |
| 404 Not Found | - | - | - | File or directory not found in File Store. |

#### ++Delete managed file or directory++

Removes an existing file or directory of a specific Managed File ID (or Name) from the File Store.

Request takes no content, and on success returns a response containing the result of the request for removal (“true” or “false”).

#### REST API cookbook

[Delete Managed File or Directory](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/File_Store_Service/Delete_Managed_File_or_Directory.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/filestore/delete/{fileId} 

#### Path parameters

**fileid** - The Managed File ID (or Name) of the file or directory in File Store. number | string

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 Okay | Result of request for removal | text/plain | - | Removal of file or directory successfully requested from File Store (response of “true” for success or “false” for failure) |

#### JSON Response

```
{
	error: {
		status:__the response HTTP status code__ , number
		message: __a short description of the error that occurred__, string
		parameter: __the ID of the resource that caused the error__ string
	}
}
```

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 400 Bad Request | JSON Error specifying error message | application/json | - | Deletion failed / File still required by OL Connect. |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. |
| 404 Not Found | JSON Error specifying error message | application/json | - | Invalid Managed File ID. |
| 500 Internal Server Error  | JSON Error specifying error message | application/json | - | Connection refused. |

#### ++Upload Data File++

Submits a data file to the File Store.

Request takes binary file data as content, and on success returns a response containing the new Managed File ID for the data file.

This endpoint is currently used for all uploads of Connect related content.

#### REST API cookbook

[Upload Data File](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/File_Store_Service/Upload_Data_File.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/octet-stream | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/filestore/DataFile 

#### Query parameters

**filename** - The file name of the data file to be uploaded. string

**persistent** - Whether the data file to be uploaded will be persistent in File Store (default false). boolean

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 Okay | Managed File ID (or Name) | text/plain | - | Data file successfully uploaded to File Store |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 

#### ++Get Report++

Returns a report in JSON or XML of a template in the File Store. The report contains the tags specified in the filter, or all tags if no filter was specified.

Request takes no content, and on success returns a response containing a JSON or XML structure that holds information about the Connect template. 

#### REST API cookbook

[Get Report](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/File_Store_Service/Get_Report.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | &middot; **Accept** (optional) – a comma-separated list of acceptable content types, or */* if the client accepts all content types. Quality values in a weighted list will be ignored.<br/>If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/filestore/template/report/{fileId} 

#### Path parameters

**fileId** - he Managed File ID (or Name) of the template in the File Store.

#### Query parameters

**filter** - A valid tag name (case sensitive). Examples: sections, media, scripts, datamodel, properties, locale.

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 Okay | A JSON or XML structure holding information about a Connect template. The produced JSON is untyped; a value is either a string or an array. | application/json if the client accepts it; otherwise application/xml | - | Report returned. |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 400 Bad Request | - | - | - | Filter is Invalid |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. |
| 404 Not Found | - | - | - | Template not found in File Store. |
| 406 Not Acceptable | - | - | - | None of the content types are supported by the server. |

#### ++Upload Output Creation Preset (Not Implemented)++

Submits an Output Creation preset to the File Store.

Request takes XML file data as content, and on success returns a response containing the new Managed File ID for the preset.

#### REST API cookbook

[Upload Output Creation Preset](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/File_Store_Service/Upload_Output_Creation_Preset.html)


| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/xml | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/filestore/OutputCreationConfig

#### Query parameters

**filename**   - The file name of the preset to be uploaded. string<br/>
**persistent** - Whether the preset to be uploaded will be persistent in File Store (default false). boolean 

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 Okay | Managed File ID (or Name) | text/plain | - | Preset successfully uploaded to File Store |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 400 Bad Request | - | - | - | Request contains no data for upload to File Store |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. |

#### ++Upload Job Creation Preset (Not Implemented)++

Submits a Job Creation preset to the File Store.

Request takes XML file data as content, and on success returns a response containing the new Managed File ID for the preset.

#### REST API cookbook

[Upload Job Creation Preset](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/File_Store_Service/Upload_Job_Creation_Preset.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/xml | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/filestore/JobCreationConfig

#### Query parameters

**filename**   - The file name of the preset to be uploaded. string<br/>
**persistent** - Whether the preset to be uploaded will be persistent in File Store (default false). boolean 

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 Okay | Managed File ID (or Name) | text/plain | - | Preset successfully uploaded to File Store |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 400 Bad Request | - | - | - | Request contains no data for upload to File Store |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. |

#### ++Upload Template (Not Implemented)++

Submits a template to the File Store.

Request takes zipped file data as content, and on success returns a response containing the new Managed File ID for the template.

#### REST API cookbook

[Upload Template](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/File_Store_Service/Upload_Template.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/zip | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI
 	
/rest/serverengine/filestore/template 

#### Query parameters

**filename**   - The file name of the template to be uploaded. string<br/>
**persistent** - Whether the template to be uploaded will be persistent in File Store (default false). boolean 

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 Okay | Managed File ID (or Name) | text/plain | - | Template successfully uploaded to File Store |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 400 Bad Request | - | - | - | Request contains no data for upload to File Store |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. |

#### ++Upload Data Mapping Configuration (Not Implemented)++

Submits a Data Mapping configuration to the File Store.

Request takes binary file data as content, and on success returns a response containing the new Managed File ID for the configuration.

#### REST API cookbook

[Upload Data Mapping Configuration](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/File_Store_Service/Upload_Data_Mapping_Configuration.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| POST | application/octet-stream | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI
 	
/rest/serverengine/filestore/DataMiningConfig 

#### Query parameters

**filename**   - The file name of the configuration to be uploaded. string<br/>
**persistent** - Whether the configuration to be uploaded will be persistent in File Store (default false). boolean 

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 Okay | Managed File ID (or Name) | text/plain | - | Configuration successfully uploaded to File Store |

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 400 Bad Request | - | - | - | Request contains no data for upload to File Store |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. |
