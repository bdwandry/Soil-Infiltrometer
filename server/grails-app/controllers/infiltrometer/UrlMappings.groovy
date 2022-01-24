package infiltrometer

class UrlMappings {

    static mappings = {
        delete "/$controller/$id(.$format)?"(action:"delete")
        get "/$controller(.$format)?"(action:"index")
        get "/$controller/$id(.$format)?"(action:"show")
        post "/$controller(.$format)?"(action:"save")
        put "/$controller/$id(.$format)?"(action:"update")
        patch "/$controller/$id(.$format)?"(action:"patch")

//        "/"(controller: 'application', action:'index')
        "/"(uri: "/index.html")
        "/data-gathering-baer"(uri: "/index.html")
        "/data-complete-baer"(uri: "/index.html")
        "/review-data-baer"(uri: "/index.html")
        "/edit-data-baer"(uri: "/index.html")
        "/learn"(uri: "/index.html")
        "/data-gathering"(uri: "/index.html")
        "/data-complete"(uri: "/index.html")
        "/learn-infiltrometer"(uri: "/index.html")
        "/review-data"(uri: "/index.html")
        "/previous-data"(uri: "/index.html")
        "/edit-data"(uri: "/index.html")
        "/about"(uri: "/index.html")
        "/download"(uri: "/index.html")
        "/learn-baer"(uri: "/index.html")
        "/data-gathering-experimental"(uri: "/index.html")
        "/project-structure"(uri: "/index.html")
        "/import-export-indexdb-data"(uri: "/index.html")
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
