import {baseURL, isDebug} from "../config"

export function getRouterUrl(key, prefix="/", param={}) {
    let routers = {
        "404": prefix + "error-404",
        "home": prefix + "/",
        "main-dashboard": prefix + "main-dashboard",
        "dummy-task-list": prefix + "dummy/task-list",
        "ccdp-dashboard": prefix + "ccdp/dashboard",
        "ccdp-project-create": prefix + "ccdp/project-create",
        "ccdp-project-open": prefix + "ccdp/project-open/" + (("id" in param) ? `/${param["id"]}` : "/:id"),

        "ccdp-v1-dashboard": prefix + "ccdp-v1/dashboard",
        "ccdp-v1-project-edit": prefix + "ccdp-v1/project-edit",
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