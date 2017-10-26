const template = require('../template')

describe('template', () => {
  test('full example', () => {
    const attachment = {
      'pretext': 'Optional text that appears above the attachment block',
      'author_name': 'Bobby Tables',
      'author_link': 'https://xkcd.com/327/',
      'author_icon': 'http://www.codetinkerer.com/assets/little-bobby-tables.png',
      'title': 'Slack API Documentation',
      'title_link': 'https://api.slack.com/',
      'text': 'Optional text that appears within the attachment',
      'image_url': 'https://imgs.xkcd.com/comics/exploits_of_a_mom.png',
      'thumb_url': 'https://www.cmswire.com/~/media/59086df972604f35b46d0764cd0f1351.jpg',
      'footer': 'Slack API',
      'footer_icon': 'https://platform.slack-edge.com/img/default_application_icon.png',
      'ts': 123456789
    }

    const expected =
      'Optional text that appears above the attachment block\n' +
      '<blockquote>' +
      '<img src="https://www.cmswire.com/~/media/59086df972604f35b46d0764cd0f1351.jpg" width="48" align="right">' +
      '<div><img src="http://www.codetinkerer.com/assets/little-bobby-tables.png" height="14"> <a href="https://xkcd.com/327/">Bobby Tables</a></div>' +
      '<div><strong><a href="https://api.slack.com/">Slack API Documentation</a></strong></div>' +
      '<div>Optional text that appears within the attachment</div>' +
      '<br><img src="https://imgs.xkcd.com/comics/exploits_of_a_mom.png">' +
      '<h6><img src="https://platform.slack-edge.com/img/default_application_icon.png" height="14"> Slack API</h6>' +
      '</blockquote>'

    expect(template(attachment)).toEqual(expected)
  })

  describe('author', () => {
    test('author_name alone', () => {
      const attachment = {
        'author_name': 'Bobby Tables',
        'title': 'Slack API Documentation'
      }

      const expected = '<blockquote>' +
        '<div>Bobby Tables</div>' +
        '<div><strong>Slack API Documentation</strong></div>' +
        '</blockquote>'

      expect(template(attachment)).toEqual(expected)
    })
  })
})
