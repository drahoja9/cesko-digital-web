import { Layout, Section, SectionContent } from 'components/layout'
import { Projects } from 'components/sections'
import { Hero } from './sections'
import { JoinUs } from 'components/sections'
import { OurValues, Numbers, ImageGallery } from './sections'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { HomepageQuery } from 'generated/graphql-types'

interface IndexPageProps {
  data: HomepageQuery
}

const IndexPage: React.FC<IndexPageProps> = ({ data }: IndexPageProps) => {
  const theme = useContext(ThemeContext)
  const projects = data.projects.nodes

  return (
    <Layout>
      <Section>
        <Hero />
      </Section>

      <Numbers />

      <Section>
        <SectionContent>
          <Projects projects={projects} />
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <JoinUs />
        </SectionContent>
      </Section>

      <Section backgroundColor={theme.colors.pebble}>
        <SectionContent>
          <OurValues />
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <ImageGallery />
        </SectionContent>
      </Section>
    </Layout>
  )
}

export default IndexPage
