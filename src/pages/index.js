import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"

class IndexPage extends React.Component {
  render() {
    const siteTitle = "Development Notes"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Development Notes"
          description="notes about development and learning from ismail simsek"
          keywords={[`blog`, `gatsby`, `javascript`, `react`, `typescript`]}
        />
        <i>TODO: insert funny developer joke/meme in here</i>
        <h1>
          Hey people{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </h1>
        <p>Welcome to my brand new website. You are on your home page.</p>
        <p>
          You can check my blog posts below. There will be more stuff here later.
        </p>
        <Link to="/blog/">
          <Button marginTop="35px">Go to Blog</Button>
        </Link>
      </Layout>
    )
  }
}

export default IndexPage
