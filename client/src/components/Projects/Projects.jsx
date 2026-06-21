import './Projects.scss';
import useScrollReveal from '../../hooks/useScrollReveal';
import { responsiveImageSizes } from '../../assets/responsiveImages';
import PageLink from '../PageLink/PageLink';
import ResponsivePicture from '../ResponsivePicture/ResponsivePicture';
import { featuredProject, supportingProjects } from './data/projectsCatalog';

const referenceVideos = [
  {
    id: 'trockenbau-details-innenausbau',
    title: 'Trockenbau-Details im Innenausbau',
    label: 'Innenausbau',
    youtubeId: '6HNLfa6FXb8',
  },
  {
    id: 'trockenbau-baustelle',
    title: 'Trockenbau auf der Baustelle',
    label: 'Baustelle',
    youtubeId: 'okEqR_-teL4',
  },
];

function Projects() {
  const { sectionRef: projectsRef, isVisible } = useScrollReveal();

  return (
    <section
      ref={projectsRef}
      className={`projects section${isVisible ? ' projects--visible' : ''}`}
      id="referenzen"
    >
      <div className="container">
        <div className="projects__video-panel projects__reveal" aria-labelledby="referenzen-videos-title">
          <div className="projects__video-header">
            <span className="projects__video-eyebrow">Video-Referenzen</span>
            <h3 className="projects__video-title" id="referenzen-videos-title">
              Trockenbau in Bewegung
            </h3>
            <p className="projects__video-text">
              Direkte Einblicke in Ausführung, Detailarbeit und Abläufe auf der Baustelle.
            </p>
          </div>

          <div className="projects__video-grid">
            {referenceVideos.map((video, index) => (
              <article className="projects__video-card" key={video.id}>
                <div className="projects__video-frame">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
                    title={video.title}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="projects__video-copy">
                  <span className="projects__video-meta">
                    {String(index + 1).padStart(2, '0')} — {video.label}
                  </span>
                  <h4 className="projects__video-card-title">{video.title}</h4>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="projects__header">
          <span className="projects__eyebrow projects__reveal">REFERENZEN</span>
          <h2 className="projects__title projects__reveal">Ausgewählte Projekte</h2>
          <p className="projects__text projects__reveal">
            Ein Einblick in unsere bisherigen Arbeiten rund um Decken, Wände,
            Bodenaufbau, Dachschrägen und saubere Trockenbau-Details.
          </p>
        </div>

        <div className="projects__layout">
          <PageLink
            className="projects__featured projects__reveal"
            to={`/referenzen/${featuredProject.slug}`}
          >
            <ResponsivePicture
              image={featuredProject.image}
              sizes={responsiveImageSizes.projectsFeatured}
              alt={featuredProject.alt}
              loading="lazy"
              decoding="async"
              className="projects__image"
            />
            <div className="projects__overlay projects__overlay--featured">
              <h3 className="projects__featured-title">{featuredProject.title}</h3>
              <p className="projects__featured-text">{featuredProject.shortText}</p>
            </div>
          </PageLink>

          <div className="projects__grid">
            {supportingProjects.map((project) => (
              <PageLink
                className="projects__item projects__reveal"
                key={project.slug}
                to={`/referenzen/${project.slug}`}
              >
                <ResponsivePicture
                  image={project.image}
                  sizes={responsiveImageSizes.projectsGrid}
                  alt={project.alt}
                  loading="lazy"
                  decoding="async"
                  className="projects__image"
                />
                <div className="projects__overlay">
                  <h4 className="projects__item-title">{project.title}</h4>
                </div>
              </PageLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
