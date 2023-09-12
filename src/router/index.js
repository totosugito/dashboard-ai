import {baseURL, isDebug} from "../config"

export function getRouterUrl(key, prefix="/", param={}) {
    let routers = {
        "404": prefix + "error-404",
        "home": prefix + "/",
        "main-dashboard": prefix + "main-dashboard",
        "dummy-dashboard": prefix + "dummy/dashboard",
        "dummy-project-create": prefix + "dummy/project-create",
        "dummy-project-open": prefix + "dummy/project-open/" + (("id" in param) ? `/${param["id"]}` : "/:id"),
        "dummy-task-list": prefix + "dummy/task-list",
        "ccdp-dashboard": prefix + "ccdp-dashboard",
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