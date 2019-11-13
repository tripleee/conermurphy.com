import React from "react"
import Layout from "../components/layout"
import InstaFeed from "../components/instaFeed.js"
import {Link, useStaticQuery, graphql} from 'gatsby'
import pageStyles from '../styles/pageStyles.module.css'
import { FaBookmark} from "react-icons/fa"
import ContactLinks from "../components/contactLinks"
import styled from 'styled-components'

const SectionContainer = styled.section`
    margin-top: 3rem;
`

const Index = () => {
  const data = useStaticQuery(
    graphql`
    query {
      writing: allMarkdownRemark(limit: 2, sort: {order: DESC, fields: frontmatter___date}, filter: {fileAbsolutePath: {regex: "/(posts)/.*\\\\.md$/"}}) {
        edges {
          node {
            id
            frontmatter {
              date(formatString: "DDMMYYYY")
              title
              description
              id
              category
              tags
              languages
            }
            fields {
              slug
            }
            excerpt
            timeToRead
          }
        }
      }
      site {
        siteMetadata {
          title
        }
      }
      allFile(filter: {extension: {regex: "/(jpg)/"}}) {
        edges {
          node {
            name
            relativeDirectory
            id
          }
        }
      }
    }        
    `
  )

  return (
    <div className={pageStyles.pageContainer}>
      <Layout>
        <SectionContainer id="home">
          <h1>CONER MURPHY</h1>
          <p>Some amazing text that is all about me, what I aim to do and how this website will change the world</p>
        </SectionContainer>

        <SectionContainer id="blog">
          <h2>BLOG</h2>
          <p>Everything Web Related and a bit more...</p>
          <div className={pageStyles.blogContainerOuter}>

            {data.writing.edges.map(({ node }) => (
              <Link to={node.fields.slug} style={{textDecoration:`none`}} key={node.id}>
              <div className={pageStyles.blogPostContainer}>
                <div className={pageStyles.blogPostLeftContainer}>
                  <div className={pageStyles.blogPostIDCategoryContainer}>
                    <h4 className={pageStyles.blogPostID}>#{node.frontmatter.id}</h4>
                    <h4 className={pageStyles.blogPostCategory}>{node.frontmatter.category}</h4>

                      {node.frontmatter.languages.map( lan => 
                          <h4 className={pageStyles.blogPostLanguages} key={lan}>{lan}</h4>
                      )}
                      
                  </div>
                  <h3 className={pageStyles.blogPostTitle}>{node.frontmatter.title}</h3>
                  <p>{node.frontmatter.description}</p>  
                </div>
                <div className={pageStyles.blogPostRightContainer}>
                  <div className={pageStyles.blogPostDateContainer}>  
                    <h4 className={pageStyles.blogPostDate}>{node.frontmatter.date}</h4>
                  </div>
                </div>
              </div>
              </Link>
            ))}

            <Link to='/blog' style={{textDecoration:`none`}}>
              <div className={pageStyles.blogPostContainer} style={{marginBottom:`0`}}>
                <div className={pageStyles.blogPostLeftContainer}>
                  <div className={pageStyles.blogPostIDCategoryContainer}>
                    <h4 className={pageStyles.blogPostCategory}>View More</h4>
                  </div>
                  <h3 className={pageStyles.blogPostTitle}>View More Blog Posts...</h3>
                  <p>If you like some of the posts you've seen above, you can see all of the posts I've written by clicking here.</p>  
                </div>
                <div className={pageStyles.blogPostRightContainer}>
                  <div className={pageStyles.blogPostDateContainer}>  
                    <h4 className={pageStyles.blogPostDate}><FaBookmark/></h4>
                  </div>
                </div>
              </div>
              </Link>
          </div>
        </SectionContainer>

        <SectionContainer id="work">
          <h2>WORK</h2>
          <p>Some of the stuff I've been working on.</p>
          <InstaFeed/>
        </SectionContainer>

        <SectionContainer id="contact"> 
          <h2>CONTACT</h2>
          <p>This is a mock description which needs to be filled by an actual description at some point.</p>
          <ContactLinks/>
        </SectionContainer>

      </Layout>
    </div>
    
  )
}

export default Index