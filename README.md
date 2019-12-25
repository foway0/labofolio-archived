# labofolio

## QuickStart

- This project depends on [labofolio-env.](https://github.com/foway0/labofolio-env/blob/master/README.md)

```
cp -ip .env.template .env
cd /path/labofolio-env
make dressup
```

## TODO
- [x] type script
- [x] eslint
- [x] express
- [x] oas3
- [ ] unit test
- [ ] simple example
- [ ] labofolio-kit

## file tree

+ test
+ src/
  - api_specs
    - api.yml
    - common
      - schemas
      - parameters
  - app(extends application)
     - routes(controller)
       - ping
       - users
         - get
           ```
           helper.mysql.findById(1);

           for( ; ; ) {
             return data;
           }
           ```
       - ...
     - app.js { loadOas3 { apiSpec: '../docs/api.yml'} }
  - middleware
    - auth_api
    - error_handler
    - ...
  - helper
    - redis
    - mongoose
    - sequelize - findById, etc...
    - async wrapper
    - jwt
    - ...
  - shared
    - config(Object freeze)
      - local
      - prd
      - common (Object assign)
    - environment(Object freeze)
    - constant
    - locales
  - models(DDL mapping)
    - mysql
    - mongo
  - application
  - context -> load shared & load models etc...
  - index

## npm updates

```
npm install -g npm-check-updates
ncu -u
npm install

npm outdated
npm update <package-name> --save
```