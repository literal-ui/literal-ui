const fm = require('gray-matter')

module.exports = async function (src) {
  const callback = this.async()
  const { content, data } = fm(src)

  const code =
    `import {withLayout} from '../../components/MDX';

export default withLayout(${JSON.stringify(data)})

` + content

  return callback(null, code)
}
