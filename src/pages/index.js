import React, { useEffect } from 'react';
import { MdPersonPin, MdLocationOn, MdLanguage, MdContacts } from 'react-icons/md';
import { graphql, Link } from 'gatsby';
import { tsParticles } from 'tsparticles';
import { FaTwitter, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';
import { ContentSection, HeroBackground, InfoBlock, LandingSection, NotesContentSection } from '../styles/HomeStyles';
import particlesJson from '../assets/particles';
import EmailSignupForm from '../components/emailSignupForm';
import useNavTheme from '../utils/useNavTheme';
import BlogPostCard from '../components/BlogPostCard';
import NotePostCard from '../components/NotePostCard';
import SEO from '../components/SEO';
import LanguageIcons, { languageList } from '../templates/LanguageIcons';

export default function HomePage({ data, path }) {
  const { blog, notes } = data;

  // Setting the nav theme for this page
  useNavTheme('light');

  // Useeffect to load in the TSparticles background on load.
  useEffect(() => {
    tsParticles.load('particlesBackground', particlesJson);
  }, []);

  return (
    <>
      <SEO
        post={{
          slug: path,
          title: 'Home',
        }}
      />
      <HeroBackground id="particlesBackground" />
      <LandingSection>
        <div className="contactBlock">
          <h1>
            Hey, <span>I'm Coner.</span>
          </h1>
          <div>
            <p>
              I'm a Web Developer and on a journey to be the best developer I can and along the way I want to help others grow by sharing my
              lessons.
            </p>
            <p>If this sounds cool to you, then please stick around and consider signing up to my newsletter below! </p>
          </div>
        </div>
        <InfoBlock>
          <div className="aboutMe">
            <h3>About Me</h3>
          </div>
          <ul>
            <li>
              Coner Murphy <MdPersonPin />
            </li>

            <li>
              Norwich, United Kingdom <MdLocationOn />
            </li>
            <li>
              <ul className="languages">
                {languageList.map((lan) => {
                  console.log(lan);
                  return (
                    <li>
                      <LanguageIcons language={lan} width="2rem" />
                    </li>
                  );
                })}
              </ul>
              <MdLanguage />
            </li>
            <li>
              {/* TODO: Come back and add in a list of contact methods with links */}
              <ul className="languages">
                <li>
                  <a href="https://twitter.com/MrConerMurphy" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/coner-murphy/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/mrconermurphy/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a href="mailto:coner@conermurphy.com" target="_blank" rel="noopener noreferrer">
                    <FaEnvelope />
                  </a>
                </li>
              </ul>
              <MdContacts />
            </li>
          </ul>
        </InfoBlock>
      </LandingSection>
      <EmailSignupForm marginRequired />
      <ContentSection>
        <div className="headerTitleSeperator">
          <h3>Blog</h3>
          <Link to="/blog">View All</Link>
        </div>
        <div className="content">
          {blog.edges.map((post) => (
            <BlogPostCard key={`HomeBlogPostCard-${post.node.frontmatter.id}`} post={post} />
          ))}
        </div>
      </ContentSection>
      <NotesContentSection>
        <div className="headerTitleSeperator">
          <h3>Notes</h3>
          <Link to="/notes">View All</Link>
        </div>
        <div className="content">
          {notes.edges.map((note) => (
            <NotePostCard
              key={`HomeNotePostCard-${note.node.fields.noteCategory}-${note.node.frontmatter.title}-${note.node.frontmatter.id}`}
              note={note}
            />
          ))}
        </div>
      </NotesContentSection>
      <ContentSection>
        <div className="headerTitleSeperator">
          <h3>Portfolio</h3>
          <Link to="/portfolio">View All</Link>
        </div>
        <div className="content">{/* TODO: Add in Blog Posts and create custom template for them */}</div>
      </ContentSection>
      <ContentSection>
        <div className="headerTitleSeperator">
          <h3>testimonials</h3>
        </div>
        <div className="content">{/* TODO: Add in Blog Posts and create custom template for them */}</div>
      </ContentSection>
    </>
  );
}

export const query = graphql`
  query HomePageContentQuery {
    blog: allMdx(sort: { order: DESC, fields: frontmatter___date }, filter: { fields: { contentCategory: { eq: "blog" } } }, limit: 3) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            tags
            title
            id
            image {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    notes: allMdx(
      limit: 3
      sort: { order: [DESC, DESC], fields: [frontmatter___date, frontmatter___id] }
      filter: { fields: { contentCategory: { eq: "notes" } } }
    ) {
      edges {
        node {
          fields {
            slug
            noteCategory
          }
          frontmatter {
            date(formatString: "DDMMYYYY")
            tags
            title
            id
          }
          excerpt(pruneLength: 250)
        }
      }
    }
  }
`;
