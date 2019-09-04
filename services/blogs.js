const {context} = require('../core');
const blogs = context.getStoresServices().blogs;

module.exports = {
  create: body => {
    return blogs.create({
      user_id: body.user_id,
      status: body.status,
      blog_category_id: 1,
      subject: body.subject,
      content_md: body.content_md,
      content_html: body.content_html,
      content_text: body.content_text,
    });
  },
  findAll: () => {
    console.log(context.getStoresServices());
    const options = {
      where: {
        status: blogs.getStatus().valid,
      },
    };
    return blogs.findAll(options);
  }
};