// https://codepen.io/tahazsh/pen/gOqNZyw

import styled from "styled-components";

const MIN_SPEED = 1.5;
const MAX_SPEED = 2.5;

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

class Blob {
  constructor(el) {
    this.el = el;
    const boundingRect = this.el.getBoundingClientRect();
    this.size = boundingRect.width;
    this.initialX = randomNumber(0, window.innerWidth - this.size);
    this.initialY = randomNumber(0, window.innerHeight - this.size);
    this.el.style.top = `${this.initialY}px`;
    this.el.style.left = `${this.initialX}px`;
    this.vx =
      randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
    this.vy =
      randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
    this.x = this.initialX;
    this.y = this.initialY;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x >= window.innerWidth - this.size) {
      this.x = window.innerWidth - this.size;
      this.vx *= -1;
    }
    if (this.y >= window.innerHeight - this.size) {
      this.y = window.innerHeight - this.size;
      this.vy *= -1;
    }
    if (this.x <= 0) {
      this.x = 0;
      this.vx *= -1;
    }
    if (this.y <= 0) {
      this.y = 0;
      this.vy *= -1;
    }
  }

  move() {
    this.el.style.transform = `translate(${this.x - this.initialX}px, ${
      this.y - this.initialY
    }px)`;
  }
}

function initBlobs() {
  const blobEls = document.querySelectorAll(".bouncing-blob");
  const blobs = Array.from(blobEls).map((blobEl) => new Blob(blobEl));

  function update() {
    requestAnimationFrame(update);
    blobs.forEach((blob) => {
      blob.update();
      blob.move();
    });
  }

  requestAnimationFrame(update);
}

initBlobs();

// eslint-disable-next-line react/prop-types
export default function LiquidBackground({ children }) {
  return (
    <LiquidBackgroundContainer>
      <div className="bouncing-blobs-container">
        <div className="bouncing-blobs-glass"></div>
        <div className="bouncing-blobs">
          <div className="bouncing-blob bouncing-blob--blue"></div>
          <div className="bouncing-blob bouncing-blob--blue"></div>
          <div className="bouncing-blob bouncing-blob--blue"></div>
          <div className="bouncing-blob bouncing-blob--white"></div>
          <div className="bouncing-blob bouncing-blob--purple"></div>
          <div className="bouncing-blob bouncing-blob--purple"></div>
          <div className="bouncing-blob bouncing-blob--pink"></div>
        </div>
      </div>
      <div>{children}</div>
    </LiquidBackgroundContainer>
  );
}

const LiquidBackgroundContainer = styled.div`
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;

  .bouncing-blob {
    width: 32vw;
    aspect-ratio: 1;
    border-radius: 50%;
    will-change: transform;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    transform-origin: left top;
  }

  .bouncing-blob--blue {
    background: #4783c7;
  }

  .bouncing-blob--white {
    background: #ffffff;
    z-index: 2;
    width: 15vw;
  }

  .bouncing-blob--purple {
    background: #8c8ff1;
  }

  .bouncing-blob--pink {
    background: #e289cd50;
  }

  .bouncing-blobs-container {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .bouncing-blobs-glass {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(140px);
    -webkit-backdrop-filter: blur(140px);
    pointer-events: none;
  }

  .bouncing-blobs {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1200px) {
    .bouncing-blobs-glass {
      backdrop-filter: blur(120px);
      -webkit-backdrop-filter: blur(120px);
    }
  }

  @media (max-width: 500px) {
    .bouncing-blob {
      width: 60vw;
    }
    .bouncing-blob--white {
      width: 30vw;
    }
    .bouncing-blobs-glass {
      backdrop-filter: blur(90px);
      -webkit-backdrop-filter: blur(90px);
    }
  }
`;
