import { useState } from 'react';
import { ProofTabs } from '../components/ProofTabs';
import { Seo } from '../components/Seo';
import { AhiNarratedShowcase } from '../cinematic/AhiNarratedShowcase';
import { EyeScene } from '../cinematic/EyeScene';
import { FounderOceanScene } from '../cinematic/FounderOceanScene';
import { HandsScene } from '../cinematic/HandsScene';
import { useScenarios } from '../cinematic/useScenarios';

const siteUrl = process.env.REACT_APP_SITE_URL;
const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'Acoord', url: siteUrl, logo: `${siteUrl}/favicon.svg`, description: 'Acoord builds the Agent Human Interface for governed collaboration between people and AI agents.' },
    { '@type': 'SoftwareApplication', '@id': `${siteUrl}/#ahi`, name: 'Acoord AHI — Agent Human Interface', applicationCategory: 'BusinessApplication', operatingSystem: 'Web and desktop', description: 'One command surface to observe, approve, steer, connect, and audit agents across an organization.', featureList: ['Human approval checkpoints', 'Evidence-grounded workflows', 'Enterprise connectors', 'Durable decision records'], provider: { '@id': `${siteUrl}/#organization` }, url: siteUrl },
    { '@type': 'WebPage', '@id': `${siteUrl}/#homepage`, name: 'Acoord AHI — Solving Artificial Coordination', url: siteUrl, description: 'A compact five-part introduction to AHI, product proof, workflows, connectors, ROI, and human authority.', mainEntity: { '@id': `${siteUrl}/#ahi` }, hasPart: [
      { '@type': 'WebPageElement', name: 'Agent Human Interface introduction', url: `${siteUrl}/#ahi` },
      { '@type': 'WebPageElement', name: 'Nine-industry AHI product demo', url: `${siteUrl}/#ahi-live` },
      { '@type': 'WebPageElement', name: 'Operational proof: workflows, 49 connectors, and ROI', url: `${siteUrl}/#connectors` }
    ] }
  ]
};

export default function HomePage({ onJoin }) {
  const scenarios = useScenarios();
  const [industryId, setIndustryId] = useState('finance');

  const seeAhiLive = (event) => {
    event.preventDefault();
    window.history.replaceState(null, '', '#ahi-live');
    document.getElementById('ahi-live')?.scrollIntoView({ behavior: 'instant', block: 'start' });
  };

  return <div className="home-consolidated" data-testid="consolidated-homepage">
    <Seo title="Acoord AHI — Solving Artificial Coordination" description="Acoord AHI is the Agent Human Interface: one governed command surface where people observe, approve, steer, connect, and audit AI agents." path="/" schema={homeSchema} />
    <div className="film compact-home-film" data-testid="cinematic-film">
      <HandsScene onJoin={onJoin} onSeeAhi={seeAhiLive} />
      <EyeScene />
    </div>
    <AhiNarratedShowcase compact scenarios={scenarios} activeId={industryId} onScenarioSelect={setIndustryId} />
    <ProofTabs />
    <FounderOceanScene onJoin={onJoin} />
  </div>;
}