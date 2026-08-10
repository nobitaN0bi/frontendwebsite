import { customerFilm } from '../../data/cinematicJourneys';
import { FilmJourney } from './FilmJourney';

export const WorkflowJourney = ({ department, industry, onJoin }) => <FilmJourney film={customerFilm('workflow', department, industry)} customer onJoin={onJoin} />;