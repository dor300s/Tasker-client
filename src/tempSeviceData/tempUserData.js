let users = `[
    {
        "_id": "5ec50bad6e35a0ea42297a13",
        "cratedAt": 1589962368888,
        "isActive": true,
        "isLogIn": false,
        "picture": "https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png",
        "age": 38,
        "userType": "user",
        "userName": "Moody",
        "password": 123,
        "notifications": [
            {
                "_id": "5ec50bad023fc1df03202478",
                "isRead": false,
                "content": "eiusmod fugiat aliqua qui ut nostrud adipisicing cillum nulla veniam",
                "createdAt": 1589970647779,
                "url": "/board/card/:id"
            },
            {
                "_id": "5ec50badd6ce7ef3ca6b8c0e",
                "isRead": false,
                "content": "occaecat nulla sunt minim Lorem fugiat aliqua laborum pariatur pariatur",
                "createdAt": 1589965927933,
                "url": "/board/card/:id"
            }
        ],
        "fullName": "Lindsey Dennis",
        "lastSign": 1589971885781,
        "gender": "male",
        "company": "NEOCENT",
        "email": "lindseydennis@neocent.com",
        "phone": "0 (802) 460-3876",
        "address": "595 Beaver Street, Idledale, Illinois, 3536",
        "about": "anim anim pariatur pariatur aliqua voluptate aliqua sit do magna"
    },
    {
        "_id": "5ec50bad936cde5bd7602141",
        "cratedAt": 1589968235437,
        "isActive": true,
        "isLogIn": false,
        "picture": "https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png",
        "age": 34,
        "userType": "admin",
        "userName": "Arlene",
        "password": 123,
        "notifications": [
            {
                "_id": "5ec50bad41fc959bb112024c",
                "isRead": false,
                "content": "quis occaecat sunt ipsum ullamco cupidatat dolor minim ad exercitation",
                "createdAt": 1589968171315,
                "url": "/board/card/:id"
            },
            {
                "_id": "5ec50bad6eab42ab65a25914",
                "isRead": false,
                "content": "ut nostrud proident culpa fugiat reprehenderit exercitation in cupidatat qui",
                "createdAt": 1589966909445,
                "url": "/board/card/:id"
            }
        ],
        "fullName": "Forbes Harrington",
        "lastSign": 1589971885810,
        "gender": "male",
        "company": "FLEETMIX",
        "email": "forbesharrington@fleetmix.com",
        "phone": "0 (944) 572-3967",
        "address": "857 Bond Street, Lupton, North Dakota, 5560",
        "about": "qui aliquip fugiat consequat voluptate proident nulla amet sunt aliqua"
    },
    {
        "_id": "5ec50badd678cf9c228d9531",
        "cratedAt": 1589966751307,
        "isActive": true,
        "isLogIn": false,
        "picture": "https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png",
        "age": 34,
        "userName": "Selena",
        "password": 123,
        "notifications": [
            {
                "_id": "5ec50bad2063b4b946a5b91a",
                "isRead": false,
                "content": "consequat adipisicing magna enim ullamco deserunt nisi nisi exercitation nisi",
                "createdAt": 1589964884270,
                "url": "/board/card/:id"
            },
            {
                "_id": "5ec50badbc3fe762e21bc7b4",
                "isRead": false,
                "content": "fugiat ullamco Lorem exercitation sunt Lorem aliqua do magna ipsum",
                "createdAt": 1589963011640,
                "url": "/board/card/:id"
            }
        ],
        "fullName": "Randi Riley",
        "lastSign": 1589971885775,
        "gender": "female",
        "company": "HOMETOWN",
        "email": "randiriley@hometown.com",
        "phone": "0 (961) 467-2899",
        "address": "512 Polhemus Place, Macdona, Connecticut, 8203",
        "about": "elit sint cillum nisi amet est quis reprehenderit ipsum excepteur"
    },
    {
        "_id": "5ec50bada1c0c2d637e6adff",
        "cratedAt": 1589963058979,
        "isActive": true,
        "isLogIn": false,
        "picture": "https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png",
        "age": 36,
        "userName": "Melissa",
        "password": 123,
        "notifications": [
            {
                "_id": "5ec50badf27c8687b8ec27c7",
                "isRead": false,
                "content": "dolore eu ullamco pariatur laboris esse nisi id dolore magna",
                "createdAt": 1589967753297,
                "url": "/board/card/:id"
            },
            {
                "_id": "5ec50bad242e56025e3d247d",
                "isRead": false,
                "content": "non do irure cupidatat esse commodo fugiat in tempor mollit",
                "createdAt": 1589969624851,
                "url": "/board/card/:id"
            }
        ],
        "fullName": "Sargent Peck",
        "lastSign": 1589971885797,
        "gender": "male",
        "company": "SLOGANAUT",
        "email": "sargentpeck@sloganaut.com",
        "phone": "0 (825) 423-3170",
        "address": "931 Wilson Avenue, Cornfields, Massachusetts, 1494",
        "about": "adipisicing incididunt ullamco eu culpa labore duis ipsum est magna"
    }
]`


export function getUsers() {
    let userToReturn = JSON.parse(users)
    return userToReturn;
}

