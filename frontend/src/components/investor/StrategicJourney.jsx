import { investorFilms } from '../../data/cinematicJourneys';
import { FilmJourney } from './FilmJourney';

export const StrategicJourney = ({ onJoin }) => <FilmJourney film={investorFilms.strategic} onJoin={onJoin} />;