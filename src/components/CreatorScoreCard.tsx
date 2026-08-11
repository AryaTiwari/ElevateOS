import React from 'react';
import { ElevateAIContentAnalyzer } from './ElevateAIContentAnalyzer';

interface CreatorScoreCardProps {
  onOpenBooking: () => void;
  onOpenFlagship: () => void;
}

export const CreatorScoreCard: React.FC<CreatorScoreCardProps> = (props) => {
  return <ElevateAIContentAnalyzer {...props} />;
};

export default CreatorScoreCard;
