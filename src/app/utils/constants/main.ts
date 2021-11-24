export const MAIN = {
  APP: {
    URLS: {
      USERS: '/users/login/',
      REGISTRATION: '/users/registration/',
      BLOG_ADD: '/blogs/addblog/',
      BLOGS: '/blogs/',
      BLOGS_DELETE: '/blogs/delete/',
      PUT_BLOG: '/blogs/putBlogdata/',
      GET_COMMENTS: '/comments/',
      POST_COMMENTS: '/comments/addcomment/',
      PUT_COMMENTS: '/comments/putCommentData/',
      COMMENTS_DELETE: '/comments/delete/',
      
    },
    MESSAGES: {
      UNAUTH_ERR: 'Unauthorized access.',
      SERVICE_ERR: 'Unable to connect to the application server. Please check your internet connection and try again.',
      API_ERR_MSG: 'Something went wrong. Please try again.',
      NOT_FOUND_ERR: 'Resource not found',
      ERR_CODE_500: 'Server not wroking fine.'
    },
    VALIDATION_MSGS: {
    },
    CONSTANTS: {
      MSG_TYPE_INF: 'info',
      MSG_TYPE_ERR: 'error',
      MSG_TYPE_SUCCESS: 'success',
      MSG_TYPE_WARN: 'warning',
    },
  },
};

