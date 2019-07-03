# labofolio

## tree & architecture

- index.js
- shared
    - config
        - local
        - prd
    - constant
    - environment
    - locale
        - ko
        - en
        - ja
        - etc
    - services
- core
    - middleware
    - context
    - application [parent]
- mode [child]
    - chat-api
        - routes
    - app-api
        - routes
    - web-api
        - routes
    - web
        - routes
- tools
    - test
    - mysql [sequelize base]
        - models
    - init_models
    - init_data
- utils
    - error handler
    - parser

## TODO

- [x] async init function ?
- [x] sample ddl
- [x] oas3
- [x] init data
- [ ] mocha
- [x] i18next
- [ ] log
- [ ] http header
- [ ] monitoring