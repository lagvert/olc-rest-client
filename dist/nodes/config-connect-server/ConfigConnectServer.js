'use strict';

var core = require('@objectif-lune/core');
var expressValidator = require('express-validator');
require('../../api/interfaces/connect-types/filestore/ConnectFileExtensions.js');
var FileType = require('../../api/interfaces/connect-types/filestore/FileType.js');
require('../../api/interfaces/connect-types/filestore/TemplateReportFilter.js');
require('../../api/interfaces/connect-types/json-record-data/FieldType.js');
require('../../api/interfaces/connect-types/search-parameters/SearchParameterEntity.js');
require('../../api/interfaces/connect-types/statistics/JobStatistics.js');
require('../../api/interfaces/services/content-creation/InlineOption.js');
var OLConnectNodeRestClient = require('../../api/OLConnectNodeRestClient.js');
var OLConnectRestApiConnectionPool = require('../OLConnectRestApiConnectionPool.js');

const ns = "@objectif-lune/connect-rest-client/olcnr-connect-server";
function ConfigConnectServer (RED) {
    const CREDENTIALS_DEFINITION = {
        credentials: {
            username: { type: "text" },
            password: { type: "password" },
            token: { type: "text" }
        }
    };
    function createServerConfig(properties) {
        RED.nodes.createNode(this, properties);
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const serverConfigNode = this;
        const config = properties;
        // if invalid value then convert it to 30
        const concurrentRate = (!!config.concurrentRate && parseInt(config.concurrentRate)) || 30;
        serverConfigNode.url = config.url ? config.url.toString() : "";
        serverConfigNode.options = {
            ignorecer: config.ignorecer ? config.ignorecer.toString() == "true" : false,
            disableProgress: config.disableProgress
                ? config.disableProgress.toString() == "true"
                : false,
            concurrentRateLimit: concurrentRate >= 15 && concurrentRate <= 100 ? concurrentRate : 30,
            logger: RED.log
        };
    }
    const errorMessageUtilities = new core.ErrorMessageUtilities("olconnect", (message, args) => RED._(message, args), ns);
    const expressNodeValidation = new core.CommonExpressNodeValidation(RED, errorMessageUtilities);
    const validationRestClient = (input, meta) => {
        const node = meta.req.body.node;
        const restClient = OLConnectRestApiConnectionPool.OLConnectRestApiConnectionPool.restClientInstanceFor(node.url, node.credentials.username, node.credentials.password, node.options);
        const nodeRestClient = new OLConnectNodeRestClient.OLConnectNodeRestClient(restClient);
        meta.req.body ??= Object.create(null);
        meta.req.body.restClient = nodeRestClient;
        return true;
    };
    const validationResponseMiddleware = (request, response, next) => {
        const result = expressValidator.validationResult(request);
        if (!result.isEmpty()) {
            response.status(core.HttpResponseCodes.BAD_ENTITY).send({
                errors: result.array({
                    onlyFirstError: true
                })
            });
            return;
        }
        next();
    };
    /**
     * Form the filter string (T,M,J,O) to the corresponding filter type for the REST API
     * @param request request from node config editor
     * @returns REST API filter type
     */
    function buildRestApiFilterFromNodeRequest(request) {
        const filter = typeof request.query == "object" && typeof request.query.types == "string"
            ? request.query.types.toUpperCase()
            : "";
        return filter
            .split(",")
            .map((filterLetter) => {
            switch (filterLetter) {
                case "M":
                    return FileType.FileType.DATA_MAPPER;
                case "J":
                    return FileType.FileType.JOB_PRESET;
                case "O":
                    return FileType.FileType.OUTPUT_PRESET;
                default:
                    return FileType.FileType.TEMPLATE;
            }
        })
            .filter((e) => e != undefined);
    }
    /**
     * Transform the resource information from the REST API to a from that the node configuration
     * editor will understand
     * @param resourceInfoList response from the REST API
     * @returns response to node config editor
     */
    function transformResourceInfoToResponseWithPurposeField(resourceInfoList) {
        return resourceInfoList
            .map((resourceInfo) => {
            let purpose = "";
            switch (resourceInfo.type) {
                case FileType.FileType.TEMPLATE:
                    purpose = "T";
                    break;
                case FileType.FileType.DATA_MAPPER:
                    purpose = "M";
                    break;
                case FileType.FileType.JOB_PRESET:
                    purpose = "J";
                    break;
                case FileType.FileType.OUTPUT_PRESET:
                    purpose = "O";
                    break;
            }
            return {
                id: resourceInfo.id,
                name: resourceInfo.name,
                bytes: resourceInfo.size,
                purpose
            };
        })
            .sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    }
    const NodeType = "OL Connect Server";
    RED.nodes.registerType(NodeType, createServerConfig, CREDENTIALS_DEFINITION);
    RED.httpAdmin.get("/ol-connect/resources/:serverId", RED.auth.needsPermission("ol-connect-resources.read"), expressValidator.param("serverId")
        .notEmpty()
        .custom(expressNodeValidation.ValidateNodeById(NodeType))
        .custom(validationRestClient), validationResponseMiddleware, async (request, response) => {
        try {
            const nodeRestClient = request.body.restClient;
            const resourceInfoList = await nodeRestClient.filestore.getFileResourcesInfo(...buildRestApiFilterFromNodeRequest(request));
            response.send(transformResourceInfoToResponseWithPurposeField(resourceInfoList)); // njsscan-ignore: express_xss
        }
        catch (error) {
            if (error instanceof core.ErrorWithCode) {
                response
                    .status(core.HttpResponseCodes.FORBIDDEN)
                    .send(errorMessageUtilities.getErrorMessage(error).statusMessage);
                return;
            }
            response
                .status(core.HttpResponseCodes.SERVER_ERROR)
                .send(errorMessageUtilities.getErrorMessageFromCode("ERESTENDPOINTFAILED").statusMessage);
            RED.log.error(error);
        }
    });
}

module.exports = ConfigConnectServer;
