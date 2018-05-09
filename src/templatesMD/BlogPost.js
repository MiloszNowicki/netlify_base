import React from 'react'

const BlogPost = (post) => {
    console.log(post)
    const { markdownRemark } = post.data
    console.log(markdownRemark)
    const {frontmatter, html} = markdownRemark
    console.log(frontmatter)
    return(
        <div>
            <div>
                <h1> {frontmatter.title}</h1>
                <h2>{frontmatter.date}</h2>
            </div>
            <div>
                <h3>some content</h3>
            </div>
            netlify is lliek addon to git and jenkins
        </div>
    )
}

export const pageQuery = graphql`
    query BlogPost ($id: String!) {
  markdownRemark(id: { eq: $id })  {
    id
    frontmatter {
      title
      path
      date
    }
  }
}
`

export default BlogPost