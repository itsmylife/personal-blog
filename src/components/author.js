import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import { rhythm } from "../utils/typography"

const Author = function({ details: { name, twitter, github } }) {

  const { avatar } = useStaticQuery(avatarQuery)

  return (
    <Container>
      <Image
        fixed={avatar.childImageSharp.fixed}
        alt={name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        Written by <strong>{name}</strong>
        <br />
        <a href={`https://twitter.com/${twitter}`}>Twitter </a>
        {` | `}
        <a href={`https://github.com/${github}`}>Github </a>
      </p>
    </Container>
  )
}

const avatarQuery = graphql`
    query AvatarQuery {
        avatar: file(absolutePath: { regex: "/author.png/" }) {
            childImageSharp {
                fixed(width: 50, height: 50) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
    }
`

const Container = styled.div`
  display: flex;
`

export default Author
