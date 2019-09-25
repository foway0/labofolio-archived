const {context} = require('../core');
const blogs = context.getStoresServices().blogs;
const users = context.getStoresServices().users;

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
  findAll: (query = {}) => {
    blogs.belongsTo(users, {foreignKey: 'user_id'});
    const options = {
      where: {
        status: blogs.getStatus().valid,
      },
      include: [{
        model: users,
        attributes: ['nickname', 'profile_url']
      }]
    };
    if(query) {
      options.limit = query.limit;
      options.offset = query.offset;
    }
    return blogs.findAndCountAll(options);
  }
};