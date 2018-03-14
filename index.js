const template = require('./template')

const attachTo = {
  issue: (context, content) => {
    const { issue, pull_request: pr } = context.payload
    const body = (issue || pr).body + '\n\n' + content.join('\n')
    const params = context.issue({body})
    return context.github.issues.edit(params)
  },

  comment: (context, content) => {
    const body = context.payload.comment.body + '\n\n' + content.join('\n')
    const id = context.payload.comment.id
    const params = context.repo({id, body})
    return context.github.issues.editComment(params)
  }
}

module.exports = function attachments (context) {
  const attach = context.payload.comment ? attachTo.comment : attachTo.issue

  return {
    async add (attachments) {
      const content = [].concat(attachments).map(attachment => template(attachment))
      return attach(context, content)
    }
  }
}
