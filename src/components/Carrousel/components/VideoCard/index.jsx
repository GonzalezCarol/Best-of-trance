import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

export default function VideoCard({ videoURL }) {
  // const image = `https://img.youtube.com/vi/${getYouTubeId(videoURL)}/hqdefault.jpg`;
  return (
    <ReactPlayer url={videoURL} />
  );
}

VideoCard.propTypes = {
  videoURL: PropTypes.string.isRequired,
};
