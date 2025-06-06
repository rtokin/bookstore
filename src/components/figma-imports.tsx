import React from 'react'
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react'
import '../builder-registry'

builder.init(import.meta.env.VITE_PUBLIC_BUILDER_KEY!)

export default function BuilderPage() {
  const isPreviewingInBuilder = useIsPreviewing()
  const [notFound, setNotFound] = React.useState(false)
  const [content, setContent] = React.useState(null)

  React.useEffect(() => {
    async function fetchContent() {
      const content = await builder
        .get('figma-imports', {
          url: window.location.pathname,
        })
        .promise()

      setContent(content)
      setNotFound(!content)

      if (content?.data.title) {
        document.title = content.data.title
      }
    }
    fetchContent()
  }, [])

  if (content === null) {
    return
  }

  if (notFound && !isPreviewingInBuilder) {
    return <div>404 Page Not Found</div>
  }


  return (
    <>
      <BuilderComponent model="figma-imports" content={content} />
    </>
  )
}
