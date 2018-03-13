const attachments = require('..')
const Context = require('probot/lib/context')

describe('attachment', () => {
  let context, event, github

  beforeEach(() => {
    github = {
      issues: {
        editComment: jest.fn()
      }
    }

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

  describe('on a comment without attachments', () => {
    beforeEach(() => {
      // github.issues.get.andReturn(Promise.resolve({
      //   data: {body: 'original post'}
      // }))
    })

    describe('add', () => {
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

    // describe('get', () => {
    //   it('returns null', async () => {
    //     expect(await attachments(context).get('key')).toEqual(null)
    //   })
    //
    //   it('returns null without key', async () => {
    //     expect(await attachments(context).get()).toEqual(null)
    //   })
    // })
  })

  // describe('on issue with existing attachments', () => {
  //   beforeEach(() => {
  //     // github.issues.get.andReturn(Promise.resolve({
  //     //   data: {body: 'original post\n\n<!-- probot = {"1":{"key":"value"}} -->'}
  //     // }))
  //   })
  //
  //   describe('set', () => {
  //     it('sets new attachments', async () => {
  //       await attachments(context).set('hello', 'world')
  //
  //       expect(github.issues.edit).toHaveBeenCalledWith({
  //         owner: 'foo',
  //         repo: 'bar',
  //         number: 42,
  //         body: 'original post\n\n<!-- probot = {"1":{"key":"value","hello":"world"}} -->'
  //       })
  //     })
  //
  //     it('overwrites exiting attachments', async () => {
  //       await attachments(context).set('key', 'new value')
  //
  //       expect(github.issues.edit).toHaveBeenCalledWith({
  //         owner: 'foo',
  //         repo: 'bar',
  //         number: 42,
  //         body: 'original post\n\n<!-- probot = {"1":{"key":"new value"}} -->'
  //       })
  //     })
  //
  //     it('merges object with existing attachments', async () => {
  //       await attachments(context).set({hello: 'world'})
  //
  //       expect(github.issues.edit).toHaveBeenCalledWith({
  //         owner: 'foo',
  //         repo: 'bar',
  //         number: 42,
  //         body: 'original post\n\n<!-- probot = {"1":{"key":"value","hello":"world"}} -->'
  //       })
  //     })
  //   })
  //
  //   describe('get', () => {
  //     it('returns value', async () => {
  //       expect(await attachments(context).get('key')).toEqual('value')
  //     })
  //
  //     it('returns null for unknown key', async () => {
  //       expect(await attachments(context).get('unknown')).toEqual(null)
  //     })
  //   })
  // })
  //
  // describe('on issue with attachments for a different installation', () => {
  //   beforeEach(() => {
  //     // github.issues.get.andReturn(Promise.resolve({
  //     //   data: {body: 'original post\n\n<!-- probot = {"2":{"key":"value"}} -->'}
  //     // }))
  //   })
  //
  //   describe('set', () => {
  //     it('sets new attachments', async () => {
  //       await attachments(context).set('hello', 'world')
  //
  //       expect(github.issues.edit).toHaveBeenCalledWith({
  //         owner: 'foo',
  //         repo: 'bar',
  //         number: 42,
  //         body: 'original post\n\n<!-- probot = {"1":{"hello":"world"},"2":{"key":"value"}} -->'
  //       })
  //     })
  //
  //     it('sets an object', async () => {
  //       await attachments(context).set({hello: 'world'})
  //
  //       expect(github.issues.edit).toHaveBeenCalledWith({
  //         owner: 'foo',
  //         repo: 'bar',
  //         number: 42,
  //         body: 'original post\n\n<!-- probot = {"1":{"hello":"world"},"2":{"key":"value"}} -->'
  //       })
  //     })
  //   })
  //
  //   describe('get', () => {
  //     it('returns null for unknown key', async () => {
  //       expect(await attachments(context).get('unknown')).toEqual(null)
  //     })
  //
  //     it('returns null without a key', async() => {
  //       expect(await attachments(context).get()).toEqual(null)
  //     })
  //   })
  // })
  //
  // describe('when given body in issue params', () => {
  //   const issue = {
  //     owner: 'foo',
  //     repo: 'bar',
  //     number: 42,
  //     body: 'hello world\n\n<!-- probot = {"1":{"hello":"world"}} -->'
  //   }
  //
  //   describe('get', () => {
  //     it('returns the value without an API call', async () => {
  //       expect(await attachments(context, issue).get('hello')).toEqual('world')
  //       expect(github.issues.get).toNotHaveBeenCalled()
  //     })
  //   })
  //
  //   describe('set', () => {
  //     it('updates the value without an API call', async () => {
  //       await attachments(context, issue).set('foo', 'bar')
  //
  //       expect(github.issues.get).toNotHaveBeenCalled()
  //
  //       expect(github.issues.edit).toHaveBeenCalledWith({
  //         owner: 'foo',
  //         repo: 'bar',
  //         number: 42,
  //         body: 'hello world\n\n<!-- probot = {"1":{"hello":"world","foo":"bar"}} -->'
  //       })
  //     })
  //   })
  // })
})
