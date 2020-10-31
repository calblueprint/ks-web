import React from 'react';
import '../../../styles/Community.css';
import PPSCNoAnnouncementsGraphic from '../../../assets/ppsc-banner.svg';

export default function DashboardCard1() {
  return (
    <div className="ppsc-coomunity-center">
      <img
        src={PPSCNoAnnouncementsGraphic}
        alt="People Power Solar Cooperation Banner"
        className="no-announcements"
      />
    </div>
  );
}
