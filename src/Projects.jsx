import React from 'react'
import { createClient } from 'contentful'
import { useState } from 'react'
import { useEffect } from 'react'

const client = createClient({
  space: '1vunwsrk0ha2',
  accessToken: 'I1NLUubXS0i_djI9EUFWWQYnMGl-LvBvHsiCgL_5-LU',
  environment: 'master',
})

const useFetchContentFul = () => {
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState([])

  const fetchProjects = async () => {
    try {
      const response = await client.getEntries()
      const projects = response.items.map((item) => {
        const { title, url, image } = item.fields
        const id = item.sys.id
        const img = image?.fields?.file?.url
        return { title, url, id, img }
      })
      setProjects(projects)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])
  return { loading, projects }
}

const Projects = () => {
  const { loading, projects } = useFetchContentFul()

  if (loading) {
    return (
      <section className="projects">
        <h2>Loading...</h2>
      </section>
    )
  }

  return (
    <section className="projects">
      <div className="title">
        <h2>projects</h2>
        <div className="title-underline"></div>
      </div>
      <div className="projects-center">
        {projects.map((project) => {
          const { id, img, url, title } = project
          return (
            <a
              key={id}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="project"
            >
              <img src={img} alt={title} className="img" />
              <h5>{title}</h5>
            </a>
          )
        })}
      </div>
    </section>
  )
}

export default Projects
