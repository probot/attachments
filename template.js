module.exports = function (attachment) {
  let str = ''

  if (attachment.pretext) str += `${attachment.pretext}\n`

  str += '<blockquote>'

  // "thumb_url": "http://example.com/path/to/thumb.png",
  if (attachment.thumb_url) { str += `<img src="${attachment.thumb_url}" width="48" align="right">` }

  if (attachment.author_name) {
    str += '<div>'

    if (attachment.author_icon) { str += `<img src="${attachment.author_icon}" height="14"> ` }

    if (attachment.author_link) { str += `<a href="${attachment.author_link}">${attachment.author_name}</a>` } else { str += attachment.author_name }

    str += '</div>'
  }

  if (attachment.title) {
    str += `<div><strong>`

    if (attachment.title_link) { str += `<a href="${attachment.title_link}">${attachment.title}</a>` } else { str += attachment.title }

    str += `</strong></div>`
  }

  if (attachment.text) str += `<div>${attachment.text}</div>`

  // TODO: fields

  if (attachment.image_url) str += `<br><img src="${attachment.image_url}">`

  if (attachment.footer) {
    str += '<h6>'

    if (attachment.footer_icon) {
      str += `<img src="${attachment.footer_icon}" height="14"> `
    }

    str += attachment.footer

    str += '</h6>'

    // TODO: ts?
  }

  str += '</blockquote>'

  return str
}
