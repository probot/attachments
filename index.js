const template = require('./template')

module.exports = function attachments (context) {
  const {owner, repo} = context.repo()
  const id = context.payload.comment.id
  const github = context.github
  let body = context.payload.comment.body

  return {
    async add (attachments) {
      const rendered = [].concat(attachments).map(attachment => template(attachment))
      body += '\n\n' + rendered.join('\n')
      return github.issues.editComment({owner, repo, id, body})
    }
  }
}
