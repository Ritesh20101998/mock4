Food_delivery 

Api Documentation :

User router : 
    Register User :
        Request : "POST"
        endpoint : "/user/api/register"

    login User : 
        Request : "POST"
        endpoint : "/user/api/login"

    reset password : 
        Request : "PUT"
        endpoint : "/user/api/user/:id/reset"

Restaurant Routes : 
    create Restaurant :
        Request : "POST"
        endpoint : "/restaurant/restaurants"

    get all restaurant : 
        Request : "POST"
        endpoint : "/restaurant/api/restaurants"

    get a specific restaurant :
        Request : "POST"
        endpoint : "/restaurant/api/restaurants/:id"

    get menu of a specific restaurant :
        Request : "POST"
        endpoint : "/restaurant/api/restaurants/:id/menu"

    add dish to menu to a specific restaurant : 
        Request : "POST"
        endpoint : "/restaurant/api/restaurants/:id/menu"

    delete a menu dish from a specific restaurant :
        Request : "DELETE"
        endpoint : "/restaurant/api/restaurants/:restaurantId/menu/:itemId"

Order Routes : 
    place an order:
        Request : "POST"
        endpoint : "order/api/orders"

    get a specific order by id
        Request : "GET"
        endpoint : "order/api/orders/:id

    update status of a specific order
        Request : "PUT"
        endpoint : "order/api/orders/:id