### ++Job Segment Entity Service++

#### ++Get Document Sets for Job Segment++

Returns a list of all the Document Set entities contained within a specific Job Segment entity.

Request takes no content, and on success returns a response containing a JSON Identifier List of all the Document Sets in the Job Segment.

#### REST API cookbook

[Get Document Sets for Job Segment](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Segment_Entity_Service/Get_Document_Sets_for_Job_Segment.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/jobsegments/{jobSegmentId} 

#### Path parameters

**jobSegmentid** - The ID of the Job Segment entity in Server. nnumber

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Identifier List of all the Document Sets in Job Segment | application/json | - | Identifier List of Document Sets returned |

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


#### ++Get Job Segment Metadata Properties++

Returns a list of the metadata properties for a specific Job Segment entity.

Request takes no content, and on success returns a response containing a JSON Name/Value List (Properties Only) of all the metadata properties for the Job Segment.

#### REST API cookbook

[Get Job Segment Metadata Properties](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Segment_Entity_Service/Get_Job_Segment_Metadata_Properties.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/jobsegments/{jobSegmentId}/metadata 

#### Path parameters

**jobId** - ID of the Job entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Name/Value List (Properties Only) of metadata properties for job | application/json | - | Job Segment entity metadata properties successfully retrieved |

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
