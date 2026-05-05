### ++Entity Service++

#### ++Find Data Entity++

Submits data entity search criteria to the PlanetPress Connect Server.

Request takes a JSON Search Parameters structure as content and on success returns a response containing JSON Identifier Lists (with Sort Key) of the data entity IDs matching the search criteria.

#### REST API cookbook

[Find Data Entity](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Entity_Service/Find_Data_Entity.html)

| Method Type | Content Type | Additional Headers |
| ----------- | ----------- | ----------- |
| PUT | application/json | If server security settings are enabled, then one of the following:<br/> &middot; **Authorization** – Basic Authentication (Username and Password) credentials (Base64 encoded)<br/> &middot; **auth_token** – Authorization Token |

#### URI

/rest/serverengine/entity/find 

#### Request parameters

```
{
	entity: __he data entity type (DATARECORDS | DATASETS | CONTENTITEMS | CONTENTSETS | JOBS | JOBSETS)__, string
	search: {
		ruleType: __the topmost RULESET__, string
		condition: __the logic rule for this RULESET (ALL | ANY | NOTALL | NOTANY)__, string
		rules: [
			{
				ruleType: __RULESET rule__ , string
				condition: __RULESET consition__ , string
			}
		],
		sort: [
			{
				type: __the type of sorting rule__ . string
				name: __the name of the data value field or data entity property to sort by__ , string
				numeric: __whether the data value field is a of a numeric type__ , boolean
				order: __the order that matches to this rule are sorted by (ASC| DESC)__ string
			}		
		],
		group: [
			{
				type: __the type of grouping rule__ . string
				name: __the name of the data value field or data entity property to group by__ , string
				numeric: __whether the data value field is a of a numeric type__ , boolean
				order: __the order that matches to this rule are grouped by (ASC| DESC)__ string
			}
		]
	}
}
```

#### Path parameters

**documentSetId** - The ID of the Document Set entity in Server. number

#### On success

| Status Code | Content | Content-Type | Additional Headers | Description |
| ----------- | ----------- | ----------- |----------- | ----------- |
| 200 OK | JSON Identifier Lists (with Sort Key) containing all the entities matching the search criteria | application/json | - | Search request successfully executed |

#### Response JSON

```
[
	[
		{
			indentifier: __the data entity identifier __, number
			sortKey: __the data entity sort key__ string
		}
	]
]
```

#### Error messages

| Status Code | Content | Content-Type | Additional Headers | Description
| ----------- | ----------- | ----------- |----------- | ----------- |
| 401 Unauthorized | - | - | **WWW-Authenticate** – BASIC (Basic Authentication credentials are accepted) | Server authentication is required.<br/>Response when neither basic authentication credentials nor an authorization token have been specified in the request headers. |
| 401 Unauthorized | Error message | - | - | Server authentication is required.<br/>Response when the authorization token specified in the request headers has now expired. |
| 403 Forbidden | Error message | - | - | Server authentication is required.<br/>Response when either the basic authentication credentials or the authorization token specified in the request headers are invalid. | 
| 500 Internal Server Error | - | - | - |  	Server error or Invalid JSON structure specified. | 
