import React, { Component } from 'react'
import { Card, Icon } from 'semantic-ui-react'

export default function PostsList({posts}) {
  const postElements = posts.map(post =>{
    return (
      <Card key={post.id}>
        <Card.Content header={post.title} />
        <Card.Content description={post.body} />
        <Card.Content extra>
        </Card.Content>
      </Card>
    )
  })

  return (
    <div>
      {postElements}
    </div>
  )
}