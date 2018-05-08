import React from 'react'

const BlogPost = (data) => {
    const { markdownRemark } = data
    const {frontmatter, html} = markdownRemark
    return(
        <div>
            <div>
                <h1> {frontmatter.title}</h1>
                <h2>{frontmatter.date}</h2>
            </div>
            <div>
                <h3>some content</h3>
            </div>
        </div>
    )
}

export const pageQuery = graphql`
    query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`