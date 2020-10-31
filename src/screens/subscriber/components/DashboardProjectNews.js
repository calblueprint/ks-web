import React from 'react';
import { Link } from 'react-router-dom';
import LoadingComponent from '../../../components/LoadingComponent';
import RightArrow from '../../../assets/right_arrow.png';
import DashboardCard1 from '../../shared/components/DashboardCard1';

export default class DashboardProjectNewsSection extends React.PureComponent {
  render() {
    let { announcements } = this.props;
    const { isLoadingAnnouncements } = this.props;
    announcements = [...announcements].reverse();
    let renderedComponent = <DashboardCard1 />;
    if (isLoadingAnnouncements || !announcements) {
      renderedComponent = <LoadingComponent />;
    } else if (announcements.length === 0) {
      renderedComponent = <DashboardCard1 />;
    } else {
      renderedComponent = announcements.map(announcement => (
        <div key={announcement.title} className="subscriber-news-card">
          <div>
            <h3>{announcement.title}</h3>
            {announcement.attachments
              ? announcement.attachments.map(attachment => (
                  <img src={attachment.url} alt={attachment.filename} />
                ))
              : null}
            <p>{announcement.message}</p>
          </div>
        </div>
      ));
    }

    return (
      <div className="subscriber-side-container">
        <div className="subscriber-section-header">
          <div className="subscriber-header">Page 1</div>
          <Link to="/404">
            <img
              src={RightArrow}
              className="button right-arrow-button"
              alt="right arrow"
            />
          </Link>
        </div>
        <div className="subscriber-side-section-body">{renderedComponent}</div>
      </div>
    );
  }
}
