const express = require('express');
const striptags = require('striptags');
const MarkdownIt = require('markdown-it');
const Prism = require('prismjs');
const stripBom = require('strip-bom');
require('prismjs/components/prism-javascript');
const md = new MarkdownIt({
  highlight (str, lang) {
    let hl;

    try {
      hl = Prism.highlight(str, Prism.languages[lang]);
    } catch (error) {
      hl = md.utils.escapeHtml(str);
    }

    return `<pre class="language-${lang}"><code class="language-${lang}">${hl}</code></pre>`;
  }
});

const {context} = require('../../../core');
const {services, utils, middleware, constant} = context;
const code = constant.statusCode;

const router = express.Router();

const doAsync = utils.wrapper.doAsync;

router.route('/')
  .post(
    middleware.auth_api.accessToken,
    middleware.auth_api.checkRole,
    doAsync(post)
  )
  .get(doAsync(list));

module.exports = router;

async function post(req, res) {
  const example = stripBom(req.body.content_md);
  req.body.content_html = md.render(example);
  req.body.content_text = striptags(req.body.content_html);
  req.body.user_id = req.user.id;
  await services.blogs.create(req.body);
  res.status(code.NO_CONTENT).send();
}

async function list(req, res) {
  const result = await services.blogs.findAll();
  res.status(code.OK).json(result);
}