import classes from './SkipToContent.module.scss';

const SkipToContent = () => {
  return (
    <a href="#main-content" className={classes.skipLink}>
      Skip to main content
    </a>
  );
};

export default SkipToContent;
