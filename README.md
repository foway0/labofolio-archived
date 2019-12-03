# labofolio

## TODO
- [x] type script
- [x] eslint
- [x] express
- [ ] oas3
- [ ] unit test
- [ ] simple example

## file tree

- test
- tools
  - mysql(master data migration)
    - init_data
      - fixtures
        - blogs
        - users
        - categories
  - redis
  - mongoose
- src/
  - api_specs
    - api.yml
    - common
      - schemas
      - parameters
  - app(server extends application)
    - api
      - routes(controller)
        - blogs
          - get
            ```
              helper.mysql.findById(1);

              for( ; ; ) {
                return data;
              }
            ```
        - users
        - categories
      - app.js { loadOas3 { apiSpec: '../docs/api.yml'} }
  - middleware
    - auth_api
    - error_handler
    - ...
  - helper
    - redis
    - mongoose
    - super mysql - findById
    - async wrapper
    - jwt
    - ...
  - shared
    - config
      - local
      - prd
      - common (Object assign)
    - environment
    - constant
    - locales
      - jp
      - ko
      - en
  - models(DDL mapping)
    - blogs
    - users
    - categories
  - application
  - context -> load shared & load models ...
  - index.js

## npm updates

```
npm install -g npm-check-updates
ncu -u
npm install

npm outdated
npm update <package-name> --save
```