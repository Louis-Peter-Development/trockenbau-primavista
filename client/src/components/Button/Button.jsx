import './Button.scss';
import HashLink from '../HashLink/HashLink';
import PageLink from '../PageLink/PageLink';

const Button = ({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
}) => {
  const className = `button button-${variant}`;
  const content = (
    <>
      <span>{children}</span>
      <span className="button__arrow" aria-hidden="true">&gt;</span>
    </>
  );

  if (href) {
    if (href.startsWith('#') || href.startsWith('/#')) {
      return (
        <HashLink to={href} className={className} onClick={onClick}>
          {content}
        </HashLink>
      );
    }

    if (href.startsWith('/')) {
      return (
        <PageLink to={href} className={className} onClick={onClick}>
          {content}
        </PageLink>
      );
    }

    return (
      <a href={href} className={className} onClick={onClick}>
        {content}
      </a>
    );
}

  return (
    <button className={className} onClick={onClick} type={type}>
      {content}
    </button>
  );
};

export default Button;
