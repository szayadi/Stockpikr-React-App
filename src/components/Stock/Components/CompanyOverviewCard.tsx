import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { ICompanyProfile } from '../../../interfaces/ICompanyProfile';

interface CompanyOverviewCardProps {
  companyProfile: ICompanyProfile;
}

const CompanyOverviewCard: React.FC<CompanyOverviewCardProps> = ({ companyProfile }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" textAlign={'left'} sx={{ marginBottom: '30px' }}>
          Company Profile
        </Typography>
        <img
          src={companyProfile.image}
          alt={companyProfile.companyName}
          style={{ width: '100px', height: '100px', backgroundColor: 'var(--navbar-bg-color)', padding: '10px' }}
        />
        <Typography variant="body1" textAlign={'left'}>
          CEO: {companyProfile.ceo}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Sector: {companyProfile.sector}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Industry: {companyProfile.industry}
        </Typography>
        <Typography variant="body1" textAlign={'left'}>
          Country: {companyProfile.country}
        </Typography>
        <Typography variant="body2" textAlign={'left'} paragraph sx={{ marginTop: '30px' }}>
          {companyProfile.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CompanyOverviewCard;
