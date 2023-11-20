# movement-group-task

``
npm i && npm run dev
``

### Routes

```
http://localhost:3000/auth/signup
http://localhost:3000/auth/signin
{
    "email": "demo@gmail.com",
    "password": "123456"
}

http://localhost:3000/getUsers/{page}
http://localhost:3000/getUser/{id}
http://localhost:3000/createUser
http://localhost:3000/updateUser/{id}
http://localhost:3000/deleteUser/{id}
```

### Payload

Bearer Token required
```
createUser, updateUser
{
    "email": "test@gmail.com",
    "first_name": "test",
    "last_name": "test",
    "avatar": "link"
}
```
