### ++Statistics Service++

#### ++Get Job Statistics++

Returns statistics for a specific Job Set entity.

Request takes no content, and on success returns a response containing JSON Job Set Statistics about a specific Job Set at the specified level.

#### REST API cookbook

[Get Job Set Statistics](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Statistics_Service/Get_Statistics_for_JobSet.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| GET | - | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/statistics/jobset/{jobSetID}

#### Path parameters

**jobSetId** - A Job Set ID. number

#### Query parameters

**levelMode (optional)** - The level of detail contained in the return value. Possible values (case insensitive):<br/> &middot; **documentSetOnly** – statistics at the Document Set level only.<br/> &middot; **documentSetAll** - statistics at the Document Set level, including statistics at the Document level.<br/> &middot; **documentOnly (default)** - statistics at the Document level only.

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Job Set Statistics | application/json | - | Job Set statistics returned |

#### Response JSON

```
{
    "jobSetId": __the job set entity identifier__, number
    "properties": __an array of metadata properties of the job set, if it has any__, string
    "counts": {
        "sheets": __the number of sheets in the job set__, number
        "pages": __the number of pages in the job set__ number
    },
    "media": [
        {
            "name": __the name of the media__, string
            "type": __the type of the media__, string
            "size": {
                "width": __the width of the media__, string
                "height": __the height of the media__ string
            },
            "color": __the color of the media__, string | null
            "weight": __the weight of the media__, string
            "count": __the number of pages using the specific media__ number
        }
    ],
    "documents": [
        {
            "documentId": __ID of the document__, number
            "contentItemId": __ID of the content Item associated with the document__, number
            "dataRecordId": __ID of the data record associated with the document__, number
            "properties": __an array of metadata properties of the document, if it has any__, string[]
            "counts": {
                "sheets": __the number of sheets in the document__, number
                "pages": __the number of pages in the document__ number
            },
            "media": __an object with one key/value pair per media type that is used in the document, specifying the number of times that specific media type is used in the document. A media type is referenced by its index (zero based) in the master media list.__
        } 
    ]
}
```

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 400 Bad Request | JSON Error specifying error message | application/json | - | The value specified for the levelMode query parameter is not valid. |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 404 Not Found | JSON Error specifying error message | application/json | - | Job Set ID cannot be found | 
