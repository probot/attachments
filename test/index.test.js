const attachments = require('..')
const Context = require('probot/lib/context')

describe('attachment', () => {
  let context, event, github

  beforeEach(() => {
    github = {
      issues: {
        edit: jest.fn(),
        editComment: jest.fn()
      }
    }
  })

  describe('on a comment', () => {
    beforeEach(() => {
      event = {
        payload: {
          comment: {
            id: 42,
            body: 'original post'
          },
          repository: {
            owner: {login: 'foo'},
            name: 'bar'
          },
          installation: {id: 1}
        }
      }

      context = new Context(event, github)
    })

    test('adds a single attachment', async () => {
      await attachments(context).add({
        title: 'Hello World',
        title_link: 'https://example.com'
      })

      expect(github.issues.editComment).toHaveBeenCalledWith({
        owner: 'foo',
        repo: 'bar',
        id: 42,
        body: 'original post\n\n<blockquote><div><strong><a href="https://example.com">Hello World</a></strong></div></blockquote>'
      })
    })

    test('adds multiple attachments', async () => {
      await attachments(context).add([
        {title: 'Hello World', title_link: 'https://example.com/hello'},
        {title: 'Goodbye World', title_link: 'https://example.com/goodbye'}
      ])

      expect(github.issues.editComment).toHaveBeenCalledWith({
        owner: 'foo',
        repo: 'bar',
        id: 42,
        body: 'original post\n\n' +
          '<blockquote><div><strong><a href="https://example.com/hello">Hello World</a></strong></div></blockquote>\n' +
          '<blockquote><div><strong><a href="https://example.com/goodbye">Goodbye World</a></strong></div></blockquote>'
      })
    })
  })

  describe('on an issue', () => {
    beforeEach(() => {
      event = {
        payload: {
          issue: {
            number: 43,
            body: 'original post'
          },
          repository: {
            owner: {login: 'foo'},
            name: 'bar'
          },
          installation: {id: 1}
        }
      }

      context = new Context(event, github)
    })

    test('adds a single attachment', async () => {
      await attachments(context).add({
        title: 'Hello World',
        title_link: 'https://example.com'
      })

      expect(github.issues.edit).toHaveBeenCalledWith({
        owner: 'foo',
        repo: 'bar',
        number: 43,
        body: 'original post\n\n<blockquote><div><strong><a href="https://example.com">Hello World</a></strong></div></blockquote>'
      })
    })

    test('adds multiple attachments', async () => {
      await attachments(context).add([
        {title: 'Hello World', title_link: 'https://example.com/hello'},
        {title: 'Goodbye World', title_link: 'https://example.com/goodbye'}
      ])

      expect(github.issues.edit).toHaveBeenCalledWith({
        owner: 'foo',
        repo: 'bar',
        number: 43,
        body: 'original post\n\n' +
          '<blockquote><div><strong><a href="https://example.com/hello">Hello World</a></strong></div></blockquote>\n' +
          '<blockquote><div><strong><a href="https://example.com/goodbye">Goodbye World</a></strong></div></blockquote>'
      })
    })
  })

  describe('on a pull request', () => {
    beforeEach(() => {
      event = {
        payload: {
          pull_request: {
            number: 44,
            body: 'original post'
          },
          repository: {
            owner: {login: 'foo'},
            name: 'bar'
          },
          installation: {id: 1}
        }
      }

      context = new Context(event, github)
    })

    test('adds a single attachment', async () => {
      await attachments(context).add({
        title: 'Hello World',
        title_link: 'https://example.com'
      })

      expect(github.issues.edit).toHaveBeenCalledWith({
        owner: 'foo',
        repo: 'bar',
        number: 44,
        body: 'original post\n\n<blockquote><div><strong><a href="https://example.com">Hello World</a></strong></div></blockquote>'
      })
    })

    test('adds multiple attachments', async () => {
      await attachments(context).add([
        {title: 'Hello World', title_link: 'https://example.com/hello'},
        {title: 'Goodbye World', title_link: 'https://example.com/goodbye'}
      ])

      expect(github.issues.edit).toHaveBeenCalledWith({
        owner: 'foo',
        repo: 'bar',
        number: 44,
        body: 'original post\n\n' +
          '<blockquote><div><strong><a href="https://example.com/hello">Hello World</a></strong></div></blockquote>\n' +
          '<blockquote><div><strong><a href="https://example.com/goodbye">Goodbye World</a></strong></div></blockquote>'
      })
    })
  })
})
