# Probot: attachments

A [Probot](https://github.com/probot/probot) extension to add message attachments to comments on GitHub.

## Usage

```js
const attachments = require('probot-attachments')

module.exports = robot => {
  const events = ['issues.opened', 'pull_request.opened', 'issue_comment.created']
  robot.on(events, context => {
    return attachments(context).add({
      'title': 'Hello World',
      'title_link': 'https://example.com/hello'
    })
  })
}
```

## Example

Here is a probot app that listens for a comment that matches `bobby tables` and adds an attachment to the comment.

```js
const attachments = require('probot-attachments');

module.exports = robot => {
  robot.on('issue_comment.created', context => {
    if(context.payload.comment.body.match(/bobby tables/i)) {
      return attachments(context).add({
        'pretext': 'Let us all heed the lessons of little bobby tables:',
        'author_name': 'Bobby Tables',
        'author_link': 'https://xkcd.com/',
        'author_icon': 'http://www.codetinkerer.com/assets/little-bobby-tables.png',
        'title': 'Exploits of a Mom',
        'title_link': 'https://xkcd.com/327/',
        'text': 'Her daughter is named Help I\'m trapped in a driver\'s license factory.',
        'image_url': 'https://imgs.xkcd.com/comics/exploits_of_a_mom.png',
        'thumb_url': 'https://www.cmswire.com/~/media/59086df972604f35b46d0764cd0f1351.jpg',
        'footer': 'Probot the Trollbot',
        'footer_icon': 'https://static.comicvine.com/uploads/square_medium/8/84072/1561135-trollface.jpg',
      })
    }
  })
}
```

![](https://user-images.githubusercontent.com/173/32035934-25855d5e-b9e2-11e7-8294-58412fee915a.png)

## How it works

This extension is what you might call "a hack". GitHub doesn't have an API for adding attachments on comments, but it does have rather large comment fields that support some HTML. This extension renders the attachment as a `blockquote` and appends it to the original comment body.

This extension is inspired by [Slack's message attachments](https://api.slack.com/docs/message-attachments).
