import React from 'react';
import PropTypes from 'prop-types';
import { Whisper } from 'rsuite';
import { tooltipActivated, tooltipDeactivated, tooltipPending } from '@components/tooltips';

export function UserStatus({ status }) {
  let icons;
  switch (status) {
    case 'PENDING':
      icons = (
        <Whisper placement="top" trigger="hover" speaker={tooltipPending}>
          <span className="user-status-pending fnt-24">&bull;</span>
        </Whisper>
      );
      break;
    case 'ACTIVATED':
      icons = (
        <Whisper placement="top" trigger="hover" speaker={tooltipActivated}>
          <span className="user-status-activated fnt-24">&bull;</span>
        </Whisper>
      );
      break;
    case 'DEACTIVATED':
      icons = (
        <Whisper placement="top" trigger="hover" speaker={tooltipDeactivated}>
          <span className="user-status-deactivated fnt-24">&bull;</span>
        </Whisper>
      );
      break;
    default:
      return null;
  }
  return <span className={`user-status-${status.toLowerCase()}`}>{icons}</span>;
}
UserStatus.propTypes = {
  status: PropTypes.string,
};
