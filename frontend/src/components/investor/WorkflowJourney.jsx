import { customerFilm } from '../../data/cinematicJourneys';
import { FilmJourney } from './FilmJourney';

export const WorkflowJourney = ({ department, industry, problem, onJoin }) => <FilmJourney film={customerFilm('workflow', department, industry, problem)} customer onJoin={onJoin} />;