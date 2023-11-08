import {
  MarketPlaceOffer,
  getAllMarketPlaceOffers,
} from "src/data/marker-place";
import { Opportunity, getAllOpportunities } from "src/data/opportunity";
import { Project, getAllProjects } from "src/data/project";
import { Route } from "src/routing";
import { getRandomElem, shuffleInPlace, shuffled, unique } from "src/utils";

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();
  const featuredOpportunities = await getFeaturedOpportunities();
  const featuredMarketPlaceOffers = await getFeaturedMarketPlaceOffers();
  return (
    <main className="flex flex-col gap-10 p-20">
      <section>
        <h2>Projekty</h2>
        {featuredProjects.map(ProjectCard)}
      </section>
      <section>
        <h2>Hledané role</h2>
        {featuredOpportunities.map(OpportunityRow)}
      </section>
      <section>
        <h2>Market-place</h2>
        {featuredMarketPlaceOffers.map(MarketPlaceOfferRow)}
      </section>
    </main>
  );
}

//
// Projects
//

const ProjectCard = (project: Project) => (
  <a className="block" key={project.id} href={Route.toProject(project)}>
    <h3>{project.name}</h3>
    <p>{project.tagline}</p>
  </a>
);

async function getFeaturedProjects(): Promise<Project[]> {
  const canBeFeatured = (p: Project) =>
    p.state === "finished" || p.state === "incubating" || p.state === "running";
  const allProjects = await getAllProjects();
  return shuffled(allProjects).filter(canBeFeatured).slice(0, 3);
}

//
// Opportunities
//

const OpportunityRow = (o: Opportunity) => (
  <a className="block" key={o.id} href={Route.toOpportunity(o)}>
    <h2>{o.name}</h2>
    <p>
      {o.timeRequirements} {o.skills}
    </p>
  </a>
);

async function getFeaturedOpportunities(count = 3): Promise<Opportunity[]> {
  const opportunities = await getAllOpportunities();
  // Let’s pick `count` projects to feature
  const featuredProjectIds = shuffleInPlace(
    unique(opportunities.map((o) => o.projectId))
  ).slice(0, count);
  if (featuredProjectIds.length < count) {
    // If we don’t have that many, just return random `count` opportunities
    return shuffleInPlace(opportunities.slice(0, count));
  } else {
    // Otherwise pick a random opportunity from each featured project
    return featuredProjectIds
      .map((id) => opportunities.filter((o) => o.projectId === id))
      .map((ops) => getRandomElem(ops))
      .flat();
  }
}

//
// Market-place
//

const MarketPlaceOfferRow = (o: MarketPlaceOffer) => (
  <div key={o.id}>
    <h2>{o.title}</h2>
    <p className="line-clamp-1">{o.text}</p>
  </div>
);

async function getFeaturedMarketPlaceOffers(): Promise<MarketPlaceOffer[]> {
  const offers = await getAllMarketPlaceOffers();
  return offers.filter((o) => o.state === "published" && !!o.title).slice(0, 5);
}
