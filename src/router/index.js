import {baseURL, isDebug} from "../config"

export function getRouterUrl(key, prefix="/", param={}) {
    let routers = {
        "404": prefix + "error-404",
        "home": prefix + "/",
        "main-dashboard": prefix + "main-dashboard",
        "dummy-task-list": prefix + "dummy/task-list",
        "ccdp-dashboard": prefix + "ccdp/dashboard",
        "ccdp-project-create": prefix + "ccdp/project-create",
        "ccdp-project-open": prefix + "ccdp/project-open/" + (("id" in param) ? `${param["id"]}` : ":id"),

        "ccdp-v1-dashboard": prefix + "ccdp-v1/dashboard",
        "ccdp-v1-project-edit": prefix + "ccdp-v1/project-edit",
        "ccdp-v1-project-list": prefix + "ccdp-v1/project-list",
        "ccdp-v1-project-open": prefix + "ccdp-v1/project-open/" + (("id" in param) ? `${param["id"]}` : ":id"),

        "ccdp-v1-model-edit": prefix + "ccdp-v1/model-edit",
        "ccdp-v1-model-list": prefix + "ccdp-v1/model-list",
        "ccdp-v1-model-open": prefix + "ccdp-v1/model-open/" + (("id" in param) ? `${param["id"]}` : ":id"),

        "ccdp-v1-job-create": prefix + "ccdp-v1/project-open/" + (("id" in param) ? `${param["id"]}` : ":id") + "/job-create",
        "ccdp-v1-job-open": prefix + "ccdp-v1/job-open/" + (("id" in param) ? `${param["id"]}` : ":id") + "/" + (("jobId" in param) ? `${param["jobId"]}` : ":jobId"),
    }
    return(routers[key])
}

export function getRouterApi(key, param={}) {
    let apis = {
        "dummy-job-predict": baseURL + "/api/ccdp/predict-json-list",
        "dummy-task-create": baseURL + "/api/dummy/start",
        "dummy-task-status": baseURL + `/api/dummy/status/${param['id']}` ,
    }
    let url = apis[key]
    if (isDebug)
        console.log(url)
    return(url)
}