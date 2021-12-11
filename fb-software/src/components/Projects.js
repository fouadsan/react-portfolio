import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Viewer from "react-viewer";
import { FaEye } from "react-icons/fa";

function Projects({ items }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [projectImages, setProjectImages] = useState();

  const openImageViewer = useCallback((images) => {
    setProjectImages(images);
    setCurrentImage(0);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <Wrapper className="section-center">
      {items.map((menuItem) => {
        const { id, title, category, images, description } = menuItem;
        let newImages = [];
        images.map((image) => {
          return newImages.push({ src: image, alt: title });
        });
        return (
          <article key={id} className="menu-item">
            <div className="project-imgs">
              {newImages.map((image, index) => (
                <img
                  src={image.src}
                  className="thumb"
                  key={index}
                  alt={image.title}
                />
              ))}

              <button
                type="button"
                className="link"
                onClick={() => openImageViewer(newImages)}
              >
                <FaEye />
              </button>

              <Viewer
                visible={isViewerOpen}
                images={projectImages}
                activeIndex={currentImage}
                onClose={closeImageViewer}
                noImgDetails={true}
                noNavbar={true}
                showTotal={false}
                loop={false}
              />
            </div>
            <div className="item-info">
              <header>
                <h4>{title}</h4>
                <h4 className="category">{category}</h4>
              </header>
              <p className="item-desc">{description}</p>
            </div>
          </article>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  gap: 3rem 2rem;
  justify-items: center;

  .menu-item {
    display: grid;
    gap: 1rem 2rem;
    width: 100%;
    height: 180px;
    max-width: 25rem;
  }

  .item-info {
    width: 100%;
  }

  .project-imgs {
    position: relative;
    border: 0.25rem solid var(--clr-primary-3);
    border-radius: var(--radius);
    overflow: hidden;

    &:hover {
      .thumb {
        opacity: 0.5;
      }
      .link {
        opacity: 1;
      }
    }
  }

  .thumb {
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: var(--transition);
  }

  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: none;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }

  .thumb:hover .link {
    opacity: 1;
  }

  .item-info header {
    display: flex;
    justify-content: space-between;
    border-bottom: 0.5px dotted var(--clr-primary-1);
  }
  .item-info h4 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  .category {
    color: var(--clr-gold);
  }
  .item-desc {
    display: -webkit-box;
    width: 320px;
    word-wrap: break-word;
    margin-bottom: 0;
    padding-top: 1rem;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media screen and (min-width: 768px) {
    .menu-item {
      grid-template-columns: 225px 1fr;
      gap: 0 1.25rem;
      max-width: 40rem;
    }

    .item-desc {
      width: 300px;
    }
  }

  @media screen and (min-width: 1200px) {
    width: 95vw;
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 767px) {
    .menu-item {
      height: 300px;
    }
    .item-desc {
      width: 380px;
    }
  }

  @media (max-width: 480px) {
    .item-desc {
      width: 90vw;
    }
  }
`;

export default Projects;
