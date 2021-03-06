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
            fields {
              slug
            }
          }
        }
      }
    }
            `
        ).then(result => {
            result.data.allMarkdownRemark.edges.forEach(({node}) => {
                console.log(node)
                console.log(createPage({
                    path: `/bolg-posts${node.fields.slug}`,
                    component: path.resolve('./src/components/templatesMD/BlogPost.js'),
                    context: {
                        id: node.id,
                    },
                }))
            })
            resolve()
        })
    })
}

/*
* chce stworzyć komponent zawierający typy zapytań (planety gatunki etc)
* clyli wylistować  nody
* node rozwija sie do listy itemów
* po kliknienciu w item przecodzę do strony itemu
* */
