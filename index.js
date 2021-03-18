const { Context } = require('probot');
const template = require('./template');

const attachTo = {

  /**
   * Update issue body
   * @param {Context} context 
   * @param {string} content 
   * @returns 
   */
  issue: (context, content) => {
    const { issue, pull_request: pr } = context.payload
    const body = (issue || pr).body + '\n\n' + content.join('\n')
    const params = context.issue({body})
    return context.octokit.issues.update(params)
  },

  /**
   * Update issue comment
   * @param {Context} context 
   * @param {string} content 
   * @returns 
   */
  comment: (context, content) => {
    const body = context.payload.comment.body + '\n\n' + content.join('\n')
    const comment_id = context.payload.comment.id
    const params = context.repo({comment_id, body})
    return context.octokit.issues.updateComment(params)
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
