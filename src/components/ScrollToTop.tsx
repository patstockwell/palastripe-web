import { useEffect } from 'react';
import { connect } from 'react-redux';
import { State } from '../helpers/types';
import { getCurrentPage } from '../helpers/functions';

interface OwnProps {
  pathname: string;
}

type Props = OwnProps & StateProps;

const ScrollToTop: React.FC<Props> = ({ pathname, scrollY = 0 }) => {
  useEffect(() => {
    window.scrollTo(0, scrollY);
  }, [pathname]);

  return null;
};

interface StateProps {
  scrollY: number;
}

const mapStateToProps = (
  state: State,
  ownProps: OwnProps,
): StateProps => {
  const page = getCurrentPage(ownProps.pathname);
  const scrollY = state.scrollY[page];

  return { scrollY };
};

export default connect<StateProps, void, OwnProps>(
  mapStateToProps
)(ScrollToTop);
