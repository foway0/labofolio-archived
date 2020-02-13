# labofolio

## QuickStart

- This project depends on [labofolio-env.](https://github.com/foway0/labofolio-env/blob/master/README.md)

## TODO
- [x] type script
- [x] eslint
- [x] express
- [x] oas3
- [x] unit test
- [ ] context
- [ ] helper
- [ ] labofolio-kit (Divide into small pieces)

## file tree

+ test
+ src/
  - api_specs
    - api.yml
    - common
      - schemas
      - parameters
  - app(extends application)
    - api
      - routes(controller)
      - app.js
  - middleware
    - auth_api
    - error_handler
  - helper
    - redis
    - mongoose
    - sequelize
    - async wrapper
    - jwt
  - shared
    - config
    - environment
    - constant
    - locales
  - models
    - mysql
    - mongo
  - application
  - context
  - index

## npm updates

```
npm install -g npm-check-updates
ncu -u
npm install

npm outdated
npm update <package-name> --save
```