const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
exports.onCreateNode = ({node, getNode, boundActionCreators}) => {
    const { createNodeField } = boundActionCreators
    if(node.internal.type === 'MarkdownRemark') {
        const fileNode = getNode(node.parent)
        const slug = createFilePath({node, getNode, basePath: 'pages'})
        createNodeField({
            node,
            name: 'slug',
            value: slug,
        })
    }
}

exports.createPages = ({graphql, boundActionCreators}) => {
    const { createPage } = boundActionCreators
    return new Promise((resolve, reject) => {
        graphql(
            `    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            id
            frontmatter {
              date
              path
              title
            }
          }
        }
      }
    }
            `
        ).then(result => {
            result.data.allMarkdownRemark.edges.forEach(({node}) => {
                createPage({
                    path: node.fields.slug,
                    component: path.resolve('./src/templatesMD/BlogPost.js'),
                    context: {
                        //data passed to context is available in page queries as GraphQl variables
                        slug: node.fields.slug,
                    },
                })
            })
            resolve()
        })
    })
}
