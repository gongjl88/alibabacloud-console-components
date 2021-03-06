/* eslint-disable global-require, @typescript-eslint/no-var-requires */

const fs = require('fs')
const grayMatter = require(`gray-matter`)

module.exports = themeOptions => {
  const {
    fileSystemCrawlers,
    remarkPlugins = [],
    linkInstructions = [],
  } = themeOptions

  const fsPlugins = (() => {
    if (!fileSystemCrawlers) return []
    if (!Array.isArray(fileSystemCrawlers))
      throw new Error(
        `themeOptions.fileSystemCrawlers should be array or undefined`
      )
    return fileSystemCrawlers.map(
      ({ rootDir, ignore = [], name = 'default-file-system-crawler-name' }) => {
        if (!Array.isArray(ignore))
          throw new Error(
            `themeOptions.fileSystemCrawlers[].ignore should be array`
          )
        if (!rootDir)
          throw new Error(
            `themeOptions.fileSystemCrawlers[].rootDir should be set`
          )
        return {
          resolve: 'gatsby-source-filesystem',
          options: {
            name,
            path: rootDir,
            ignore: [
              '**/.*',
              '**/node_modules/**',
              '**/*.!(md|mdx|png|jpg|jpeg|svg)',
              ...ignore,
            ],
          },
        }
      }
    )
  })()

  return {
    plugins: [
      {
        resolve: 'gatsby-plugin-mdx',
        options: {
          extensions: ['.mdx', '.md'],
          remarkPlugins: [
            [
              require('@alicloud/console-components-lib-publisher/lib/buildtools/remarkPlugins/linkInstructions/remarkPlugin'),
              {
                instructions: [
                  require('./lib/buildtime/remarkPlugins/linkInstructions/importDemo'),
                  require('./lib/buildtime/remarkPlugins/linkInstructions/renderInterface'),
                  ...linkInstructions,
                ],
              },
            ],
            require('@alicloud/console-components-lib-publisher/lib/buildtools/remarkPlugins/addHeadings'),
            ...remarkPlugins,
          ],
          rehypePlugins: [require('rehype-slug')],
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 720,
                linkImagesToOriginal: false,
                showCaptions: ['title'],
              },
            },
            {
              resolve: 'gatsby-remark-copy-linked-files',
              options: {
                destinationDir: `copy-linked-files`,
              },
            },
          ],
          plugins: [
            // https://github.com/gatsbyjs/gatsby/issues/15486#issuecomment-537991531
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 980,
                linkImagesToOriginal: false,
                showCaptions: ['title'],
              },
            },
            'gatsby-plugin-catch-links',
          ],
          shouldBlockNodeFromTransformation: node => {
            if (
              node.internal.type === `File` &&
              (node.ext === '.md' || node.ext === '.mdx')
            ) {
              const { data } = grayMatter(
                fs.readFileSync(node.absolutePath, 'utf8')
              )
              if (!data.name || !data.zhName) {
                // 该md文件没有定义frontmatter.name或frontmatter.zhName，
                // 文档框架应该忽略它
                return true
              }
              // 目前我们只是通过grayMatter来解析yaml格式的frontmatter，
              // 有人可能喜欢使用`export const frontmatter = {name:'xxx'}`这种mdx export的方式。
              // 如果未来要支持这种方式，可以参考 https://github.com/gatsbyjs/gatsby/blob/43f29d94f639eb7f64cc4e175fd5f04aff1d47ca/packages/gatsby-plugin-mdx/utils/create-mdx-node.js#L16
              // 使用@mdx-js/mdx的sync方法来拿到mdx export的frontmatter
            }
            return false
          },
        },
      },
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
      ...fsPlugins,
      'gatsby-plugin-typescript',
      'gatsby-plugin-styled-components',
      'gatsby-plugin-less',
      'gatsby-plugin-react-helmet',
      {
        // 此插件用来避免在页面跳转的过程中um-mount和re-mount布局组件
        resolve: `gatsby-plugin-layout`,
        options: {
          component: require.resolve(`./src/runtime/SiteLayout/index.tsx`),
        },
      },
    ],
  }
}
